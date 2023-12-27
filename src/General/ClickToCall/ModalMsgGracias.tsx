import { Card, Col, Container, Form, Row, Button, Modal, ModalProps } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers";
import { JSX } from "react/jsx-runtime";
import styles from './modalmsggracias.module.css';

function ModalMsgGracias(props: JSX.IntrinsicAttributes & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & { ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined; }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: React.ReactNode; }) {
  
  useEffect(() => {
    
  }, []);

  function getValor(param: { valor: { content: { content: { value: any; }[]; }[]; }; }) {
    return param.valor.content[0].content[0].value;
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className={styles.header}
      ></Modal.Header>
      <Modal.Body >
        <Container>
          <Form>
          <Row style={{ height: "30%" }}>
            <Col md={{ span: 8, offset: 2 }} className={styles.centerLogoSky}>
              <Card
                className={styles.cardNotBorder}
                style={{ margin: "0px", width: "100%" }}
              >
                <Card.Title style={{ textAlign: "center" }}>
                  <span
                    className={styles.titulo}
                    style={{ paddingBottom: "10px" }}
                  >
                    {"Gracias por contactarnos"}
                  </span>
                </Card.Title>
                <Card.Subtitle
                  style={{ paddingBottom: "30px", textAlign: "center" }}
                >
                  <span className={styles.fontSubtitleEligePlan}>
                    {"En unos momentos uno de nuestros ejecutivos se pondrá en contacto contigo."}</span>
                </Card.Subtitle>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col
              md={{ span: 4, offset: 4 }}
              className="centerLogoSky"
              style={{ paddingTop: "30px" }}
            >
              <Button
                variant="primary"
                type="submit"
                className={styles.botonazul}
                onClick={props.onHide}
              >
                {"Aceptar"}
              </Button>
            </Col>
          </Row>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ModalMsgGracias;
