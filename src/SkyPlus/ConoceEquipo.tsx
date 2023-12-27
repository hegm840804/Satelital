import styles from "./ConoceEquipo.module.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import aparato from "../../src/assets/img/Iconos/Aparato.png";
import { Container } from "react-bootstrap";

const ConoceEquipo = () => {
  return (
    <>

      <div id="big" className="d-none d-xl-block d-lg-block ">

        <Container className={styles["contenedor"]} fluid>

          <span className={styles["spectrum"]}>Agrega un equipo adicional</span>
          <Row>
            <Col md={11}>
            </Col>
          </Row>
        </Container>
      </div>


      <div id="small" className="d-lg-none d-xl-none">

        <Container className={styles["contenedor"]} fluid>

          <span className={styles["spectrum"]}></span>
          <p className={styles["colorletra4"]}>Conoce todo lo que te ofrece tu plan actual</p>

          <Row>
            <Col md={11}>

              <Card id={styles["planactual"]} className={styles.contenedor}>
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col><span className={styles["colorletra"]}>Tu plan actual </span>
                        <span className={styles["colorletra2"]}> Gold</span>
                        <p className={styles["colorletra4"]}>120 canales, Sky Sport y acceso a 1 dispositivo móvil</p>
                        <p className={styles["colorletra3"]}>$200</p><br></br><br></br><br></br><br></br>
                        <p className={styles["colorletra6"]}>Facturado mensual</p>
                      </Col>
                    </Row>


                    <Row>
                      <Col className={styles["cuadro"]} md={6}>
                        <img src={aparato} className={styles["imagen"]} />
                        <p className={styles["colorletra"]}>Equipo Sky +</p>
                        <p className={styles["colorletra4"]}>$99</p>



                      </Col>


                    </Row>

                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>


    </>
  )
}

export default ConoceEquipo