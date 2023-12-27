import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../Tarjeta/datosUsuario.module.css";
import React from "react";

const ModalError = (props: any) => {
  return (
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
        <Container>
          <Row>
            <Col
              md={{ span: 10, offset: 1 }}
              style={{ textAlign: "center", paddingBottom: "20px" }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0C6.71371 0 0 6.77419 0 15C0 23.2863 6.71371 30 15 30C23.2258 30 30 23.2863 30 15C30 6.77419 23.2258 0 15 0ZM15 27.0968C8.28629 27.0968 2.90323 21.7137 2.90323 15C2.90323 8.34678 8.28629 2.90323 15 2.90323C21.6532 2.90323 27.0968 8.34678 27.0968 15C27.0968 21.7137 21.6532 27.0968 15 27.0968ZM17.5403 20.8065C17.5403 19.4153 16.3911 18.2661 15 18.2661C13.5484 18.2661 12.4597 19.4153 12.4597 20.8065C12.4597 22.2581 13.5484 23.3468 15 23.3468C16.3911 23.3468 17.5403 22.2581 17.5403 20.8065ZM12.5806 8.04435L13.004 16.2702C13.004 16.6331 13.3669 16.9355 13.7298 16.9355H16.2097C16.5726 16.9355 16.9355 16.6331 16.9355 16.2702L17.3589 8.04435C17.3589 7.62097 17.0565 7.25806 16.6331 7.25806H13.3065C12.8831 7.25806 12.5806 7.62097 12.5806 8.04435Z"
                  fill="#6E6E6E"
                />
              </svg>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <Card
                className={styles["b-0"]}
                style={{ margin: "0px", width: "100%" }}
              >
                <Card.Title style={{ textAlign: "center" }}>
                  <span
                    className={styles["fontTitleModal"] + " gris-oscuro"}
                    style={{ paddingBottom: "10px" }}
                  >
                    ¡Lo sentimos, tu pago ha sido rechazado!
                  </span>
                </Card.Title>
                <Card.Subtitle
                  style={{ paddingBottom: "10px", textAlign: "center" }}
                >
                  <span
                    className={styles["fontNameCreditCard"] + " gris-oscuro"}
                  >
                    Te sugerimos intentar de nuevo o ponerte en contacto con tu
                    banco.
                  </span>
                  <span
                    className={styles["fontNameCreditCard"] + " gris-oscuro"}
                  >
                    {props.subtitle}
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
                variant="primary"
                type="submit"
                className={styles["buttonBlueContinue"]}
                onClick={() => props.onHide({ action: "reintentar" }, "")}
              >
                Volver a intentar
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
                onClick={() => props.onHide({ action: "cancelar" }, "")}
              >
                Volver al inicio
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalError;
