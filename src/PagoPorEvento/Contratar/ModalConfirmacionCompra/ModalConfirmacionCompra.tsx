import React, { useContext, useEffect, useState } from "react";

import styles from "./ModalConfirmacionCompra.module.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import ConfirmMessage from "../../../General/ConfirmMessage";
import { Stack, Row, Col, Container } from "react-bootstrap";
import ContextFlujos from "../../../Context/ContextFlujos";

export const ModalConfirmacionCompra = ({
  show,
  handleClose,
  handleCloseContratar,
  contratar,
  titulo,
  precio,
}: any) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("OK");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { saldoPre } = useContext(ContextFlujos) as any;

  const verifica = () => {
    if (sessionStorage.getItem("tipoCliente") === "PRE") {
      let saldoInt = parseInt(saldoPre);
      let precioInt = parseInt(precio);

      if (precioInt < saldoInt) {
        contratar();
      } else {
        let diferencia = precioInt - saldoInt;
        setStatus("ERROR");
        setMessage(
          "Necesita pagar $" +
            diferencia +
            " pesos, se redireccionará a recargas."
        );
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
        setTimeout(() => {
          navigate("/realizapagos");
        }, 4000);
      }
    } else {
      contratar();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body className={styles.contenedor}>
          <Row className={styles["alertContainer"]}>
            <Col className={styles.posicionAlerta} xs={12}>
              <ConfirmMessage
                status={status}
                message={message}
                showAlert={showAlert}
              />
            </Col>
          </Row>
          <div className={styles.info}>
            <h2 className={styles.titulo}>¿Quieres contratar {titulo}?</h2>
            {sessionStorage.getItem("tipoCliente") === "POS" ? (
              <p className={styles.descripcion}>
                Se agregará un cargo extra de ${precio} a tu próxima factura.
              </p>
            ) : (
              <p className={styles.descripcion}>
                Se descontarán ${precio} de tu saldo.
              </p>
            )}
            <Stack>
              {sessionStorage.getItem("tipoCliente") === "POS" ? (
                <Button
                  className={styles.boton}
                  onClick={(event) => {
                    handleCloseContratar();
                    handleClose();
                    verifica();
                  }}
                >
                  {" "}
                  Contratar{" "}
                </Button>
              ) : (
                <Button
                  className={styles.boton}
                  onClick={(event) => {
                    verifica();
                  }}
                >
                  {" "}
                  Contratar{" "}
                </Button>
              )}
              <Button
                className={styles.botonCancelar}
                onClick={(event) => {
                  handleCloseContratar();
                  handleClose();
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
