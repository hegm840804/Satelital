import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./datosUsuario.module.css";
import React from "react";

const ModalConfirmado = (props:any) => {
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
                    {props.title}
                  </span>
                </Card.Title>
                <Card.Subtitle
                  style={{ paddingBottom: "30px", textAlign: "center" }}
                >
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
              md={{ span: 4, offset: 4 }}
              className={styles["centerColumnConfirmar"]}
              style={{ paddingTop: "30px" }}
            >
              <Button
                variant="primary"
                type="submit"
                className={styles["buttonBlueContinue"]}
                onClick={() => props.onHide({ action: "cancelar" },"")}
              >
                {props.msgButon}
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ModalConfirmado