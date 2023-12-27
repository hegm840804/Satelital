import styles from "./PaquetesDatosAdicionales.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Slider from "react-slick";
import arrowNext from "../../assets/img/Iconos/arrowNextCircle.png";

const PaquetesDatosAdicionales = () => {

  function ArrowNext(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={className}
        style={{ ...style, width: "20px", height: "auto" }}
      >
        <img src={arrowNext} />
      </div>
    );
  }

  const settings1 = {
    dots: false,
    infinite: true,
    //speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2500,
    autoplay: false,
    autoplaySpeed: 2000,    
    cssEase: "linear",
    nextArrow: <ArrowNext />
  };

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
    <Container className={styles["contenedorCabecera"]}>
    <h1 className={styles["spectrum"]}>
          <span className="textoSpectrum">Mejora tu plan</span>
    </h1>
      <p className={styles["title"]}>Cambia tu plan para que se amolde a tus necesidades.</p>
      <span className={styles["titlegris"]}>Paquetes de datos adicionales</span>
      <p className={styles["subtitlegris"]}>Agrega paquetes de datos a tu plan para estar siempre conectado.</p>
    </Container>

    <Container className={styles["contenedor"]} fluid>

    <div id="big" className="d-none d-xl-block d-lg-block ">
        <Slider {...settings1}>
          <div>
            <img
              className="d-block w-100"
            />
            <Row>
              <Col md={4}>
                <Card className={styles["cuadro"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className={styles["cuadro"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className={styles["cuadro"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>                            
              </Row>
          </div>
          <div>
            <img
              className="d-block w-100"
              src=""
            />
            <Row>
              <Col md={4}>
                <Card className={styles["cuadro"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className={styles["cuadro"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className={styles["cuadro"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>                            
            </Row>
          </div>
        </Slider>
      </div>

      {/******************************
       * Inicia seccion para celulares
       *******************************/}

      <div id="small" className="d-lg-none d-xl-none">
        <Slider {...settings}>
          <div>
            <Card className={styles["cuadroSmall"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
            </Card>
          </div>
          <div>
            <Card className={styles["cuadroSmall"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
            </Card>
          </div>
          <div>
            <Card className={styles["cuadroSmall"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
            </Card>
          </div>
          <div>
            <Card className={styles["cuadroSmall"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
            </Card>
          </div>
          <div>
            <Card className={styles["cuadroSmall"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
            </Card>
          </div>
          <div>
            <Card className={styles["cuadroSmall"]}>
                  <Card.Body style={{width:'100%', padding:'0px'}}>
                    <p className={styles["paquetegb"]}>Paquete 1 GB</p>
                    <p className={styles["paqueteprecio"]}>$260</p>
                    <p className={styles["paquetevigencia"]}>Vigencia de 30 días</p>
                    <div className={styles["alineaBoton"]}>
                      <Button className={styles["botonazul"]}>Agregar</Button>
                    </div>
                  </Card.Body>
            </Card>
          </div>                                                  
                    
        </Slider>
      </div>      
    </Container>

    </>
  )
}

export default PaquetesDatosAdicionales