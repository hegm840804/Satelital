import React from "react";
import styles from "./AgregaServicios.module.css";
import { Col, Row, Card, Button, Container } from "react-bootstrap"

const AgregaServicios = () => {
  return (
    <>
      <Container fluid className={styles["container"]}>
        <Row className={styles["subheaderRow"]}>
          <Col>
            <p className={styles["title"]}>Agrega servicios adicionales</p>
            <p className={styles["subtitle"]}>
              Puedes agregar cualquiera de estos servicios a tu paquete
              contratado.
            </p>
          </Col>
        </Row>

        <Row className={styles["serviceRow"]}>
          <Col>
            <Card className={styles["serviceCard"]}>
              <Card.Body className={styles["cardContainer"]}>
                <Row className={styles["rowInside"]}>
                  <Col xs={12} sm={12} md={7} lg={7} xl={7}>
                    <p className={styles["titleCard"]}>
                      Equipo Sky + adicional
                    </p>
                    <p className={styles["subtitleCard"]}>
                      Agrega un equipo Sky+
                    </p>
                    <p className={styles["priceCard"]}>$50</p>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={5}
                    lg={5}
                    xl={5}
                    className={styles["buttonCol"]}
                  >
                    <Button
                      href=""
                      variant="primary"
                      type="submit"
                      className={styles.button}
                    >
                      Agregar Servicio
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className={styles["serviceRow"]}>
          <Col>
            <Card className={styles["serviceCard"]}>
              <Card.Body className={styles["cardContainer"]}>
                <Row className={styles["rowInside"]}>
                  <Col xs={12} sm={12} md={7} lg={7} xl={7}>
                    <p className={styles["titleCard"]}>Universal +</p>
                    <p className={styles["subtitleCard"]}>
                      La mejor programación de estudios Universal
                    </p>
                    <p className={styles["priceCard"]}>$50</p>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={5}
                    lg={5}
                    xl={5}
                    className={styles["buttonCol"]}
                  >
                    <Button
                      href=""
                      variant="primary"
                      type="submit"
                      className={styles.button}
                    >
                      Agregar Servicio
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className={styles["serviceRow"]}>
          <Col>
            <Card className={styles["serviceCard"]}>
              <Card.Body className={styles["cardContainer"]}>
                <Row className={styles["rowInside"]}>
                  <Col xs={12} sm={12} md={7} lg={7} xl={7}>
                    <p className={styles["titleCard"]}>HBO</p>
                    <p className={styles["subtitleCard"]}>
                      Todo el contenido premium de HBO
                    </p>
                    <p className={styles["priceCard"]}>$50</p>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={5}
                    lg={5}
                    xl={5}
                    className={styles["buttonCol"]}
                  >
                    <Button
                      href=""
                      variant="primary"
                      type="submit"
                      className={styles.button}
                    >
                      Agregar Servicio
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AgregaServicios;
