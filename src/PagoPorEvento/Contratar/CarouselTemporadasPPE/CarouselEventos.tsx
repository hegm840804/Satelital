import { useState, useEffect } from "react";
import styles from "./CarouselTemporadasPPE.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { ModalDetallesEventoTemporada } from "../ModalDetallesEventoTemporada/ModalDetallesEventoTemporada";
import hustler from "../../../assets/img/adultos/hustler-desktop.jpg";
import hustlerM from "../../../assets/img/adultos/hustler-mobile.jpg";
import vextremo from "../../../assets/img/adultos/vextremo-desktop.jpg";
import vextremoM from "../../../assets/img/adultos/vextremo-mobile.jpg";
import tvhot from "../../../assets/img/adultos/tvhot-desktop.jpg";
import tvhotM from "../../../assets/img/adultos/tvhot-mobile.jpg";
import Loading from "../../../General/Loading";
import { decryptBase64ArrayByteToString } from "../../../Commons/EncriptText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  builtConsultaPagosPorEventEntrada,
  ConsultaPagosPorEvento_Entrada,
  ConsultaPagosPorEvento_Parametros,
  ConsultaPagosPorEvento_Respuesta,
} from "../../../Commons/Services/ConsultaPagosPorEvento";
import { ConsultaWS } from "../../../Commons/ServiciosBase";
import { Collapse, Row } from "react-bootstrap";
import flecha from "../../../assets/img/Iconos/flechaAbajo.svg";
import {
  builtInputVarRecargaConsultaPrecioRecargaInput, ConsultaPrecioRecarga_Parametros, RecargaConsultaPrecioRecarga_Entrada,
  RecargaConsultaPrecioRecarga_Respuesta
} from "../../../Commons/Services/ConsultaPrecioRecargaRest";

export const CarouselEventos = ({ aviso }: any) => {
  const [muestraModal, setMuestraModal] = useState<any>([]);
  const [eventos, setEventos] = useState<any>([]);
  const [loading, isLoading] = useState(false);
  const [saldoPre, setSaldoPre] = useState<string>();
  const [cSlidesShow, setCSlidesShow] = useState(0);


  const [collapse, setCollapse] = useState(false);

  const muestraCollapse = () => {
    setCollapse(!collapse);
  }
  interface Estado {
    id: number;
    muestra: boolean;
  }

  const handleClose = (index: number) => {
    setMuestraModal(
      muestraModal.map((e: Estado) =>
        e.id === index ? { ...e, muestra: false } : e
      )
    );
  };

  const handleShow = (index: number) => {
    setMuestraModal(
      muestraModal.map((e: Estado) =>
        e.id === index ? { ...e, muestra: true } : e
      )
    );
  };

  const doConsultaPagosPorEvento = async () => {
    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );

    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultaPagosPorEventoDO: ConsultaPagosPorEvento_Entrada =
      builtConsultaPagosPorEventEntrada(
        `${sessionStorage.getItem("Usuario")}`,
        `${tmp}`,
        "Y",
        `${sessionStorage.getItem("pais")}`,
        `${sessionStorage.getItem("Paquete")}`,
        "2",
        `%${sessionStorage.getItem("TipoCuenta")}%`
      );
    let ConsultaPagosPorEventoParametros = ConsultaPagosPorEvento_Parametros(
      ConsultaPagosPorEventoDO
    );

    let ConsultaPagosPorEventoRespuesta: ConsultaPagosPorEvento_Respuesta =
      await ConsultaWS(ConsultaPagosPorEventoParametros);

    if (
      ConsultaPagosPorEventoRespuesta.ppe &&
      ConsultaPagosPorEventoRespuesta.ppe != null &&
      ConsultaPagosPorEventoRespuesta.ppe.length > 0
    ) {
      let arreglo = ConsultaPagosPorEventoRespuesta.ppe;
      let arregloIndices: Estado[] = [];

      arreglo.forEach((element: object, i: number) => {
        arregloIndices.push({ id: i, muestra: false });
      });

      setEventos(arreglo);
      setCSlidesShow(arreglo.length);
      setMuestraModal(arregloIndices);
      isLoading(false);
    } else {
      console.warn("NO HAY DATOS PARA PROCESAR");
      setEventos([]);
      setMuestraModal(false);
      isLoading(false);
    }
  };

  const sliderSettings = {
    arrows: eventos.length >= 4 ? true : false,
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: eventos.length >= 4 ? true : false,
    emulateTouch: eventos.length >= 4 ? true : false,
    dots: eventos.length >= 4 ? true : false,
    speed: 1000,
    autoplay: eventos.length >= 4 ? true : false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {

          arrows: eventos.length >= 4 ? true : false,
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: eventos.length >= 4 ? true : false,
          emulateTouch: eventos.length >= 4 ? true : false,
          dots: eventos.length >= 4 ? true : false,
          speed: 1000,
          autoplay: eventos.length >= 4 ? true : false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          arrows: eventos.length >= 4 ? true : false,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: eventos.length >= 4 ? true : false,
          emulateTouch: eventos.length >= 4 ? true : false,
          dots: eventos.length >= 4 ? true : false,
          speed: 1000,
          autoplay: eventos.length >= 4 ? true : false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          arrows: eventos.length >= 4 ? true : false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: eventos.length >= 4 ? true : false,
          emulateTouch: eventos.length >= 4 ? true : false,
          dots: eventos.length >= 4 ? true : false,
          speed: 1000,
          autoplay: eventos.length >= 4 ? true : false,
        },
      },
    ],
  };

  const verificaSaldoPrepago = async (cuenta: any) => {
    const RecargaConsultaPrecioRecargaDO: RecargaConsultaPrecioRecarga_Entrada =
      builtInputVarRecargaConsultaPrecioRecargaInput(`${cuenta}`);
    let par = ConsultaPrecioRecarga_Parametros(RecargaConsultaPrecioRecargaDO);
    let RecargaConsultaPrecioRecargaRespuesta: RecargaConsultaPrecioRecarga_Respuesta =
      await ConsultaWS(par);

    if (
      RecargaConsultaPrecioRecargaRespuesta.EBMHeaderResponse &&
      RecargaConsultaPrecioRecargaRespuesta.EBMHeaderResponse.ErrorNegocio
        .Estado == "ok" &&
      RecargaConsultaPrecioRecargaRespuesta.EBMHeaderResponse.ErrorTecnico
        .code === "ok"
    ) {
      let cadena =
        RecargaConsultaPrecioRecargaRespuesta
          .Recarga_consultaPrecioRecarga_Salida.SALDO;
      setSaldoPre(cadena);
    } else {
      console.error(RecargaConsultaPrecioRecargaRespuesta.EBMHeaderResponse);
    }
  };

  const formateaTitulo = (titulo: any) => {
    titulo = titulo.replaceAll("-", "");
    titulo = titulo.replaceAll("HD", "");
    titulo = titulo.slice(0, 17);

    return titulo;
  }

  useEffect(() => {
    doConsultaPagosPorEvento();

    if (sessionStorage.getItem("tipoCliente") === "PRE") {
      verificaSaldoPrepago(sessionStorage.getItem("cuenta"));
    }
  }, []);

  const imagenesHardcode = [hustler, tvhot, vextremo];
  const imagenesHardcodeModal = [hustlerM, tvhotM, vextremoM];
  const sinopsis = [
    "Producciones creativas que buscan ir más allá de lo común. La intensidad de las películas realizadas en los mejores estudios ha sido su sello característico, contrátalo ahora en Mi Sky.",
    "Su contenido va más allá del entretenimiento para ofrecer un estilo de vida único y exclusivo, tanto para el individuo como para las parejas, contrátalo ahora en Mi Sky.",
    "Una programación que ofrece lo mejor del contenido premium de las productoras más importantes de la industria, contrátalo ahora en Mi Sky.",
  ];

  return (
    <>
      <Loading isLoading={loading} />

      <div id="big" className="d-none d-xl-block d-lg-block ">
        {eventos.length !== 0 ? (
          <Container fluid>
            <Row>
              <Col>
                <h1 className={styles.tituloPagina}>
                  <span className="textoSpectrum">Contratación: Eventos</span>
                </h1>
                <p className={styles.subtituloPagina}>
                  Contrata tu programa, serie o deporte favorito, para que no te
                  pierdas ni un minuto.
                </p>
              </Col>
            </Row>
          </Container>
        ) : (
          <></>
        )}
        <Container className={styles.contenedor} fluid>
          <Slider {...sliderSettings}>
            {eventos.map((item: any, index: number) => (
              <Col
                xs={12}
                md={6}
                lg={4}
                className={styles.espacioCard}
                key={index}
              >
                <Card className={styles.card}>
                  <Card.Img src={imagenesHardcode[index]} className={styles.img} />
                  <Card.Body className={styles.cardBody}>
                    <h3 className={styles.titulo}>
                      {formateaTitulo(item.displayvalue)}
                    </h3>
                    <Card.Text className={styles.info}>
                      <p className={styles.precioCard}><b>${item.price}</b></p>
                      <p className={styles.allday}>All day</p>
                    </Card.Text>
                    <Button
                      className={styles.boton}
                      onClick={() => handleShow(index)}
                    >
                      Contratar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {
              eventos.length === 3 ? <Col></Col> : <></>
            }
            {
              eventos.length === 2 ? <><Col></Col><Col></Col></> : <></>
            }
            {
              eventos.length === 1 ? <><Col></Col><Col></Col><Col></Col></> : <></>
            }

          </Slider>
        </Container>
      </div>

      {/***************************
Inicia seccion para celulares
*****************************/}

      <div id="small" className="d-lg-none d-xl-none">
        <Container >
          {eventos.length !== 0 ? (
          <Row>
            <hr className={styles.lineaSup} />
            <Col>
              <p style={{ marginBottom: "1vw" }} className={styles.peliculasSmall}><b>Eventos</b></p>
            </Col>
            <Col>
              <div className={styles.alineaFlecha}>
                <img src={flecha} aria-controls="example-collapse-text" aria-expanded={collapse} className={collapse === true ? styles["rota"] : styles["noRota"]}
                  onClick={muestraCollapse} />
              </div>
            </Col>
          </Row>)
          :
          <></>    
          }

          {eventos.map((item: any, index: number) => (
            <Collapse in={collapse}>
              <Row>
                <Col className={styles.cardCollapse}>
                  <Card className={styles.cardImgSmall} onClick={() => handleShow(index)}>
                    <Row>
                      <Col xs={4} className={styles.contenedorImgSmall}>
                        <div>
                          <Card.Img src={imagenesHardcode[index]} className={styles.imgSmall} />
                        </div>
                      </Col>
                      <Col xs={8} className={styles.contenedorItemSmall}>
                        <Card.Text className={styles.info}>
                          <p className={styles.precioCard}><b>{formateaTitulo(item.displayvalue)}</b></p>
                          <p className={styles.allday}>${item.price}/All day</p>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>


            </Collapse>
          ))}
          {eventos.length !== 0 ? 
          <Row>
            <hr className={styles.lineaInf} />
          </Row>
          :
          <></>
          }
        </Container>
      </div>

      {eventos.map((item: any, index: number) => (
        <ModalDetallesEventoTemporada
          key={index}
          show={muestraModal[index].muestra}
          handleClose={() => handleClose(index)}
          titulo={item.displayvalue}
          precio={item.price}
          canal={item.channel}
          canalDisplay={item.channeldisplay}
          idioma={item.idioma}
          subtitulos={item.subtitulos}
          // img={"https://serviciosenlinea.sky.com.mx/sky/imagenes/160X240/" + item.img }
          img={imagenesHardcodeModal[index]}
          //imgR={imagenesHardcode[index]}
          sinopsis={item.sinopsisvalue}
          area="Administracion de senal"
          subarea="Solicitud de OPPV"
          saldo={saldoPre}
          aviso={aviso}
        />
      ))}
    </>
  );
};
