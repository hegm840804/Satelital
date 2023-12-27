import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./datosUsuario.module.css";
import React, { useState } from "react";

import {
  EliminarMetodoDePago_Entrada,
  EliminarMetodoDePago_Respuesta,
  EliminarMetodoDePago_Parametros,
  builtEliminarMetodoDePagoInput,
} from "../../Commons/Services/GwEliminarMetodoDePagoEBF";
import { ConsultaWS } from "../../Commons/ServiciosBase";

import ConfirmMessage from "../../General/ConfirmMessage";
const ModalEliminarTarjeta = (props: any) => {
  const [myResponse, setMyResponse] =
    useState<EliminarMetodoDePago_Respuesta>();

  const [status, setStatus] = useState("OK");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const doDeleteCard = async (param2: any) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const EliminarMetodoDePagoDO: EliminarMetodoDePago_Entrada =
      builtEliminarMetodoDePagoInput(
        `${param2.InstrumentId}`,
        `${param2.NumeroCuenta}`,
        `${param2.PaymentInstrument}`,
        "sky_master"
      );
    let par = EliminarMetodoDePago_Parametros(EliminarMetodoDePagoDO);

    let EliminarMetodoDePagoRespuesta: EliminarMetodoDePago_Respuesta =
      await ConsultaWS(par);

    if (
      EliminarMetodoDePagoRespuesta.EBMHeaderResponse &&
      EliminarMetodoDePagoRespuesta.EBMHeaderResponse.ErrorNegocio.Estado ==
        "ok" &&
      EliminarMetodoDePagoRespuesta.EBMHeaderResponse.ErrorTecnico.code === "ok"
    ) {
      setMyResponse(EliminarMetodoDePagoRespuesta);
      notificate(EliminarMetodoDePagoRespuesta.EBMHeaderResponse);
    } else {
      console.error(EliminarMetodoDePagoRespuesta.EBMHeaderResponse);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const handleClick = (event: any, param1: any) => {
    event.preventDefault();
    doDeleteCard(param1);
  };

  const notificate = (param: any) => {
    if (param.ErrorNegocio.CodigoError === "0") {
      setStatus("OK");
      setMessage("La Tarjeta se eliminó correctamente");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      setStatus("ERROR");
      setMessage(
        "Error al eliminar la tarjeta " + param.ErrorNegocio.DescripcionError
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }

    if (param.ErrorTecnico.code != "ok") {
      console.error("Error al ejecutar el servicio " + param.ErrorTecnico);
    } else {
      console.info("Exito al ejecutar el servicio ");
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
            <Col>
              <ConfirmMessage
                status={status}
                message={message}
                showAlert={showAlert}
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
                      ¿Seguro que deseas eliminar la tarjeta?
                    </span>
                  </Card.Title>
                  <Card.Subtitle
                    style={{ paddingBottom: "10px", textAlign: "center" }}
                  >
                    <span
                      className={styles["fontNameCreditCard"] + " gris-oscuro"}
                    >
                      Se eliminara la tarjeta con terminación{" "}
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
                  Eliminar Tarjeta
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

export default ModalEliminarTarjeta;
