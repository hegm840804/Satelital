import styles from "./PaquetesSkyInternet.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Slider from "react-slick";

const PaquetesSkyInternet = () => {
    const settings = {
        dots: false,
        infinite: true,
        //speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 2500,
        autoplay: true,
        autoplaySpeed: 2000,    
        cssEase: "linear"
      };
  return (
    <>
    <div id="big" className="d-none d-xl-block d-lg-block ">
    <span className={styles["titlegris"]}>Paquetes de datos Aceleralo</span>
    <p className={styles["subtitlegris"]}>Agrega paquetes de datos adicionales a tu plan para estar siempre conectado.</p>

    <Row className={styles["ancho"]}>
    <Col md={4}>

    <Card className={styles["cuadro"]}>
      <Card.Body>
        <p className={styles["paquetegb"]}>Paquete 1 GB</p>
        <p className={styles["paqueteprecio"]}>$260</p>
        <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
        <Button className={styles["botonazul"]}>Agregar</Button>{' '}

      
      </Card.Body>
    </Card>

    </Col>

    <Col md={4}>

<Card className={styles["cuadro"]}>
  <Card.Body>
    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
    <p className={styles["paqueteprecio"]}>$260</p>
    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
    <Button className={styles["botonazul"]}>Agregar</Button>{' '}

  
  </Card.Body>
</Card>

</Col>

<Col md={4}>

<Card className={styles["cuadro"]}>
  <Card.Body>
    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
    <p className={styles["paqueteprecio"]}>$260</p>
    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
    <Button className={styles["botonazul"]}>Agregar</Button>{' '}

  
  </Card.Body>
</Card>

</Col>


    

    
    </Row>


    </div>

      <div id="small" className="d-lg-none d-xl-none">
        <Container className={styles["contenedorCabeceraSmall"]}>
          <span className={styles["titlegris"]}>Paquetes de datos Aceleralo</span>
          <p className={styles["subtitlegris"]}>Agrega paquetes de datos adicionales a tu plan para estar siempre conectado.</p>
        </Container>

        <Container className={styles["contenedorSmall"]}>
          <Slider {...settings} >
            <div >
            <Card className={styles["cardSmall"]}>
              <Card.Body style={{paddingTop:'0px'}}>
                <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                <p className={styles["paqueteprecio"]}><b>$260</b></p>
                <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                <Button className={styles["botonazul"]}>Agregar</Button>{' '}
              </Card.Body>
            </Card>
            </div>
            <div>
            <Card className={styles["cardSmall"]}>
              <Card.Body style={{paddingTop:'0px'}}>
                <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                <p className={styles["paqueteprecio"]}><b>$260</b></p>
                <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                <Button className={styles["botonazul"]}>Agregar</Button>{' '}
              </Card.Body>
            </Card>
            </div>
            <div>
            <Card className={styles["cardSmall"]}>
              <Card.Body style={{paddingTop:'0px'}}>
                <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                <p className={styles["paqueteprecio"]}><b>$260</b></p>
                <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                <Button className={styles["botonazul"]}>Agregar</Button>{' '}
              </Card.Body>
            </Card>
            </div>            
 
          </Slider>    
        </Container>

      </div>    
    
    </>
  )
}

export default PaquetesSkyInternet