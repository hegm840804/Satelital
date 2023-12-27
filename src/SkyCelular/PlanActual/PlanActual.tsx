import styles from "./PlanActual.module.css";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import {
  ConsultarBalanceOferta_Respuesta,
  ConsultarBalanceOferta_Parametros,
  ConsultarBalanceOferta_entrada,
  ConsultarBalanceOfertaInput,
  Bolsa,
} from "../../Commons/Services/ConsultarBalanceOferta2";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import { tokenSalesForceParametros } from "../../Commons/ConfigRed";

import PlanActualContenedorInternet from "./Detalle/PlanActualContenedorInternet";
import PlanActualContenedorTelefonia from "./Detalle/PlanActualContenedorTelefonia";

import {
  builtGetToken4SkyCelularEntrada,
  GetToken4SkyCelular_Entrada,
  GetToken4SkyCelular_Parametros,
  GetToken4SkyCelular_Respuesta,
} from "../../Commons/Services/GetToken4SkyCelular";

import {
  builtGetPrimaryData4SkyCelularEntrada,
  GetPrimaryData4SkyCelular_Entrada,
  GetPrimaryData4SkyCelular_Parametros,
  GetPrimaryData4SkyCelular_Respuesta,
} from "../../Commons/Services/GetPrimaryData4SkyCelular";

import {
  builtGetAssets4SkyCelularEntrada,
  GetAssets4SkyCelular_Entrada,
  GetAssets4SkyCelular_Parametros,
  GetAssets4SkyCelular_Respuesta,
} from "../../Commons/Services/GetAssets4SkyCelular";

import Loading from "../../General/Loading";
import PlanActualContenedorTelefoniaCard from "./Detalle/PlanActualContenedorTelefoniaCard";

export const PlanActual = () => {
  const [bolsaArray, setbolsaArray] = useState<Bolsa[]>([]);
  const [bolsaPrincipal, setBolsaPrincipal] = useState("");
  const [banderaDatosRecuperados, setbanderaDatosRecuperados] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [banderaInternetInfo, setbanderaInternetInfo] = useState(false);
  const [banderaTelefoniaInfo, setbanderaTelefoniaInfo] = useState(false);
  const [arregloLocalInternetService, setArregloLocalInternetService] =
    useState<any[]>([]);
  const [arregloLocalCelularService, setArregloLocalCelularService] = useState<
    any[]
  >([]);

  const [loading, isLoading] = useState(false);

  useEffect(() => {
    doObtenerToken();
    //doObtieneBolsas("9901000034")
  }, []);

  const doObtieneBolsas = async (param1: string) => {
    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarBalanceOfertaDO: ConsultarBalanceOferta_entrada =
      ConsultarBalanceOfertaInput(param1); //    {NumeroCuenta:};
    let par = ConsultarBalanceOferta_Parametros(ConsultarBalanceOfertaDO);

    let ConsultarBalanceOfertaRespuesta: ConsultarBalanceOferta_Respuesta =
      await ConsultaWS(par);

    const retorno =
      ConsultarBalanceOfertaRespuesta.SC_INT_AS_ConsultaConsumoDatos_Salida
        .CABECERA.COD_ERROR;

    if (retorno == "" || retorno == null || retorno == "0") {
      setbanderaDatosRecuperados(true);
      setbolsaArray(
        ConsultarBalanceOfertaRespuesta.SC_INT_AS_ConsultaConsumoDatos_Salida
          .ListaBolsas.Bolsas
      );

      setBolsaPrincipal(
        ConsultarBalanceOfertaRespuesta.SC_INT_AS_ConsultaConsumoDatos_Salida
          .ListaBolsas.Bolsas[0].Nombre_Bolsa
      );
    } else {
      setbanderaDatosRecuperados(false);
    }
    isLoading(false);
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const doObtenerActivos = async (param1: string, param2: string) => {
    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const GetAssets4SkyCelularDo: GetAssets4SkyCelular_Entrada =
      builtGetAssets4SkyCelularEntrada(param2, param1);
    let GetAssets4SkyCelularParametros = GetAssets4SkyCelular_Parametros(
      GetAssets4SkyCelularDo
    );
    let GetAssets4SkyCelularRespuesta: GetAssets4SkyCelular_Respuesta =
      await ConsultaWS(GetAssets4SkyCelularParametros);

    if (
      GetAssets4SkyCelularRespuesta.Assets &&
      GetAssets4SkyCelularRespuesta.Assets.length > 0
    ) {
      var MiArregloAssets: any[] = GetAssets4SkyCelularRespuesta.Assets;

      MiArregloAssets.map((item, index) => {
        //Movil "Internet"
        //const [arregloLocalInternetService, setArregloLocalInternetService] = useState<any[]>([]);
        //const [arregloLocalCelularService, setArregloLocalCelularService] = useState<any[]>([]);

        if (item.Family === "Movil") {
          arregloLocalCelularService.push(item);
          setbanderaTelefoniaInfo(true);
        } else if (item.Family === "Internet") {
          setbanderaInternetInfo(true);
          arregloLocalInternetService.push(item);
        } else {
          setbanderaTelefoniaInfo(false);
          setbanderaInternetInfo(false);
        }
      });
    } else {
      console.error("Error al obtener los activos");
      console.error(GetAssets4SkyCelularRespuesta.errorno);
      console.error(GetAssets4SkyCelularRespuesta.errormessage);
    }
    isLoading(false);
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const doPrimaryData = async (param1: string) => {
    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const GetPrimaryData4SkyCelularDO: GetPrimaryData4SkyCelular_Entrada =
      builtGetPrimaryData4SkyCelularEntrada(
        `${sessionStorage.getItem("Usuario")}`,
        //"skycelhfyryrh1222@yopmail.com",
        //"501284897292",
        `${sessionStorage.getItem("cuentaSkyPlus")}`,
        param1
      );
    let GetPrimaryData4SkyCelularParametros =
      GetPrimaryData4SkyCelular_Parametros(GetPrimaryData4SkyCelularDO);
    let GetPrimaryData4SkyCelularRespuesta: GetPrimaryData4SkyCelular_Respuesta =
      await ConsultaWS(GetPrimaryData4SkyCelularParametros);

    if (
      GetPrimaryData4SkyCelularRespuesta.result &&
      GetPrimaryData4SkyCelularRespuesta.result != null
    ) {
      const retorno = GetPrimaryData4SkyCelularRespuesta.result.accountId;

      if (retorno == "" || retorno == null || retorno.length == 0) {
        setbanderaDatosRecuperados(false);
      } else {
        setbanderaDatosRecuperados(true);
        doObtenerActivos(param1, retorno);
      }
    } else {
      console.error("Error al obtener Datos primarios");
      console.error(GetPrimaryData4SkyCelularRespuesta.errormessage);
      console.error(GetPrimaryData4SkyCelularRespuesta.errorno);
    }

    //----------------------------------------------------------------------------------------------------------------------------
    isLoading(false);
  };

  const doObtenerToken = async () => {
    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const GetToken4SkyCelularDO: GetToken4SkyCelular_Entrada =
      builtGetToken4SkyCelularEntrada(
        tokenSalesForceParametros.client_id,
        tokenSalesForceParametros.client_secret,
        tokenSalesForceParametros.username,
        tokenSalesForceParametros.password
      );
    let GetToken4SkyCelularParametros = GetToken4SkyCelular_Parametros(
      GetToken4SkyCelularDO
    );

    let GetToken4SkyCelularRespuesta: GetToken4SkyCelular_Respuesta =
      await ConsultaWS(GetToken4SkyCelularParametros);

    if (
      GetToken4SkyCelularRespuesta.access_token &&
      GetToken4SkyCelularRespuesta.access_token != "" &&
      GetToken4SkyCelularRespuesta.access_token != null
    ) {
      const retorno = GetToken4SkyCelularRespuesta.access_token;

      if (retorno == "" || retorno == null || retorno.length == 0) {
        setbanderaDatosRecuperados(false);
      } else {
        setbanderaDatosRecuperados(true);
        doPrimaryData(retorno);
      }
    } else {
      console.error("Error al obtener el token");
      console.error(GetToken4SkyCelularRespuesta.EBMHeaderResponse);
    }

    //----------------------------------------------------------------------------------------------------------------------------
    isLoading(false);
  };

  const getInformacionAmenidadesContratas = (
    param1: string,
    param2: string
  ) => {
    if (param1 == "999999999") {
      return "Ilimitado";
    } else if (param1 == "953.67") {
      return "Ilimitado";
    } else {
      return param1 + " " + param2;
    }
  };

  const getInformacionAmenidadesGastadas = (
    param1: string,
    param2: string,
    param3: string,
    param4: string
  ) => {
    if (param3 == "999999999") {
      return "";
    } else if (param3 == "953.67") {
      return "";
    } else {
      return `Has usado ${
        param1 + " " + param2
      } de ${getInformacionAmenidadesContratas(param3, param4)}`;
    }
  };

  return (
    <>
      <Loading isLoading={loading} />
      <Container className={styles["contenedorCabecera"]} fluid>
        <h1 className={styles["spectrum"]}>
          <span className="textoSpectrum">Conoce tu plan actual</span>
        </h1>
        <p className={styles["subtituloGeneral"]}>
          Revisa todo lo que te ofrece tu plan celular actual.
        </p>
      </Container>

      <PlanActualContenedorTelefonia
        banderaTelefoniaInfo={banderaTelefoniaInfo}
        arregloLocalCelularService={arregloLocalCelularService}
        bolsaPrincipal={bolsaPrincipal}
        telefono={telefono}
      />
    </>
  );
};
