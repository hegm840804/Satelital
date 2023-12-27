import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import styles from "./ModalPospagoConTarjeta.module.css";
import React, { useState, useEffect } from "react";
import {
  ConsultarServiciosCuenta_Respuesta,
  ConsultarServiciosCuenta_Parametros,
  builtInputVarConsultarServiciosCuentaInput,
  ConsultarServiciosCuenta_Entrada,
} from "../../Commons/Services/ConsultarServiciosCuentaRest";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import {
  DeterminarComercio_Respuesta,
  DeterminarComercio_Parametros,
  builtInputVarDeterminarComercioInput,
  DeterminarComercio_Entrada,
} from "../../Commons/Services/GwDeterminarComercioEBS";
import {
  ConsultarBines_Respuesta,
  ConsultarBines_Parametros,
  ConsultarBines_Entrada,
} from "../../Commons/Services/GwConsultarBinesEBS";
import {
  GenerarIdentificadorUnicoDePago_Respuesta,
  GenerarIdentificadorUnicoDePago_Parametros,
  GenerarIdentificadorUnicoDePago_Entrada,
  builtInputVarGenerarIdentificadorUnicoDePagoInput,
} from "../../Commons/Services/GwGenerarIdentificadorUnicoDePagoEBS";
import ConfirmMessage2 from "../../General/ConfirmMessage2";
import {
  EvaluarRiesgo_Respuesta,
  EvaluarRiesgo_Parametros,
  EvaluarRiesgo_Entrada,
  builtEvaluarRiesgo_Entrada,
  buildNumberAndValuerparams,
  DatosComerciante,
  builtDatosComerciante,
  DatosTarjeta,
  builtDatosTarjeta,
  ComercioInfo,
  builtComercioInfo,
  InstrumentoDePago,
  builtInstrumentoDePago,
  PagoInfo,
  builtPagoInfo,
  DireccionFacturacion,
  builtDireccionFacturacion,
  DetalleMonto,
  builtDetalleMonto,
  OrdenInfo,
  builtOrdenInfo,
  SubComercianteInfo,
  builtSubComercianteInfo,
  AgregadorDePagoInfo,
  builtAgregadorDePagoInfo,
} from "../../Commons/Services/GwEvaluarRiesgoEBS";
import {
  ActualizarBilletera_Respuesta,
  ActualizarTDCBilletera_Parametros,
  ActualizarTDCBilletera_Entrada,
  builtActualizarTDCBilleteraInput,
} from "../../Commons/Services/GwActualizarTDCBilleteraEBS";
import {
  ConsultarTipoCambio_Respuesta,
  ConsultarTipoCambio_Parametros,
  ConsultarTipoCambio_Entrada,
  ConsultarTipoCambioInput,
} from "../../Commons/Services/GwConsultarTipoCambioEBS";
import {
  OrquestarProcesoPago_Respuesta,
  OrquestarProcesoPago_Input,
  OrquestarProcesoPago_Parametros,
  OrquestarProcesoPago_Entrada,
} from "../../Commons/Services/GwOrquestarProcesoPagoPMPEBF";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import { ConsultarBilletera_Info } from "../../Commons/Services/GwConsultarBilleteraEBF";
import CardGallery from "./items/CardGallery";

import {
  builtGwGenerarJWTokenEBSEntrada,
  GwGenerarJWTokenEBS_Entrada,
  GwGenerarJWTokenEBS_Parametros,
  GwGenerarJWTokenEBS_Respuesta,
} from "../../Commons/Services/GwGenerarJWTokenEBS";
import { determinaMoneda } from "../../Utils/Monedas";
import { Tarjeta } from "../../Commons/Services/ConsultarIRD";

const ModalPospagoConTarjeta = (props: any) => {
  const { allItCards, saldoAPagar, fechaLimite, origen }: any = { ...props };
  const [isPaymentPrcessOn, setIsPaymentPrcessOn] = useState(false);
  const [myInputCVV, setMyInputCVV] = useState("");
  const [cleanCVV, setCleanCVV] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("OK");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [changeCardClicked, setChangeCardClicked] = useState(false);
  const [confirmPaymentClicked, setConfirmPaymentClicked] = useState(false);
  const [otherQuantity, setOtherQuantity] = useState("");
  const [initialPositionArray, setInitialPositionArray] = useState(0);
  const [initialPositionArrayBKP, setInitialPositionArrayBKP] = useState(0);
  const [uuidValue, setUuidValue] = useState(0);
  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));
  const [moneda, setMoneda] = useState(
    determinaMoneda(
      sessionStorage.getItem("pais")!,
      sessionStorage.getItem("flujos")!
    )
  );

  const myCuenta =
    flujo === "Sky+"
      ? sessionStorage.getItem("cuentaSkyPlus")!
      : sessionStorage.getItem("cuenta")!;

  useEffect(() => {
    setInitialPositionArray(0);
    setOtherQuantity("");
    setMyInputCVV("");
  }, []);

  const doConfirmPaymentCard = async (p_card: ConsultarBilletera_Info) => {
    var datosFlag = doValidacionesDatos(p_card);

    if (datosFlag) {
      var longitudesFlag = doValidacionesLogitudes(p_card);
      if (longitudesFlag) {
        setConfirmPaymentClicked(true);
      }
    }
  };

  const doPaymentCard = async (p_card: ConsultarBilletera_Info) => {
    setIsLoading(true);
    setIsPaymentPrcessOn(true);
    //1 determinarcomercio
    doDeterminarComercio(p_card).then((determinarComercioRet) => {
      if (determinarComercioRet != null) {
        //2 consultar bines
        doConsultarBines(p_card).then((consultarBinesRet) => {
          if (consultarBinesRet != null) {
            //3 vincular uuid
            doVincularUUID();
            //4 generar identificador unico de pago
            doGenerarIdentificadorUnicoDePago(consultarBinesRet!).then(
              (generarIdentificadorUnicoDePagoRet) => {
                if (generarIdentificadorUnicoDePagoRet != null) {
                  //5 evaluar riesgo
                  doEvaluarRiesgo(
                    determinarComercioRet!,
                    generarIdentificadorUnicoDePagoRet!,
                    p_card
                  ).then((evaluarRiesgoRet) => {
                    if (evaluarRiesgoRet != null) {
                      //6 guardar evaluacion actualizar billetera
                      doActualizarBilletera(evaluarRiesgoRet!, p_card).then(
                        (actualizarBilleteraRet) => {
                          if (actualizarBilleteraRet != null) {
                            //7 tipo de cambio
                            doConsultarTipoCambio(p_card).then(
                              (consultartipocambioret) => {
                                if (consultartipocambioret != null) {
                                  //8 ConsultarServiciosCuenta
                                  doConsultarServiciosCuentaRest().then(
                                    (consultarServicioCUentaRet) => {
                                      if (consultarServicioCUentaRet != null) {
                                        //9 orquestar proceso pago
                                        doOrquestarPago(
                                          determinarComercioRet!,
                                          consultarBinesRet!,
                                          generarIdentificadorUnicoDePagoRet!,
                                          consultartipocambioret!,
                                          consultarServicioCUentaRet!,
                                          p_card
                                        ).then((OrquestarPagoRet) => {
                                          if (OrquestarPagoRet != null) {
                                            setIsLoading(false);
                                            setIsPaymentPrcessOn(false);
                                            //var orquestarProcesoPagoResponseVar = orquestarProcesoPagoResponse as any;
                                            let Mensaje =
                                              OrquestarPagoRet!
                                                .EBMHeaderResponse.ErrorNegocio
                                                .DescripcionError +
                                              ", Numero de Autorización: " +
                                              OrquestarPagoRet!
                                                .RespuestaPagoTarjeta
                                                .numeroAutorizacionPago +
                                              " Numero de Referencia de Pago: " +
                                              OrquestarPagoRet!
                                                .RespuestaPagoTarjeta
                                                .numeroReferenciaPago;
                                            setChangeCardClicked(false);
                                            setConfirmPaymentClicked(false);
                                            setInitialPositionArray(0);
                                            setInitialPositionArrayBKP(0);
                                            setMyInputCVV("");
                                            setOtherQuantity("");
                                            props.onHide(
                                              { action: "terminar" },
                                              Mensaje
                                            );
                                          } else {
                                            let Mensaje =
                                              "Error en el flujo, favor de revisar consola del navegador para detalle";
                                            props.onHide(
                                              { action: "error" },
                                              Mensaje
                                            );
                                          }
                                        });
                                      } else {
                                        let Mensaje =
                                          "Error en el flujo, favor de revisar consola del navegador para detalle";
                                        props.onHide(
                                          { action: "error" },
                                          Mensaje
                                        );
                                      }
                                    }
                                  );
                                } else {
                                  let Mensaje =
                                    "Error en el flujo, favor de revisar consola del navegador para detalle";
                                  props.onHide({ action: "error" }, Mensaje);
                                }
                              }
                            );
                          } else {
                            let Mensaje =
                              "Error en el flujo, favor de revisar consola del navegador para detalle";
                            props.onHide({ action: "error" }, Mensaje);
                          }
                        }
                      );
                    } else {
                      let Mensaje =
                        "Error en el flujo, favor de revisar consola del navegador para detalle";
                      props.onHide({ action: "error" }, Mensaje);
                    }
                  });
                } else {
                  let Mensaje =
                    "Error en el flujo, favor de revisar consola del navegador para detalle";
                  props.onHide({ action: "error" }, Mensaje);
                }
              }
            );
          } else {
            let Mensaje =
              "Error en el flujo, favor de revisar consola del navegador para detalle";
            props.onHide({ action: "error" }, Mensaje);
          }
        });
      } else {
        let Mensaje =
          "Error en el flujo, favor de revisar consola del navegador para detalle";
        props.onHide({ action: "error" }, Mensaje);
      }
    });
  };

  const dochallengeStepOne = async (
    p_determinarcomercio: DeterminarComercio_Respuesta,
    p_identificadorunicopago: GenerarIdentificadorUnicoDePago_Respuesta,
    p_tarjeta: ConsultarBilletera_Info
  ) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const GwGenerarJWTokenEBSEntrada: GwGenerarJWTokenEBS_Entrada =
      builtGwGenerarJWTokenEBSEntrada(
        p_determinarcomercio?.BilleteraComercioCollection.BilleteraComercio[0]
          .mid!,
        p_identificadorunicopago?.Salida_Process.IdPagoSKY!,
        p_tarjeta.PaymentInstrument
      );
    let GwGenerarJWTokenEBSParametros = GwGenerarJWTokenEBS_Parametros(
      GwGenerarJWTokenEBSEntrada
    );
    console.log("FFOP_______________________________________________");
    console.log(GwGenerarJWTokenEBSParametros);
    let respuesta: GwGenerarJWTokenEBS_Respuesta = await ConsultaWS(
      GwGenerarJWTokenEBSParametros
    );
    console.log(respuesta);
    //----------------------------------------------------------------------------------------------------------------------------
  };

  //1111111111111111111111
  const doDeterminarComercio = async (p_card: ConsultarBilletera_Info) => {
    try {
      //var myLocalSelectedCardVar = mySelectedCard as any;

      //----------------------------------------------------------------------------------------------------------------------------
      const DeterminarComercioDO: DeterminarComercio_Entrada =
        builtInputVarDeterminarComercioInput(
          `${p_card.CodPais}`,
          "SEL",
          `${p_card.TipoTarjeta}`,
          "N"
        );
      let par = DeterminarComercio_Parametros(DeterminarComercioDO);
      let DeterminarComercioRespuesta: DeterminarComercio_Respuesta =
        await ConsultaWS(par);
      if (
        DeterminarComercioRespuesta.EBMHeaderResponse &&
        DeterminarComercioRespuesta.EBMHeaderResponse.ErrorNegocio.Estado ==
          "ok" &&
        DeterminarComercioRespuesta.EBMHeaderResponse.ErrorTecnico.code ===
          "ok" &&
        DeterminarComercioRespuesta.BilleteraComercioCollection
          .BilleteraComercio &&
        DeterminarComercioRespuesta.BilleteraComercioCollection
          .BilleteraComercio != null &&
        DeterminarComercioRespuesta.BilleteraComercioCollection
          .BilleteraComercio.length > 0 &&
        typeof DeterminarComercioRespuesta.BilleteraComercioCollection
          .BilleteraComercio != "undefined"
      ) {
        return DeterminarComercioRespuesta;
      } else {
        console.error(
          "Error al ejecutar el servicio " +
            DeterminarComercioRespuesta.EBMHeaderResponse
        );
        setIsLoading(false);
        setIsPaymentPrcessOn(false);
        return null;
      }
      //----------------------------------------------------------------------------------------------------------------------------
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsPaymentPrcessOn(false);
      return null;
    }
  };

  const doConsultarBines = async (p_card: ConsultarBilletera_Info) => {
    try {
      const ConsultarBinesDO: ConsultarBines_Entrada = {
        CardBIN: `${p_card.MaskedPan.substring(0, 6)}`,
        CardNumber: "",
        CountryCode: `${p_card.CodPais}`,
      };
      let par = ConsultarBines_Parametros(ConsultarBinesDO);
      let ConsultarBinesRespuesta: ConsultarBines_Respuesta = await ConsultaWS(
        par
      );
      if (
        ConsultarBinesRespuesta.EBMHeaderResponse &&
        ConsultarBinesRespuesta.EBMHeaderResponse.ErrorNegocio.Estado == "ok" &&
        ConsultarBinesRespuesta.EBMHeaderResponse.ErrorTecnico.code === "ok" &&
        ConsultarBinesRespuesta.ClasificacionesLlamada.ClearingHouse &&
        ConsultarBinesRespuesta.ClasificacionesLlamada.ClearingHouse != null &&
        typeof ConsultarBinesRespuesta.ClasificacionesLlamada.ClearingHouse !=
          "undefined"
      ) {
        return ConsultarBinesRespuesta;
      } else {
        console.error(
          "Error al ejecutar el servicio " +
            ConsultarBinesRespuesta.EBMHeaderResponse
        );
        setIsLoading(false);
        setIsPaymentPrcessOn(false);
        return null;
      }
      //----------------------------------------------------------------------------------------------------------------------------
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsPaymentPrcessOn(false);
      return null;
    }
  };

  const doVincularUUID = () => {
    setUuidValue(Math.random());
  };

  const doGenerarIdentificadorUnicoDePago = async (
    p_consultarbines: ConsultarBines_Respuesta
  ) => {
    try {
      const GenerarIdentificadorUnicoDePagoDO: GenerarIdentificadorUnicoDePago_Entrada =
        builtInputVarGenerarIdentificadorUnicoDePagoInput(
          `${p_consultarbines.ClasificacionesLlamada.ClearingHouse}`,
          `${sessionStorage.getItem("cuenta")}`,
          "PAGO",
          "SEL"
        );
      let par = GenerarIdentificadorUnicoDePago_Parametros(
        GenerarIdentificadorUnicoDePagoDO
      );
      let GenerarIdentificadorUnicoDePagoRespuesta: GenerarIdentificadorUnicoDePago_Respuesta =
        await ConsultaWS(par);

      if (
        GenerarIdentificadorUnicoDePagoRespuesta.EBMHeaderResponse &&
        GenerarIdentificadorUnicoDePagoRespuesta.EBMHeaderResponse.ErrorNegocio
          .Estado == "ok" &&
        GenerarIdentificadorUnicoDePagoRespuesta.EBMHeaderResponse.ErrorTecnico
          .code === "ok" &&
        GenerarIdentificadorUnicoDePagoRespuesta.Salida_Process.IdPagoSKY &&
        GenerarIdentificadorUnicoDePagoRespuesta.Salida_Process.IdPagoSKY !=
          null &&
        typeof GenerarIdentificadorUnicoDePagoRespuesta.Salida_Process
          .IdPagoSKY != "undefined"
      ) {
        return GenerarIdentificadorUnicoDePagoRespuesta;
      } else {
        console.error(
          "Error al ejecutar el servicio " +
            GenerarIdentificadorUnicoDePagoRespuesta.EBMHeaderResponse
        );
        setIsLoading(false);
        setIsPaymentPrcessOn(false);
        return null;
      }
      //----------------------------------------------------------------------------------------------------------------------------
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsPaymentPrcessOn(false);
      return null;
    }
  };

  const doEvaluarRiesgo = async (
    p_determinarComercio: DeterminarComercio_Respuesta,
    p_generaridentificador: GenerarIdentificadorUnicoDePago_Respuesta,
    p_card: ConsultarBilletera_Info
  ) => {
    try {
      const datosTarjeta: DatosTarjeta = builtDatosTarjeta(
        "", //mes
        "", //año
        "", //tipo tarjeta
        "" //numero
      );

      const instrumentoDePago: InstrumentoDePago = builtInstrumentoDePago(
        `${p_card.PaymentInstrument}`
      );

      const pagoInfo: PagoInfo = builtPagoInfo(datosTarjeta, instrumentoDePago);
      //
      const direccionFacturacion: DireccionFacturacion =
        builtDireccionFacturacion(
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        );
      var cantidadNueva = !(otherQuantity.length < 1)
        ? otherQuantity
        : saldoAPagar;
      const detallesCantidad: DetalleMonto = builtDetalleMonto(
        erraseCommaCharacter(cantidadNueva),
        `${p_determinarComercio.BilleteraComercioCollection.BilleteraComercio[0].monedaIso}`
      );

      const ordenInfo: OrdenInfo = builtOrdenInfo(
        direccionFacturacion,
        detallesCantidad
      );

      const subComercianteInfo: SubComercianteInfo = builtSubComercianteInfo(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      );
      //
      const agregadorDePagoInfo: AgregadorDePagoInfo = builtAgregadorDePagoInfo(
        "",
        "",
        subComercianteInfo
      );
      let codigoSkyDM =
        p_generaridentificador.Salida_Process.IdPagoSKY.replaceAll(
          "PAGO",
          "DM"
        );
      const comercioInfo: ComercioInfo = builtComercioInfo(
        p_determinarComercio.BilleteraComercioCollection.BilleteraComercio[0]
          .mid,
        codigoSkyDM,
        "",
        "internet"
      );

      const EvaluarRiesgoDO: EvaluarRiesgo_Entrada = builtEvaluarRiesgo_Entrada(
        comercioInfo,
        agregadorDePagoInfo,
        ordenInfo,
        pagoInfo,
        builtDatosComerciante(
          buildNumberAndValuerparams(
            `${p_determinarComercio.BilleteraComercioCollection.BilleteraComercio[0].afiliacion}`
          )
        ),
        `${sessionStorage.getItem("IPv4")}`,
        `${sessionStorage.getItem("idSesion")}`
      );

      let par = EvaluarRiesgo_Parametros(EvaluarRiesgoDO);

      let EvaluarRiesgoRespuesta: EvaluarRiesgo_Respuesta = await ConsultaWS(
        par
      );

      if (
        EvaluarRiesgoRespuesta.EBMHeaderResponse &&
        EvaluarRiesgoRespuesta.EBMHeaderResponse.ErrorNegocio.Estado == "ok" &&
        EvaluarRiesgoRespuesta.EBMHeaderResponse.ErrorTecnico.code === "0" &&
        EvaluarRiesgoRespuesta.EstatusRiesgo &&
        EvaluarRiesgoRespuesta.EstatusRiesgo != null &&
        typeof EvaluarRiesgoRespuesta.EstatusRiesgo != "undefined" &&
        EvaluarRiesgoRespuesta.FechaTransaccionUTC &&
        EvaluarRiesgoRespuesta.FechaTransaccionUTC != null &&
        typeof EvaluarRiesgoRespuesta.FechaTransaccionUTC != "undefined"
      ) {
        return EvaluarRiesgoRespuesta;
      } else {
        console.error(
          "Error al ejecutar el servicio " +
            EvaluarRiesgoRespuesta.EBMHeaderResponse
        );
        setIsLoading(false);
        setIsPaymentPrcessOn(false);
        return null;
      }
      //---------------------------------------------------------------------------------------------------------------------------
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsPaymentPrcessOn(false);
      return null;
    }
  };

  const doActualizarBilletera = async (
    p_evaluarriesgo: EvaluarRiesgo_Respuesta,
    p_card: ConsultarBilletera_Info
  ) => {
    try {
      const ActualizarTDCBilleteraDO: ActualizarTDCBilletera_Entrada =
        builtActualizarTDCBilleteraInput(
          `${p_card.Id}`,
          `${p_card.PaymentInstrument}`,
          "",
          `${sessionStorage.getItem("cuenta")}`,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          `${p_evaluarriesgo.EstatusRiesgo}`,
          `${p_evaluarriesgo.FechaTransaccionUTC}`,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        );
      let par = ActualizarTDCBilletera_Parametros(ActualizarTDCBilleteraDO);

      let ActualizarBilleteraRespuesta: ActualizarBilletera_Respuesta =
        await ConsultaWS(par);

      if (
        ActualizarBilleteraRespuesta.EBMHeaderResponse &&
        ActualizarBilleteraRespuesta.EBMHeaderResponse.ErrorNegocio.Estado ==
          "ok" &&
        ActualizarBilleteraRespuesta.EBMHeaderResponse.ErrorTecnico.code ===
          "ok"
      ) {
        return ActualizarBilleteraRespuesta;
      } else {
        console.error(
          "Error al ejecutar el servicio " +
            ActualizarBilleteraRespuesta.EBMHeaderResponse
        );
        setIsLoading(false);
        setIsPaymentPrcessOn(false);
        return null;
      }
      //----------------------------------------------------------------------------------------------------------------------------
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsPaymentPrcessOn(false);
      return null;
    }
  };

  const doConsultarTipoCambio = async (p_card: ConsultarBilletera_Info) => {
    try {
      const ConsultarTipoCambioDO: ConsultarTipoCambio_Entrada =
        ConsultarTipoCambioInput("1", `${p_card.CodPais}`);
      let par = ConsultarTipoCambio_Parametros(ConsultarTipoCambioDO);

      let ConsultarTipoCambioRespuesta: ConsultarTipoCambio_Respuesta =
        await ConsultaWS(par);

      if (
        ConsultarTipoCambioRespuesta.EBMHeaderResponse &&
        ConsultarTipoCambioRespuesta.EBMHeaderResponse.ErrorNegocio.Estado ==
          "ok" &&
        ConsultarTipoCambioRespuesta.EBMHeaderResponse.ErrorTecnico.code ===
          "ok" &&
        ConsultarTipoCambioRespuesta.BilleteraTipoCambioCollection
          .BilleteraTipoCambio &&
        ConsultarTipoCambioRespuesta.BilleteraTipoCambioCollection
          .BilleteraTipoCambio != null &&
        ConsultarTipoCambioRespuesta.BilleteraTipoCambioCollection
          .BilleteraTipoCambio.length > 0 &&
        typeof ConsultarTipoCambioRespuesta.BilleteraTipoCambioCollection
          .BilleteraTipoCambio != "undefined"
      ) {
        return ConsultarTipoCambioRespuesta;
      } else {
        console.error(
          "Error al ejecutar el servicio " +
            ConsultarTipoCambioRespuesta.EBMHeaderResponse
        );
        setIsLoading(false);
        setIsPaymentPrcessOn(false);
        return null;
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsPaymentPrcessOn(false);
      return null;
    }
  };

  const doConsultarServiciosCuentaRest = async () => {
    if (flujo !== "Sky+") {
      try {
        const ConsultarServiciosCuentaDO: ConsultarServiciosCuenta_Entrada =
          builtInputVarConsultarServiciosCuentaInput(
            `${sessionStorage.getItem("cuenta")}`
          );
        let par = ConsultarServiciosCuenta_Parametros(
          ConsultarServiciosCuentaDO
        );
        let ConsultarServiciosCuentaRespuesta: ConsultarServiciosCuenta_Respuesta =
          await ConsultaWS(par);
        if (
          ConsultarServiciosCuentaRespuesta.EBMHeaderResponse &&
          ConsultarServiciosCuentaRespuesta.EBMHeaderResponse.ErrorNegocio
            .Estado == "ok" &&
          ConsultarServiciosCuentaRespuesta.EBMHeaderResponse.ErrorTecnico
            .code === "ok" &&
          ConsultarServiciosCuentaRespuesta.CuentaSelEBO.RowId &&
          ConsultarServiciosCuentaRespuesta.CuentaSelEBO.RowId != null &&
          typeof ConsultarServiciosCuentaRespuesta.CuentaSelEBO.RowId !=
            "undefined"
        ) {
          return ConsultarServiciosCuentaRespuesta;
        } else {
          console.error(
            "Error al ejecutar el servicio " +
              ConsultarServiciosCuentaRespuesta.EBMHeaderResponse
          );
          setIsLoading(false);
          setIsPaymentPrcessOn(false);
          return null;
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsPaymentPrcessOn(false);
        return null;
      }
    }
  };

  const builtFechaExpTarjeta = (p_FechaExp: any) => {
    return `${p_FechaExp.substring(5, 7)}${p_FechaExp.substring(0, 2)}`;
  };

  const getTransactionId = (param1: any) => {
    var arrayDeCadenas = param1.split("_");

    return arrayDeCadenas[1] + "_" + arrayDeCadenas[2];
  };

  const doOrquestarPago = async (
    p_determinarComercio: DeterminarComercio_Respuesta,
    p_consultarbines: ConsultarBines_Respuesta,
    p_generaridentificador: GenerarIdentificadorUnicoDePago_Respuesta,
    p_consultartipocambio: ConsultarTipoCambio_Respuesta,
    p_consultarserviciocuenta: ConsultarServiciosCuenta_Respuesta,
    p_card: ConsultarBilletera_Info
  ) => {
    try {
      let codigoSkyDM = p_generaridentificador.Salida_Process.IdPagoSKY;
      var cantidadNueva = !(otherQuantity.length < 1)
        ? otherQuantity
        : saldoAPagar;
      const OrquestarProcesoPagoDO: OrquestarProcesoPago_Entrada =
        OrquestarProcesoPago_Input(
          `${
            p_card.TipoTarjeta == "001"
              ? "VISA"
              : p_card.TipoTarjeta == "002"
              ? "MASTERCARD"
              : "AMEX"
          }`, //l_nombreEmpresaTransaccion: string,
          `${p_card.TipoBin == "DEBITO" ? "001" : "002"}`, //l_tipoTarjeta: string,
          `${myInputCVV}`, //l_cvvTarjeta: string,
          `${p_card.NombreTarjeta}`, //l_nombreTitularTarjeta: string,
          `${p_card.MaskedPan}`, //l_numeroTarjeta: string,
          builtFechaExpTarjeta(p_card.FechaExp), //l_fechaExpTarjeta: string,
          "AplicarPago", //l_tipoOperacion: string,
          `${p_determinarComercio.BilleteraComercioCollection.BilleteraComercio[0].clearingHouse}`, //l_entidadBancaria: string,
          `${sessionStorage.getItem("idSesion")}`, //l_IdSesion: string,
          //`${p_consultarserviciocuenta.CuentaSelEBO.RowId}`, //l_loginUsr: string,
          `${
            flujo === "Sky+"
              ? uuidValue
              : p_consultarserviciocuenta.CuentaSelEBO.RowId
          }`, //l_loginUsr: string,
          `${importePagoMonedaLocal(
            erraseCommaCharacter(cantidadNueva),
            p_consultartipocambio.BilleteraTipoCambioCollection
              .BilleteraTipoCambio[0].tasa
          )}`, //l_importePagoMonedaLocal: string,
          `${horaFormateada()}`,
          `${fechaFormateada()}`,
          erraseCommaCharacter(cantidadNueva),
          "",
          `${p_consultartipocambio.BilleteraTipoCambioCollection.BilleteraTipoCambio[0].tasa}`,
          `${codigoSkyDM}`,
          "true",
          "",
          `${getTransactionId(
            p_generaridentificador.Salida_Process.IdPagoSKY
          )}`,
          `${p_determinarComercio.BilleteraComercioCollection.BilleteraComercio[0].mid}`,
          `${sessionStorage.getItem("cuenta")}`,
          `${p_card.PaymentInstrument}`,
          "Y",
          "Tarjeta de " +
            p_consultarbines.ClasificacionesLlamada.BINType.substring(
              0,
              1
            ).toUpperCase() +
            p_consultarbines.ClasificacionesLlamada.BINType.substring(
              1
            ).toLowerCase(),
          "internet",
          `${nombrepais(p_card.CodPais)}`,
          "SEL",
          "1",
          `${p_determinarComercio.BilleteraComercioCollection.BilleteraComercio[0].codigoMoneda}`
        );
      let par = OrquestarProcesoPago_Parametros(OrquestarProcesoPagoDO);

      let OrquestarProcesoPagoRespuesta: OrquestarProcesoPago_Respuesta =
        await ConsultaWS(par);

      if (
        OrquestarProcesoPagoRespuesta.EBMHeaderResponse &&
        OrquestarProcesoPagoRespuesta.EBMHeaderResponse.ErrorNegocio.Estado ==
          "ok" &&
        OrquestarProcesoPagoRespuesta.EBMHeaderResponse.ErrorTecnico.code ===
          "ok" &&
        OrquestarProcesoPagoRespuesta.RespuestaPagoTarjeta &&
        OrquestarProcesoPagoRespuesta.RespuestaPagoTarjeta != null &&
        typeof OrquestarProcesoPagoRespuesta.RespuestaPagoTarjeta != "undefined"
      ) {
        return OrquestarProcesoPagoRespuesta;
      } else {
        console.error(
          "Error al ejecutar el servicio " +
            OrquestarProcesoPagoRespuesta.EBMHeaderResponse
        );
        setIsLoading(false);
        setIsPaymentPrcessOn(false);
        return null;
      }
      //----------------------------------------------------------------------------------------------------------------------------
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsPaymentPrcessOn(false);
      return null;
    }
  };

  const erraseCommaCharacter = (mount: any) => {
    return mount.replace(",", "").replace("-", "");
  };

  const importePagoMonedaLocal = (param1: any, param2: any) => {
    const param1Parse = Number.parseFloat(param1);

    const param2Parse = Number.parseFloat(param2);

    if (
      param1Parse &&
      param1Parse != null &&
      typeof param1Parse != "undefined" &&
      !Number.isNaN(param1Parse)
    ) {
      if (
        param2Parse &&
        param2Parse != null &&
        typeof param2Parse != "undefined" &&
        !Number.isNaN(param2Parse)
      ) {
        return param1Parse * param2Parse;
      } else {
        return param1Parse * 0;
      }
    } else {
      return 0 * param2Parse;
    }
  };

  const doValidacionesDatos = (p_card: ConsultarBilletera_Info) => {
    var retorno = true;
    if (p_card === null || typeof p_card === "undefined") {
      setStatus("ERROR");
      setMessage("Favor de seleccionar una tarjeta disponible");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      //alert("");
      retorno = false;
    } else {
      if (
        myInputCVV === "" ||
        myInputCVV === null ||
        !myInputCVV.match(/^\d+/)
      ) {
        setStatus("ERROR");
        setMessage("Favor de ingresar un cvv valido");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        retorno = false;
      } else {
        if (otherQuantity.length === 0 && saldoAPagar === "0") {
          setStatus("ERROR");
          setMessage(
            "Su saldo es 0, favor de ingresar un valor en Otra Cantidad"
          );
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
          retorno = false;
        } else if (otherQuantity.length > 0 && !otherQuantity.match(/^\d+/)) {
          setStatus("ERROR");
          setMessage("Favor de ingresar un monto valido");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
          retorno = false;
        } else {
          if (otherQuantity.length > 0 && otherQuantity.match(/^\d+/)) {
            retorno = validarMontosMinimosYMaximos(otherQuantity);
          }
          //SE VALIDA QUE EL MONTO SE AMYOR A 100
        }
      }
    }

    return retorno;
  };

  const muestraMensajeMontos = (p_mensaje: string) => {
    setStatus("ERROR");
    setMessage(p_mensaje);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const validarMontosMinimosYMaximos = (montoString: string) => {
    const montoFloat = Number.parseFloat(montoString);
    let pais = sessionStorage.getItem("PrimaryAccountCountry")!;

    if (pais === "Mexico") {
      if (montoFloat < 15.0) {
        muestraMensajeMontos("Favor de ingresar un monto mayor o igual a 15");
        return false;
      } else if (montoFloat > 15555) {
        muestraMensajeMontos(
          "Favor de ingresar un monto menor o igual a 15555"
        );
        return false;
      }
    } else if (pais === "Costa Rica") {
      if (montoFloat < 1) {
        muestraMensajeMontos("Favor de ingresar un monto mayor o igual a 1");
        return false;
      } else if (montoFloat > 500000) {
        muestraMensajeMontos(
          "Favor de ingresar un monto menor o igual a 500000"
        );
        return false;
      }
    } else if (pais === "Guatemala") {
      if (montoFloat < 1) {
        muestraMensajeMontos("Favor de ingresar un monto mayor o igual a 1");
        return false;
      } else if (montoFloat > 99999) {
        muestraMensajeMontos(
          "Favor de ingresar un monto menor o igual a 99999"
        );
        return false;
      }
    } else if (pais === "Honduras") {
      if (montoFloat < 1) {
        muestraMensajeMontos("Favor de ingresar un monto mayor o igual a 1");
        return false;
      } else if (montoFloat > 1200) {
        muestraMensajeMontos("Favor de ingresar un monto menor o igual a 1200");
        return false;
      }
    } else if (pais === "Nicaragua") {
      if (montoFloat < 1) {
        muestraMensajeMontos("Favor de ingresar un monto mayor o igual a 1");
        return false;
      } else if (montoFloat > 1200) {
        muestraMensajeMontos("Favor de ingresar un monto menor o igual a 1200");
        return false;
      }
    } else if (pais === "Panama") {
      if (montoFloat < 1) {
        muestraMensajeMontos("Favor de ingresar un monto mayor o igual a 1");
        return false;
      } else if (montoFloat > 1200) {
        muestraMensajeMontos("Favor de ingresar un monto menor o igual a 1200");
        return false;
      }
    } else if (pais === "Republica Dominicana") {
      if (montoFloat < 1) {
        muestraMensajeMontos("Favor de ingresar un monto mayor o igual a 1");
        return false;
      } else if (montoFloat > 54000) {
        muestraMensajeMontos(
          "Favor de ingresar un monto menor o igual a 54000"
        );
        return false;
      }
    } else if (pais === "El Salvador") {
      if (montoFloat < 1) {
        muestraMensajeMontos("Favor de ingresar un monto mayor o igual a 1");
        return false;
      } else if (montoFloat > 1200) {
        muestraMensajeMontos("Favor de ingresar un monto menor o igual a 1200");
        return false;
      }
    }

    return true;
  };

  const doValidacionesLogitudes = (p_card: ConsultarBilletera_Info) => {
    var retorno = true;
    if (p_card.TipoTarjeta === "003") {
      if (myInputCVV.length != 4) {
        setStatus("ERROR");
        setMessage("La longitud del CVV para American Express son 4 digitos");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        retorno = false;
      }
    } else {
      //VISA MASTER CARD
      if (myInputCVV.length != 3) {
        setStatus("ERROR");
        setMessage("La longitud del CVV debe de ser 3 digitos");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        retorno = false;
      }
    }

    return retorno;
  };

  function nombrepais(param: string) {
    if (param === "MX") {
      return "MEX";
    } else if (param === "CR") {
      return "CRICA";
    } else if (param === "GT") {
      return "GT";
    } else if (param === "HN") {
      return "HON";
    } else if (param === "NI") {
      return "NIC";
    } else if (param === "PA") {
      return "PAN";
    } else if (param === "DO") {
      return "DOM";
    } else if (param === "SV") {
      return "SAL";
    }
  }

  /*
  function nombrepais(param: string) {
    if (param === "MX") {
      return "Mexico";
    } else if (param === "CR") {
      return "Costa Rica";
    } else if (param === "GT") {
      return "Guatemala";
    } else if (param === "HN") {
      return "Honduras";
    } else if (param === "NI") {
      return "Nicaragua";
    } else if (param === "PA") {
      return "Panama";
    } else if (param === "DO") {
      return "Republica Dominicana";
    } else if (param === "SV") {
      return "El Salvador";
    }
  } */

  function horaFormateada() {
    var momentoActual = new Date();
    var hora = momentoActual.getHours();
    var minuto = momentoActual.getMinutes();
    var segundo = momentoActual.getSeconds();

    let horaImprimible = hora + "" + minuto + "" + segundo;
    return horaImprimible;
  }

  function fechaFormateada() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    let fechaImprimible =
      formatDAYMONTHYEAR("anho", year.toString()) +
      "" +
      formatDAYMONTHYEAR("mes", month.toString()) +
      "" +
      formatDAYMONTHYEAR("dia", day.toString());
    return fechaImprimible;
  }

  const formatDAYMONTHYEAR = (nombre: string, valor: string) => {
    if (nombre === "dia" || nombre === "mes") {
      if (valor.length == 1) {
        return "0" + valor;
      } else {
        return valor;
      }
    } else if (nombre === "anho") {
      return valor.substring(2, 4);
    }
  };

  function handleChangeForCvv(event: any) {
    const re = /^[0-9\b]+$/;
    setCleanCVV(false);
    if (event.target.value === "" || re.test(event.target.value)) {
      setMyInputCVV(event.target.value);
    }
  }

  function handleChangeForNewQuantity(event: any) {
    const re = /^\$?\d+(,\d{3})*(\.\d*)?$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setOtherQuantity(event.target.value);
    }
  }

  const getCvvPlaceholder = (ptodaslastarjetas: ConsultarBilletera_Info[]) => {
    if (ptodaslastarjetas != null && ptodaslastarjetas.length > 0) {
      if (ptodaslastarjetas[initialPositionArray].TipoTarjeta === "003") {
        return "****";
      } else {
        return "***";
      }
    } else {
      return "***";
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          className={styles["modalHeaderConfirmacion"]}
        ></Modal.Header>
        <Modal.Body>
          <Row className={styles["alertContainer"]}>
            <Col className={styles["messageStyle"]}>
              <ConfirmMessage2
                status={status}
                message={message}
                showAlert={showAlert}
                paddingLeft="cvv4VerificaPago"
              />
            </Col>
          </Row>

          {!confirmPaymentClicked ? (
            <Container>
              <Row
                style={{ paddingBottom: "5px" }}
                className={styles["alignCenterCenterColumn4title"]}
              >
                <Col md={{ span: 12 }} style={{ textAlign: "center" }}>
                  <span
                    className={styles["fontModalTitlePagar"] + " gris-oscuro"}
                  >
                    Verifica tu pago
                  </span>
                </Col>
              </Row>
              <Row
                style={{ paddingBottom: "10px" }}
                className={styles["alignCenterCenterColumn"]}
              >
                <Col md={{ span: 12 }} style={{ textAlign: "center" }}>
                  <span className={styles["fontSizeAddCard"] + " gris-oscuro"}>
                    Estás por pagar{" "}
                    {!(otherQuantity.length < 1) ? (
                      <span style={{ fontWeight: "600" }}>
                        ${otherQuantity},
                      </span>
                    ) : (
                      <span style={{ fontWeight: "600" }}>${saldoAPagar},</span>
                    )}{" "}
                    de la factura del mes{" "}
                    <span style={{ fontWeight: "600" }}>{fechaLimite}</span>
                  </span>
                </Col>
              </Row>
              <Row className={styles["pb4ChangeCard"]}>
                {!changeCardClicked ? (
                  <Col
                    xs={{ span: 12, offset: 0 }}
                    lg={{ span: 6, offset: 2 }}
                    className={styles["alignCenterCenterColumn"]}
                  >
                    <CardGallery
                      allItCards={allItCards}
                      oldCardValue={initialPositionArray}
                      newCardValue={(respuesta: number) => {
                        setInitialPositionArray(respuesta);
                        //setGallerySelectedCard(allItCards[respuesta]);
                      }}
                      origen={origen}
                      changeCardClicked={changeCardClicked}
                    />
                    <Button
                      variant="link"
                      type="submit"
                      className={styles["linkFontEditar"]}
                      onClick={() => {
                        setChangeCardClicked(true);
                        setInitialPositionArrayBKP(initialPositionArray);
                        setInitialPositionArray(0);
                      }}
                      style={{ width: "100%" }}
                    >
                      Cambiar tarjeta
                    </Button>
                  </Col>
                ) : (
                  <CardGallery
                    allItCards={allItCards}
                    oldCardValue={initialPositionArray}
                    newCardValue={(respuesta: number) => {
                      setInitialPositionArray(respuesta);
                      //setGallerySelectedCard(allItCards[respuesta]);
                    }}
                    origen={origen}
                    changeCardClicked={changeCardClicked}
                  />
                )}
                {!changeCardClicked ? (
                  <Col
                    xs={{ span: 12 }}
                    lg={{ span: 2 }}
                    className={styles["centerOtraCantidad"]}
                  >
                    <Form.Group>
                      <Form.Label
                        className={
                          styles["font-size-label-form"] +
                          " gris-oscuro " +
                          styles["select"]
                        }
                      >
                        Otra cantidad
                      </Form.Label>

                      <Form.Control
                        className={styles["styleInputText"]}
                        type="text"
                        placeholder="00.00"
                        value={otherQuantity}
                        onChange={handleChangeForNewQuantity}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                      <Form.Label
                        className={
                          styles["font-size-label-form"] +
                          " gris-oscuro " +
                          styles["select4cvv"]
                        }
                      >
                        CVV
                      </Form.Label>

                      <Form.Control
                        className={styles["styleInputText"]}
                        type="password"
                        placeholder={getCvvPlaceholder(allItCards)}
                        pattern="[0-9]"
                        inputMode="numeric"
                        minLength={3}
                        maxLength={4}
                        value={myInputCVV}
                        onChange={handleChangeForCvv}
                      />
                    </Form.Group>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
              <Row
                style={{ paddingBottom: "5px" }}
                className={styles["alignCenterCenterColumn4Pay"]}
              >
                <Col xs={{ span: 12 }} lg={{ span: 3 }}>
                  {isLoading ? <LoadingSpinner /> : ""}
                  {!changeCardClicked ? (
                    <Button
                      className={styles["buttonBlueContinue"]}
                      style={{ width: "100%" }}
                      onClick={() => {
                        doConfirmPaymentCard(allItCards[initialPositionArray]);
                      }}
                    >
                      Pagar
                    </Button>
                  ) : (
                    <Button
                      className={styles["buttonBlueContinue"]}
                      style={{ width: "100%" }}
                      onClick={() => {
                        setChangeCardClicked(false);
                      }}
                    >
                      Seleccionar
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className={styles["alignCenterCenterColumn"]}>
                <Col md={{ span: 3 }}>
                  {!changeCardClicked ? (
                    <Button
                      variant="link"
                      type="submit"
                      className={styles["linkFontEditar"]}
                      onClick={() => {
                        setChangeCardClicked(false);
                        setConfirmPaymentClicked(false);
                        setInitialPositionArray(0);
                        setInitialPositionArrayBKP(0);
                        setMyInputCVV("");
                        setOtherQuantity("");
                        props.onHide({ action: "cancelar" }, "");
                      }}
                      style={{ width: "100%" }}
                    >
                      Cancelar
                    </Button>
                  ) : (
                    <Button
                      variant="link"
                      type="submit"
                      className={styles["linkFontEditar"]}
                      onClick={() => {
                        setInitialPositionArray(initialPositionArrayBKP);
                        setChangeCardClicked(false);
                      }}
                      style={{ width: "100%" }}
                    >
                      Regresar
                    </Button>
                  )}
                </Col>
              </Row>
            </Container>
          ) : (
            <Container>
              <Row
                style={{ paddingBottom: "10px" }}
                className={styles["alignCenterCenterColumn"]}
              >
                <Col md={{ span: 12 }} style={{ textAlign: "center" }}>
                  <span
                    className={styles["fontModalTitlePagar"] + " gris-oscuro"}
                  >
                    Confirmar Pago
                  </span>
                </Col>
              </Row>
              <Row
                style={{ paddingBottom: "10px" }}
                className={styles["alignCenterCenterColumn"]}
              >
                <Col md={{ span: 12 }} style={{ textAlign: "center" }}>
                  <span className={styles["fontSizeAddCard"] + " gris-oscuro"}>
                    Recuerde que el cargo a su tarjeta se realiza en moneda
                    local
                  </span>
                </Col>
              </Row>
              <Row className={styles["alignCenterCenterColumn4TotalPagar"]}>
                <Col
                  xs={{ span: 12 }}
                  lg={{ span: 2 }}
                  className={styles["centerLogoCreditCard"]}
                >
                  <Form.Group className={styles["confirmPaymentInputText"]}>
                    <Form.Label>Total a pagar:</Form.Label>

                    <Form.Control
                      type="text"
                      disabled
                      value={
                        !(otherQuantity.length < 1)
                          ? otherQuantity
                          : saldoAPagar
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className={styles["alignCenterCenterColumn4TotalPagar"]}>
                <Col
                  xs={{ span: 12 }}
                  lg={{ span: 2 }}
                  className={styles["centerLogoCreditCard"]}
                >
                  <Form.Group className={styles["confirmPaymentInputText"]}>
                    <Form.Label>Tarjeta:</Form.Label>

                    <Form.Control
                      type="text"
                      disabled
                      value={allItCards[initialPositionArray].MaskedPan}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row
                style={{ padding: "15px" }}
                className={styles["alignCenterCenterColumn"]}
              >
                <Col xs={{ span: 12 }} lg={{ span: 3 }}>
                  {isLoading ? <LoadingSpinner /> : ""}

                  <Button
                    disabled={isPaymentPrcessOn}
                    className={styles["buttonBlueContinue"]}
                    style={{ width: "100%" }}
                    onClick={() => {
                      doPaymentCard(allItCards[initialPositionArray]);
                    }}
                  >
                    Pagar
                  </Button>
                </Col>
              </Row>
              <Row className={styles["alignCenterCenterColumn"]}>
                <Col md={{ span: 3 }}>
                  <Button
                    disabled={isPaymentPrcessOn}
                    variant="link"
                    type="submit"
                    className={styles["linkFontEditar"]}
                    onClick={() => {
                      setConfirmPaymentClicked(false);
                    }}
                    style={{ width: "100%" }}
                  >
                    Regresar
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPospagoConTarjeta;
