import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import styles from "./CardGallery.module.css";
import pagoRecurrenteButton from "../../../assets/img/Pagos/pagoRecurrenteButton.png";
import { ConsultaWS } from "../../../Commons/ServiciosBase";

import { ConfigRed } from "../../../Commons/ConfigRed";
import Slider from "react-slick";
import arrowNext from "../../../assets/img/Pagos/arrowNext.png";
import {
  GwGenerarURLBilleteraEBF_Respuesta,
  GwGenerarURLBilleteraEBF_Parametros,
  GwGenerarURLBilleteraEBF_Entrada,
  builtInputVarGwGenerarURLBilleteraEBFEntrada,
  builtInputVarProductos,
  Productos,
  builtInputVarProducto,
  Producto,
} from "../../../Commons/Services/GwGenerarURLBilleteraEBF";
import CardTarjetaItem from "./CardTarjetaItem";

import CardTarjetaItem4ModalCarousel from "./CardTarjetaItem4ModalCarousel";
import { ConsultarBilletera_Info } from "../../../Commons/Services/GwConsultarBilleteraEBF";

const CardGallery = (props: any) => {
  const {
    allItCards,
    oldCardValue,
    newCardValue,
    origen,
    changeCardClicked,
  }: any = {
    ...props,
  };

  var positionArray: number = oldCardValue;

  useEffect(() => {
    //newCardValue(0)
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current: any, next: any) => {
      newCardValue(next);
    },
  };

  function ArrowPrev(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={className}
        style={{ ...style, width: "auto", height: "auto" }}
      >
        <img style={{ transform: "rotate(180deg)" }} src={arrowNext} />
      </div>
    );
  }

  function ArrowNext(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={className}
        style={{ ...style, width: "auto", height: "auto" }}
      >
        <img src={arrowNext} />
      </div>
    );
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    getUrlWallet2(origen);
  }

  const validarNulosYIndefinidios = (param: any) => {
    var retorno: string = "";
    if (param != null && typeof param != "undefined") {
      retorno = param;
    } else {
      retorno = "";
    }

    return retorno;
  };

  function addOneDay() {
    var currentDate = Date.now() + 3600 * 1000 * 24;

    return currentDate;
  }

  const getPaisIso = (param: string) => {
    if (param === "Mexico") {
      return "MX";
    } else if (param === "Costa Rica") {
      return "CR";
    } else if (param === "Guatemala") {
      return "GT";
    } else if (param === "Honduras") {
      return "HN";
    } else if (param === "Nicaragua") {
      return "NI";
    } else if (param === "Panama") {
      return "PA";
    } else if (param === "Republica Dominicana") {
      return "DO";
    } else if (param === "El Salvador") {
      return "SV";
    } else {
      return "MX";
    }
  };

  const getPaisMoneda = (param: string) => {
    if (param === "Mexico") {
      return "MXN";
    } else if (param === "Costa Rica") {
      return "CRC";
    } else if (param === "Guatemala") {
      return "GTQ";
    } else if (param === "Honduras") {
      return "HNL";
    } else if (param === "Nicaragua") {
      return "NIO";
    } else if (param === "Panama") {
      return "USD";
    } else if (param === "Republica Dominicana") {
      return "DOP";
    } else if (param === "El Salvador") {
      return "USD";
    } else {
      return "MXN";
    }
  };

  const getUrlWallet2 = async (param1: string) => {
    //----------------------------------------------------------------------------------------------------------------------------
    var myRetorno = "";
    const ProductoDO: Producto = builtInputVarProducto("", "", "", "");
    const ProductosDO: Productos = builtInputVarProductos([ProductoDO]);
    const GwGenerarURLBilleteraEBFDO: GwGenerarURLBilleteraEBF_Entrada =
      builtInputVarGwGenerarURLBilleteraEBFEntrada(
        `${validarNulosYIndefinidios(sessionStorage.getItem("EmailNotif"))}`,
        "PENDIENTE",
        `${validarNulosYIndefinidios(sessionStorage.getItem("Producto"))}`,
        "TOKEN",
        "SEL",
        `${validarNulosYIndefinidios(sessionStorage.getItem("Nombre"))}`,
        `${validarNulosYIndefinidios(sessionStorage.getItem("APaterno"))}`,
        `${validarNulosYIndefinidios(sessionStorage.getItem("AMaterno"))}`,
        `${validarNulosYIndefinidios(
          sessionStorage.getItem("StreetAddrCalle")
        )}`,
        `${validarNulosYIndefinidios(sessionStorage.getItem("AddrNumNumExt"))}`,
        "",
        `${validarNulosYIndefinidios(
          sessionStorage.getItem("ProvinceColonia")
        )}`,
        `${getPaisIso(sessionStorage.getItem("PrimaryAccountCountry")!)}`,
        `${validarNulosYIndefinidios(sessionStorage.getItem("TelCasa"))}`,
        `${validarNulosYIndefinidios(sessionStorage.getItem("CountyDelMun"))}`,
        `${validarNulosYIndefinidios(sessionStorage.getItem("StateEstado"))}`,
        `${validarNulosYIndefinidios(sessionStorage.getItem("CountyDelMun"))}`,
        `${validarNulosYIndefinidios(sessionStorage.getItem("PostalCodeCP"))}`,
        `${addOneDay()}`,
        `${getPaisMoneda(
          validarNulosYIndefinidios(
            sessionStorage.getItem("PrimaryAccountCountry")!
          )
        )}`,
        param1 === "SkyCelular"
          ? `${validarNulosYIndefinidios(
              sessionStorage.getItem("cuentaMobile")
            )}`
          : `${validarNulosYIndefinidios(sessionStorage.getItem("cuenta"))}`,
        "",
        "",
        `${ConfigRed.returnUrlPayments}`,
        "",
        "",
        ProductosDO
      );

    let par = GwGenerarURLBilleteraEBF_Parametros(GwGenerarURLBilleteraEBFDO);
    let GwGenerarURLBilleteraEBFRespuesta: GwGenerarURLBilleteraEBF_Respuesta =
      await ConsultaWS(par);
    if (
      GwGenerarURLBilleteraEBFRespuesta.EBMHeaderResponse &&
      GwGenerarURLBilleteraEBFRespuesta.EBMHeaderResponse.ErrorNegocio.Estado ==
        "ok" &&
      GwGenerarURLBilleteraEBFRespuesta.EBMHeaderResponse.ErrorTecnico.code ===
        "ok"
    ) {
      myRetorno = GwGenerarURLBilleteraEBFRespuesta.URLBilletera;

      //window.location.replace(myRetorno);
    } else {
      console.error(GwGenerarURLBilleteraEBFRespuesta.EBMHeaderResponse);
    }
    //----------------------------------------------------------------------------------------------------------------------------

    //setMyUrlToReditect(myRetorno);

    window.location.replace(myRetorno);
  };

  if (allItCards.length < 1) {
    return (
      <Container>
        <Row className={styles["buttonEdit"]}>
          <img
            style={{ opacity: "0" }}
            src={pagoRecurrenteButton}
            className={styles["imgSize"] + " " + styles["imgLeft"]}
          />
        </Row>

        <Card className={styles["cardCredit"]}>
          <Card.Body>
            <Container>
              <Row>
                <Col
                  md={{ span: 10, offset: 1 }}
                  className={styles["centerLogoCreditCard"]}
                >
                  <Button
                    variant="link"
                    className={styles["fontSizeAddCard"] + " gris-oscuro"}
                    onClick={handleSubmit}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 10.5C7.19833 10.5 7.3647 10.4328 7.4991 10.2984C7.6335 10.164 7.70047 9.99787 7.7 9.8V7.7H9.8175C10.0158 7.7 10.1792 7.6328 10.3075 7.4984C10.4358 7.364 10.5 7.19787 10.5 7C10.5 6.80167 10.4328 6.6353 10.2984 6.5009C10.164 6.3665 9.99787 6.29953 9.8 6.3H7.7V4.1825C7.7 3.98417 7.6328 3.82083 7.4984 3.6925C7.364 3.56417 7.19787 3.5 7 3.5C6.80167 3.5 6.6353 3.5672 6.5009 3.7016C6.3665 3.836 6.29953 4.00213 6.3 4.2V6.3H4.1825C3.98417 6.3 3.82083 6.3672 3.6925 6.5016C3.56417 6.636 3.5 6.80213 3.5 7C3.5 7.19833 3.5672 7.3647 3.7016 7.4991C3.836 7.6335 4.00213 7.70047 4.2 7.7H6.3V9.8175C6.3 10.0158 6.3672 10.1792 6.5016 10.3075C6.636 10.4358 6.80213 10.5 7 10.5ZM7 14C6.03167 14 5.12167 13.8161 4.27 13.4484C3.41833 13.0807 2.6775 12.582 2.0475 11.9525C1.4175 11.3225 0.918867 10.5817 0.5516 9.73C0.184333 8.87833 0.000466667 7.96833 0 7C0 6.03167 0.183867 5.12167 0.5516 4.27C0.919333 3.41833 1.41797 2.6775 2.0475 2.0475C2.6775 1.4175 3.41833 0.918867 4.27 0.5516C5.12167 0.184333 6.03167 0.000466667 7 0C7.96833 0 8.87833 0.183867 9.73 0.5516C10.5817 0.919333 11.3225 1.41797 11.9525 2.0475C12.5825 2.6775 13.0814 3.41833 13.4491 4.27C13.8168 5.12167 14.0005 6.03167 14 7C14 7.96833 13.8161 8.87833 13.4484 9.73C13.0807 10.5817 12.582 11.3225 11.9525 11.9525C11.3225 12.5825 10.5817 13.0814 9.73 13.4491C8.87833 13.8168 7.96833 14.0005 7 14ZM7 12.6C8.55167 12.6 9.87303 12.0547 10.9641 10.9641C12.0552 9.8735 12.6005 8.55213 12.6 7C12.6 5.44833 12.0547 4.12697 10.9641 3.0359C9.8735 1.94483 8.55213 1.39953 7 1.4C5.44833 1.4 4.12697 1.9453 3.0359 3.0359C1.94483 4.1265 1.39953 5.44787 1.4 7C1.4 8.55167 1.9453 9.87303 3.0359 10.9641C4.1265 12.0552 5.44787 12.6005 7 12.6Z"
                        fill="#6E6E6E"
                      />
                    </svg>{" "}
                    Agregar nueva tarjeta
                  </Button>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    if (!changeCardClicked) {
      return (
        <Container
          style={{ paddingBottom: "10px" }}
          className={styles["alignCenterCenterColumn"]}
        >
          <Row
            style={{ paddingBottom: "10px" }}
            className={styles["alignCenterCenterColumn"]}
          >
            <Col md={{ span: 12 }} style={{ textAlign: "center" }}>
              <CardTarjetaItem
                onlyOneCard={allItCards[positionArray]}
                showEditButton="N"
              />
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container
          style={{ paddingBottom: "" }}
          className={styles[""]}
        >
          <Row
            style={{ paddingBottom: "" }}
            className={styles[""]}
          >
            <Col md={{ span: 12 }} style={{ textAlign: "center" }}>
              <Slider {...settings}>
                {allItCards.map(
                  (tarjeta: ConsultarBilletera_Info, index: number) => {
                    return (
                      <>
                        <CardTarjetaItem4ModalCarousel
                          key={"datMiTarjeta-" + tarjeta.Id}
                          onlyOneCard={tarjeta}
                          showEditButton="N"
                        />
                      </>
                    );
                  }
                )}
              </Slider>
            </Col>
          </Row>
        </Container>
      );
    }
  }
};

export default CardGallery;
