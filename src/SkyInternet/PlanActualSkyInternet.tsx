import styles from "./PlanActualSkyInternet.module.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";

const PlanActualSkyInternet = () => {
  return (
    <>

      <div id="big" className="d-none d-xl-block d-lg-block ">
          <span className={styles["spectrum"]}>Conoce tu plan actual</span>
        <p className={styles["title"]}>Revisa todo lo que te ofrece tu plan de internet.</p>
        <Row>
        <Col md={11}>

        <Card id={styles["planactual"]} className={styles.contenedor}>
          <Card.Body>
            <Card.Title>
            <Row>
            <Col><span className={styles["colorletra"]}>Tu plan actual </span><span className={styles["colorletra2"]}>Silver 60 MB por 30 meses</span></Col>
            <Col><span className={styles["colorletra3"]}>$200</span></Col>
          </Row>
          <Row>
            <Col><span className={styles["colorletra4"]}>Sky sports / SKY + TVE /</span></Col>
            <Col><span className={styles["colorletra6"]}>Facturado mensual</span></Col>
          </Row>
          </Card.Title>



          </Card.Body>
        </Card>
        </Col>
        </Row>
      </div>

      <div id="small" className="d-lg-none d-xl-none">
        <Container className={styles["contenedorCabeceraSmall"]}>
          <span className={styles["spectrum"]}>Conoce tu plan actual3</span>
          <p className={styles["title"]}>Revisa todo lo que te ofrece tu plan de internet.</p>
        </Container>

        <Container className={styles["contenedorSmall"]}>
            <Row>
              <Card id={styles["planactual"]}>
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <p><span className={styles["colorletraSmall"]}>Tu plan actual </span><span className={styles["colorletra2Small"]}><b>Silver 60 MB por 30 meses</b></span></p>
                      <p className={styles["colorletra3Small"]}><b>$200</b></p>
                    </Row>
                    <Row>
                      <p className={styles["colorletra6Small"]}>Facturado mensual</p>
                    </Row>
                  </Card.Title>
                </Card.Body>
              </Card>

            </Row>      
        </Container>  
      </div>    


    
    </>
  )
}

export default PlanActualSkyInternet