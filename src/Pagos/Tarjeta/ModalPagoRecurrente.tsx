import { Button, Col, Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import styles from "./datosUsuario.module.css";
import React, { useState } from "react";
import CardTarjetaItem from "../Paquetes/items/CardTarjetaItem";
import ModalPagoRecurrenteCardItem from "./ModalPagoRecurrenteCardItem";



const ModalPagoRecurrente = (props: any) => {
 

  

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
        <Container fluid>
          <Row>
            <Col
              xs={{ span: 12 }}
              lg={{ span: 6 }}
              className={
                styles["alignCenterCenterColumn"] + " " + styles["p-15-bottom"]
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
              <ModalPagoRecurrenteCardItem datosTarjeta={props.datosTarjeta} />
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
                onClick={() => props.onHide({ action: "cancelar" })}
              >
                Cancelar
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
                  //doRecurrentPaymentCard(props.datosTarjeta);
                  props.onHide({ action: "Domiciliar" });
                }}
              >
                Domiciliar Pago
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPagoRecurrente;
