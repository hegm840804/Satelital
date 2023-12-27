import React, { useState, useEffect } from "react";
import styles from "./InicioInformacionUsuarioP.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import perfil from "../../src/assets/img/Inicio/PerfilDefault.png";
import { Buffer } from "buffer";
import moment from "moment";
import Loading from "../General/Loading";
import Image from "react-bootstrap/Image";
import { determinaMoneda } from "../Utils/Monedas";

import {
  RecargaConsultaPrecioRecarga_Respuesta,
  ConsultaPrecioRecarga_Parametros,
  RecargaConsultaPrecioRecarga_Entrada,
  builtInputVarRecargaConsultaPrecioRecargaInput,
} from "../Commons/Services/ConsultaPrecioRecargaRest";

import {
  ConsultarAvatarCuenta_Parametros,
  ConsultarAvatarCuenta_Respuesta,
} from "../Commons/Services/ConsultarAvatarCuenta";

import { ConsultaWS, ConsultaWSGet } from "../Commons/ServiciosBase";

export const InicioInformacionUsuarioP = () => {
  const [usuario, setUsuario] = useState(sessionStorage.getItem("Nombre"));
  const [cuenta, setCuenta] = useState(sessionStorage.getItem("cuenta"));
  const [paquete, setPaquete] = useState(sessionStorage.getItem("Paquete"));
  const [status, setStatus] = useState(sessionStorage.getItem("Estatus"));
  const [tipoCliente, setTipoCliente] = useState(sessionStorage.getItem("tipoCliente"));
  const [fechaInicio, setFechaInicio] = useState(
    sessionStorage.getItem("inicioRecarga")
  );
  const [fechaFin, setFechaFin] = useState(
    sessionStorage.getItem("fechaFinRecarga")
  );
  //revisar por si no existe fecha de fin de recarga
  // const [fechaFin, setFechaFin] = useState<string>(moment(sessionStorage.getItem("fechaInicioRecarga")).add(1, 'M').format('DD-MM-yyyy'));
  const [diferenciaDias, setDiferenciaDias] = useState<number>();
  const [saldo, setSaldo] = useState("");
  const [loading, isLoading] = useState(false);
  const [moneda, setMoneda] = useState(determinaMoneda(sessionStorage.getItem("pais")!,sessionStorage.getItem("flujos")!));

  let username = "appsky_osbext_qa";
  let password = "PY35IG$qw8$20#19";
  const credentials = Buffer.from(`${username}:${password}`).toString("base64");

  const obtieneSaldoFecha = async () => {
    //function obtieneSaldoFecha() {
    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
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
        RecargaConsultaPrecioRecargaRespuesta.Recarga_consultaPrecioRecarga_Salida.FIN_RECARGA.substring(
          0,
          10
        );
      const ar = cadena.split("-");
      setFechaFin(ar[2] + "/" + ar[1] + "/" + ar[0]);
      sessionStorage.setItem("fechaFin", ar[2] + "-" + ar[1] + "-" + ar[0]);

      let saldoFormato = parseInt(
        RecargaConsultaPrecioRecargaRespuesta
          .Recarga_consultaPrecioRecarga_Salida.SALDO
      );
      setSaldo(
        saldoFormato.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );

      sessionStorage.setItem(
        "saldo",
        RecargaConsultaPrecioRecargaRespuesta
          .Recarga_consultaPrecioRecarga_Salida.SALDO
      );
      isLoading(false);
    } else {
      console.error(RecargaConsultaPrecioRecargaRespuesta.EBMHeaderResponse);
      isLoading(false);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const [accountAvatar, setAccountAvatar] = useState("");

  async function getAvatar() {
    let ConsultarAvatarCuentaParametros = ConsultarAvatarCuenta_Parametros(null, `${sessionStorage.getItem("cuenta")}`);

    let ConsultarAvatarCuentaRespuesta: ConsultarAvatarCuenta_Respuesta = await ConsultaWSGet(ConsultarAvatarCuentaParametros);

    setAccountAvatar(ConsultarAvatarCuentaRespuesta.content[0]?.catalogoAvatar?.avatarBase64 ? ConsultarAvatarCuentaRespuesta.content[0]?.catalogoAvatar?.avatarBase64 : perfil);
  }

  useEffect(() => {
    obtieneSaldoFecha();
    getAvatar();
    const fecha = moment(sessionStorage.getItem("inicioRecarga"))
      .add(1, "M")
      .format("DD-MM-yyyy");
    const ar = fecha.split("-");
    let dia = parseInt(ar[0]);
    let mes = parseInt(ar[1]);
    let anio = parseInt(ar[2]);

    let now = Date.now();
    let futura = new Date();
    setDiferenciaDias(
      Math.round(
        (futura.setFullYear(anio, mes, dia) - now) / (1000 * 60 * 60 * 24)
      )
    );
  }, []);

  return (
    <>
      <Container className={styles["container"]} fluid>
        <Loading isLoading={loading} />
        <Row>
          <Col className={styles["alineaImagen"]} lg={2} xl={2} xxl={2}>
            <Image src={accountAvatar} className={styles.imagen} />;
          </Col>

          <Col  lg={6} xl={5} xxl={6} className={styles["alignColCenterContent"]}>
              <Row>
                <Col className={styles["centrar"]} >
                  <span className={styles["title"]}>
                    ¡Hola, <b>{usuario ? usuario.charAt(0) + usuario.substring(1, usuario.length).toLowerCase():""}!</b>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className={styles["subtitle2"]}>
                    Tu saldo es:
                    <span className={styles["subtitle3"]}> ${saldo} {moneda}</span>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className={styles["subtitle2"]}>
                    Vencimiento de recarga:{" "}
                    <span className={styles["subtitle3"]}>{fechaFin} </span>
                  </p>
                </Col>
              </Row>

          </Col>

          <Col className={styles["centraCard"]} lg={2} xl={4} xxl={4}>
            <Card className={styles["card"]}>
              <Card.Body className={styles["cardBody"]}>
                <Row>
                  <Col className={styles["subtitle2CardAltura"]}>
                    <p className={styles["subtitle2Card"]}>
                      No de cuenta:{" "}
                      <span className={styles["subtitle3"]}>{cuenta}</span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className={styles["subtitle4"]}>
                      Paquete:{" "}
                      <span className={styles["subtitle3"]}>{paquete}</span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className={styles["subtitle5"]}>
                      Estatus:{" "}
                      <span className={styles["subtitle3"]}>{status}</span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {tipoCliente === "POS" ?
                      <Button
                        className={styles["botonazul"]}
                        href="/realizapagos"
                      >
                        {sessionStorage.getItem("tipoCliente") === "POS" ? "Realiza tu pago" : "Realiza tu recarga"}
                      </Button>
                      :
                      <Button
                        className={styles["botonazul"]}
                        href="/realizapagos"
                      >
                        Realiza tu recarga
                      </Button>
                    }
                  </Col>
                </Row>
                <div className={styles["cardBody"]}></div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
function toBase64(arg0: string) {
  throw new Error("Function not implemented.");
}
