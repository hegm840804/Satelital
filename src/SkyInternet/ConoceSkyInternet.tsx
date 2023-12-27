import styles from "./ConoceSkyInternet.module.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";

const ConoceSkyInternet = () => {
  return (
    <>
    <div id="big" className="d-none d-xl-block d-lg-block ">
    <span className={styles["spectrum"]}>Conoce Sky Internet</span>
  <p className={styles["title"]}>Incorporamos a la familia Sky el servicio de Internet de Banda Ancha, en alianza con IZZI, para ofrecer a nuestros clientes internet<br/> inalámbrico de fibra óptica y cable coaxial.</p>
  <br/>


  <Row className={styles["ancho"]}>
  <Col md={4}>

  <Card className={styles["cuadro"]}>
    <Card.Body>
      <p className={styles["paquetegb"]}>Disfruta de TV + Internet</p>
      <p className={styles["paquetevigencia"]}>La mejor programación de TV de paga más la mejor conexión a internet.</p>

    
    </Card.Body>
  </Card>

  </Col>

  
  <Col md={4}>

  <Card className={styles["cuadro"]}>
    <Card.Body>
      <p className={styles["paquetegb"]}>Doble de Megas los primeros tres meses</p>
      <p className={styles["paquetevigencia"]}>Disfruta del doble megas para navegar al contratar Sky Internet.</p>

    
    </Card.Body>
  </Card>

  </Col>

  <Col md={4}>

  <Card className={styles["cuadro"]}>
    <Card.Body>
      <p className={styles["paquetegb"]}>Sky sports</p>
      <p className={styles["paquetevigencia"]}>Programación exclusiva para los expertos y fanáticos del deporte.</p>

    
    </Card.Body>
  </Card>

  </Col>

 
  </Row>

    </div>

    {/***************************
     Inicia Seccion para celulares
     ****************************/}

    <div id="small" className="d-lg-none d-xl-none">
      <Container className={styles["contenedorCabeceraSmall"]} >
        <span className={styles["spectrum"]}>Conoce Sky Internet</span>
        <p className={styles["title"]}>Cambia tu plan para que se amolde a tus necesidades.</p>
      </Container>

      <Row>
        <p className={styles["paquetegb"]}>Disfruta de TV + Internet</p>
        <p className={styles["paquetevigencia"]}>Bajada</p>
      </Row>
      <Row>
        <p className={styles["paquetegb"]} style={{lineHeight:'5vw', marginBottom:'2vw'}}>Doble de Megas los primeros <br/>tres meses</p>
        <p className={styles["paquetevigencia"]}>Bajada</p>          
      </Row>
      <Row>
        <p className={styles["paquetegb"]}>Sky sports</p>
        <p className={styles["paquetevigencia"]}>Bajada</p>          
      </Row>
    </div>    
 
  </>
  )
}

export default ConoceSkyInternet