import styles from "./MejoraPlanSkyInternet.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import check from "../../src/assets/img/Iconos/Check.png";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Slider from "react-slick";
import arrowNext from "../assets/img/Iconos/arrowNext.png";
import arrowPrev from "../assets/img/Iconos/arrowPrev.png";

const MejoraPlanSkyInternet = () => {


  function ArrowPrev2(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={className}
        style={{ ...style, width: "1px", height: "auto" }}
      >
        <img src={arrowPrev} />
      </div>
    );
  }

  function ArrowNext2(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={className}
        style={{ ...style, width: "1px", height: "auto" }}
      >
        <img src={arrowNext} />
      </div>
    );
  }

  function ArrowPrev(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={className}
        style={{ ...style, width: "1px", height: "auto", paddingLeft: "2vw" }}
      >
        <img src={arrowPrev} />
      </div>
    );
  }

  function ArrowNext(props: any) {
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

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <ArrowNext2 />,
    prevArrow: <ArrowPrev2 />

  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />

  };




  return (
    <>

      <div id="big" className="d-none d-xl-block d-lg-block ">
        <span className={styles["spectrum"]}>Mejora tu plan</span>
        <p className={styles["title"]}>Agrega más datos a tu plan</p>
        <br />
        <Container style={{ marginLeft: '0px', marginRight: '0px' }}>
          <Slider {...settings2} >
            <div className={styles["separador"]}>
              <Card className={styles["cuadro"]}>
                <Card.Body>
                  <p className={styles["paquetegb"]}>Sky básico <span className={styles["paquetegbbold"]}>30 Megas</span></p>
                  <span className={styles["paqueteprecio"]}>$599</span> <span className={styles["paquetemes"]}>/ mes</span>
                  <hr />
                  <p><span className={styles["textos2"]}>Antes $619/mes</span></p>
                  <span className={styles["subtitlemorado"]}>Qué incluye</span>


                  <p><span className={styles["textos2"]}>Disfruta navegando con 60 megas por 6 meses</span></p>
                  <p><img src={check} /><span className={styles["textosbold"]}> Sky + básico con 117 canales</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> 1 equipo Sky +</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> Sky sports</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> 1 dispositivo móvil</span></p>


                  <Button className={styles["botonazul"]}>Mejora tu plan</Button>{' '}
                </Card.Body>
              </Card>
            </div>
            <div className={styles["separador"]}>
              <Card className={styles["cuadro"]}>
                <Card.Body>
                  <p className={styles["paquetegb"]}>Sky básico <span className={styles["paquetegbbold"]}>50 Megas</span></p>
                  <span className={styles["paqueteprecio"]}>$669</span> <span className={styles["paquetemes"]}>/ mes</span>
                  <hr />
                  <p><span className={styles["textos2"]}>Antes $719/mes</span></p>
                  <span className={styles["subtitlemorado"]}>Qué incluye</span>


                  <p><span className={styles["textos2"]}>Disfruta navegando con 60 megas por 6 meses</span></p>
                  <p><img src={check} /><span className={styles["textosbold"]}> Sky + básico con 117 canales</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> 1 equipo Sky +</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> Sky sports</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> 1 dispositivo móvil</span></p>


                  <Button className={styles["botonazul"]}>Mejora tu plan</Button>{' '}
                </Card.Body>
              </Card>
            </div>
            <div className={styles["separador"]}>
              <Card className={styles["cuadro"]}>
                <Card.Body>
                  <p className={styles["paquetegb"]}>Sky básico <span className={styles["paquetegbbold"]}>100 Megas</span></p>
                  <span className={styles["paqueteprecio"]}>$769</span> <span className={styles["paquetemes"]}>/ mes</span>
                  <hr />
                  <p><span className={styles["textos2"]}>Antes $839/mes</span></p>
                  <span className={styles["subtitlemorado"]}>Qué incluye</span>


                  <p><span className={styles["textos2"]}>Disfruta navegando con 60 megas por 6 meses</span></p>
                  <p><img src={check} /><span className={styles["textosbold"]}> Sky + básico con 117 canales</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> 1 equipo Sky +</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> Sky sports</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> 1 dispositivo móvil</span></p>


                  <Button className={styles["botonazul"]}>Mejora tu plan</Button>{' '}
                </Card.Body>
              </Card>
            </div>
            <div className={styles["separador"]}>
              <Card className={styles["cuadro"]}>
                <Card.Body>
                  <p className={styles["paquetegb"]}>Sky básico <span className={styles["paquetegbbold"]}>100 Megas</span></p>
                  <span className={styles["paqueteprecio"]}>$769</span> <span className={styles["paquetemes"]}>/ mes</span>
                  <hr />
                  <p><span className={styles["textos2"]}>Antes $839/mes</span></p>
                  <span className={styles["subtitlemorado"]}>Qué incluye</span>


                  <p><span className={styles["textos2"]}>Disfruta navegando con 60 megas por 6 meses</span></p>
                  <p><img src={check} /><span className={styles["textosbold"]}> Sky + básico con 117 canales</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> 1 equipo Sky +</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> Sky sports</span></p>
                  <p><img src={check} /><span className={styles["textos"]}> 1 dispositivo móvil</span></p>


                  <Button className={styles["botonazul"]}>Mejora tu plan</Button>{' '}
                </Card.Body>
              </Card>
            </div>

          </Slider>
        </Container>
      </div>


      {/******************************
       * Inicia seccion para celulares
       *******************************/}
      <div id="small" className="d-lg-none d-xl-none">
        <Container className={styles["contenedorCabeceraSmall"]}>
          <span className={styles["spectrumSmall"]}>Mejora tu plan</span>
          <p className={styles["title"]}>Agrega más datos a tu plan</p>
        </Container>

        <Container className={styles["contenedorSmall"]}>
          <Slider {...settings} >
            <Card className={styles["cuadroSmall"]}>
              <Card.Body>
                <p className={styles["paquetegb"]}>Sky básico <span className={styles["paquetegbbold"]}>30 Megas</span></p>
                <span className={styles["paqueteprecio"]}>$599</span> <span className={styles["paquetemes"]}>/ mes</span>
                <p><span className={styles["textos2"]}>Antes $619/mes</span></p>
                <hr />
                <p className={styles["subtitlemorado"]}>Qué incluye</p>

                <p className={styles["textos2"]}><span>Disfruta navegando con 60 megas por 6 meses</span></p>
                <Stack direction="horizontal">
                  <p > <img src={check} /></p><p className={styles["textosbold"]}><b>Sky + básico con 117 canales</b></p>
                </Stack>
                <Stack direction="horizontal">
                  <p><img src={check} /></p><p className={styles["textos"]}> 1 equipo Sky +</p>
                </Stack>
                <Stack direction="horizontal">
                  <p><img src={check} /></p><p className={styles["textos"]}> Sky sports</p>
                </Stack>
                <Stack direction="horizontal">
                  <p><img src={check} /></p><p className={styles["textos"]}>  1 dispositivo móvil</p>
                </Stack>

                <Button className={styles["botonazul"]}>Mejora tu plan</Button>{' '}
              </Card.Body>
            </Card>







            <Card className={styles["cuadroSmall"]}>
              <Card.Body>
                <p className={styles["paquetegb"]}>Sky básico <span className={styles["paquetegbbold"]}>30 Megas</span></p>
                <span className={styles["paqueteprecio"]}>$599</span> <span className={styles["paquetemes"]}>/ mes</span>
                <p><span className={styles["textos2"]}>Antes $619/mes</span></p>
                <hr />
                <p className={styles["subtitlemorado"]}>Qué incluye</p>

                <p className={styles["textos2"]}><span>Disfruta navegando con 60 megas por 6 meses</span></p>
                <Stack direction="horizontal">
                  <p > <img src={check} /></p><p className={styles["textosbold"]}><b>Sky + básico con 117 canales</b></p>
                </Stack>
                <Stack direction="horizontal">
                  <p><img src={check} /></p><p className={styles["textos"]}> 1 equipo Sky +</p>
                </Stack>
                <Stack direction="horizontal">
                  <p><img src={check} /></p><p className={styles["textos"]}> Sky sports</p>
                </Stack>
                <Stack direction="horizontal">
                  <p><img src={check} /></p><p className={styles["textos"]}>  1 dispositivo móvil</p>
                </Stack>

                <Button className={styles["botonazul"]}>Mejora tu plan</Button>{' '}
              </Card.Body>
            </Card>




            <Card className={styles["cuadroSmall"]}>
              <Card.Body>
                <p className={styles["paquetegb"]}>Sky básico <span className={styles["paquetegbbold"]}>30 Megas</span></p>
                <span className={styles["paqueteprecio"]}>$599</span> <span className={styles["paquetemes"]}>/ mes</span>
                <p><span className={styles["textos2"]}>Antes $619/mes</span></p>
                <hr />
                <p className={styles["subtitlemorado"]}>Qué incluye</p>

                <p className={styles["textos2"]}><span>Disfruta navegando con 60 megas por 6 meses</span></p>
                <Stack direction="horizontal">
                  <p > <img src={check} /></p><p className={styles["textosbold"]}><b>Sky + básico con 117 canales</b></p>
                </Stack>
                <Stack direction="horizontal">
                  <p><img src={check} /></p><p className={styles["textos"]}> 1 equipo Sky +</p>
                </Stack>
                <Stack direction="horizontal">
                  <p><img src={check} /></p><p className={styles["textos"]}> Sky sports</p>
                </Stack>
                <Stack direction="horizontal">
                  <p><img src={check} /></p><p className={styles["textos"]}>  1 dispositivo móvil</p>
                </Stack>

                <Button className={styles["botonazul"]}>Mejora tu plan</Button>{' '}
              </Card.Body>
            </Card>



          </Slider>
        </Container>
      </div>



    </>
  )
}

export default MejoraPlanSkyInternet