import { useState, useEffect, useContext } from "react";
import styles from "./CarouselTemporadasPPE.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { ModalDetallesEventoTemporada } from "../ModalDetallesEventoTemporada/ModalDetallesEventoTemporada";
import gato from "../../../assets/img/Skypremiere/Desktop/208x200/gatoconbotas_208x200.png";
import gatoM from "../../../assets/img/Skypremiere/Desktop/205x308/gatoconbotas_205x308.png";
import halloween from "../../../assets/img/Skypremiere/Desktop/208x200//halloweenends_208x200.png";
import halloweenM from "../../../assets/img/Skypremiere/Desktop/205x308/halloweenends_205x308.png";
import megan from "../../../assets/img/Skypremiere/Desktop/208x200//m3gan_208x200.png";
import meganM from "../../../assets/img/Skypremiere/Desktop/205x308/m3gan_205x308.png";
import noche from "../../../assets/img/Skypremiere/Desktop/208x200/Nochedepaz_208x200.png";
import nocheM from "../../../assets/img/Skypremiere/Desktop/205x308/Nochedepaz_205x308.png";
import scream from "../../../assets/img/Skypremiere/Desktop/208x200/scream_208x200.png";
import screamM from "../../../assets/img/Skypremiere/Desktop/205x308/scream_205x308.png";
import top from "../../../assets/img/Skypremiere/Desktop/208x200//topgunmaverick_208x200.png";
import topM from "../../../assets/img/Skypremiere/Desktop/205x308/topgunmaverick_205x308.png";
import veng from "../../../assets/img/Skypremiere/Desktop/208x200/vengeance_208x200.png";
import vengM from "../../../assets/img/Skypremiere/Desktop/205x308/vengeance_205x308.png";
import paradise from "../../../assets/img/Skypremiere/Desktop/208x200/viajealparaiso_208x200.png";
import paradiseM from "../../../assets/img/Skypremiere/Desktop/205x308/viajealparaiso_205x308.png";
import { decryptBase64ArrayByteToString } from "../../../Commons/EncriptText";
import Loading from "../../../General/Loading";
import {
  builtInputVarRecargaConsultaPrecioRecargaInput,
  ConsultaPrecioRecarga_Parametros,
  RecargaConsultaPrecioRecarga_Entrada,
  RecargaConsultaPrecioRecarga_Respuesta,
} from "../../../Commons/Services/ConsultaPrecioRecargaRest";
import { ConsultaWS } from "../../../Commons/ServiciosBase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  builtConsultaPagosPorEventEntrada,
  ConsultaPagosPorEvento_Entrada,
  ConsultaPagosPorEvento_Parametros,
  ConsultaPagosPorEvento_Respuesta,
} from "../../../Commons/Services/ConsultaPagosPorEvento";
import flecha from "../../../assets/img/Iconos/flechaAbajo.svg";
import { Collapse, Modal, Row, Stack } from "react-bootstrap";
import {
  builtConsultarSaldosCorrientesInput,
  ConsultarSaldosCorrientes_Entrada,
  ConsultarSaldosCorrientes_Parametros,
  ConsultarSaldosCorrientes_Respuesta,
} from "../../../Commons/Services/ConsultarSaldosCorrientesRest";
import ContextFlujos from "../../../Context/ContextFlujos";

export const CarouselTemporadasPPE = ({ aviso }: any) => {
  const [muestraModal, setMuestraModal] = useState<any>([]);
  const [eventos, setEventos] = useState<any>([]);
  const [loading, isLoading] = useState(false);
  //const [saldoPre, setSaldoPre] = useState("");
  const [cSlidesShow, setCSlidesShow] = useState(0);
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState("OK");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const muestraCollapse = () => {
    setCollapse(!collapse);
  };
  const [showModalAviso, setShowModalAviso] = useState(false);
  const sliderSettings = {
    arrows: true,
    slidesToShow: cSlidesShow < 4 ? cSlidesShow : 4,
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
  const { setSaldoPre } = useContext(ContextFlujos) as any;

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

  const handleCloseModalAviso = () => {
    setShowModalAviso(false);
  };

  const handleShow = (index: number) => {
    if (sessionStorage.getItem("tipoCliente") === "POS") {
      setMuestraModal(
        muestraModal.map((e: Estado) =>
          e.id === index ? { ...e, muestra: true } : e
        )
      );
    } else if (sessionStorage.getItem("BanderaNoOPPV") !== "Y") {
      setMuestraModal(
        muestraModal.map((e: Estado) =>
          e.id === index ? { ...e, muestra: true } : e
        )
      );
    } else {
      setShowModalAviso(true);
    }
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
        sessionStorage.getItem("banderaHD")!,
        `${sessionStorage.getItem("pais")}`,
        `${sessionStorage.getItem("Paquete")}`,
        "1",
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

  const verificaSaldoPrepago = async (cuenta: any) => {
    try {
      isLoading(true);
      const ConsultarSaldosCorrientesDO: ConsultarSaldosCorrientes_Entrada =
        builtConsultarSaldosCorrientesInput(`${cuenta}`);

      let par = ConsultarSaldosCorrientes_Parametros(
        ConsultarSaldosCorrientesDO
      );
      let ConsultarSaldosCorrientesRespuesta: ConsultarSaldosCorrientes_Respuesta =
        await ConsultaWS(par);

      if (
        ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse &&
        ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse.ErrorNegocio
          .Estado == "ok" &&
        ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse.ErrorTecnico
          .code === "ok"
      ) {
        let fecha =
          ConsultarSaldosCorrientesRespuesta.SaldosPorFacturarEBO
            .FechaProximoCorte;
        let saldo = obtenerSaldo(ConsultarSaldosCorrientesRespuesta);
        setSaldoPre(saldo);

        isLoading(false);
      } else {
        console.error(ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse);
        isLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerSaldo = (
    p_ConsultarSaldosCorrientesRespuesta: ConsultarSaldosCorrientes_Respuesta
  ) => {
    if (
      p_ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
        .FechaPagoOportuno != null &&
      p_ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
        .FechaPagoOportuno != ""
    ) {
      return p_ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
        .SaldoTotalPagoOportuno;
    } else {
      return p_ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
        .SaldoTotal;
    }
  };

  const formateaTitulo = (titulo: string) => {
    titulo = titulo.replaceAll("-", "").replaceAll("HD", "").slice(0, 17);

    return titulo;
  };

  useEffect(() => {
    doConsultaPagosPorEvento();

    if (sessionStorage.getItem("tipoCliente") === "PRE") {
      verificaSaldoPrepago(sessionStorage.getItem("cuenta"));
    }
  }, []);

  const imagenesHardcode = [
    gato,
    halloween,
    megan,
    noche,
    scream,
    top,
    veng,
    paradise,
  ];
  const imagenesHardcodeModal = [
    gatoM,
    halloweenM,
    meganM,
    nocheM,
    screamM,
    topM,
    vengM,
    paradiseM,
  ];
  const sinopsis = [
    "Algún tiempo después de los acontecimientos de Shrek, mientras organizaba una fiesta, el legendario Gato con Botas despierta accidentalmente a un gigante dormido. Al despertar en un hospital, el médico del pueblo le informa de que ha perdido ocho de sus nueve vidas y le sugiere que se retire. Esa noche, en un bar, Gato conoce a un lobo encapuchado de negro.",
    "En la noche de Halloween, Corey Cunningham, está cuidando a un niño llamado Jeremy , quien le hace una broma encerrándolo en el ático tras ganarse su enemistad. Corey abre la puerta de una patada y accidentalmente empuja a Jeremy sobre la barandilla de una escalera hasta su muerte. Corey es acusado de matar intencionalmente a Jeremy, pero es absuelto por homicidio negligente. ",
    "Gemma (Allison Williams) es una brillante ingeniera robótica de una empresa de juguetes que usa inteligencia artificial para desarrollar M3GAN, y la mejor aliada de los padres. Después de obtener inesperadamente la custodia de su sobrina huérfana, Gemma solicita la ayuda del prototipo M3GAN, una decisión que tiene consecuencias inimaginables. ",
    "Cuando un equipo de mercenarios irrumpe en Nochebuena dentro de un complejo familiar adinerado y toma como rehenes a todos los que están dentro, y a punto de demostrar por qué este Santa Claus, no es ningún santo.Santa Claus (David Harbour) está en el edificio y a punto de demostrar por qué este Santa Claus, no es ningún santo.",
    "25 años después de la matanza original realizada por Billy Loomis y Stu Macher en Woodsboro,5​(y diez años después de la segunda matanza la joven Tara espera reunirse con su amiga Amber cuando comienza a recibir constantes llamadas telefónicas de un número desconocido. Al contestar la llamada, conversa con un desconocido.",
    "El texto de apertura menciona cómo en 1969, la Marina de los EE. UU. estableció una escuela para pilotos de combate. Se la conoce oficialmente como Vemos varios reclutas y hombres de la Marina en los barcos donde los pilotos despegan o regresan. pero los reclutas la llaman Top Gun. Vemos varios reclutas y hombres de la Marina en los barcos.",
    "Vengeance es una película estadounidense de humor negro escrita y dirigida por B. J. Novak, marcando su debut como director. La película esta protagonizada por Novak, , Issa Rae y Ashton Kutcher. Jason Blum se desempeña como productor bajo su compañía productora Blumhouse Productions, y Greg Gilreath y Adam Hendricks son productores bajo su compañía Divide/Conquer.",
    " Graduada y egresada de la Universidad de Chicago, Wren Butler acompaña su mejor amiga, Lily en un paseo de postgrado a Bali. sus padres divorciados intentan impedir que su hija cometa el mismo error que ellos habían cometido hacía 25 años. Entretanto, Wren permanece en Bali para disfrutar de las festividades y, en el proceso, encuentra su propio amor con un doctor local",
  ];

  return (
    <>
      <Loading isLoading={loading} />
      <div id="big" className="d-none d-xl-block d-lg-block ">
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
                  <Card.Img
                    src={imagenesHardcode[index]}
                    className={styles.img}
                  />
                  <Card.Body className={styles.cardBody}>
                    <h3 className={styles.titulo}>
                      {formateaTitulo(item.displayvalue)}
                    </h3>
                    <Card.Text className={styles.info}>
                      <p className={styles.precioCard}>
                        <b>${item.price}</b>
                      </p>
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
          </Slider>
        </Container>
      </div>

      {/*****************************
       Inicia seccion para celulares
      *******************************/}

      <div id="small" className="d-lg-none d-xl-none">
        <Container className={styles.containerCollapse}>
          <Row>
            <hr className={styles.lineaSup} />
            <Col>
              <p
                style={{ marginBottom: "1vw" }}
                className={styles.peliculasSmall}
              >
                <b>Películas</b>
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
          </Row>

          {eventos.map((item: any, index: number) => (
            <Collapse in={collapse}>
              <Row>
                <Col className={styles.cardCollapse}>
                  <Card
                    className={styles.cardImgSmall}
                    onClick={() => handleShow(index)}
                    style={index === 0 ? { marginTop: "2vw" } : {}}
                  >
                    <Row>
                      <Col xs={4} className={styles.contenedorImgSmall}>
                        <div>
                          <Card.Img
                            src={imagenesHardcode[index]}
                            className={styles.imgSmall}
                          />
                        </div>
                      </Col>
                      <Col xs={8} className={styles.contenedorItemSmall}>
                        <Card.Text className={styles.info}>
                          <p className={styles.precioCard}>
                            <b>{formateaTitulo(item.displayvalue)}</b>
                          </p>
                          <p className={styles.allday}>${item.price}/All day</p>
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Collapse>
          ))}
          <Row>
            <hr className={styles.lineaInf} />
          </Row>
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
          aviso={aviso}
        />
      ))}

      <Modal
        show={showModalAviso}
        onHide={handleCloseModalAviso}
        size="lg"
        centered
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body className={styles.contenedorModalAviso}>
          <div className={styles.infoModalAviso}>
            <p className={styles.descripcionModalAviso}>
              No se puede realizar la contratación del pago por evento para tu
              tipo de cuenta, por favor comunícate a servicio a clientes y
              menciona el Código PPV001.
            </p>
            <Stack>
              <Button
                className={styles.botonCancelarModalAviso}
                onClick={handleCloseModalAviso}
              >
                <b>Cancelar</b>
              </Button>
            </Stack>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
