import styles from "./ConoceSkyPlusDTH.module.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import decodificadorImg from "../assets/img/skyplus/decodificador.png";
import decoControlImg from "../assets/img/skyplus/decoControl.png";
import vixImg from "../assets/img/skyplus/vix.svg";
import startplus from "../assets/img/skyplus/startplus.svg";
import check from "../assets/img/skyplus/Check.png";
import skysport from "../assets/img/skyplus/skysport.png";
import hbo from "../assets/img/skyplus/hbo.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";

import { ModalC2C } from '../General/ClickToCall/ModalC2C'
import { useModal } from '../General/ClickToCall/UseModal';
import ModalMsgGracias from '../General/ClickToCall/ModalMsgGracias';
import InputGroup from 'react-bootstrap/InputGroup';

const ConoceSkyPlusDTH = () => {
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [showModalGracias, setShowModalGracias] = useState(false);
  const { isShown, toggle } = useModal();
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState("");
  const [cleanInput, setCleanInput] = useState(false);

  const handleClose = () => {
    setDisabledButton(true);
    setShow(false);
    setShowMessage(true);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    className: "sliders",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
    customPaging: (dots: any) => (
      <div className={styles["barras"]} >
        <div className={styles["pagingDot"]}></div>
      </div>
    ),
    dotsClass: "slick-dots " + styles["dotsSet"]
  };




  function ocultaModal() {
    setShowModalGracias(true);
    toggle();
  }


  function onChange(event: any) {
    const re = /^[0-9\b]+$/;


    setCleanInput(false);

    if (event.target.value === '' || re.test(event.target.value)) {
      setValue(event.target.value);
    }
  }



  function accept() {
    setDisabled(!disabled);
  }

  function handleSubmit(event: any) {


    const requestOptions = {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
      body: JSON.stringify({
        "serviceToken": "f516c2699951d8bd2226f9a4fb773a7b",
        "serviceAction": "c2c",
        "contactData": {
          "firstname": `${event.target.elements.telephone.value}`,
          "country": "MX",
          "language": "es",
          "phone": `${event.target.elements.telephone.value}`
        }
      })
    }

    fetch('https://sky.convertia.com/public/integration/process', requestOptions);

    event.preventDefault();
    ocultaModal();
  }


  return (
    <>
      <Container fluid style={{ paddingBottom: "50px", fontFamily: "Sky, sans-serif" }}>

      <Row className={styles["p-tb-15"]}>
          <Col className={"p-4 " + styles.tituloSmall} >
            <span className={styles["spectrum"] + " " + styles["padding-container"]}>Conoce Sky+</span>
          </Col>
        </Row>
        <Row className={styles["rowCards"]}>
          <Col xl={{ offset: 1, span: 10 }} xs={{ offset: 0, span: 12 }}>
            <Container fluid>
              <Row>
                <Col lg={{ span: 4 }} xs={12} className={styles["colPadding"]}>
                  <Card className={styles["backgroundCard"]}>
                    <Card.Body>
                      <Card.Title className={styles["titleCard"]}>
                        <span className={styles["titleCard"]}>
                          Tus deportes preferidos
                        </span>
                      </Card.Title>
                      <Card.Text className={styles["bodyCard"]}>
                        Desde béisbol hasta las mejores ligas de Europa, todos
                        tus deportes favoritos en Sky sports.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={{ span: 4 }} xs={12} className={styles["colPadding"]}>
                  <Card className={styles["backgroundCard"]}>
                    <Card.Body>
                      <Card.Title className={styles["titleCard"]}>
                        <span className={styles["titleCard"]}>
                          Programación para todos
                        </span>
                      </Card.Title>
                      <Card.Text className={styles["bodyCard"]}>
                        Una experiencia de programación sin límites con nuestra
                        amplia variedad de canales en HD.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={{ span: 4 }} xs={12} className={styles["colPadding"]}>
                  <Card className={styles["backgroundCard"]}>
                    <Card.Body>
                      <Card.Title className={styles["titleCard"]}>
                        <span className={styles["titleCard"]}>
                          Cobertura satelital
                        </span>
                      </Card.Title>
                      <Card.Text className={styles["bodyCard"]}>
                        Sin interrupciones gracias a nuestra tecnología
                        satelital que abarca todo el territorio nacional.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row style={{ paddingTop: "30px", paddingBottom: "40px" }}>
          <Col style={{ textAlign: "center" }}>
            <span className={styles["titleMain"]}>Oferta Sky+</span>
          </Col>
        </Row>

        <Row>
          <Col xs={{ span: 12, offset: 0 }} lg={{ span: 12, offset: 0 }} xl={{ span: 8, offset: 2 }}>
            <div className={styles["containerSlider"]}>
              <Slider {...settings} className={styles["sliders"]}>
                <div className={styles["paddingSlide"]}>

                  {/**primer card */}
                  <Card className={styles["cardOffer"]}>
                    <Card.Body style={{paddingLeft: "0", paddingRight: "0", paddingTop: "0", }}>
                      <Container fluid>
                        <Row style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                          <Col className={styles["colTitulo"]}>
                            <p className={styles["tituloOferta"]}>Si tu paquete de Sky Satelital es 
                            <span className={styles["tituloOfertaBold"]}> Silver o Gold</span></p>
                            <p className={styles["tituloOfertaInf"]}>disfruta de <span className={styles["tituloOfertaBold2"]}> Sky+ Básico</span></p>
                          </Col>
                        </Row>
                        <Row className={styles["spectrumSkyBasico"]}>
                          <Col className={styles["colSpectrumBasico"]} md={12}>
                            <Container fluid>
                              <Row>
                                <Col style={{ display: "flex" }}>
                                  <span className={styles["textCosto"]}>$99</span><span>/mes*</span>
                                </Col>
                                <Col></Col>
                              </Row>
                            </Container>
                          </Col>
                        </Row>
                        <Row className={styles["positionImg1"]} >
                          <Col className={styles["colImgDecodificador"]}>
                          <Image  id="bigScreen" className={"d-none d-sm-block d-md-block d-lg-block d-xl-block " + styles["imgDeco"]}  src={decoControlImg} />
                            <Image  id="smallScreen"  className={"d-sm-none d-md-none d-lg-none d-xl-none " + styles["imgDeco"]}  src={decoControlImg}  />
                          </Col>
                        </Row>
                        <Row className={styles["positionImg2"]}>
                          <Col>
                            <Container fluid>
                              <Row >
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={4} md={4} className={styles["pr-0"]}>
                                  <Image src={vixImg} className={styles["vix"]} fluid />
                                </Col>
                                <Col xs={3} md={3} className={styles["pr-0"]}>
                                  <Image src={startplus} fluid />
                                </Col>
                                <Col xs={3} md={3} className={styles["pr-0"]}>
                                  <Image src={hbo} fluid />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={{ offset: 1, span: 9 }} md={{ offset: 1, span: 9 }}>
                                  <span className={styles["subtitleOfferSup"]}>incluidos hasta el 31 dic 2023</span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={10} md={10}>
                                  <span className={styles["subtitleOffer"]}>Más de 80 canales</span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>Lo mejor en HD</span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>Verdadero contenido 4K</span>
                                </Col>
                              </Row>
                              <Row>
                              <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                              <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>1 equipo Sky+</span>
                                </Col>
                              </Row>
                              <Row>
                              <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                              <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>Acceso a 1 dispositivo móvil</span>
                                </Col>
                              </Row>
                              <Row>
                              <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                              <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>Sky sports</span>
                                </Col>
                              </Row>
                            </Container>
                          </Col>
                        </Row>
                      </Container>
                    </Card.Body>
                  </Card>
                  {/**termina primer card */}
                </div>
                <div className={styles["paddingSlide2"]}>
                  {/**segunda card card */}
                  <Card className={styles["cardOffer"]}>
                    <Card.Body style={{paddingLeft: "0", paddingRight: "0", paddingTop: "0", }}>
                      <Container fluid>
                        <Row style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                          <Col className={styles["colTitulo"]}>
                            <p className={styles["tituloOferta"]}>Si tu paquete de Sky Satelital es 
                            <span className={styles["tituloOfertaBold"]}> Platinum</span>, disfruta</p>
                            <p className={styles["tituloOfertaInf"]}>de<span className={styles["tituloOfertaBold2"]}> Sky+ Premium</span></p>
                          </Col>
                        </Row>
                        <Row className={styles["spectrumSkyPremium"]}>
                          <Col className={styles["colSpectrumBasico"]} md={12}>
                            <Container fluid>
                              <Row>
                                <Col style={{ display: "flex" }}>
                                <span className={styles["textCosto"]}>$99</span><span>/mes*</span>
                                </Col>
                                <Col></Col>
                              </Row>
                            </Container>
                          </Col>
                        </Row>
                        <Row className={styles["positionImg1"]} >
                          <Col className={styles["colImgDecodificador"]}>
                          <Image  id="bigScreen" className={"d-none d-sm-block d-md-block d-lg-block d-xl-block " + styles["imgDeco"]}  src={decoControlImg} />
                            <Image  id="smallScreen"  className={"d-sm-none d-md-none d-lg-none d-xl-none " + styles["imgDeco"]}  src={decoControlImg}  />
                          </Col>
                        </Row>
                        <Row className={styles["positionImg2"]}>
                          <Col>
                            <Container fluid>
                              <Row >
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={4} md={4} className={styles["pr-0"]}>
                                  <Image src={vixImg} className={styles["vix"]} fluid />
                                </Col>
                                <Col xs={3} md={3} className={styles["pr-0"]}>
                                  <Image src={startplus} fluid />
                                </Col>
                                <Col xs={3} md={3} className={styles["pr-0"]}>
                                  <Image src={hbo} fluid />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={{ offset: 1, span: 9 }} md={{ offset: 1, span: 9 }}>
                                  <span className={styles["subtitleOfferSup"]}>incluidos hasta el 31 dic 2023</span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={10} md={10}>
                                  <span className={styles["subtitleOffer"]}>Más de 100 canales</span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>Lo mejor en HD</span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>Verdadero contenido 4K</span>
                                </Col>
                              </Row>
                              <Row>
                              <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                              <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>1 equipo Sky+</span>
                                </Col>
                              </Row>
                              <Row>
                              <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                              <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>Acceso a 1 dispositivo móvil</span>
                                </Col>
                              </Row>
                              <Row>
                              <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                              <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>Sky sports</span>
                                </Col>
                              </Row>
                            </Container>
                          </Col>
                        </Row>
                      </Container>
                    </Card.Body>
                  </Card>
                  {/**termina segunda card */}
                </div>
              </Slider>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className={styles["colAviso"]}>
            <Card className={styles["cardAviso"]}>
              <p className={styles["textoAviso1"]}>Llámanos y agrega Sky+ a tu entretenimiento</p>
              <p className={styles["textoAviso2"]}>55 4040 6237</p>
            </Card>
          </Col>
        </Row>
      </Container>








    </>
  );
};

export default ConoceSkyPlusDTH;
