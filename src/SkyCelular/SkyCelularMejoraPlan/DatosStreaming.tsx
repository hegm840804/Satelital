import styles from "./DatosStreaming.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Slider from "react-slick";

const DatosStreaming = () => {

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
      <Container className={styles["contenedorCabecera"]} fluid>
        <span className={styles["titlegris"]}>Contrata GB dedicados para tus aplicaciones de streaming</span>
        <p className={styles["subtitlegris"]}>Agrega paquetes de datos a tu plan para disfrutar de todo el entretenimiento sin preocupaciones.</p>
      </Container>
      <div id="big" className="d-none d-xl-block d-lg-block ">
        <Container className={styles["contenedor"]} fluid>
          <Row>
            <Col>
              <Card>
                <Card.Body className={styles["cuadro"]}>
                  <p className={styles["paquetegb"]}>HBO MAX</p>
                  <p className={styles["paqueteprecio"]}>$260</p>
                  <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                  <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body className={styles["cuadro"]}>
                  <p className={styles["paquetegb"]}>Youtube</p>
                  <p className={styles["paqueteprecio"]}>$260</p>
                  <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                  <div className={styles["alineaBoton"]}>
                  <Button className={styles["botonazul"]}>Agregar</Button>{' '}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body className={styles["cuadro"]}>
                  <p className={styles["paquetegb"]}>Amazon Prime</p>
                  <p className={styles["paqueteprecio"]}>$260</p>
                  <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                  <div className={styles["alineaBoton"]}>
                  <Button className={styles["botonazul"]}>Agregar</Button>{' '}
                  </div>

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div id="small" className="d-lg-none d-xl-none">
      <Container className={styles["contenedor"]}>
        <Slider {...settings}>

          <div>
               <Card style={{margin:'0 1vw 0 1vw'}}>
                 <Card.Body className={styles["cuadroSmall"]}>
                   <p className={styles["paquetegb"]}>HBO MAX</p>
                   <p className={styles["paqueteprecio"]}>$260</p>
                   <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                   <div className={styles["alineaBoton"]}>
                       <Button className={styles["botonazul"]}>Agregar</Button>
                   </div>
                 </Card.Body>
               </Card>
          </div>
          <div>
               <Card style={{margin:'0 1vw 0 1vw'}}>
                 <Card.Body className={styles["cuadroSmall"]}>
                   <p className={styles["paquetegb"]}>Youtube</p>
                   <p className={styles["paqueteprecio"]}>$260</p>
                   <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                   <div className={styles["alineaBoton"]}>
                   <Button className={styles["botonazul"]}>Agregar</Button>{' '}
                   </div>
                 </Card.Body>
               </Card>
          </div>
          <div>
               <Card style={{margin:'0 1vw 0 1vw'}}>
                 <Card.Body className={styles["cuadroSmall"]}>
                   <p className={styles["paquetegb"]}>Amazon Prime</p>
                   <p className={styles["paqueteprecio"]}>$260</p>
                   <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                   <div className={styles["alineaBoton"]}>
                   <Button className={styles["botonazul"]}>Agregar</Button>{' '}
                   </div>

                 </Card.Body>
               </Card>
          </div>

          </Slider>
        </Container>  
      </div>
    </>
  )
}

export default DatosStreaming