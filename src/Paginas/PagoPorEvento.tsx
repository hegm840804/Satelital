import React, { useState, useContext, useEffect } from "react";

import { CarouselTemporadasPPE } from "../PagoPorEvento/Contratar/CarouselTemporadasPPE/CarouselTemporadasPPE";
import styles from "../PagoPorEvento/Contratar/BannerTemporadasPPE/BannerTemporadasPPE.module.css";
import { CarouselEventos } from "../PagoPorEvento/Contratar/CarouselTemporadasPPE/CarouselEventos";
import { CarouselAdultos } from "../PagoPorEvento/Contratar/CarouselTemporadasPPE/CarouselAdultos";

import warning from "../assets/img/Iconos/warning.svg";

import {
  ConsultarPPV_Entrada,
  builtConsultarPPVEntrada,
  ConsultarPPV_Parametros,
  ConsultarPPV_Respuesta,
  PPEContratado,
} from "../Commons/Services/ConsultarPPV";
import { ConsultaWS } from "../Commons/ServiciosBase";
import { Tarjeta } from "../Commons/Services/ConsultarIRD";
import { Button, Col, Container, Row } from "react-bootstrap";
import ConfirmMessage from "../General/ConfirmMessage";
import HistorialPagoPorVer2 from "../PagoPorEvento/Historial/HistorialPagoPorVer2";
import ContextFlujos from "../Context/ContextFlujos";

export const PagoPorEvento = () => {
  const [eventosPagoPorVer, setEventosPagoPorVer] = useState<PPEContratado[]>(
    []
  );

  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));
  const [showAlert, setShowAlert] = useState(false);
  const [statusMensaje, setStatusMensaje] = useState("");
  const [mensajeToast, setMensajeToast] = useState("");
  const [actualiza, setActualiza] = useState(false);
  const { setSkyPlus, setSkyCelular, setPais } = useContext(ContextFlujos) as any;

  const doConsultarPPV = async () => {
    var array: Tarjeta[] = JSON.parse(sessionStorage.getItem("tarjetas")!);

    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarPPVDO: ConsultarPPV_Entrada = builtConsultarPPVEntrada(
      array[0].TarjetaInteligente, //"7000914935341",
      `${sessionStorage.getItem("cuenta")}`, //"501125365012",
      `HIJUMP`
    );
    let ConsultarPPVParametros = ConsultarPPV_Parametros(ConsultarPPVDO);

    let ConsultarPPVRespuesta: ConsultarPPV_Respuesta = await ConsultaWS(
      ConsultarPPVParametros
    );

    //----------------------------------------------------------------------------------------------------------------------------

    if (
      ConsultarPPVRespuesta.respuesta == "0" &&
      ConsultarPPVRespuesta.PPEContratados &&
      ConsultarPPVRespuesta.PPEContratados.length > 0
    ) {
      setEventosPagoPorVer(ConsultarPPVRespuesta.PPEContratados);
    } else {
      setEventosPagoPorVer([]);
      console.error("No hay eventos para mostrar");
    }
  };

  const muestraAviso = (statusRegresado: string, mensaje: string) => {
    if (statusRegresado === "OK") {
      setStatusMensaje("OK");
      setMensajeToast("Evento contratado " + mensaje);
      actualizacion(true);
    } else {
      setStatusMensaje("");
      setMensajeToast("Error en la transacción, " + mensaje);
      setActualiza(false);
    }

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const actualizacion = (estado: boolean) => {
    setActualiza(estado);
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
    <Container>
    <Row className={styles["alertContainer"]}>
        <Col className={styles["messageStyle"]}>
          <ConfirmMessage status={statusMensaje} message={mensajeToast} showAlert={showAlert} />
        </Col>
      </Row>
    </Container>

      {
        flujo !== "Sky+" ?
          <Row className={styles["aviso"]}>
            <Col xs={3} md={1} xxl={3} style={{ paddingRight: "0px" }}><img src={warning} className={styles["logoAviso"]} /></Col>
            <Col xs={9} md={9} xxl={6}><p className={styles["textoAviso"]}><b>El contenido de Pago por evento podrás disfrutarlo desde tu TV de Sky Satelital</b></p></Col>
            <Col xs={0} md={0} xxl={3}></Col>
          </Row> :
          <></>
      }

      <div id="big" className={"pt-4 d-none d-xl-block d-lg-block " + styles["tituloPagoEvento"]}>
        <h1 >
          <span className={styles["spectrum"]}>Contratación: Pagos por evento</span>
        </h1>

        <p className={styles.subtituloPagina}>
          Agrega solo los programas que quieres ver, en exclusiva y antes que nadie.
        </p>
        <span className={styles.subtitle}>Películas</span>
        <p className={styles.subtituloPagina}>
          Contrata solo las películas que quieres ver, en la calidad que tu
          decidas.
        </p>
      </div>

      <div id="small" className="d-lg-none d-xl-none " style={{ padding: "5vw 5vw 2.5vw 5vw", marginBottom: "0px", marginLeft: "4vw" }}>

        <p style={{ marginBottom: "0px" }}>
          <span className={styles["tituloSpectrum"]}>Cartelera</span>
        </p>
        <p className={styles["subituloCartelera"]}>Conoce nuestra cartelera y nunca te quedes sin tu contenido favorito</p>

        <Container fluid className={styles["cardTarjeta"]}>
          <p className={styles["textoTarjeta1"]}>Tarjeta inteligente</p>
          <p className={styles["textoTarjeta2"]}>¿Qué es? ¿No encuentras su número? Da clic en el botón para resolver tus dudas. </p>
          <Button className={styles["botonTarjeta"]}>Leer más</Button>
        </Container>
      </div>

      <div>
        <CarouselTemporadasPPE aviso={muestraAviso} />
        <CarouselEventos aviso={muestraAviso} />
        <div id="big" className={"d-none d-xl-block d-lg-block " + styles["tituloPagoEvento"]}>
          <span className={styles.subtitle}>Adultos</span>
          <p className={styles.subtituloPagina}>
            Elige y contrata tu contenido favorito, solo para adultos.
          </p>
        </div>
        <CarouselAdultos aviso={muestraAviso} />
        <HistorialPagoPorVer2 update={actualiza} actualiza={actualizacion} />
      </div>
    </>
  );
};
