import { Button, Col, Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import styles from "./datosUsuario.module.css";
import React, { useState } from "react";
import CardTarjetaItem from "../Paquetes/items/CardTarjetaItem";
import DatosTarjetaItem from "./items/DatosTarjetaItem";

import {
  ActualizarBilletera_Respuesta,
  ActualizarTDCBilletera_Parametros,
  ActualizarTDCBilletera_Entrada,
  builtActualizarTDCBilleteraInput,
} from "../../Commons/Services/GwActualizarTDCBilleteraEBS";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import ConfirmMessage from "../../General/ConfirmMessage";

const ModalEditarTarjeta = (props: any) => {
  const [cvvCodeNuevo, setCvvCodeNuevo] = useState("");
  const [externalNumeroCuenta, setExternalNumeroCuenta] = useState({});
  const [externalIdProspecto, setExternalIdProspecto] = useState({});
  const [externalPaymentInstrument, setExternalPaymentInstrument] = useState(
    {}
  );
  const [externalInstrumentId, setExternalInstrumentId] = useState({});
  const [externalId, setExternalId] = useState({});
  const [externalMonth, setExternalMonth] = useState("");
  const [externalYear, setExternalYear] = useState("");

  const [respuesta, setRespuesta] = useState({});

  const [status, setStatus] = useState("OK");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const guardarCambios = () => {
    if (
      externalMonth &&
      typeof externalMonth != "undefined" &&
      externalMonth.length === 2
    ) {
      if (
        externalYear &&
        typeof externalYear != "undefined" &&
        externalYear.length === 4
      ) {
        if (
          cvvCodeNuevo &&
          typeof cvvCodeNuevo != "undefined" &&
          cvvCodeNuevo.length > 1
        ) {
          if (props.datosTarjeta.TipoTarjeta === "003") {
            if (cvvCodeNuevo.length != 4) {
              setStatus("ERROR");
              setMessage(
                "La longitud del CVV para American Express son 4 digitos"
              );
              setShowAlert(true);
              setTimeout(() => {
                setShowAlert(false);
              }, 3000);
              return;
            } else {
              executeUpdateWallet();
              props.onHide({ action: "cancelar" });
            }
          } else {
            //VISA MASTER CARD
            if (cvvCodeNuevo.length != 3) {
              setStatus("ERROR");
              setMessage("La longitud del CVV debe de ser 3 digitos");
              setShowAlert(true);
              setTimeout(() => {
                setShowAlert(false);
              }, 3000);
              return;
            } else {
              executeUpdateWallet();
              props.onHide({ action: "cancelar" });
            }
          }
        } else {
          setStatus("ERROR");
          setMessage("Favor de ingresar el cvv");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
          return;
        }
      } else {
        setStatus("ERROR");
        setMessage("Año debe de tener 2 dígitos");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        return;
      }
    } else {
      setStatus("ERROR");
      setMessage("Mes debe de tener 2 dígitos");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }
  };

  const notificate = (param: any) => {
    if (param.EBMHeaderResponse.ErrorNegocio.CodigoError === "0") {
      setStatus("OK");
      setMessage("La Tarjeta se actualizó correctamente");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      //alert("La Tarjeta se actualizó correctamente");
    } else {
      setStatus("ERROR");
      setMessage(
        "Error al actualizar la tarjeta " + param.ErrorNegocio.DescripcionError
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      //alert(  );
    }

    if (param.ErrorTecnico.code != "ok") {
      console.error("Error al ejecutar el servicio " + param.ErrorTecnico);
    } else {
      console.info("Exito al ejecutar el servicio ");
    }
  };

  const executeUpdateWallet = async () => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ActualizarTDCBilleteraDO: ActualizarTDCBilletera_Entrada =
      builtActualizarTDCBilleteraInput(
        `${externalId}`,
        `${externalPaymentInstrument}`,
        `${externalIdProspecto}`,
        `${externalNumeroCuenta}`,
        "",
        "",
        "",
        `${externalMonth}/${externalYear}`,
        `${cvvCodeNuevo}`,
        "",
        `${externalInstrumentId}`,
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
      ActualizarBilleteraRespuesta &&
      ActualizarBilleteraRespuesta.EBMHeaderResponse.ErrorNegocio.Estado ==
        "ok" &&
      ActualizarBilleteraRespuesta.EBMHeaderResponse.ErrorTecnico.code === "ok"
    ) {
      setStatus("OK");
      setMessage("La Tarjeta se actualizó correctamente");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      setStatus("ERROR");
      setMessage(
        "Error al actualizar la tarjeta " +
          ActualizarBilleteraRespuesta.EBMHeaderResponse.ErrorNegocio
            .DescripcionError
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      console.error(ActualizarBilleteraRespuesta);
    }
    //----------------------------------------------------------------------------------------------------------------------------
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
          <Container fluid>
            <Row>
              <Col
                xs={{ span: 12 }}
                lg={{ span: 6 }}
                className={
                  styles["alignCenterCenterColumn"] +
                  " " +
                  styles["p-15-bottom"]
                }
              >
                <CardTarjetaItem
                  showEditButton="N"
                  onlyOneCard={props.datosTarjeta}
                />
              </Col>
              <Col
                xs={{ span: 12 }}
                lg={{ span: 6 }}
                className={styles["alignCenterCenterColumn"]}
              >
                <DatosTarjetaItem
                  datosTarjeta={props.datosTarjeta}
                  newCVVCODE={setCvvCodeNuevo}
                  newNumeroCuenta={setExternalNumeroCuenta}
                  newIdProspecto={setExternalIdProspecto}
                  newPaymentInstrument={setExternalPaymentInstrument}
                  newInstrumentId={setExternalInstrumentId}
                  newId={setExternalId}
                  newANOCODE={setExternalYear}
                  newMESCODE={setExternalMonth}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className={styles["alignModalFooterButtons"]}>
          <Container fluid>
            <Row>
              <Col
                xs={{ span: 12, offset: 0 }}
                lg={{ span: 3, offset: 3 }}
                className={styles["p-15-bottom"]}
              >
                <Button
                  className={styles["buttonWhite"]}
                  onClick={() => props.onHide({ action: "Eliminar" })}
                >
                  Eliminar Tarjeta
                </Button>
              </Col>
              <Col
                xs={{ span: 12, offset: 0 }}
                lg={{ span: 3 }}
                className={styles["p-15-bottom"]}
              >
                <Button
                  className={styles["buttonBlueContinue"]}
                  onClick={() => {
                    guardarCambios();
                  }}
                >
                  Guardar Cambios
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditarTarjeta;
