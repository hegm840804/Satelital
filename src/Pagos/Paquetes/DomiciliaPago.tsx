import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./paquetes.module.css";
import React from "react";

const DomiciliaPago = (props:any) => {
  //const { tarjeta } = { props };
  return (
    <Container fluid className={styles["backgroundDomiciliaPago"]}>
      <Row>
        <Col md={{ span: 12 }} xl={{ span: 12 }}  className={styles["pb-20"]}>
          <span
            className={
              styles["fontTitleDomicilia"] + " " + styles["white-color"]
            }
          >
            Domicilia tu pago
          </span>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }} xl={{ span: 8, offset: 2 }} className={styles["pb-20"]}>
          <span
            className={
              styles["fontSubtitleDomicilia"] + " " + styles["white-color"]
            }
          >
            Domiciliar tu pago con cargo recurrente a tu tarjeta de crédito o
            débito tiene múltiples beneficios: puedes gozar del descuento por
            pago anticipado y evitas cargos por pago tardío.
          </span>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 12 }} xl={{ span: 12 }}>
          <Button href="/realizapagos" variant="light" className={styles["buttonWhite"]}>
            Domicilia tu pago
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default DomiciliaPago