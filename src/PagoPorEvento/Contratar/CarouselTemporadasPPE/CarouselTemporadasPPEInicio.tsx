import { useState, useEffect } from "react";
import styles from "./CarouselTemporadasPPE.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { ModalDetallesEventoTemporada } from "../ModalDetallesEventoTemporada/ModalDetallesEventoTemporada";
import { Row } from "react-bootstrap";
import gato from "../../../assets/img/CarouselTemporadasPPE/gato.png";
import gatoM from "../../../assets/img/CarouselTemporadasPPE/gatoModal.png";
import halloween from "../../../assets/img/CarouselTemporadasPPE/hallo.png";
import halloweenM from "../../../assets/img/CarouselTemporadasPPE/halloModal.png";
import megan from "../../../assets/img/CarouselTemporadasPPE/megan.png";
import meganM from "../../../assets/img/CarouselTemporadasPPE/meganModal.png";
import noche from "../../../assets/img/CarouselTemporadasPPE/noche.jpg";
import nocheM from "../../../assets/img/CarouselTemporadasPPE/nocheM.jpg";
import scream from "../../../assets/img/CarouselTemporadasPPE/scream.jpeg";
import screamM from "../../../assets/img/CarouselTemporadasPPE/screamM.jpeg";
import top from "../../../assets/img/CarouselTemporadasPPE/top.jpg";
import topM from "../../../assets/img/CarouselTemporadasPPE/topM.jpg";
import veng from "../../../assets/img/CarouselTemporadasPPE/vengeance.jpg";
import vengM from "../../../assets/img/CarouselTemporadasPPE/vengeanceM.jpg";
import paradise from "../../../assets/img/CarouselTemporadasPPE/paradise.jpg";
import paradiseM from "../../../assets/img/CarouselTemporadasPPE/paradiseM.jpg";
import { decryptBase64ArrayByteToString } from "../../../Commons/EncriptText";
import Loading from "../../../General/Loading";

import {
  builtConsultaPagosPorEventEntrada,
  ConsultaPagosPorEvento_Entrada,
  ConsultaPagosPorEvento_Parametros,
  ConsultaPagosPorEvento_Respuesta,
} from "../../../Commons/Services/ConsultaPagosPorEvento";
import { ConsultaWS } from "../../../Commons/ServiciosBase";
export const CarouselTemporadasPPEInicio = () => {
  const [muestraModal, setMuestraModal] = useState<any>([]);
  const [eventos, setEventos] = useState<any>([]);
  const [loading, isLoading] = useState(false);

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
      setMuestraModal(arregloIndices);
      isLoading(false);
    } else {
      console.warn("NO HAY DATOS PARA PROCESAR");
      setEventos([]);
      setMuestraModal(false);
      isLoading(false);
    }
  };

  useEffect(() => {
    doConsultaPagosPorEvento();
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
      <Container className={styles.contenedor} fluid>
        <Row>
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
                  src={
                    "https://serviciosenlinea.sky.com.mx/sky/imagenes/160X240/" +
                    item.img
                  }
                  className={styles.img}
                />
                <Card.Body className={styles.cardBody}>
                  <h3 className={styles.titulo}>
                    {item.displayvalue.length > 23
                      ? item.displayvalue.slice(0, 23)
                      : item.displayvalue}
                  </h3>
                  <h3 className={styles.precio}>
                    <b>${item.price}</b>
                  </h3>
                  <Card.Text className={styles.info}>
                    {item.sinopsisvalue}
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
        </Row>
      </Container>

      {eventos.map((item: any, index: number) => (
        <div key={index} id="big" className="d-none d-xl-block d-lg-block ">
          <ModalDetallesEventoTemporada
            key={index}
            show={muestraModal[index].muestra}
            handleClose={() => handleClose(index)}
            titulo={item.displayvalue}
            precio={item.price}
            canal={item.channel}
            img={
              "https://serviciosenlinea.sky.com.mx/sky/imagenes/160X240/" +
              item.img
            }
            // imgR={imagenesHardcode[index]}
            sinopsis={sinopsis[index]}
          />
        </div>
      ))}
    </>
  );
};
