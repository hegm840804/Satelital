import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./datosUsuario.module.css";
import React, { useState } from "react";
import { ConsultaWS } from "../../Commons/ServiciosBase";

import {
  ConsultarBines_Respuesta,
  ConsultarBines_Parametros,
  ConsultarBines_Entrada
} from "../../Commons/Services/GwConsultarBinesEBS";

import {
  builtGwModificarPerfilDeFacturacionBRMEBSEntrada,
  GwModificarPerfilDeFacturacionBRMEBS_Entrada,
  GwModificarPerfilDeFacturacionBRMEBS_Parametros,
  GwModificarPerfilDeFacturacionBRMEBS_Respuesta
} from "../../Commons/Services/GwModificarPerfilDeFacturacionBRMEBS";

import {
  GwGestionarSSCambioFormaPagoEBS_Entrada,
  builtGwGestionarSSCambioFormaPagoEBSEntrada,
  ListOfServiceInstance,
  builtListOfServiceInstance,
  GwGestionarSSCambioFormaPagoEBS_Parametros,
  GwGestionarSSCambioFormaPagoEBS_Respuesta
} from "../../Commons/Services/GwGestionarSSCambioFormaPagoEBS";
import ConfirmMessage from "../../General/ConfirmMessage";

const ModalPagoRecurrenteConfirm = (props: any) => {
  const [status1, setStatus1] = useState("OK");
  const [message1, setMessage1] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const handleClick = (event: any, param1: any) => {
    event.preventDefault();
    doRecurrentPaymentCard(param1);
  };

  const getPaisIso = (param: string) => {
    if (param === "Mexico") {
      return "MX";
    } else if (param === "Costa Rica") {
      return "CR";
    } else if (param === "Guatemala") {
      return "GT";
    } else if (param === "Honduras") {
      return "HN";
    } else if (param === "Nicaragua") {
      return "NI";
    } else if (param === "Panama") {
      return "PA";
    } else if (param === "Republica Dominicana") {
      return "DO";
    } else if (param === "El Salvador") {
      return "SV";
    } else {
      return "MX";
    }
  };

  const doConsultarBines = async (param1: any) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarBinesDO: ConsultarBines_Entrada = {
      CardBIN: `${param1.MaskedPan.substring(0, 6)}`,
      CardNumber: "",
      CountryCode: `${param1.CodPais}`,
    };
    let par = ConsultarBines_Parametros(ConsultarBinesDO);
    let ConsultarBinesRespuesta: ConsultarBines_Respuesta = await ConsultaWS(
      par
    );
    if (
      ConsultarBinesRespuesta.EBMHeaderResponse &&
      ConsultarBinesRespuesta.EBMHeaderResponse.ErrorNegocio.Estado == "ok" &&
      ConsultarBinesRespuesta.EBMHeaderResponse.ErrorTecnico.code === "ok"
    ) {
      if (
        ConsultarBinesRespuesta.ClasificacionesLlamada &&
        ConsultarBinesRespuesta.ClasificacionesLlamada != null
      ) {
        const GwModificarPerfilDeFacturacionDO: GwModificarPerfilDeFacturacionBRMEBS_Entrada =
          builtGwModificarPerfilDeFacturacionBRMEBSEntrada(
            `${sessionStorage.getItem("cuenta")}`,
            param1.MaskedPan,
            props.datosTarjeta.cvv,
            `${param1.Nombre} ${param1.APaterno} ${param1.AMaterno}`,
            `${param1.FechaExp}`,
            getPaisIso(`${sessionStorage.getItem("CountryPais")}`),
            ConsultarBinesRespuesta.ClasificacionesLlamada.ClearingHouse,
            "10003",
            `${sessionStorage.getItem("Usuario")}`,
            `${param1.PaymentInstrument}`,
            `${param1.InstrumentId}`
          );
        let GwModificarPerfilDeFacturacionPar =
          GwModificarPerfilDeFacturacionBRMEBS_Parametros(
            GwModificarPerfilDeFacturacionDO
          );

        let GwModificarPerfilDeFacturacionBRMEBSRespuesta: GwModificarPerfilDeFacturacionBRMEBS_Respuesta =
          await ConsultaWS(GwModificarPerfilDeFacturacionPar);

        if (
          GwModificarPerfilDeFacturacionBRMEBSRespuesta.EBMHeaderResponse &&
          GwModificarPerfilDeFacturacionBRMEBSRespuesta.EBMHeaderResponse
            .ErrorNegocio.Estado == "ok" &&
          GwModificarPerfilDeFacturacionBRMEBSRespuesta.EBMHeaderResponse
            .ErrorTecnico.code === "ok"
        ) {
          var listOfServiceInstance: ListOfServiceInstance =
            builtListOfServiceInstance([]);
          const GwGestionarSSCambioFormaPagoEBSDO: GwGestionarSSCambioFormaPagoEBS_Entrada =
            builtGwGestionarSSCambioFormaPagoEBSEntrada(
              "SKY Gestiona Pagos",
              "Cambio Forma Pago",
              `${sessionStorage.getItem("cuenta")}`,
              "N",
              generarCodigoSky(
                `${sessionStorage.getItem("cuenta")}`,
                "SEL",
                "DM"
              ),
              param1.MaskedPan,
              `${param1.PaymentInstrument}`,
              `${param1.InstrumentId}`,
              null,
              null,
              "Mensual",
              "Sin Factura",
              `Tarjeta de ${
                ConsultarBinesRespuesta.ClasificacionesLlamada.BINType.substring(
                  0,
                  1
                ).toUpperCase() +
                ConsultarBinesRespuesta.ClasificacionesLlamada.BINType.substring(
                  1
                ).toLowerCase()
              }`,
              "Pospago", //Prepago | Pospago
              "N",
              "Peticion de pago recurrente",
              "Web",
              listOfServiceInstance
            );
          let GwGestionarSSCambioFormaPagoEBSPar =
            GwGestionarSSCambioFormaPagoEBS_Parametros(
              GwGestionarSSCambioFormaPagoEBSDO
            );

          let GwGestionarSSCambioFormaPagoEBSRespuesta: GwGestionarSSCambioFormaPagoEBS_Respuesta =
            await ConsultaWS(GwGestionarSSCambioFormaPagoEBSPar);

          if (
            GwGestionarSSCambioFormaPagoEBSRespuesta.EBMHeaderResponse &&
            GwGestionarSSCambioFormaPagoEBSRespuesta.EBMHeaderResponse
              .ErrorNegocio.Estado == "ok" &&
            GwGestionarSSCambioFormaPagoEBSRespuesta.EBMHeaderResponse
              .ErrorTecnico.code === "ok"
          ) {
            setStatus1("OK");
            setMessage1(`La operacion ${GwGestionarSSCambioFormaPagoEBSRespuesta.PagoResponseEBO.Proceso} para la cuenta ${GwGestionarSSCambioFormaPagoEBSRespuesta.PagoResponseEBO.Cuenta} con el identificador ${GwGestionarSSCambioFormaPagoEBSRespuesta.PagoResponseEBO.SRNumber}`);
            setShowAlert1(true);
            setTimeout(() => {
              setShowAlert1(false);
            }, 3000);
          } else {
            console.error(
              "Error al ejecutar el servicio " +
                GwGestionarSSCambioFormaPagoEBSRespuesta.EBMHeaderResponse
            );
          }
        } else {
          console.error(
            "Error al ejecutar el servicio " +
              GwModificarPerfilDeFacturacionBRMEBSRespuesta.EBMHeaderResponse
          );
        }
      } else {
        console.error(
          "Error al obtner los bines " +
            ConsultarBinesRespuesta.EBMHeaderResponse
        );
      }
    } else {
      console.error(
        "Error al ejecutar el servicio " +
          ConsultarBinesRespuesta.EBMHeaderResponse
      );
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const generarCodigoSky = (
    cuenta: string,
    origen: string,
    proceso: string
  ) => {
    let codigoSky: string = "";
    codigoSky = cuenta.concat(
      "_",
      origen.concat("_"),
      proceso.concat("_"),
      getFechaParaCodigoSKY()
    );
    return codigoSky;
  };

  const getFechaParaCodigoSKY = () => {
    const dateUtc = new Date();

    return formatDateToUTCString(dateUtc, "yyyyMMDDHHmmss");
  };

  const formatDateToUTCString = (date: Date, format: string = "DD/MM/YY") => {
    // obtener mes, día del mes, año, hora
    var moment = require("moment");
    return moment.utc(date).format(format);
  };

  const doRecurrentPaymentCard = (param1: any) => {
    doConsultarBines(param1);
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
            <Col>
              <ConfirmMessage
                status={status1}
                message={message1}
                showAlert={showAlert1}
              />
            </Col>
          </Row>
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 1 }} className="centerLogoSky">
                <Card
                  className={styles["b-0"]}
                  style={{ margin: "0px", width: "100%" }}
                >
                  <Card.Title style={{ textAlign: "center" }}>
                    <span
                      className={styles["fontTitleModal"] + " gris-oscuro"}
                      style={{ paddingBottom: "10px" }}
                    >
                      ¿Seguro que deseas hacer recurrente el pago?
                    </span>
                  </Card.Title>
                  <Card.Subtitle
                    style={{ paddingBottom: "10px", textAlign: "center" }}
                  >
                    <span
                      className={styles["fontNameCreditCard"] + " gris-oscuro"}
                    >
                      Se hará la petición de recurrencia a la tarjeta con
                      terminación{" "}
                      {props &&
                      props.datosTarjeta &&
                      props.datosTarjeta.MaskedPan
                        ? props.datosTarjeta.MaskedPan.substring(
                            props.datosTarjeta.MaskedPan.length - 4
                          )
                        : ""}
                    </span>
                  </Card.Subtitle>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col
                md={{ span: 10, offset: 1 }}
                className={styles["alignModalFooterButtons"]}
                style={{ paddingTop: "20px" }}
              >
                <Button
                  variant="link"
                  type="submit"
                  className={styles["buttonBlueContinue"]}
                  onClick={(event) => {
                    handleClick(event, props.datosTarjeta);
                    props.onHide({ action: "cancelar" });
                  }}
                >
                  Aceptar
                </Button>
              </Col>
            </Row>
            <Row>
              <Col
                md={{ span: 10, offset: 1 }}
                className={styles["alignModalFooterButtons"]}
                style={{ paddingTop: "20px" }}
              >
                <Button
                  variant="link"
                  type="submit"
                  className={styles["linkFontEditar"]}
                  onClick={props.onHide}
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPagoRecurrenteConfirm;
