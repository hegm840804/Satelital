import styles from "./ConoceSkyPlus.module.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import decodificadorImg from "../assets/img/skyplus/decodificador.png";
import decoControlImg from "../assets/img/skyplus/decoControl.png";
import vixImg from "../assets/img/skyplus/vix.png";
import startplus from "../assets/img/skyplus/startplus.png";
import check from "../assets/img/skyplus/Check.png";
import skysport from "../assets/img/skyplus/skysport.png";
import hbo from "../assets/img/skyplus/hbo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState, useRef, useContext } from "react";
import Slider from "react-slick";

import { ModalC2C } from '../General/ClickToCall/ModalC2C'
import { useModal } from '../General/ClickToCall/UseModal';
import ModalMsgGracias from '../General/ClickToCall/ModalMsgGracias';
import InputGroup from 'react-bootstrap/InputGroup';
import ContextFlujos from "../Context/ContextFlujos";

const ConoceSkyPlus = () => {
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

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
      <div className={styles[""]} style={{ margin: "0 10px" }}>
        <div className={styles["pagingDot"]}></div>
      </div>
    ),
    dotsClass: "slick-dots " + styles["dotsSet"]
  };


  const [showModalGracias, setShowModalGracias] = useState(false);
  const { isShown, toggle } = useModal();
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState("");
  const [cleanInput, setCleanInput] = useState(false);
  const { setSkyPlus, setSkyCelular, setPais } = useContext(ContextFlujos) as any;

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

  useEffect(() => {
    if (sessionStorage.getItem("flujos") === "Sky+") {
      setSkyPlus({ estado: false });
      setPais("MEX");
    }else{
      setPais(sessionStorage.getItem("pais"));
    }

    if (sessionStorage.getItem("flujos") === "DTH/SkyCelular" || sessionStorage.getItem("flujos") === "DTH/DTH/SkyCelular/Sky+") {
      setSkyCelular({ estado: true });
    }


  }, []);

  return (
    <>
      <Container
        fluid
        style={{ paddingBottom: "50px", fontFamily: "Sky, sans-serif" }}
      >
        <Row className={styles["p-tb-15"]}>
          <Col className="p-4">
            <span className={styles["spectrum"] + " " + styles["padding-container"]}>Conoce Sky+</span>
          </Col>
        </Row>
        <Row className={styles["p-tb-15"]}>
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
                <Col lg={{ span: 4 }} xs={12}>
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
          <Col
            xs={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 8, offset: 2 }}
          >
            <div className={styles["containerSlider"]}>
              <Slider {...settings} className={styles["sliders"]}>
                <div className={styles["paddingSlide"]}>
                  <Card className={styles["cardOffer"]}>
                    <Card.Body  className={styles["cardBody"]}>
                      <Container fluid>
                        <Row style={{ height: "50px" }}></Row>
                        <Row
                          style={{ paddingLeft: "20px", paddingRight: "20px" }}
                        >
                          <Col>
                            <span className={styles["titleOffer"]}>
                              Sky+ b&aacute;sico
                            </span>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            paddingBottom: "20px",
                          }}
                        >
                          <Col>
                            <span className={styles["subtitleOffer"]}>
                              Precio Regular: $399*
                            </span>
                          </Col>
                        </Row>

                        <Row className={styles["spectrumSkyBasico"]}>
                          <Col md={12}>
                            <Container fluid>
                              <Row>
                                <Col style={{ display: "flex" }}>
                                  <span className={styles["textCosto"]}>
                                    $299
                                  </span>
                                  <span>/mes*</span>
                                </Col>
                                <Col></Col>
                              </Row>
                              <Row>
                                <Col>x 3 meses domiciliando TDC</Col>
                              </Row>
                            </Container>
                          </Col>
                        </Row>
                        <Row
                          className={styles["positionImg"]}
                          style={{ paddingBottom: "10px" }}
                        >
                          <Col className={styles["colImgDecodificador"]}>
                            <Image id="bigScreen" className={"d-none d-sm-block d-md-block d-lg-block d-xl-block"} src={decodificadorImg} rounded />
                            <Image id="smallScreen" className={"d-sm-none d-md-none d-lg-none d-xl-none"} src={decoControlImg} rounded />
                          </Col>
                        </Row>
                        <Row className={styles["positionImg"]}>
                          <Col>
                            <Container fluid>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={3} md={3} className={styles["pr-0"]}>
                                  <Image src={vixImg} fluid />
                                </Col>
                                <Col xs={3} md={3} className={styles["pr-0"]}>
                                  <Image src={startplus} fluid />
                                </Col>
                                <Col xs={3} md={3} className={styles["pr-0"]}>
                                  <Image src={hbo} fluid />
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  xs={{ offset: 1, span: 9 }}
                                  md={{ offset: 1, span: 9 }}
                                >
                                  <span className={styles["subtitleOffer"]}>
                                    Incluidos hasta el 30 nov 2023
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={10} md={10}>
                                  <span className={styles["subtitleOffer"]}>
                                    80 canales de entretenimiento, deportes, y
                                    más...
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>
                                    1 equipo Sky+
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>
                                    Acceso a 1 dispositivo móvil
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col>
                                  <Image src={skysport} fluid />
                                </Col>
                              </Row>
                            </Container>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button
                              className={styles["botonazul"]}
                              onClick={toggle}
                            >
                              Contrata
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              className={styles["buttonLink"]}
                              variant="link"
                            >
                              Ver Canales
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Card.Body>
                  </Card>
                </div>
                <div className={styles["paddingSlide2"]}>
                  <Card className={styles["cardPremium"]}>
                    <Card.Body
                      style={{
                        paddingLeft: "0",
                        paddingRight: "0",
                        paddingTop: "0",
                      }}
                    >
                      <Container fluid>
                        <Row className={styles["muescaDestacado"]}>
                          <Col
                            md={{ offset: 2, span: 8 }}
                            sm={{ offset: 2, span: 8 }}
                            xs={{ offset: 2, span: 8 }}
                            className={styles["planDestacado"]}
                          >
                            <span>Plan destacado</span>
                          </Col>
                        </Row>
                        <Row
                          style={{ paddingLeft: "20px", paddingRight: "20px" }}
                        >
                          <Col>
                            <span className={styles["titleOffer"]}>
                              Sky+ premium
                            </span>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            paddingBottom: "20px",
                          }}
                        >
                          <Col>
                            <span className={styles["subtitleOffer"]}>
                              Precio Regular: $599*
                            </span>
                          </Col>
                        </Row>

                        <Row className={styles["spectrumSkyPremium"]}>
                          <Col md={12}>
                            <Container fluid>
                              <Row>
                                <Col style={{ display: "flex" }}>
                                  <span className={styles["textCosto"]}>
                                    $499
                                  </span>
                                  <span>/mes*</span>
                                </Col>
                                <Col></Col>
                              </Row>
                              <Row>
                                <Col>x 3 meses domiciliando TDC</Col>
                              </Row>
                            </Container>
                          </Col>
                        </Row>
                        <Row
                          className={styles["positionImg"]}
                          style={{ paddingBottom: "10px" }}
                        >
                          <Col className={styles["colImgDecodificador"]}>
                            <Image id="bigScreen" className={"d-none d-sm-block d-md-block d-lg-block d-xl-block"} src={decodificadorImg} rounded />
                            <Image id="smallScreen" className={"d-sm-none d-md-none d-lg-none d-xl-none"} src={decoControlImg} rounded />
                          </Col>
                        </Row>
                        <Row className={styles["positionImg"]}>
                          <Col>
                            <Container fluid>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={3} md={3} className={styles["pr-0"]}>
                                  <Image src={vixImg} fluid />
                                </Col>
                                <Col xs={3} md={3} className={styles["pr-0"]}>
                                  <Image src={startplus} fluid />
                                </Col>
                                <Col xs={3} md={3} className={styles["pr-0"]}>
                                  <Image src={hbo} fluid />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={{ offset: 1, span: 9 }}>
                                  <span className={styles["subtitleOffer"]}>
                                    Incluidos hasta el 30 nov 2023
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col>
                                  <span className={styles["subtitleOffer"]}>
                                    100 canales de entretenimiento, deportes, y
                                    más...
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>
                                    1 equipo Sky+
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col xs={9} md={9}>
                                  <span className={styles["subtitleOffer"]}>
                                    Acceso a 2 dispositivo móvil
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={1} md={1}>
                                  <Image src={check} rounded />
                                </Col>
                                <Col>
                                  <Image src={skysport} fluid />
                                </Col>
                              </Row>
                            </Container>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button
                              className={styles["botonazul"]}
                              onClick={toggle}
                            >
                              Contrata
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              className={styles["buttonLink"]}
                              variant="link"
                            >
                              Ver Canales
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Card.Body>
                  </Card>
                </div>
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>

      <ModalC2C
        isShown={isShown}
        hide={toggle}
        headerText=''
        modalContent={
          <><Container>
            <table className={styles.tableContrata}>
              <tbody><tr>
                <th>
                  <Form onSubmit={handleSubmit}>
                    <div className="row " >

                      <div className="col ">

                        <Row><Col className="colAlignStart ">
                          <p className={styles.firstLine}>Déjanos tu número</p></Col></Row>
                        <Row><Col className="pt-2"><p>
                          <InputGroup size="lg" className={styles.numeroTel}>

                            <Form.Control
                              aria-label="Small"
                              aria-describedby="inputGroup-sizing-sm"
                              name="telephone"
                              maxLength={10}
                              onChange={onChange}
                              value={cleanInput ? '' : value}
                            />
                          </InputGroup></p></Col>
                        </Row>
                        <Row className="Row">
                          <Col className="auto col-1 mr-2 pt-2">
                            <input type='checkbox' checked={cleanInput ? false : !disabled} id='checkboxOneInput' className="styleCheck" onChange={accept} />
                          </Col>
                          <Col className={styles.colAceptaTerminos + " auto"}>
                            <p className="mr-1"><a className={styles.linkTYC} href="/skycelular/tyc">Acepto términos y condiciones</a>  </p>
                          </Col></Row>
                        <Row>
                          <Col ><p>
                            <button style={{ width: "100%" }}
                              type="submit"
                              className={styles.botonazul +
                                " btn btn-lg btn-primary "
                              }
                              role="button"
                              aria-pressed="true"
                              disabled={disabled}
                            >
                              {"Te llamamos"}
                            </button></p></Col>
                        </Row>
                      </div>

                    </div>
                  </Form>
                </th>

              </tr>
              </tbody>
            </table>
            <br />
          </Container>
          </>
        }
      />

      <ModalMsgGracias show={showModalGracias} />






    </>
  );
};

export default ConoceSkyPlus;
