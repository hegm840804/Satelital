import styles from "./EquipoAdicional.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import aparato from "../../src/assets/img/Iconos/Aparato.png";
import control from "../../src/assets/img/Iconos/Control.png";
import { Container } from "react-bootstrap";

const EquipoAdicional = () => {
  return (
    <>
    <div id="big" className="d-none d-xl-block d-lg-block ">
    <Container className={styles["contenedor"]} fluid>
    <p className={styles["subtitlegris"]}>Agrega un equipo y expande tu expereciencia de entretenimiento</p>

    <Row>
    <Col md={11}>

    <Card className={styles["cuadro"]}>
      <Card.Body>
      <Row>
        <Col md={2}>
        <img src={aparato} className={styles["imagen"]}/>
        </Col>
        <Col md={5}>
        <p className={styles["paqueteprecio"]}>Televisión adicional</p>
        <p className={styles["subtitlegris2"]}>Precio</p>
        <p className={styles["subtitlegris3"]}>$50</p>

        </Col>
        <Col md={2}>
        <Button className={styles["botonazul"]}>Agregar</Button>{' '}
        </Col>
      </Row>
      </Card.Body>
    </Card>

    </Col>



    <Col md={11}>

        <Card className={styles["cuadro"]}>
          <Card.Body>
          <Row>
            <Col md={2}>
            <img src={control} className={styles["imagen2"]}/>
            </Col>
            <Col md={5}>
            <p className={styles["paqueteprecio"]}>Control remoto</p>
            <p className={styles["subtitlegris2"]}>Precio</p>
            <p className={styles["subtitlegris3"]}>$50</p>

            </Col>
            <Col md={2}>
            <Button className={styles["botonazul"]}>Agregar</Button>{' '}
            </Col>
          </Row>
          </Card.Body>
        </Card>

    </Col>

    
    </Row>
    </Container>
    </div>


    <div id="small" className="d-lg-none d-xl-none">
    <Container className={styles["contenedor"]} fluid>

<span className={styles["titlegris"]}>Lleva tu experiencia al siguiente nivel</span>
<p className={styles["subtitlegris"]}>Agrega un equipo Sky + adicional.</p>

<Row>
<Col md={11}>

<Card className={styles["cuadro"]}>
  <Card.Body>


  <Row>
    <Col md={6}>
    <img src={aparato} className={styles["imagen"]}/>
    </Col>
    <Col md={6}>
    <p className={styles["paqueteprecio"]}>Equipo Sky + adicional</p>
    <p className={styles["subtitlegris2"]}>Bajada</p>
    <p className={styles["subtitlegris3"]}>$50</p>
    <Button className={styles["botonazul"]}>Agregar</Button>{' '}


    </Col>
   
  </Row>



  
  </Card.Body>
</Card>

</Col>

</Row>
</Container>
</div>

    
    </>
  )
}

export default EquipoAdicional