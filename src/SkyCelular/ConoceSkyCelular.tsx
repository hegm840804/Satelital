import {Container, Row, Col, Card} from "react-bootstrap";
import styles from "./ConoceSkyCelular.module.css";
import Lineas from "./SkyCelularMejoraPlan/Lineas";

export const ConoceSkyCelular=()=>{

    return(
        <>
      <Container fluid className={styles["container"]}>
        <Row className={styles["p-tb-15"]}>
          <Col className={styles["p-conoce"]}>
            <span className={styles["spectrum"]}>Conoce Sky Celular</span>
          </Col>
        </Row>
        <Row className={styles["p-tb-15"]}>
          <Col md={{ offset: 1, span: 10 }}>
            <Container fluid>
              <Row>
                <Col lg={{ span: 4 }} className={styles["colPadding"]}>
                  <Card className={styles["backgroundCard"]}>
                    <Card.Body>
                      <Card.Title className={styles["titleCard"]}>
                        <span className={styles["titleCard"]}>
                          Mejor navegación
                        </span>
                      </Card.Title>
                      <Card.Text className={styles["bodyCard"]}>
                      Datos para navegar libremente por internet a un menor costo
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={{ span: 4 }} className={styles["colPadding"]}>
                  <Card className={styles["backgroundCard"]}>
                    <Card.Body>
                      <Card.Title className={styles["titleCard"]}>
                        <span className={styles["titleCard"]}>
                          Entretenimiento al alcance
                        </span>
                      </Card.Title>
                      <Card.Text className={styles["bodyCard"]}>
                        Redes sociales ilimitadas
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={{ span: 4 }}>
                  <Card className={styles["backgroundCard"]}>
                    <Card.Body>
                      <Card.Title className={styles["titleCard"]}>
                        <span className={styles["titleCard"]}>
                        Mantente en contacto
                        </span>
                      </Card.Title>
                      <Card.Text className={styles["bodyCard"]}>
                      Descuentos en tus equipos en tu paquete Sky
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row style={{ paddingTop: "30px", paddingBottom: "20px" }}>
          <Col style={{ textAlign: "center" }}>
            <span className={styles["titleMain"]}>¿Qué es Sky celular?</span>
          </Col>
        </Row>
          <Row>
            <Col className={styles["alineaTextoSecundario"]}>
              <p className={styles["textoSecundario"]}>Es el servicio de Telefonía Móvil de Sky que te permite tener comunicación a través de llamadas, SMS, datos y redes sociales.</p>
            </Col>
          </Row>
            <Row>
                <Col>
                    <Lineas muestra={false}/>
                </Col>
            </Row>
            
        </Container>
        </>
    );
}