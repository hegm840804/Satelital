import { useState, useEffect } from "react";
import styles from "./InicioInformacionUsuario.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import perfil from "../../src/assets/img/Inicio/PerfilDefault.png";
import { Buffer } from "buffer";
import { ConsultaWS, ConsultaWSGet } from "../Commons/ServiciosBase";
import {
  ConsultarSaldosCorrientes_Respuesta,
  ConsultarSaldosCorrientes_Parametros,
  ConsultarSaldosCorrientes_Entrada,
  builtConsultarSaldosCorrientesInput,
} from "../Commons/Services/ConsultarSaldosCorrientesRest";
import { decryptBase64ArrayByteToString } from "../Commons/EncriptText";
import Loading from "../General/Loading";
import {
  builtConsultaPagosPorEventEntrada,
  ConsultaPagosPorEvento_Entrada,
  ConsultaPagosPorEvento_Parametros,
  ConsultaPagosPorEvento_Respuesta,
} from "../Commons/Services/ConsultaPagosPorEvento";
import {
  ConsultarAvatarCuenta_Parametros,
  ConsultarAvatarCuenta_Respuesta,
} from "../Commons/Services/ConsultarAvatarCuenta";
import { determinaMoneda } from "../Utils/Monedas";

export const InicioInformacionUsuario = () => {
  const [usuario, setUsuario] = useState(
    sessionStorage.getItem("flujos") !== "Sky+"
      ? sessionStorage.getItem("Nombre")
      : sessionStorage.getItem("nombre")
  );
  const [saldo, setSaldo] = useState("");
  const [paquete, setPaquete] = useState(
    sessionStorage.getItem("flujos") !== "Sky+"
      ? sessionStorage.getItem("Paquete")
      : sessionStorage.getItem("PaqueteSky+")
  );
  const [fechaLimite, setFechaLimite] = useState("");
  const [loading, isLoading] = useState(false);
  const [moneda, setMoneda] = useState(determinaMoneda(sessionStorage.getItem("pais")!,sessionStorage.getItem("flujos")!));


  let username = "appsky_osbext_qa";
  let password = "PY35IG$qw8$20#19";
  const credentials = Buffer.from(`${username}:${password}`).toString("base64");

  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));
  const myCuenta =
    flujo === "Sky+"
      ? sessionStorage.getItem("cuentaSkyPlus")!
      : sessionStorage.getItem("cuenta")!;

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

  const obtieneSaldoFecha = async () => {
    // function obtieneSaldoFecha() {
    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarSaldosCorrientesDO: ConsultarSaldosCorrientes_Entrada =
      builtConsultarSaldosCorrientesInput(myCuenta);
    let par = ConsultarSaldosCorrientes_Parametros(ConsultarSaldosCorrientesDO);
    let ConsultarSaldosCorrientesRespuesta: ConsultarSaldosCorrientes_Respuesta =
      await ConsultaWS(par);

    if (
      ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse &&
      ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse.ErrorNegocio
        .Estado == "ok" &&
      ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse.ErrorTecnico.code ===
      "ok"
    ) {
      if (
        ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
          .FechaPagoOportuno !== null
      ) {
        let saldoFormato: number = Number.parseFloat(
          ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
            .SaldoTotalPagoOportuno
        ); //parseInt( );

        setSaldo(saldoFormato.toString());

        sessionStorage.setItem(
          "saldo",
          ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
            .SaldoTotalPagoOportuno
        );
        //let saldo =                ConsultarSaldosCorrientesRespuesta.SaldosPorFacturarEBO.SaldoTotalMasCargosPorFacturar;
        let cadena =
          ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO.FechaPagoOportuno.substring(
            0,
            10
          );
        const ar = cadena.split("-");
        setFechaLimite(ar[2] + "/" + ar[1] + "/" + ar[0]);
        sessionStorage.setItem("fechaFin", ar[2] + "-" + ar[1] + "-" + ar[0]);
      } else {
        let saldoFormato: number = Number.parseFloat(
          ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO.SaldoTotal
        ); //parseInt();

        setSaldo(saldoFormato.toString());

        sessionStorage.setItem(
          "saldo",
          ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO.SaldoTotal
        );
        //let saldo =                  ConsultarSaldosCorrientesRespuesta.SaldosPorFacturarEBO.SaldoTotalMasCargosPorFacturar;
        let cadena =
          ConsultarSaldosCorrientesRespuesta.SaldosPorFacturarEBO.FechaProximoCorte.substring(
            0,
            10
          );
        const ar = cadena.split("-");
        setFechaLimite(ar[2] + "/" + ar[1] + "/" + ar[0]);
        sessionStorage.setItem("fechaFin", ar[2] + "-" + ar[1] + "-" + ar[0]);
      }

      isLoading(false);
    } else {
      console.error(ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse);
      isLoading(false);
    }

    //----------------------------------------------------------------------------------------------------------------------------
  };

  const doConsultaPagosPorEvento = async () => {
    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );

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
      console.info(ConsultaPagosPorEventoRespuesta);
    } else {
      console.warn("No hay datos para mostrar");
    }
  };

  const [accountAvatar, setAccountAvatar] = useState("");

  async function getAvatar() {
    let ConsultarAvatarCuentaParametros = ConsultarAvatarCuenta_Parametros(
      null,
      `${myCuenta}`
    );

    let ConsultarAvatarCuentaRespuesta: ConsultarAvatarCuenta_Respuesta =
      await ConsultaWSGet(ConsultarAvatarCuentaParametros);
    setAccountAvatar(
      ConsultarAvatarCuentaRespuesta.content[0]?.catalogoAvatar?.avatarBase64
        ? ConsultarAvatarCuentaRespuesta.content[0]?.catalogoAvatar
          ?.avatarBase64
        : perfil
    );
  }
  useEffect(() => {
    if (flujo === "Sky+") {
      obtieneSaldoFecha();
      getAvatar();
    } else {
      obtieneSaldoFecha();

      //********************************************************************** */
      //ESTA LLAMADA ES SOAOP
      //********************************************************************** */
      doConsultaPagosPorEvento();
      getAvatar();
    }
  }, []);

  return (
    <>
      <Loading isLoading={loading} />

      <Container className={styles["containerPrueba"]} fluid>
        <Row>
          <Col lg={2} xl={2} xxl={2} className={styles["colAvatar"]}>
            <img src={accountAvatar} className={styles.imagen} />
          </Col>

          <Col lg={5} xl={5} xxl={5} className={styles["colInfo"]}>
            <Row>
              <Col className={styles["colUsuario"]}>
                <div>
                  <span className={styles["textoUsuario"]}>
                    ¡Hola de nuevo,{" "}
                    <b>
                      {usuario
                        ? usuario.charAt(0) +
                        usuario.substring(1, usuario.length).toLowerCase()
                        : ""}
                      !
                    </b>
                  </span>
                </div>
                <div className={styles["divSaldo"]}>
                  <span className={styles["textoSaldo"]}>
                    {parseFloat(saldo) < 0 ? (<b>Tu saldo es:</b>):(<b>Tu saldo es:</b>)}
                    
                    {parseFloat(saldo) < 0 ? (<span> -${parseFloat(saldo)*-1} {moneda}</span>):(<span> ${saldo} {moneda}</span>)}
                  </span>
                </div>
                <div className={styles["divFecha"]}>
                  <span className={styles["textoFecha"]}>
                    <b>
                      {sessionStorage.getItem("tipoCliente") === "POS"
                        ? "Fecha límite de pago"
                        : "Fecha límite de recarga"}
                    </b>
                    : <span className={styles["fecha"]}>{fechaLimite}</span>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={5} xl={5} xxl={5} className={styles["colCard"]}>
            <Card className={styles["card2"]}>
              <Card.Body className={styles["cardBody"]}>
                <div className={styles["divTextoCard1"]}>
                  <span className={styles["textoCard"]}>No de cuenta: </span>
                  <span className={styles["textoCardAzul"]}>
                    <b>{myCuenta}</b>
                  </span>
                </div>
                <div className={styles["divTextoCard2"]}>
                  <span className={styles["textoCard"]}>Plan: </span>
                  <span className={styles["textoCardAzul"]}>
                    <b>{paquete}</b>
                  </span>
                </div>
                <div>
                  <Button className={styles["botonCard"]} href="/realizapagos">
                    {sessionStorage.getItem("tipoCliente") === "POS"
                      ? "Realiza tu pago"
                      : "Realiza tu recarga"}
                  </Button>
                </div>
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
