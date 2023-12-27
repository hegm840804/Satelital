import { useEffect, useState } from "react";
import styles from "./EstadoDeCuentaInformacion.module.css";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { Row, Col, Card, Modal, Stack } from "react-bootstrap";
import { decryptBase64ArrayByteToString } from "../../Commons/EncriptText";
import Loading from "../../General/Loading";
import ModalPospagoConTarjeta from "../Paquetes/ModalPospagoConTarjeta";
import ModalPrepagoConTarjeta from "../Paquetes/ModalPrepagoConTarjeta";
import ModalError from "../Paquetes/ModalError";
import ModalConfirmado from "../Tarjeta/ModalConfirmado";
import {
  ConsultarBilletera_Info,
  ConsultarBilletera_Input,
  consultarBilletera_Parametros,
  ConsultarBilletera_Respuesta,
} from "../../Commons/Services/GwConsultarBilleteraEBF";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import { jsPDF } from "jspdf";
import logo from "../../assets/img/BarraSuperior/skyLogo.png";
import {
  Attachment,
  builtAttachment,
  Parametro,
  builtParametro,
  EnviarEmail_Entrada,
  builtEnviarEmail_Entrada,
  EnviarEmail_Parametros,
} from "../../Commons/Services/EnviarEmail";
import {
  builtSolicitudDeServicio,
  SolicitudDeServicio,
  builtContratacionServicios,
  ContratacionServicios,
  AltaSolicitudDeServicio_Entrada,
  builtAltaSolicitudDeServicio_Entrada,
  AltaSolicitudDeServicio_Parametros,
  AltaSolicitudDeServicio_Respuesta,
} from "../../Commons/Services/AltaSolicitudDeServicioRest";

import {
  builtConsultaEstadoCuentaEntrada,
  ConsultaEstadoCuenta_Entrada,
  ConsultaEstadoCuenta_Parametros,
  ConsultaEstadoCuenta_Respuesta,
} from "../../Commons/Services/ConsultaEstadoCuenta";
import {
  builtRecargaConsultaPrecioRecargaInput,
  ConsultaFacturas_Entrada,
  ConsultaFacturas_Parametros,
  ConsultaFacturas_Respuesta,
} from "../../Commons/Services/ConsultaFacturas";
export const EstadoDeCuentaInformacion = () => {
  const [show, setShow] = useState(false);
  const [modalPrepago, setModalPrepago] = useState(false);
  const [modalPospago, setModalPospago] = useState(false);
  const [modalConfirmarShow, setModalConfirmarShow] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [suscriptor, setSuscriptor] = useState(
    sessionStorage.getItem("NombreSuscriptor")
  );
  const [cuenta, setCuenta] = useState(sessionStorage.getItem("cuenta"));
  const [fechaFin, setFechaFin] = useState(sessionStorage.getItem("fechaFin"));
  const [tipoPago, setTipoPago] = useState(
    sessionStorage.getItem("tipoCliente")
  );
  const [paquete, setPaquete] = useState("");
  const [costoPaquete, setCostoPaquete] = useState("");
  const [loading, isLoading] = useState(false);
  const [cargos, setCargos] = useState([]);
  const [descuentos, setDescuentos] = useState([]);
  const [total, setTotal] = useState();
  const [saldoAPagar, setSaldoApagar] = useState("");
  const [estadoCuenta, setEstadoCuenta] = useState("");
  const [allMyBines, setAllMyBines] = useState<ConsultarBilletera_Info[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sendMail = async (doc: any) => {
    setShow(false);
    const ContratacionServiciosRet: ContratacionServicios =
      builtContratacionServicios(
        `${sessionStorage.getItem("Paquete")}`,
        "",
        "",
        "",
        "",
        ""
      );

    const SolicitudDeServicioRet: SolicitudDeServicio =
      builtSolicitudDeServicio(
        `${sessionStorage.getItem("cuenta")}`,
        "Aclaracion de Pagos",
        "Cargo no Reconocido a TC",
        "Se envia la peticion e informacion para revision de cargos no reconocidos o aclaraciones de cobro",
        "",
        `${sessionStorage.getItem("RowIdContacto")}`,
        `${sessionStorage.getItem("EmailNotif")}`, //l_MailConfirmacion: string,
        `${sessionStorage.getItem("pais")}`, //l_Pais: string,
        `${sessionStorage.getItem("TipoCuenta")}`, //l_TipoCuenta: string,
        `${sessionStorage.getItem("NombreSuscriptor")}`, //l_NombreSuscriptor: string,
        null,
        null,
        ContratacionServiciosRet,
        null,
        null,
        null,
        null,
        null,
        "HIJUMP",
        `${sessionStorage.getItem("idSesion")}`
      );
    const AltaSolicitudDeServicioDO: AltaSolicitudDeServicio_Entrada =
      builtAltaSolicitudDeServicio_Entrada(SolicitudDeServicioRet);
    let par = AltaSolicitudDeServicio_Parametros(AltaSolicitudDeServicioDO);
    let AltaSolicitudDeServicioRespuesta: AltaSolicitudDeServicio_Respuesta =
      await ConsultaWS(par);

    const parametrosVar: Parametro[] = [
      builtParametro(
        "NUMSS",
        `${AltaSolicitudDeServicioRespuesta.NumeroSolicitud}`
      ),
      builtParametro("CUENTA", `${sessionStorage.getItem("cuenta")}`),
      builtParametro(
        "NOMBRE_SUSCRIPTOR",
        `${sessionStorage.getItem("NombreSuscriptor")}`
      ),
    ];
    const attachmentVar: Attachment[] = [
      builtAttachment(estadoCuenta, "pdf", doc.output("datauri")),
    ];

    const EnviarEmailDO: EnviarEmail_Entrada = builtEnviarEmail_Entrada(
      "SEL",
      "CARGOSNORECONOCIDOS_MX",
      `eduardo.sanchez.rom@gmail.com`,
      `${sessionStorage.getItem("pais")}`,
      parametrosVar,
      attachmentVar
    );
    let par2 = EnviarEmail_Parametros(EnviarEmailDO);

    ConsultaWS(par2);
    //alert("send Email");
  };

  const hideModalPospago2 = (respuesta: any) => {
    if (tipoPago === "POS") {
      setModalPospago(false);
    } else {
      setModalPrepago(false);
    }
    if (respuesta) {
      if (respuesta.action === "pagar") {
        setModalConfirmarShow(true);
      } else if (respuesta.action === "cancelar") {
        setModalError(true);
      }
    }
  };

  const showModalPospago = (saldo: any) => {
    if (tipoPago === "POS") {
      setModalPospago(true);
    } else {
      setModalPrepago(true);
    }
  };

  const estadoCuentaInformación = async (noCuenta: string) => {
    isLoading(true);
    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultaEstadoCuentaDO: ConsultaEstadoCuenta_Entrada =
      builtConsultaEstadoCuentaEntrada(
        sessionStorage.getItem("EmailNotif")!,
        tmp,
        `${noCuenta}`
      );
    let ConsultaEstadoCuentaParametros = ConsultaEstadoCuenta_Parametros(
      ConsultaEstadoCuentaDO
    );
    let ConsultaEstadoCuentaRespuesta: ConsultaEstadoCuenta_Respuesta =
      await ConsultaWS(ConsultaEstadoCuentaParametros);

    if (
      ConsultaEstadoCuentaRespuesta.cabecera &&
      ConsultaEstadoCuentaRespuesta.cabecera.coderror != "2"
    ) {
      let parseString = require("xml2js").parseString;

      parseString(
        ConsultaEstadoCuentaRespuesta.facturaformateada,
        function (err: any, result: any) {
          console.dir(result);

          let campos: any =
            result["ns0:SKY_OP_CONSULTAS_EDO_CUENTA_outputFlist_TYPE"];
          let factura = "Factura: " + campos["ns0:NUMERO_FACTURA"][0];
          let cuenta = "Cuenta: " + campos["ns0:NUMERO_CUENTA"][0];
          let fechaCorte =
            "Fecha de corte: " + campos["ns0:FECHA_CORTE"][0].substring(0, 10);
          let cliente = "Cliente: " + campos["ns0:NOMBRE_SUSCRIPTOR"][0];
          let fechaPagoOportuno =
            "Aproveche descuento pago oportuno antes del: " +
            campos["ns0:FECHA_PAGO_OPORTUNO"][0].substring(0, 10);
          let descuentoPagoOportuno = "$ " + campos["ns0:DESCUENTO_PO"][0];
          let pagarAntes =
            "Evite corte del servicio, pague antes de: " +
            campos["ns0:FECHA_CORTE_SERVICIO"][0].substring(0, 10);

          let cargos: any = campos["ns0:CARGOS"];

          setTotal(campos["ns0:TOTAL_A_PAGAR"][0]);
          setCostoPaquete(cargos[0]["ns0:MONTO"][0]);
          setPaquete(campos["ns0:PAQUETE"][0]);

          let arregloMontos: any = [];
          let arregloDescuentos: any = [];

          cargos.forEach((element: any, index: number) => {
            if (!element["ns0:MONTO"][0].includes("-") && index !== 0) {
              let obj = {
                descripcion: element["ns0:DESCRIPCION"][0],
                monto: element["ns0:MONTO"][0],
              };

              arregloMontos.push(obj);
            }
          });

          cargos.forEach((element: any, index: number) => {
            if (element["ns0:MONTO"][0].includes("-") && index !== 0) {
              let obj = {
                descripcion: element["ns0:DESCRIPCION"][0],
                monto: element["ns0:MONTO"][0],
              };

              arregloDescuentos.push(obj);
            }
          });

          setCargos(arregloMontos);
          setDescuentos(arregloDescuentos);
          setSaldoApagar(campos["ns0:TOTAL_A_PAGAR"][0]);
        }
      );

      isLoading(false);
    } else {
      console.error(ConsultaEstadoCuentaRespuesta.cabecera);
      isLoading(false);
    }
  }; //fin de estadoCuentaInformación

  const generaEstadoCuenta = async (action: string) => {
    isLoading(true);
    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );

    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultaEstadoCuentaDO: ConsultaEstadoCuenta_Entrada =
      builtConsultaEstadoCuentaEntrada(
        sessionStorage.getItem("EmailNotif")!,
        tmp,
        `${estadoCuenta}`
      );
    let ConsultaEstadoCuentaParametros = ConsultaEstadoCuenta_Parametros(
      ConsultaEstadoCuentaDO
    );
    let ConsultaEstadoCuentaRespuesta: ConsultaEstadoCuenta_Respuesta =
      await ConsultaWS(ConsultaEstadoCuentaParametros);
    if (
      ConsultaEstadoCuentaRespuesta.cabecera &&
      ConsultaEstadoCuentaRespuesta.cabecera.coderror != "2"
    ) {
      let parseString = require("xml2js").parseString;

      parseString(
        ConsultaEstadoCuentaRespuesta.facturaformateada,
        function (err: any, result: any) {
          console.dir(result);

          let campos: any =
            result["ns0:SKY_OP_CONSULTAS_EDO_CUENTA_outputFlist_TYPE"];
          let factura = "Factura: " + campos["ns0:NUMERO_FACTURA"][0];
          let cuenta = "Cuenta: " + campos["ns0:NUMERO_CUENTA"][0];
          let fechaCorte =
            "Fecha de corte: " + campos["ns0:FECHA_CORTE"][0].substring(0, 10);
          let cliente = "Cliente: " + campos["ns0:NOMBRE_SUSCRIPTOR"][0];
          let paquete = "Paquete: " + campos["ns0:PAQUETE"][0];
          let fechaPagoOportuno =
            "Aproveche descuento pago oportuno antes del: " +
            campos["ns0:FECHA_PAGO_OPORTUNO"][0].substring(0, 10);
          let descuentoPagoOportuno = "$ " + campos["ns0:DESCUENTO_PO"][0];
          let pagarAntes =
            "Evite corte del servicio, pague antes de: " +
            campos["ns0:FECHA_CORTE_SERVICIO"][0].substring(0, 10);

          let cargos: any = campos["ns0:CARGOS"];
          let total = "Total a pagar:  $ " + campos["ns0:TOTAL_A_PAGAR"][0];

          const doc = new jsPDF("p", "mm", [279, 216]);

          doc.addImage(logo, 10, 7, 15, 9);
          doc.setFontSize(10);
          doc.line(10, 18, 200, 18);
          doc.text(factura, 10, 25);
          doc.text(cuenta, 10, 30);
          doc.text(fechaCorte, 120, 30);
          doc.text(cliente, 10, 35);
          doc.text(paquete, 10, 40);
          doc.text(fechaPagoOportuno, 10, 45);
          doc.text(descuentoPagoOportuno, 120, 45);
          doc.text(pagarAntes, 10, 50);
          doc.line(10, 55, 200, 55);
          doc.text("Fecha", 10, 60);
          doc.text("Descripción", 30, 60);
          doc.text("Monto", 150, 60);
          doc.line(10, 62, 200, 62);

          let posicion: number = 67;
          cargos.forEach((element: any, index: number) => {
            doc.text(element["ns0:FECHA"][0].substring(0, 10), 10, posicion);
            doc.text(element["ns0:DESCRIPCION"][0], 30, posicion);
            doc.text("$ " + element["ns0:MONTO"][0], 150, posicion);
            posicion += 5;
            if (index + 1 === cargos.length) {
              doc.line(10, posicion, 200, posicion);
              doc.text(total, 126, posicion + 5);
            }
          });

          if (action === "download") {
            doc.save(estadoCuenta + ".pdf");
          } else {
            sendMail(doc);
          }
        }
      );

      isLoading(false);
    } else {
      console.error(ConsultaEstadoCuentaRespuesta.cabecera);
      isLoading(false);
    }
  };

  const descargaEstadoCuenta = () => {
    let doc = generaEstadoCuenta("download");
  }; //fin de descargaEstadoCuenta

  const executeConsultWallet = async () => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarBilleteraDO: ConsultarBilletera_Input = {
      NumeroCuenta: `${sessionStorage.getItem("cuenta")}`,
    };
    let par = consultarBilletera_Parametros(ConsultarBilleteraDO);
    let ConsultarBilleteraRespuesta: ConsultarBilletera_Respuesta =
      await ConsultaWS(par);
    if (
      ConsultarBilleteraRespuesta.EBMHeaderResponse &&
      ConsultarBilleteraRespuesta.EBMHeaderResponse.ErrorNegocio.CodigoError ==
      "0" &&
      ConsultarBilleteraRespuesta.EBMHeaderResponse.ErrorTecnico.code === "ok"
    ) {
      if (
        typeof ConsultarBilleteraRespuesta.ConsultarBilleteraListInput !=
        "undefined"
      ) {
        setAllMyBines(ConsultarBilleteraRespuesta.ConsultarBilleteraListInput);
      } else {
        setAllMyBines([]);
      }
    } else {
      console.error(ConsultarBilleteraRespuesta.EBMHeaderResponse);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  useEffect(() => {
    executeConsultWallet();
    consultaFacturas();
  }, []);

  const consultaFacturas = async () => {
    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );

    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultaFacturasDO: ConsultaFacturas_Entrada =
      builtRecargaConsultaPrecioRecargaInput(
        sessionStorage.getItem("cuenta")!,
        sessionStorage.getItem("EmailNotif")!,
        tmp
      );
    let ConsultaFacturasParametros =
      ConsultaFacturas_Parametros(ConsultaFacturasDO);
    let ConsultaFacturasRespuesta: ConsultaFacturas_Respuesta =
      await ConsultaWS(ConsultaFacturasParametros);

    if (
      ConsultaFacturasRespuesta.cabecera &&
      ConsultaFacturasRespuesta.cabecera.coderror == "0" &&
      ConsultaFacturasRespuesta.resultados &&
      ConsultaFacturasRespuesta.resultados != null &&
      ConsultaFacturasRespuesta.resultados.length > 0
    ) {
      let resultados = ConsultaFacturasRespuesta.resultados;
      if (resultados.length > 0) {
        estadoCuentaInformación(
          resultados[resultados.length - 1].numerofactura.value
        );
        setEstadoCuenta(resultados[resultados.length - 1].numerofactura.value);
      }
    } else {
      console.error(ConsultaFacturasRespuesta.cabecera);
    }

  };

  return (
    <>
      <Loading isLoading={loading} />
      <Container className={styles["contenedor"]} fluid>
        <Card>
          <Card.Header className={styles.cabeceraCard}>
            <div className={styles.centraCabecera}>
              <div id="big" className="d-none d-xl-block d-lg-block ">
                <Row className={styles.cabeceraTexto}>
                  <Col>
                    <span>
                      Titular: <strong>{suscriptor}</strong>
                    </span>
                  </Col>

                  <Col style={{ textAlign: "right" }}>
                  </Col>
                </Row>
                <Row className={styles.cabeceraTexto}>
                  <Col>
                    <span>
                      Número de cuenta: <strong>{cuenta}</strong>
                    </span>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    {tipoPago === "POS" ? (
                      <span>
                        Fecha de vencimiento: <strong>{fechaFin}</strong>
                      </span>
                    ) : (
                      <span>
                        Fin de recarga: <strong>{fechaFin}</strong>
                      </span>
                    )}
                  </Col>
                </Row>
              </div>

              <div id="small" className="d-lg-none d-xl-none">
                <Row
                  className={styles.cabeceraTexto}
                  style={{ marginBottom: "5vw" }}
                >
                  <p className={styles.cabeceraTextoSmall}>
                    <span>
                      Titular: <strong>Nombre del titular</strong>
                    </span>
                  </p>
                  <p className={styles.cabeceraTextoSmall}>
                    <span>
                      Número de cuenta: <strong>123 123 123</strong>
                    </span>
                  </p>
                </Row>
                <Row className={styles.cabeceraTexto}>
                  {tipoPago === "POS" ? (
                    <p className={styles.cabeceraTextoSmall}>
                      <span>
                        Fecha de vencimiento: <strong>{fechaFin}</strong>
                      </span>
                    </p>
                  ) : (
                    <p className={styles.cabeceraTextoSmall}>
                      <span>
                        Fin de recarga: <strong>{fechaFin}</strong>
                      </span>
                    </p>
                  )}
                </Row>
              </div>
            </div>
          </Card.Header>
          <Card.Body className={styles.card}>
            <Card.Text>
              <Row style={{ marginBottom: "1vw" }}>
                <Col>
                  <span>
                    <strong>Descripción</strong>
                  </span>
                </Col>
                <Col className={styles.alineaMontos}>
                  <span>
                    <strong>Monto</strong>
                  </span>
                </Col>
              </Row>
              <Row>
                <span className={styles["subtitulo14"]}>
                  <strong>Paquete</strong>
                </span>
              </Row>
              {/**poner un map*/}
              <Row>
                <Col>
                  <span className={styles["info18"]}>{paquete}</span>
                </Col>
                <Col className={styles.alineaMontos}>
                  <span className={styles["info18"]}>${costoPaquete}</span>
                </Col>
              </Row>
              <hr></hr>
              <Row>
                <span className={styles["subtitulo14"]}>
                  <strong>Adicionales</strong>
                </span>
              </Row>
              {cargos.map((item: any, index: number) => (
                <Row>
                  <Col key={index}>
                    <span className={styles["info18"]}>{item.descripcion}</span>
                  </Col>
                  <Col key={index} className={styles.alineaMontos}>
                    <span className={styles["info18"]}>${item.monto}</span>
                  </Col>
                </Row>
              ))}
              <hr></hr>

              <Row>
                <span className={styles["subtitulo14"]}>
                  <strong>Descuentos</strong>
                </span>
              </Row>

              {descuentos.map((item: any, index: number) => (
                <Row>
                  <Col key={index}>
                    <span className={styles["info18"]}>{item.descripcion}</span>
                  </Col>
                  <Col key={index} className={styles.alineaMontos}>
                    <span className={styles["info18"]}>${item.monto}</span>
                  </Col>
                </Row>
              ))}

              <Row className={styles["seccionTotales"]}>
                <Col>
                  <span className={styles["total"]}>
                    <strong>Total</strong>
                  </span>
                </Col>
                <Col className={styles.alineaMontos}>
                  <span
                    style={{ color: "#000FBE" }}
                    className={styles["total"]}
                  >
                    <strong>${total}</strong>
                  </span>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
          <div id="big" className="d-none d-xl-block d-lg-block ">
            <Row style={{ marginBottom: "2vw" }}>
              <Col>
                <Button
                  className={styles.boton}
                  style={{ float: "right" }}
                  onClick={showModalPospago}
                >
                  Pagar con tarjeta
                </Button>
              </Col>
              <Col>
                <Button href="/pagos/metodospago" className={styles.boton2}>
                  <strong>Ver otros métodos de pago</strong>
                </Button>
              </Col>
            </Row>
          </div>

          <div id="small" className="d-lg-none d-xl-none ">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button className={styles.boton} onClick={showModalPospago}>
                <b>Pagar con tarjeta</b>
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button className={styles.boton2} href="/pagos/metodospago">
                <strong>Ver otros métodos de pago</strong>
              </Button>
            </div>
          </div>
        </Card>
      </Container>

      {/*********************
       * Seccion de modales
       * ********************/}

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body className={styles.contenedorMod}>
          <div>
            <h2 className={styles.titulo}>Revisa tus datos</h2>
            <p className={styles.descripcionMod}>
              Tu estado de cuenta se enviará a:{" "}
              {sessionStorage.getItem("EmailNotif")}
            </p>
            <Stack>
              <Button
                className={styles.botonMod}
                onClick={() => generaEstadoCuenta("send")}
              >
                <strong>Enviar</strong>
              </Button>
              <Button className={styles.botonCancelarMod} onClick={handleClose}>
                <strong>Cancelar</strong>
              </Button>
            </Stack>
          </div>
        </Modal.Body>
      </Modal>
      <ModalPospagoConTarjeta
        show={modalPospago}
        onHide={(resp: any) => hideModalPospago2(resp)}
        datosTarjeta={allMyBines}
        saldoAPagar={total}
      />
      <ModalConfirmado
        show={modalConfirmarShow}
        title={"¡Gracias!"}
        subtitle={
          tipoPago === "POS"
            ? "Tu pago ha sido realizado con exito con el codigo #000000"
            : "Tu recarga ha sido realizada con exito con el codigo #000000"
        }
        msgButon="Volver a inicio"
        onHide={() => setModalConfirmarShow(false)}
      />
      <ModalPrepagoConTarjeta
        show={modalPrepago}
        onHide={(resp: any) => hideModalPospago2(resp)}
        datosTarjeta={allMyBines}
        saldoAPagar={total}
      />

      <ModalError show={modalError} onHide={() => setModalError(false)} />
    </>
  );
};
