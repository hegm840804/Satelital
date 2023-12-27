import React, { useState } from "react";
import styles from "./Lineas.module.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import icono from "../../../src/assets/img/Iconos/whats.png";
import uber from "../../../src/assets/img/Iconos/uber.png";
import twit from "../../../src/assets/img/Iconos/twit.png";
import insta from "../../../src/assets/img/Iconos/insta.png";
import face from "../../../src/assets/img/Iconos/face.png";
import waze from "../../../src/assets/img/Iconos/waze.svg";
import pint from "../../../src/assets/img/Iconos/pint.svg";
import go from "../../../src/assets/img/Iconos/go.png";
import youtube from "../../../src/assets/img/Iconos/youtube.svg";
import tik from "../../../src/assets/img/Iconos/tik.svg";
import sencillo from "../../../src/assets/img/Iconos/PaqueteSencillo.png";
import full from "../../../src/assets/img/Iconos/PaqueteFull.png";
import streaming1 from "../../../src/assets/img/Iconos/Streaming1.png";
import streaming3 from "../../../src/assets/img/Iconos/Streaming3.png";
import check from "../../../src/assets/img/skyplus/Check.png";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Card, Stack } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import Loading from "../../General/Loading";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Pinterest, Tiktok } from "react-bootstrap-icons";

import { ModalC2C } from "../../General/ClickToCall/ModalC2C";
import { useModal } from "../../General/ClickToCall/UseModal";
import ModalMsgGracias from "../../General/ClickToCall/ModalMsgGracias";
import InputGroup from "react-bootstrap/InputGroup";

const Lineas = (muestra: any) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [loading, isLoading] = useState(false);
  const [cSlidesShow, setCSlidesShow] = useState(0);
  const [portable, isPortable] = useState(false);
  const [showPortable, isShowPortable] = useState(true);
  const sliderSettings = {
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    emulateTouch: true,
    dots: true,
    speed: 1000,
    autoplay: false,
    className: "sliders",

    responsive: [
      {
        breakpoint: 1200,
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
        breakpoint: 992,
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
    customPaging: (dots: any) => (
      <div className={"pt-5"} style={{}}>
        <div className={styles["pagingDot"]}></div>
      </div>
    ),
    dotsClass: "slick-dots " + styles["dotsSet"],
  };

  const [showModalGracias, setShowModalGracias] = useState(false);
  const { isShown, toggle } = useModal();
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState("");
  const [cleanInput, setCleanInput] = useState(false);

  function ocultaModal() {
    setShowModalGracias(true);
    toggle();
  }

  function onChange(event: any) {
    const re = /^[0-9\b]+$/;

    setCleanInput(false);

    if (event.target.value === "" || re.test(event.target.value)) {
      setValue(event.target.value);
    }
  }

  function accept() {
    setDisabled(!disabled);
  }

  function handleSubmit(event: any) {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceToken: "f516c2699951d8bd2226f9a4fb773a7b",
        serviceAction: "c2c",
        contactData: {
          firstname: `${event.target.elements.telephone.value}`,
          country: "MX",
          language: "es",
          phone: `${event.target.elements.telephone.value}`,
        },
      }),
    };

    fetch(
      "https://sky.convertia.com/public/integration/process",
      requestOptions
    );

    event.preventDefault();
    ocultaModal();
  }

  return (
    <>
      {muestra === true ? (
        <Container className={styles["contenedorCabecera"]} fluid>
          <p className={styles["titlegris"]}>Agrega líneas</p>
          <p className={styles["subtitlegris"]}>
            Adiciona líneas telefónicas a tu plan.
          </p>
        </Container>
      ) : (
        <></>
      )}

      <Container fluid>
        <Row>
          <Col
            xs={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 12, offset: 0 }}
          >
            <div className={styles["containerSlider"]}>
              {/*****   con portabilidad */}
              {/*****   sin portabilidad */}
              {true && (
                <>
                  <Slider {...sliderSettings} className={styles["sliders"]}>
                    <div className={styles["paddingSlide"]}>
                      <Card className={styles["cardOffer"]}>
                        <Card.Body
                          style={{
                            paddingLeft: "0",
                            paddingRight: "0",
                            paddingTop: "0",
                          }}
                        >
                          <Container fluid>
                            <Row style={{ height: "50px" }}></Row>
                            <Row
                              style={{
                                paddingLeft: "20px",
                                paddingRight: "20px",
                              }}
                            >
                              <Col>
                                <span className={styles["titleOffer"]}>
                                  Sky celular 2GB
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
                                  Precio de lista: $229
                                </span>
                              </Col>
                            </Row>

                            <Row
                              className={styles["spectrumNotPortableBorder"] + " " + (portable ? styles["spectrumBackground2G"] : "")}
                            >
                              <Col md={12}>
                                <Container fluid>
                                  <Row>
                                    <Col style={{ display: "flex" }}>
                                      <span
                                        className={portable ? styles["textXCostoWhite"] : styles["textSpectrum"] + " " + styles["textXCosto"]}
                                      >
                                        m&aacute;s 2GB de regalo
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <span
                                        className={portable ? styles["textSpectrumWhite"] : styles["textSpectrum"]}
                                        style={{ display: "block" }}
                                      >
                                        <span
                                          className={
                                            styles["textSpectrumCapacity"]
                                          }
                                        >
                                          4GB
                                        </span>
                                        <span
                                          className={
                                            styles["textSpectrumCosto"]
                                          }
                                        >
                                          <span
                                            className={styles["textXCosto"]}
                                          >
                                            {" "}
                                            x{" "}
                                          </span>{" "}

                                          {(portable ? <>$169</> : <>$199</>)}
                                          <sup
                                            className={
                                              styles["textXCosto"] +
                                              " " +
                                              styles["supClass"]
                                            }
                                          >{(portable ? <>(1)/mes</> : <>(2)/mes</>)}

                                          </sup>
                                        </span>
                                      </span>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Container fluid>
                                  <Row>
                                    <Col className={styles["pb-20"] + " " + styles["pt-10"]}>
                                      <Form>
                                        <Form.Check
                                          className={styles["styleCheckbox"]}
                                          type="switch"
                                          id={styles["custom-switch"]}
                                          label="Portabilidad"
                                          onClick={() => isPortable(!portable)}
                                          checked={portable}
                                        />
                                      </Form>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row className={styles["positionImg"]}>
                              <Col>
                                <Container fluid>
                                  <Row className={styles["pb-10"]}>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={{ span: 10 }} md={{ span: 10 }}>
                                      <span className={styles["subtitleOffer"]}>
                                        3GB para navegación libre
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={10} md={10}>
                                      <span className={styles["subtitleOffer"]}>
                                        1 GB para Streaming
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className={styles["pb-10"]}>
                                    <Col xs={{ offset: 1 }} md={{ offset: 1 }}>
                                      <Image
                                        src={go}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={10} md={10}>
                                      <span className={styles["subtitleOffer"]}>
                                        Redes sociales ilimitadas
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className={styles["pb-50"]}>
                                    <Col
                                      xs={{ offset: 1, span: 11 }}
                                      md={{ offset: 1, span: 11 }}
                                      className={
                                        styles["alignRedesSocialesImg"]
                                      }
                                    >
                                      <Image
                                        src={face}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={icono}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={twit}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row className={styles["pb-50"]}>
                              <Col>
                                <Button
                                  className={styles["botonazul"]}
                                  onClick={toggle}
                                >
                                  Contrata
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                      </Card>
                    </div>

                    <div className={styles["paddingSlide"]}>
                      <Card className={styles["cardOffer"]}>
                        <Card.Body
                          style={{
                            paddingLeft: "0",
                            paddingRight: "0",
                            paddingTop: "0",
                          }}
                        >
                          <Container fluid>
                            <Row style={{ height: "50px" }}></Row>
                            <Row
                              style={{
                                paddingLeft: "20px",
                                paddingRight: "20px",
                              }}
                            >
                              <Col>
                                <span className={styles["titleOffer"]}>
                                  Sky celular 4GB
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
                                  Precio de lista: $289
                                </span>
                              </Col>
                            </Row>

                            <Row
                              className={styles["spectrumNotPortableBorder"] + " " + (portable ? styles["spectrumBackground4G"] : "")}
                            >
                              <Col md={12}>
                                <Container fluid>
                                  <Row>
                                    <Col style={{ display: "flex" }}>
                                      <span
                                        className={portable ? styles["textXCostoWhite"] : styles["textSpectrum"] + " " + styles["textXCosto"]}
                                      >
                                        m&aacute;s 2GB de regalo
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <span
                                        className={portable ? styles["textSpectrumWhite"] : styles["textSpectrum"]}
                                        style={{ display: "block" }}
                                      >
                                        <span
                                          className={
                                            styles["textSpectrumCapacity"]
                                          }
                                        >
                                          6GB
                                        </span>
                                        <span
                                          className={
                                            styles["textSpectrumCosto"]
                                          }
                                        >
                                          <span
                                            className={styles["textXCosto"]}
                                          >
                                            {" "}
                                            x{" "}
                                          </span>{" "}
                                          {(portable ? <>$199</> : <>$229</>)}

                                          <sup
                                            className={
                                              styles["textXCosto"] +
                                              " " +
                                              styles["supClass"]
                                            }
                                          >
                                            {(portable ? <>(1)/mes</> : <>(2)/mes</>)}
                                          </sup>
                                        </span>
                                      </span>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Container fluid>
                                  <Row>
                                    <Col className={styles["pb-20"] + " " + styles["pt-10"]}>
                                      <Form>
                                        <Form.Check
                                          className={styles["styleCheckbox"]}
                                          type="switch"
                                          id={styles["custom-switch"]}
                                          label="Portabilidad"
                                          onClick={() => isPortable(!portable)}
                                          checked={portable}
                                        />
                                      </Form>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row className={styles["positionImg"]}>
                              <Col>
                                <Container fluid>
                                  <Row className={styles["pb-10"]}>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={{ span: 10 }} md={{ span: 10 }}>
                                      <span className={styles["subtitleOffer"]}>
                                        5GB para navegación libre
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={10} md={10}>
                                      <span className={styles["subtitleOffer"]}>
                                        1 GB para Streaming
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className={styles["pb-10"]}>
                                    <Col xs={{ offset: 1 }} md={{ offset: 1 }}>
                                      <Image
                                        src={go}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={10} md={10}>
                                      <span className={styles["subtitleOffer"]}>
                                        Redes sociales ilimitadas
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className={styles["pb-50"]}>
                                    <Col
                                      xs={{ offset: 1, span: 11 }}
                                      md={{ offset: 1, span: 11 }}
                                      className={
                                        styles["alignRedesSocialesImg"]
                                      }
                                    >
                                      <Image
                                        src={face}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={icono}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={twit}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={insta}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row className={styles["pb-50"]}>
                              <Col>
                                <Button
                                  className={styles["botonazul"]}
                                  onClick={toggle}
                                >
                                  Contrata
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                      </Card>
                    </div>

                    <div className={styles["paddingSlide"]}>
                      <Card className={styles["cardOffer"]}>
                        <Card.Body
                          style={{
                            paddingLeft: "0",
                            paddingRight: "0",
                            paddingTop: "0",
                          }}
                        >
                          <Container fluid>
                            <Row style={{ height: "50px" }}></Row>
                            <Row
                              style={{
                                paddingLeft: "20px",
                                paddingRight: "20px",
                              }}
                            >
                              <Col>
                                <span className={styles["titleOffer"]}>
                                  Sky celular 7GB
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
                                  Precio de lista: $399
                                </span>
                              </Col>
                            </Row>

                            <Row
                              className={styles["spectrumNotPortableBorder"] + " " + (portable ? styles["spectrumBackground7G"] : "")}
                            >
                              <Col md={12}>
                                <Container fluid>
                                  <Row>
                                    <Col style={{ display: "flex" }}>
                                      <span
                                        className={portable ? styles["textXCostoWhite"] : styles["textSpectrum"] + " " + styles["textXCosto"]}
                                      >
                                        m&aacute;s 2GB de regalo
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <span
                                        className={portable ? styles["textSpectrumWhite"] : styles["textSpectrum"]}
                                        style={{ display: "block" }}
                                      >
                                        <span
                                          className={
                                            styles["textSpectrumCapacity"]
                                          }
                                        >
                                          9GB
                                        </span>
                                        <span
                                          className={
                                            styles["textSpectrumCosto"]
                                          }
                                        >
                                          <span
                                            className={styles["textXCosto"]}
                                          >
                                            {" "}
                                            x{" "}
                                          </span>{" "}
                                          {(portable ? <>$299</> : <>$349</>)}

                                          <sup
                                            className={
                                              styles["textXCosto"] +
                                              " " +
                                              styles["supClass"]
                                            }
                                          >
                                            {(portable ? <>(1)/mes</> : <>(2)/mes</>)}
                                          </sup>
                                        </span>
                                      </span>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Container fluid>
                                  <Row>
                                    <Col className={styles["pb-20"] + " " + styles["pt-10"]}>
                                      <Form>
                                        <Form.Check
                                          className={styles["styleCheckbox"]}
                                          type="switch"
                                          id={styles["custom-switch"]}
                                          label="Portabilidad"
                                          onClick={() => isPortable(!portable)}
                                          checked={portable}
                                        />
                                      </Form>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row className={styles["positionImg"]}>
                              <Col>
                                <Container fluid>
                                  <Row className={styles["pb-10"]}>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={{ span: 10 }} md={{ span: 10 }}>
                                      <span className={styles["subtitleOffer"]}>
                                        8GB para navegación libre
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={10} md={10}>
                                      <span className={styles["subtitleOffer"]}>
                                        1 GB para Streaming
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className={styles["pb-10"]}>
                                    <Col
                                      xs={{ offset: 1, span: 11 }}
                                      md={{ offset: 1, span: 11 }}
                                      className={
                                        styles["alignRedesSocialesImg"]
                                      }
                                    >
                                      <Image
                                        src={go}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={youtube}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={tik}
                                        fluid
                                        className={styles["imgSize"]}
                                      />

                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={10} md={10}>
                                      <span className={styles["subtitleOffer"]}>
                                        Redes sociales ilimitadas
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className={styles["pb-50"]}>
                                    <Col
                                      xs={{ offset: 1, span: 11 }}
                                      md={{ offset: 1, span: 11 }}
                                      className={
                                        styles["alignRedesSocialesImg"]
                                      }
                                    >
                                      <Image
                                        src={face}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={icono}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={twit}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={insta}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={uber}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row className={styles["pb-50"]}>
                              <Col>
                                <Button
                                  className={styles["botonazul"]}
                                  onClick={toggle}
                                >
                                  Contrata
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                      </Card>
                    </div>


                    <div className={styles["paddingSlide"]}>
                      <Card className={styles["cardOffer"]}>
                        <Card.Body
                          style={{
                            paddingLeft: "0",
                            paddingRight: "0",
                            paddingTop: "0",
                          }}
                        >
                          <Container fluid>
                            <Row style={{ height: "50px" }}></Row>
                            <Row
                              style={{
                                paddingLeft: "20px",
                                paddingRight: "20px",
                              }}
                            >
                              <Col>
                                <span className={styles["titleOffer"]}>
                                  Sky celular 16GB
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
                                  Precio de lista: $599
                                </span>
                              </Col>
                            </Row>

                            <Row
                              className={styles["spectrumNotPortableBorder"] + " " + (portable ? styles["spectrumBackground2G"] : "")}
                            >
                              <Col md={12}>
                                <Container fluid>
                                  <Row>
                                    <Col style={{ display: "flex" }}>
                                      <span
                                        className={portable ? styles["textXCostoWhite"] : styles["textSpectrum"] + " " + styles["textXCosto"]}
                                      >
                                        m&aacute;s 4GB de regalo
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <span
                                        className={portable ? styles["textSpectrumWhite"] : styles["textSpectrum"]}
                                        style={{ display: "block" }}
                                      >
                                        <span
                                          className={
                                            styles["textSpectrumCapacity"]
                                          }
                                        >
                                          20GB
                                        </span>
                                        <span
                                          className={
                                            styles["textSpectrumCosto"]
                                          }
                                        >
                                          <span
                                            className={styles["textXCosto"]}
                                          >
                                            {" "}
                                            x{" "}
                                          </span>{" "}
                                          {(portable ? <>$409</> : <>$449</>)}

                                          <sup
                                            className={
                                              styles["textXCosto"] +
                                              " " +
                                              styles["supClass"]
                                            }
                                          >
                                            {(portable ? <>(1)/mes</> : <>(2)/mes</>)}
                                          </sup>
                                        </span>
                                      </span>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Container fluid>
                                  <Row>
                                    <Col className={styles["pb-20"] + " " + styles["pt-10"]}>
                                      <Form>
                                        <Form.Check
                                          className={styles["styleCheckbox"]}
                                          type="switch"
                                          id={styles["custom-switch"]}
                                          label="Portabilidad"
                                          onClick={() => isPortable(!portable)}
                                          checked={portable}
                                        />
                                      </Form>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row className={styles["positionImg"]}>
                              <Col>
                                <Container fluid>
                                  <Row className={styles["pb-10"]}>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={{ span: 10 }} md={{ span: 10 }}>
                                      <span className={styles["subtitleOffer"]}>
                                        17GB para navegación libre
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={10} md={10}>
                                      <span className={styles["subtitleOffer"]}>
                                        3 GB para Streaming
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className={styles["pb-10"]}>
                                    <Col
                                      xs={{ offset: 1, span: 11 }}
                                      md={{ offset: 1, span: 11 }}
                                      className={
                                        styles["alignRedesSocialesImg"]
                                      }
                                    >
                                      <Image
                                        src={go}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={youtube}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={tik}
                                        fluid
                                        className={styles["imgSize"]}
                                      />

                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={10} md={10}>
                                      <span className={styles["subtitleOffer"]}>
                                        Redes sociales ilimitadas
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className={styles["pb-50"]}>
                                    <Col
                                      xs={{ offset: 1, span: 11 }}
                                      md={{ offset: 1, span: 11 }}
                                      className={
                                        styles["alignRedesSocialesImg"]
                                      }
                                    >
                                      <Image
                                        src={face}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={icono}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={twit}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={insta}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={uber}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={waze}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row className={styles["pb-50"]}>
                              <Col>
                                <Button
                                  className={styles["botonazul"]}
                                  onClick={toggle}
                                >
                                  Contrata
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                      </Card>
                    </div>


                    <div className={styles["paddingSlide"]}>
                      <Card className={styles["cardOffer"]}>
                        <Card.Body
                          style={{
                            paddingLeft: "0",
                            paddingRight: "0",
                            paddingTop: "0",
                          }}
                        >
                          <Container fluid>
                            <Row style={{ height: "50px" }}></Row>
                            <Row
                              style={{
                                paddingLeft: "20px",
                                paddingRight: "20px",
                              }}
                            >
                              <Col>
                                <span className={styles["titleOffer"]}>
                                  Sky celular 23GB
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
                                  Precio de lista: $799
                                </span>
                              </Col>
                            </Row>

                            <Row
                              className={styles["spectrumNotPortableBorder"] + " " + (portable ? styles["spectrumBackground4G"] : "")}
                            >
                              <Col md={12}>
                                <Container fluid>
                                  <Row>
                                    <Col style={{ display: "flex" }}>
                                      <span
                                        className={portable ? styles["textXCostoWhite"] : styles["textSpectrum"] + " " + styles["textXCosto"]}
                                      >
                                        m&aacute;s 6GB de regalo
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <span
                                        className={portable ? styles["textSpectrumWhite"] : styles["textSpectrum"]}
                                        style={{ display: "block" }}
                                      >
                                        <span
                                          className={
                                            styles["textSpectrumCapacity"]
                                          }
                                        >
                                          29GB
                                        </span>
                                        <span
                                          className={
                                            styles["textSpectrumCosto"]
                                          }
                                        >
                                          <span
                                            className={styles["textXCosto"]}
                                          >
                                            {" "}
                                            x{" "}
                                          </span>{" "}

                                          {(portable ? <>$549</> : <>$649</>)}
                                          <sup
                                            className={
                                              styles["textXCosto"] +
                                              " " +
                                              styles["supClass"]
                                            }
                                          >
                                            {(portable ? <>(1)/mes</> : <>(2)/mes</>)}
                                          </sup>
                                        </span>
                                      </span>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Container fluid>
                                  <Row>
                                    <Col className={styles["pb-20"] + " " + styles["pt-10"]}>
                                      <Form>
                                        <Form.Check
                                          className={styles["styleCheckbox"]}
                                          type="switch"
                                          id={styles["custom-switch"]}
                                          label="Portabilidad"
                                          onClick={() => isPortable(!portable)}
                                          checked={portable}
                                        />
                                      </Form>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row className={styles["positionImg"]}>
                              <Col>
                                <Container fluid>
                                  <Row className={styles["pb-10"]}>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={{ span: 10 }} md={{ span: 10 }}>
                                      <span className={styles["subtitleOffer"]}>
                                        24GB para navegación libre
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={10} md={10}>
                                      <span className={styles["subtitleOffer"]}>
                                        5 GB para Streaming
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className={styles["pb-10"]}>
                                    <Col
                                      xs={{ offset: 1, span: 11 }}
                                      md={{ offset: 1, span: 11 }}
                                      className={
                                        styles["alignRedesSocialesImg"]
                                      }
                                    >
                                      <Image
                                        src={go}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={youtube}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={tik}
                                        fluid
                                        className={styles["imgSize"]}
                                      />

                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={1} md={1} className={styles["alignCheck"]}>
                                      <Image src={check} rounded />
                                    </Col>
                                    <Col xs={10} md={10}>
                                      <span className={styles["subtitleOffer"]}>
                                        Redes sociales ilimitadas
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className={styles["pb-50"]}>
                                    <Col
                                      xs={{ offset: 1, span: 11 }}
                                      md={{ offset: 1, span: 11 }}
                                      className={
                                        styles["alignRedesSocialesImg"]
                                      }
                                    >
                                      <Image
                                        src={face}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={icono}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={twit}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={insta}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={uber}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                      <Image
                                        src={waze}
                                        fluid
                                        className={styles["imgSize"]}
                                      />
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                            <Row className={styles["pb-50"]}>
                              <Col>
                                <Button
                                  className={styles["botonazul"]}
                                  onClick={toggle}
                                >
                                  Contrata
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                      </Card>
                    </div>
                  </Slider>

                  <ModalC2C
                    isShown={isShown}
                    hide={toggle}
                    headerText=""
                    modalContent={
                      <><Container>
                        <table className={styles.tableContrata}>
                          <tbody>
                            <tr>
                              <th>
                                <Form id="c2c" onSubmit={handleSubmit}>
                                  <div className="row ">
                                    <div className="col ">
                                      <Row>
                                        <Col className="colAlignStart ">
                                          <p className={styles.firstLine}>
                                            Déjanos tu número
                                          </p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className="pt-2">
                                          <p>
                                            <InputGroup size="lg"

                                              className={styles.numeroTel}
                                            >
                                              <Form.Control
                                                aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                name="telephone"
                                                maxLength={10}
                                                onChange={onChange}
                                                value={cleanInput ? "" : value}
                                              />
                                            </InputGroup>
                                          </p>
                                        </Col>
                                      </Row>
                                      <Row className="Row">
                                        <Col className="auto col-1 mr-2 pt-2">
                                          <input
                                            type="checkbox"
                                            checked={
                                              cleanInput ? false : !disabled
                                            }
                                            id="checkboxOneInput"
                                            className="styleCheck"
                                            onChange={accept}
                                          />
                                        </Col>
                                        <Col
                                          className={
                                            styles.colAceptaTerminos + " auto"
                                          }
                                        >
                                          <p className="mr-1">
                                            <a
                                              className={styles.linkTYC}
                                              href="/skycelular/tyc"
                                            >
                                              Acepto términos y condiciones
                                            </a>{" "}
                                          </p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <p>
                                            <button
                                              style={{ width: "100%" }}
                                              type="submit"
                                              className={
                                                styles.botonazul +
                                                " btn btn-lg btn-primary "
                                              }
                                              role="button"
                                              aria-pressed="true"
                                              disabled={disabled}
                                            //onClick={ocultaModal}
                                            >
                                              {"Te llamamos"}
                                            </button>
                                          </p>
                                        </Col>
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
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Lineas;
