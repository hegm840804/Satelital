import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Form, InputGroup, Button } from "react-bootstrap";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import * as Icon from "react-bootstrap-icons";
import { RxEyeClosed } from "react-icons/rx";
import { MdRemoveRedEye } from "react-icons/md";
import sideImage from "../../src/assets/img/login/sky-home.svg";
import Loading from "../General/Loading";
import logo from "../assets/img/logos/sky-new-2020-seeklogo2.svg";
import {
  AutenticarUsuarioRest_Respuesta,
  builtAutenticarUsuarioRest_Datos,
  AutenticarUsuarioRest_Parametros,
  AutenticarUsuarioRest_Datos,
} from "../Commons/Services/AutenticarUsuarioRest";
import { ConsultaWS } from "../Commons/ServiciosBase";

import {
  ConsultaCuenta_Respuesta,
  ConsultaCuentaRest_Parametros,
  ConsultaCuentaRest_Entrada,
  builtConsultaCuentaRestInput,
} from "../Commons/Services/ConsultaCuentaRest";
import axios from "axios";
import {
  ConsultarServiciosCuenta_Respuesta,
  ConsultarServiciosCuenta_Parametros,
  builtInputVarConsultarServiciosCuentaInput,
  ConsultarServiciosCuenta_Entrada,
} from "../Commons/Services/ConsultarServiciosCuentaRest";

import encryptText from "../Commons/EncriptText";

import {
  ConsultarIRD_Entrada,
  ConsultarIRD_Parametros,
  ConsultarIRD_Respuesta,
  Tarjeta,
} from "../Commons/Services/ConsultarIRD";
import BarraLoader from "../General/BarraLoader";
import { getAssetsFromSalesfoce, getPrimaryData } from "../Utils/GetAssetsUtil";
import {
  AccountDetails_Entrada,
  AccountDetails_Parametros,
  AccountDetails_Respuesta,
} from "../Commons/Services/AccountDetails";
import ContextFlujos from "../Context/ContextFlujos";

export const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [usuarioPlaceholder, setUsuarioPlaceholder] = useState("");
  const [imagenURI, setImagenURI] = useState(logo);

  const [datosSW, setDatosSW] = useState<AutenticarUsuarioRest_Respuesta>();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [status, setStatus] = useState({
    show: false,
    color: "red",
    message: "",
  });
  const [loading, isLoading] = useState(false);

  const [typePwd, setTypePwd] = useState("password");

  const handleShowNumber = () =>
    setTypePwd(typePwd === "password" ? "text" : "password");

  const navigate = useNavigate();

  const { setSkyPlus, setSkyCelular, setTipoClienteContext, setPais } = useContext(
    ContextFlujos
  ) as any;

  const [banderaPais, setBanderaPais] = useState(false);

  const validarNulosYIndefinidios = (param: any) => {
    var retorno: string = "";
    if (param != null && typeof param != "undefined") {
      retorno = param;
    } else {
      retorno = "";
    }

    return retorno;
  };

  const doConsultaCuenta = async (param: AutenticarUsuarioRest_Respuesta) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultaCuentaRestDO: ConsultaCuentaRest_Entrada =
      builtConsultaCuentaRestInput(
        `${param.ListUsuariosSel.UsuarioSelEBO[0].NumeroCuenta}`
      );
    let par = ConsultaCuentaRest_Parametros(ConsultaCuentaRestDO);
    let ConsultaCuentaRespuesta: ConsultaCuenta_Respuesta = await ConsultaWS(
      par
    );
    sessionStorage.setItem("isReload", "0");
    if (
      ConsultaCuentaRespuesta.EBMHeaderResponse &&
      ConsultaCuentaRespuesta.EBMHeaderResponse.ErrorNegocio.Estado == "ok" &&
      ConsultaCuentaRespuesta.EBMHeaderResponse.ErrorTecnico.code === "ok"
    ) {
      sessionStorage.setItem(
        "tipoCliente",
        validarNulosYIndefinidios(
          ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount.Account[0]
            .BillPaymentSystem
        )
      );
      setTipoClienteContext(
        ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount.Account[0]
          .BillPaymentSystem
      );

      sessionStorage.setItem(
        "accountType",
        validarNulosYIndefinidios(
          ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount.Account[0]
            .Type
        )
      );

      if (
        ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount.Account[0]
          .BillPaymentSystem === "POS"
      ) {
        let ar1: any =
          ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount.Account[0]
            .ListOfServiceInstance.ServiceInstance;

        ar1.forEach((item: any) => {
          if (
            item.SlaveHierarchy === "Master" &&
            item.ServiceProductType === "VIDEO"
          ) {
            let ar2: object[] = item.ListOfInstanceComponent.InstanceComponent;

            ar2.forEach((item2: any) => {
              if (item2.ProductCategory === "Paquete Principal") {
                sessionStorage.setItem(
                  "Paquete",
                  validarNulosYIndefinidios(item2.Product)
                );
                let banderaHD = validarNulosYIndefinidios(item2.Product);
                let banderaHD2 = validarNulosYIndefinidios(
                  ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                    .Account[0].AccountTechnology
                );

                if (
                  banderaHD.search("HD") ||
                  banderaHD.search("GOLD") ||
                  banderaHD.search("BLACK") ||
                  banderaHD.search("PLATINUM") ||
                  banderaHD2 === "HD"
                ) {
                  sessionStorage.setItem("banderaHD", "Y");
                } else {
                  sessionStorage.setItem("banderaHD", "N");
                }

                let fechaInicio = item2.EffectiveStartDate.substring(0, 10);
                sessionStorage.setItem("fechaInicioRecarga", fechaInicio);
                let fechaFin = item2.EffectiveEndDate;

                if (fechaFin !== null) {
                  fechaFin.substring(0, 10);
                  const ar2 = fechaFin.split("-");
                  sessionStorage.setItem(
                    "fechaFinRecarga",
                    ar2[2] + "-" + ar2[1] + "-" + ar2[0]
                  );
                } else {
                  sessionStorage.setItem("fechaFinRecarga", fechaFin);
                }
              }
            });
          }
          sessionStorage.setItem(
            "StreetAddrCalle",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].StreetAddrCalle
            )
          );
          sessionStorage.setItem(
            "AddrNumNumExt",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].AddrNumNumExt
            )
          );
          sessionStorage.setItem(
            "ProvinceColonia",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].ProvinceColonia
            )
          );
          sessionStorage.setItem(
            "PrimaryAccountCountry",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].PrimaryAccountCountry
            )
          );
          setBanderaPais(true);
          setPais("MEX");

          sessionStorage.setItem(
            "CountyDelMun",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].CountyDelMun
            )
          );
          sessionStorage.setItem(
            "StateEstado",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].StateEstado
            )
          );
          sessionStorage.setItem(
            "PostalCodeCP",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].PostalCodeCP
            )
          );
          sessionStorage.setItem(
            "direccion",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].StreetAddrCalle
            ) +
              " no. " +
              validarNulosYIndefinidios(
                ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].AddrNumNumExt
              ) +
              ", Col. " +
              validarNulosYIndefinidios(
                ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].ProvinceColonia
              ) +
              ", " +
              validarNulosYIndefinidios(
                ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].CityPoblacion
              ) +
              ", " +
              validarNulosYIndefinidios(
                ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].StateEstado
              ) +
              ", C.P. " +
              validarNulosYIndefinidios(
                ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].PostalCodeCP
              )
          );

          sessionStorage.setItem(
            "assetNumber",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfServiceInstance.ServiceInstance[0].AssetNumber
            )
          );

          sessionStorage.setItem(
            "SecondAssetNumber",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfServiceInstance.ServiceInstance[0].SecondAssetNumber
            )
          );
        });
      } else {
        //Inicia seccion para prepago
        let ar1: any =
          ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount.Account[0]
            .ListOfServiceInstance.ServiceInstance;

        ar1.forEach((item: any) => {
          if (
            item.SlaveHierarchy === "Master" &&
            item.ServiceProductType === "VIDEO"
          ) {
            let ar2: object[] = item.ListOfInstanceComponent.InstanceComponent;

            ar2.forEach((item2: any) => {
              if (
                item2.ProductCategory === "Service" ||
                item2.ProductCategory === "Paquete Principal"
              ) {
                let miPaquete: string = "";
                if (
                  ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                    .Account[0].AccountTechnology === "SD"
                ) {
                  miPaquete = `${ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount.Account[0].AccountTypeRecharge}`;
                } else {
                  miPaquete = `${ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount.Account[0].AccountTypeRecharge} ${ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount.Account[0].AccountTechnology}`;
                }
                //sessionStorage.setItem("Paquete",validarNulosYIndefinidios(item2.Product));
                sessionStorage.setItem(
                  "Paquete",
                  validarNulosYIndefinidios(miPaquete)
                );
                let banderaHD = validarNulosYIndefinidios(item2.Product);
                let banderaHD2 = validarNulosYIndefinidios(
                  ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                    .Account[0].AccountTechnology
                );

                if (
                  banderaHD.search("HD") ||
                  banderaHD.search("GOLD") ||
                  banderaHD.search("BLACK") ||
                  banderaHD.search("PLATINUM") ||
                  banderaHD2 === "HD"
                ) {
                  sessionStorage.setItem("banderaHD", "Y");
                } else {
                  sessionStorage.setItem("banderaHD", "N");
                }
              }
            });
          }

          sessionStorage.setItem(
            "Estatus",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].EstatusVeTV
            )
          );
          sessionStorage.setItem(
            "AddrNumNumExt",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].AddrNumNumExt
            )
          );
          sessionStorage.setItem(
            "ProvinceColonia",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].ProvinceColonia
            )
          );
          sessionStorage.setItem(
            "PrimaryAccountCountry",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].PrimaryAccountCountry
            )
          );
          sessionStorage.setItem(
            "CountyDelMun",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].CountyDelMun
            )
          );
          sessionStorage.setItem(
            "StateEstado",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].StateEstado
            )
          );

          sessionStorage.setItem(
            "PostalCodeCP",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].PostalCodeCP
            )
          );
          sessionStorage.setItem(
            "direccion",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].StreetAddrCalle
            ) +
              " no. " +
              validarNulosYIndefinidios(
                ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].AddrNumNumExt
              ) +
              ", Col. " +
              validarNulosYIndefinidios(
                ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].ProvinceColonia
              ) +
              ", " +
              validarNulosYIndefinidios(
                ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].CityPoblacion
              ) +
              ", " +
              validarNulosYIndefinidios(
                ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].StateEstado
              ) +
              ", C.P. " +
              validarNulosYIndefinidios(
                ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].PostalCodeCP
              )
          );
          sessionStorage.setItem(
            "CountryPais",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfAddress.AccountAddress[0].CountryPais
            )
          );
          setBanderaPais(true);
          setPais(ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                  .Account[0].ListOfAddress.AccountAddress[0].CountryPais);
          //

          //

          //

          //

          //revisar dato
          sessionStorage.setItem(
            "montoPaquete",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfServiceAgreement.ServiceAgreement[0]
                .SubscriptionAmount
            )
          );

          sessionStorage.setItem(
            "assetNumber",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfServiceInstance.ServiceInstance[0].AssetNumber
            )
          );

          sessionStorage.setItem(
            "SecondAssetNumber",
            validarNulosYIndefinidios(
              ConsultaCuentaRespuesta.ConsultaCuenta_Salida.ListOfAccount
                .Account[0].ListOfServiceInstance.ServiceInstance[0].SecondAssetNumber
            )
          );
        });
      } //termina seccion de prepago

      doConsultarServiciosCuenta();
    } else {
      isLoading(false);
      console.error(ConsultaCuentaRespuesta.EBMHeaderResponse);
      setStatus({
        show: true,
        color: "red",
        message:
          "Ocurrió un error con la petición, favor de intentar más tarde",
      });
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const doAutenticarUsuarioRest = async () => {
    //----------------------------------------------------------------------------------------------------------------------------
    const AutenticarUsuarioRestDO: AutenticarUsuarioRest_Datos =
      builtAutenticarUsuarioRest_Datos(`${user}`, `${encryptText(`${pwd}`)}`);

    //guardar el pass desencriptado

    sessionStorage.setItem("kyriaVar", encryptText(`${pwd}`));

    let par = AutenticarUsuarioRest_Parametros(AutenticarUsuarioRestDO);
    let AutenticarUsuarioRestRespuesta: AutenticarUsuarioRest_Respuesta =
      await ConsultaWS(par);

    if (
      AutenticarUsuarioRestRespuesta.EBMHeaderResponse.ErrorNegocio
        .CodigoError == "0"
    ) {
      //DTH
      setDatosSW(AutenticarUsuarioRestRespuesta);

      sessionStorage.setItem(
        "cuenta",
        validarNulosYIndefinidios(
          AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
            .NumeroCuenta
        )
      );
      sessionStorage.setItem(
        "EmailNotif",
        validarNulosYIndefinidios(
          AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
            .EmailNotif
        )
      );
      sessionStorage.setItem(
        "NombreSuscriptor",
        AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
          .NombreSuscriptor
      );
      sessionStorage.setItem(
        "Producto",
        validarNulosYIndefinidios(
          AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
            .Producto
        )
      );
      sessionStorage.setItem(
        "TelCasa",
        validarNulosYIndefinidios(
          AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
            .TelCasa
        )
      );
      sessionStorage.setItem(
        "TelCasaLada",
        validarNulosYIndefinidios(
          AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
            .TelCasaLada
        )
      );
      sessionStorage.setItem(
        "TelMovil",
        validarNulosYIndefinidios(
          AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
            .TelMovil
        )
      );

      sessionStorage.setItem(
        "TipoCuenta",
        validarNulosYIndefinidios(
          AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
            .TipoCuenta
        )
      );
      sessionStorage.setItem(
        "Nombre",
        validarNulosYIndefinidios(
          AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0].Nombre
        )
      );
      sessionStorage.setItem(
        "APaterno",
        validarNulosYIndefinidios(
          AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
            .APaterno
        )
      );
      sessionStorage.setItem(
        "AMaterno",
        validarNulosYIndefinidios(
          AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
            .AMaterno
        )
      );

      sessionStorage.setItem("Usuario", user);

      //Aqui verificamos si tiene sky+ y celular
      let res: any = await getAssetsFromSalesfoce(user, AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
                                                  .NumeroCuenta);


      let flujos = { celular: false, skyplus: false };

      if (res.length > 0) {
        sessionStorage.setItem("assets", JSON.stringify(res));

        res.forEach((element: any) => {
          if (element.Family === "Android TV") {
            flujos.skyplus = true;
          }
          if (element.Family === "Movil") {
            flujos.celular = true;
          }
        });

        res.forEach((item: any) => {
          if (item.Family === "Servicio Base") {
            sessionStorage.setItem("PaqueteSky+", item.Name);
          }
        });

        let dataPrimary: any = await getPrimaryData(user.toLowerCase( ),  AutenticarUsuarioRestRespuesta.ListUsuariosSel.UsuarioSelEBO[0]
        .NumeroCuenta);

        if (
          dataPrimary &&
          dataPrimary !== null &&
          typeof dataPrimary != "undefined"
        ) {
          sessionStorage.setItem("dataPrimary", JSON.stringify(dataPrimary));
          getAccountDetails(dataPrimary.userId);
          sessionStorage.setItem("cuentaSkyPlus", dataPrimary.accountNumber);
          sessionStorage.setItem("userId", dataPrimary.userId);
          setSkyPlus({ estado: true });
        }

        //establecemos banderas para flujos
        if (flujos.skyplus === true && flujos.celular === true) {
          sessionStorage.setItem("flujos", "DTH/SkyCelular/Sky+");
        } else if (flujos.skyplus === true) {
          sessionStorage.setItem("flujos", "DTH/Sky+");
        } else if (flujos.celular === true) {
          sessionStorage.setItem("flujos", "DTH/SkyCelular");
          setSkyCelular({ estado: true });
        }
      } else {
        sessionStorage.setItem("flujos", "DTH");
      }

      doConsultaCuenta(AutenticarUsuarioRestRespuesta);
    } else if (
      AutenticarUsuarioRestRespuesta.EBMHeaderResponse.ErrorNegocio
        .CodigoError == "1"
    ) {
      //Aqui entra solo para SKY+

      let res: any = await getAssetsFromSalesfoce(user, " ");
      sessionStorage.setItem("flujos", "Sky+");
      sessionStorage.setItem("assets", JSON.stringify(res));

      res.forEach((item: any) => {
        if (item.Family === "Servicio Base") {
          sessionStorage.setItem("PaqueteSky+", item.Name);
          sessionStorage.setItem("Producto", item.Name);
        }
      });

      let dataPrimary: any = await getPrimaryData(user, " ");

      if (
        dataPrimary &&
        dataPrimary !== null &&
        typeof dataPrimary != "undefined"
      ) {
        sessionStorage.setItem("dataPrimary", JSON.stringify(dataPrimary));

        sessionStorage.setItem("Nombre", dataPrimary.name);
        let ar = dataPrimary.name.split(" ");
        sessionStorage.setItem("nombre", ar[0]);
        sessionStorage.setItem("cuentaSkyPlus", dataPrimary.accountNumber);
        sessionStorage.setItem("userId", dataPrimary.userId);
        getAccountDetails(dataPrimary.userId);

        sessionStorage.setItem("tipoCliente", "POS"); //revisar con axel
        sessionStorage.setItem("authenticated", "true");
        setSkyPlus({ estado: false });

        isLoading(false);
        //reload()

        doConsultarServiciosCuenta();

        navigate("/inicio");
      } else {
        isLoading(false);
        console.error("NO HAY DATOS PRIMARIOS PARA MOSTRAR");
        setStatus({
          show: true,
          color: "red",
          message:
            "Ocurrió un error con la petición, favor de intentar más tarde",
        });
      }

      //sessionStorage.setItem("dataPrimary", JSON.stringify(dataPrimary));
      //sessionStorage.setItem("Nombre", dataPrimary.name);
      //let ar = dataPrimary.name.split(" ");
      //sessionStorage.setItem("nombre", ar[0]);
      //sessionStorage.setItem("cuentaSkyPlus", dataPrimary.accountNumber);
      //sessionStorage.setItem("userId", dataPrimary.userId);
    } else {
      isLoading(false);
      setStatus({
        show: true,
        color: "red",
        message:
          "Ocurrió un error con la petición, favor de intentar más tarde",
      });
      console.error(AutenticarUsuarioRestRespuesta.EBMHeaderResponse);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const getAccountDetails = async (cuenta: string) => {
    isLoading(true);

    const accountDetailsDO: AccountDetails_Entrada = { userId: cuenta };
    let accountDetailsParametros = AccountDetails_Parametros(accountDetailsDO);

    let accountDetailsRespuesta: AccountDetails_Respuesta = await ConsultaWS(
      accountDetailsParametros
    );

    if (
      accountDetailsRespuesta.errormessage === "Ok" &&
      accountDetailsRespuesta.errorno == 0
    ) {
      sessionStorage.setItem(
        "cuenta",
        accountDetailsRespuesta.Account.Account.AccountNumber
      );

      let date = new Date();
      let cadena = date.toLocaleString();
      let cadenas = cadena.split(",");
      let fechas = cadenas[0].split("/");
      let hora = cadenas[1].split(":");
      sessionStorage.setItem(
        "idSesion",
        fechas[2] +
          fechas[0] +
          fechas[1] +
          hora[0].trimStart() +
          hora[1] +
          hora[2].slice(0, 2) +
          accountDetailsRespuesta.Account.Account.AccountNumber
      );

      sessionStorage.setItem(
        "EmailNotif",
        accountDetailsRespuesta.Account.Contact.Email
      );
      sessionStorage.setItem(
        "TelCasa",
        accountDetailsRespuesta.Account.Contact.Phone
      );

      sessionStorage.setItem(
        "TelCasa",
        accountDetailsRespuesta.Account.Contact.Phone
      );

      sessionStorage.setItem(
        "Nombre",
        accountDetailsRespuesta.Account.Contact.FirstName
      );
      sessionStorage.setItem(
        "APaterno",
        accountDetailsRespuesta.Account.Contact.MiddleName
      );
      sessionStorage.setItem(
        "AMaterno",
        accountDetailsRespuesta.Account.Contact.LastName
      );

      sessionStorage.setItem(
        "StreetAddrCalle",
        accountDetailsRespuesta.Account.Account.Billing.Street
      );
      sessionStorage.setItem(
        "AddrNumNumExt",
        accountDetailsRespuesta.Account.Account.Billing.StreetNumber
      );
      sessionStorage.setItem(
        "ProvinceColonia",
        accountDetailsRespuesta.Account.Account.Billing.District
      );
      sessionStorage.setItem(
        "PrimaryAccountCountry",
        accountDetailsRespuesta.Account.Account.Billing.Country
      );
      if (banderaPais === false) {
        setPais("MEX");
      }
      sessionStorage.setItem(
        "CountyDelMun",
        accountDetailsRespuesta.Account.Account.Billing.Delegation
      );
      sessionStorage.setItem(
        "StateEstado",
        accountDetailsRespuesta.Account.Account.Billing.State
      );
      sessionStorage.setItem(
        "PostalCodeCP",
        accountDetailsRespuesta.Account.Account.Billing.PostalCode
      );

      isLoading(false);
    } else {
      isLoading(false);
    }
  };

  const handleSubmit = async () => {
    setStatus({ show: false, color: "red", message: "" });

    if (user == "" || pwd == "") {
      setStatus({
        show: true,
        color: "red",
        message: "Todos los campos son obligatorios",
      });
      console.error(status.message);
      return;
    } else {
      setStatus({ show: true, color: "red", message: "Validando..." });
      isLoading(true);
      doAutenticarUsuarioRest();
    } //fin de else
  };

  const doConsultarServiciosCuenta = async () => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarServiciosCuentaDO: ConsultarServiciosCuenta_Entrada =
      builtInputVarConsultarServiciosCuentaInput(
        `${sessionStorage.getItem("cuenta")}`
      );
    let par = ConsultarServiciosCuenta_Parametros(ConsultarServiciosCuentaDO);
    let ConsultarServiciosCuentaRespuesta: ConsultarServiciosCuenta_Respuesta =
      await ConsultaWS(par);

    if (
      ConsultarServiciosCuentaRespuesta.EBMHeaderResponse &&
      ConsultarServiciosCuentaRespuesta.EBMHeaderResponse.ErrorNegocio.Estado ==
        "ok" &&
      ConsultarServiciosCuentaRespuesta.EBMHeaderResponse.ErrorTecnico.code ===
        "ok"
    ) {
      sessionStorage.setItem(
        "pais",
        validarNulosYIndefinidios(
          ConsultarServiciosCuentaRespuesta.CuentaSelEBO.Pais
        )
      );

      setPais(ConsultarServiciosCuentaRespuesta.CuentaSelEBO.Pais);

      sessionStorage.setItem(
        "diferenciaGMT",
        validarNulosYIndefinidios(
          ConsultarServiciosCuentaRespuesta.CuentaSelEBO.DiferenciaHoraria
        )
      );
      sessionStorage.setItem(
        "rowId",
        validarNulosYIndefinidios(
          ConsultarServiciosCuentaRespuesta.CuentaSelEBO.RowId
        )
      );
      sessionStorage.setItem(
        "RowIdContacto",
        validarNulosYIndefinidios(
          ConsultarServiciosCuentaRespuesta.CuentaSelEBO.RowId
        )
      );

      sessionStorage.setItem(
        "BanderaNoOPPV",
        validarNulosYIndefinidios(
          ConsultarServiciosCuentaRespuesta.CuentaSelEBO.BanderaNoOPPV
        )
      );
      sessionStorage.setItem(
        "servicios",
        JSON.stringify(
          ConsultarServiciosCuentaRespuesta.ListServicios.ServicioEBO
        )
      );

      let date = new Date();
      let cadena = date.toLocaleString();
      let cadenas = cadena.split(",");
      let fechas = cadenas[0].split("/");
      let hora = cadenas[1].split(":");
      sessionStorage.setItem(
        "idSesion",
        fechas[2] +
          fechas[0] +
          fechas[1] +
          hora[0].trimStart() +
          hora[1] +
          hora[2].slice(0, 2) +
          sessionStorage.getItem("cuenta")
      );

      doConsultarIRD(ConsultarServiciosCuentaRespuesta.CuentaSelEBO.RowId);
    } else {
      console.error(ConsultarServiciosCuentaRespuesta.EBMHeaderResponse);
      isLoading(false);
      setStatus({
        show: true,
        color: "red",
        message:
          "Ocurrió un error con la petición, favor de intentar más tarde",
      });
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const doConsultarIRD = async (param: string) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarIRDDO: ConsultarIRD_Entrada = { RowID: `${param}` };
    let ConsultarIRDPar = ConsultarIRD_Parametros(ConsultarIRDDO);

    let ConsultarIRDRespuesta: ConsultarIRD_Respuesta = await ConsultaWS(
      ConsultarIRDPar
    );

    if (
      ConsultarIRDRespuesta.Tarjeta &&
      ConsultarIRDRespuesta.Tarjeta.length > 0
    ) {
      sessionStorage.setItem(
        "tarjetas",
        JSON.stringify(ConsultarIRDRespuesta.Tarjeta)
      );
      obtenerTIMaster(ConsultarIRDRespuesta.Tarjeta);
      //reload()

      navigate("/inicio");
      isLoading(false);
    } else {
      setStatus({
        show: true,
        color: "red",
        message:
          "Ocurrió un error con la petición, favor de intentar más tarde",
      });
      console.error("Se sigue el flujo pero sin tarjetas");

      navigate("/inicio");
      isLoading(false);
    }
  };

  const obtenerTIMaster = (p_Tarjeta: Tarjeta[]) => {
    for (let index = 0; index < p_Tarjeta.length; index++) {
      if (p_Tarjeta[index].Jerarquia === "Master") {
        sessionStorage.setItem(
          "tarjetaMaster",
          JSON.stringify(p_Tarjeta[index])
        );
        break;
      }
    }
  };

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter") {
      handleSubmit();
    }
  };

  const getLocation = async () => {
    const API_URL = `https://geolocation-db.com/json/`;
    axios
      .get(API_URL)
      .then(function (response) {
        sessionStorage.setItem(
          "IPv4",
          validarNulosYIndefinidios(response.data.IPv4)
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Container className={styles.container}>
        {loading === true ? <BarraLoader /> : <></>}

        <Row className={styles["rowContainer"]}>
          <Col
            xs={12}
            sm={12}
            md={7}
            lg={7}
            xl={7}
            className={styles["loginForm"]}
          >
            <Form className={styles.estiloForm}>
              <img src={imagenURI} className={styles.logo} />
              <hr className={styles["line"]} />
              <Row>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    paddingRight: "0px",
                  }}
                >
                   <Button className={styles.botonSwitchActivo}>
                    Tengo otros productos Sky
                  </Button>
                  
                </Col>
                <Col style={{ paddingLeft: "0px" }}>
                 
                  <Button className={styles.botonSwitchInactivo}>
                    <a
                      href="https://miespaciosky.sky.com.mx"
                      className={styles.enlace}
                    >
                      Tengo Sky Satelital
                    </a>
                  </Button>
                </Col>
              </Row>
              <Form.Group
                className={styles.label + " mb-4 mt-4 " + styles.hiContainer}
              >
                <h1
                  style={{ marginBottom: "0px" }}
                  className={styles.estiloLabelCenter}
                >
                  ¡Hola de nuevo!
                </h1>
              </Form.Group>
              <Form.Group
                className={styles.label + " mb-3"}
                controlId="formBasicEmail"
              >
                <Form.Label
                  style={{ marginBottom: "0px" }}
                  className={styles.estiloLabels}
                >
                  E-mail
                </Form.Label>

                <Form.Control
                  type="email"
                  placeholder="usuario@sky.com.mx"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="pwdGroup">
                <Form.Label> Contraseña</Form.Label>

                <InputGroup className="mb-3">
                  <Form.Control
                    type={typePwd}
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Contraseña"
                    className={styles["formPasswordText"]}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon1"
                    className={styles["formPasswordButton"]}
                    onClick={handleShowNumber}
                  >
                    {typePwd === "password" ? (
                      <RxEyeClosed />
                    ) : (
                      <MdRemoveRedEye />
                    )}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Row>
                <Col className={styles["buttonContainer"]}>
                  <Button
                    variant="btn btn-primary"
                    className={styles.boton}
                    onClick={handleSubmit}
                  >
                    Ingresar
                  </Button>
                </Col>
              </Row>

              {status.show && (
                <p style={{ color: status.color }}>{status.message}</p>
              )}
            </Form>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
            className={styles["imageContainer"]}
          >
            <img src={sideImage} className={styles["sideImage"]} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

function toBase64(arg0: string) {
  throw new Error("Function not implemented.");
}
function getSalesforceToken() {
  throw new Error("Function not implemented.");
}

function doPrimaryData(retorno: string) {
  throw new Error("Function not implemented.");
}
