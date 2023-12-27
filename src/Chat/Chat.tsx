import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Loading from "../General/Loading";

import styles from "./Chat.module.css";

import {
  builtGeneraURLChatRestEntrada,
  GeneraURLChatRest_Entrada,
  GeneraURLChatRest_Parametros,
  GeneraURLChatRest_Respuesta,
} from "../Commons/Services/GeneraURLChatRest";
import { ConsultaWS } from "../Commons/ServiciosBase";

export const ChatSky = () => {
  const [loading, isLoading] = useState(false);
  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));

  const generaURLChatRest = async () => {
    let cuenta: string = "";
    let email: string = "";

    if (flujo !== "Sky+") {
      cuenta = sessionStorage.getItem("cuenta")!;
      email = sessionStorage.getItem("EmailNotif")!;
    } else {
      cuenta = sessionStorage.getItem("cuentaSkyPlus")!;
      email = email = sessionStorage.getItem("EmailNotif")!;
    }

    isLoading(true);

    const GeneraURLChatRestDO: GeneraURLChatRest_Entrada =
      builtGeneraURLChatRestEntrada(
        cuenta,
        email,
        "SC"
      );
    let GeneraURLChatRestParametros =
      GeneraURLChatRest_Parametros(GeneraURLChatRestDO);
    let GeneraURLChatRestRespuesta: GeneraURLChatRest_Respuesta =
      await ConsultaWS(GeneraURLChatRestParametros);
    //----------------------------------------------------------------------------------------------------------------------------

    if (GeneraURLChatRestRespuesta.CabeceraOutput.Codigo == "0") {
      window.open(
        GeneraURLChatRestRespuesta.GeneraChatRNOutput.URLRN,
        "_blank"
      );
      isLoading(false);
    } else {
      console.error(GeneraURLChatRestRespuesta.EBMHeaderResponse);
      isLoading(false);
    }
  };

  return (
    <>
      <Loading isLoading={loading} />
      <div className={styles.contenedor}>
        <h1 className={styles["titulo"]}>
          <span className="textoSpectrum">Estamos para ayudarte</span>
        </h1>
        <p className={styles.subtitulo}>
          Ponte en contacto con nosotros para poder apoyarte con las dudas de tu
          servicio Sky.{" "}
        </p>
        <Form>
          <Row className={styles["separacionBoton"]}>
            <Button
              className={styles.boton}
              onClick={() => generaURLChatRest()}
            >
              Iniciar chat
            </Button>
            <p className={styles.enlacePreguntas}>
              O visita nuestras{" "}
              <a style={{ color: "#000FF5" }} href="/faq">
                preguntas frecuentes
              </a>
            </p>
          </Row>
        </Form>
      </div>
    </>
  );
};
