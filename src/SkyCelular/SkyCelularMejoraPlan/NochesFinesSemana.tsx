import styles from "./NochesFinesSemana.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Slider from "react-slick";

const NochesFinesSemana = () => {

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
        <span className={styles["titlegris"]}>Disfruta tus noches y fines de semana sin limites</span>
        <p className={styles["subtitlegris"]}>Agrega paquetes de datos a la medida de tus necesidades.</p>
      </Container>

      <div id="big" className="d-none d-xl-block d-lg-block ">
          <Container className={styles["contenedor"]} fluid>      
            <Row>
              <Col md={4}>

                <Card className={styles["cuadro"]}>
                  <Card.Body style={{padding:'0px'}}>
                    <p className={styles["paquetegb"]}><b>Fines de semana</b></p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>{' '}
                    </div>
                  </Card.Body>
                </Card>
              </Col>  

              <Col md={4}>

                <Card className={styles["cuadro"]}>
                  <Card.Body style={{padding:'0px'}}>
                    <p className={styles["paquetegb"]}><b>Noches y fines de semana</b></p>
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
                <Card className={styles["cuadroSmall"]}>
                  <Card.Body style={{padding:'0px 4vw 0 4vw'}}>
                    <Row >
                      <p className={styles["paquetegb"]}><b>Fines de semana</b></p>
                      <p className={styles["paqueteprecio"]}>$260</p>
                      <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                      <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                      </div>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className={styles["cuadroSmall"]}>
                  <Card.Body style={{padding:'0px 4vw 0 4vw'}}>
                    <Row>
                      <p className={styles["paquetegb"]}><b>Noches y fines de semana</b></p>
                      <p className={styles["paqueteprecio"]}>$260</p>
                      <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                      <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                      </div>
                    </Row>
                  </Card.Body>
                </Card>
               </div>
            </Slider>
          </Container>
      </div>         
    </>
  )
}

export default NochesFinesSemana