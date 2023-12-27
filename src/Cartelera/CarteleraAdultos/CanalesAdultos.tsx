import { useState } from "react";
import styles from "./canalesAdultos.module.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Card1 from "../../assets/img/Carta/Carta1.png";
import Card2 from "../../assets/img/Carta/Carta2.png";
import Card3 from "../../assets/img/Carta/Carta3.png";
import arrowNext from "../../assets/img/Pagos/arrowNext.png";

import hbomax from "../../assets/img/Cartetelera/thumbnail/hbomax.png";
import disney from "../../assets/img/Cartetelera/thumbnail/disney.png";
import foxsports from "../../assets/img/Cartetelera/thumbnail/foxsports.png";
import universal from "../../assets/img/Cartetelera/thumbnail/universalplus.png";
import izzi from "../../assets/img/Cartetelera/thumbnail/Afizzionados.png";
import goldenpremier  from "../../assets/img/Cartetelera/thumbnail/golden.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import flecha from "../../assets/img/Iconos/flechaAbajo.svg";
import { Collapse, Row } from "react-bootstrap";

import { Canal } from "../../Commons/Services/ConsultarCartelera";
import juici from "../../assets/img/Cartetelera/thumbnail/juicy.jpg";
import venus from "../../assets/img/Cartetelera/thumbnail/venus.jpg";
import hustler_tv from "../../assets/img/Cartetelera/thumbnail/hustler-desktop.jpg";
import secrets from "../../assets/img/Cartetelera/thumbnail/secrets-desktop.jpg";
import tv_hot from "../../assets/img/Cartetelera/thumbnail/tvhot-desktop.jpg";
import ve_extremo from "../../assets/img/Cartetelera/thumbnail/vextremo-desktop.jpg";

const CanalesAdultos = (props: any) => {
  const { arrayAdultos2, indice2, muestra2,origen2 }: any = { ...props };
  //const [arTemporal, setTemporal] = useState(props);
  //const titles = arTemporal.titulos;

  const [collapse, setCollapse] = useState(false);
  const [muestraModal, setMuestraModal] = useState<any>([]);
  const muestraCollapse = () => {
    setCollapse(!collapse);
  };
  interface Estado {
    id: number;
    muestra: boolean;
  }
  const settingsSmall = {
    arrows: true,
    // slidesToShow: cSlidesShow < 4 ? cSlidesShow : 4,
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: true,
    emulateTouch: true,
    dots: true,
    speed: 1000,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          emulateTouch: true,
          dots: true,
          speed: 1000,
          autoplay: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          emulateTouch: true,
          dots: true,
          speed: 1000,
          autoplay: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          emulateTouch: true,
          dots: true,
          speed: 1000,
          autoplay: true,
        },
      },
    ],
  };

  const handleShow = (index: number) => {
    setMuestraModal(
      muestraModal.map((e: Estado) =>
        e.id === index ? { ...e, muestra: true } : e
      )
    );
  };

  //let arreglo = arTemporal.titulos;
  //let arregloIndices: Estado[] = [];

  //arreglo.forEach((element: object, i: number) => {
  //  arregloIndices.push({ id: i, muestra: false });
  //});

  const settingsBig = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const settingsSmallbackup = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2.85,
    slidesToScroll: 2,
  };

  const getImages = (titulo: string, source: string) => {
    if (titulo.includes("juici") || titulo.includes("Juici")) {
      return juici;
    } else if (titulo.includes("secrets") || titulo.includes("Secrets")) {
      return secrets;
    } else if (titulo.includes("venus") || titulo.includes("Venus")) {
      return venus;
    } else if (titulo.includes("hustler") || titulo.includes("Hustler")) {
      return hustler_tv;
    } else if (titulo.includes("HOT") || titulo.includes("Hot")) {
      return tv_hot;
    } else if (titulo.includes("Vextremo") || titulo.includes("vextremo")) {
      return ve_extremo;
    } else {
      return source;
    }
  };

  return (
    <>
      <div id="big" className="d-none d-xl-block d-lg-block ">
        <Container className={styles.contenedor} fluid>
          <p>
            <b>Disfruta de las opciones que tenemos para ti con cargo extra33.</b>
          </p>

          {arrayAdultos2.length >= 4 ? (
            <Row>
              <Slider {...settingsBig}>
                {arrayAdultos2.map((itemCanal: Canal, index: number) => (
                  <div
                    key={"SliderAlaCarta-00" + index}
                    style={{ paddingRight: "10px" }}
                  >
                    <Card
                      style={{ width: "18rem", padding: "20px 15px 10px 15px" }}
                    >
                      <img
                        src={getImages(itemCanal.nombre, itemCanal.imagen)}
                        className={styles.imagen}
                      />
                      <Card.Body className={styles.cardBody}>
                        <Card.Title className={styles.tituloazul}>
                          {itemCanal.nombre}
                        </Card.Title>
                        <Card.Text className={styles.price}>
                          <span className={styles.tituloazul2}>
                            ${itemCanal.precio}
                          </span>
                          <span className={styles.tituloazul3}>/mes</span>
                        </Card.Text>
                        <Button
                          variant="primary"
                          className={styles.botonazul}
                          onClick={() => {
                            indice2(index);
                            muestra2(false);
                            origen2('adultos')
                          }}
                        >
                          Contratar
                        </Button>{" "}
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Slider>
            </Row>
          ) : (
            <Row>
              {arrayAdultos2.map((itemCanal: Canal, index: number) => (
                <Col key={index}>
                  <Card
                    style={{ width: "18rem", padding: "20px 15px 10px 15px" }}
                  >
                    <img
                      src={getImages(itemCanal.nombre, itemCanal.imagen)}
                      className={styles.imagen}
                    />
                    <Card.Body className={styles.cardBody}>
                      <Card.Title className={styles.tituloazul}>
                        {itemCanal.nombre}
                      </Card.Title>
                      <Card.Text className={styles.price}>
                        <span className={styles.tituloazul2}>
                          ${itemCanal.precio}
                        </span>
                        <span className={styles.tituloazul3}>/mes</span>
                      </Card.Text>
                      <Button
                        variant="primary"
                        className={styles.botonazul}
                        onClick={() => {
                          indice2(index);
                          muestra2(false);
                          origen2('adultos')
                        }}
                      >
                        Contratar
                      </Button>{" "}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>

      <div id="small" className="d-lg-none d-xl-none">
        {
          <Container>
            <Row>
              <hr style={{ marginBottom: "1vw" }} />
              <Col>
                <p
                  style={{ marginBottom: "1vw" }}
                  className={styles.peliculasSmall}
                >
                  Aplicaciones
                </p>
              </Col>
              <Col>
                <div className={styles.alineaFlecha}>
                  <img
                    src={flecha}
                    aria-controls="example-collapse-text"
                    aria-expanded={collapse}
                    className={
                      collapse === true ? styles["rota"] : styles["noRota"]
                    }
                    onClick={muestraCollapse}
                  />
                </div>
              </Col>
              <hr />
            </Row>

            {arrayAdultos2.map((itemCanal: Canal, index: number) => (
              <Collapse in={collapse} key={index}>
                <Row>
                  <Col>
                    <Card
                      className={styles.cardImgSmall}
                      onClick={() => handleShow(index)}
                    >
                      <Row>
                        <Col xs={4} className={styles.contenedorImgSmall}>
                          <div>
                            <Card.Img
                              src={getImages(itemCanal.nombre, itemCanal.imagen)}
                              className={styles.imgSmall}
                              onClick={() => {
                                indice2(index);
                                muestra2(false);
                                origen2('adultos')
                              }}
                            />
                          </div>
                        </Col>
                        <Col xs={8} className={styles.contenedorItemSmall}>
                          <Card.Text className={styles.info}>
                            <p className={styles.precioCard}>
                              <b>{itemCanal.nombre.slice(0, 20)}</b>
                            </p>
                            <p className={styles.allday}>
                              ${itemCanal.precio}/All day
                            </p>
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Collapse>
            ))}
          </Container>
        }
      </div>
    </>
  );
};

export default CanalesAdultos;
