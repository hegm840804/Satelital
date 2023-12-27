import { useEffect, useState } from "react";
import styles from "./EstadoDeCuentaInformacion.module.css";

import visaLogo from "../../assets/img/logos/visa.png";
import mailIcono from "../../assets/img/Iconos/iconoMail.png";
import descargarIcono from "../../assets/img/Iconos/iconoDescarga.png";
import iconoExclamacion from "../../assets/img/Iconos/exclamation-circle.png";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { Row, Col, Card, Modal, Stack } from "react-bootstrap";
import { decryptBase64ArrayByteToString } from "../../Commons/EncriptText";
import axios from "axios";
import { Buffer } from "buffer";
import Loading from "../../General/Loading";
import { GiConsoleController } from "react-icons/gi";
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
import {
  ConsultarSaldosCorrientes_Respuesta,
  ConsultarSaldosCorrientes_Parametros,
  ConsultarSaldosCorrientes_Entrada,
  builtConsultarSaldosCorrientesInput,
} from "../../Commons/Services/ConsultarSaldosCorrientesRest";
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
import ConfirmMessage from "../../General/ConfirmMessage";
import { builtConsultaEstadoCuentaEntrada, ConsultaEstadoCuenta_Entrada, ConsultaEstadoCuenta_Parametros, ConsultaEstadoCuenta_Respuesta } from "../../Commons/Services/ConsultaEstadoCuenta";
import { builtRecargaConsultaPrecioRecargaInput, ConsultaFacturas_Entrada, ConsultaFacturas_Parametros, ConsultaFacturas_Respuesta } from "../../Commons/Services/ConsultaFacturas";
import { determinaMoneda } from "../../Utils/Monedas";

export const EstadoDeCuentaInformacion = () => {
  const [show, setShow] = useState(false);
  const [modalPrepagoConTarjetaShow, setModalPrepagoConTarjetaShow] =
    useState(false);
  const [modalPospagoConTarjetaShow, setModalPospagoConTarjetaShow] =
    useState(false);
  const [modalConfirmadoShow, setModalConfirmadoShow] = useState(false);
  const [modalErrorShow, setModalErrorShow] = useState(false);
  const [suscriptor, setSuscriptor] = useState(() => {
    if (sessionStorage.getItem("flujos") === "Sky+") {
      return sessionStorage.getItem("Nombre");
    }
    return sessionStorage.getItem("NombreSuscriptor");
  });
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
  const [total, setTotal] = useState("");
  const [saldoAPagar, setSaldoApagar] = useState("");
  const [estadoCuenta, setEstadoCuenta] = useState("");
  const [allMyBines, setAllMyBines] = useState<ConsultarBilletera_Info[]>([]);
  const [pagoOportuno, setPagoOportuno] = useState("");

  const [fechaCorte, setFechaCorte] = useState("");

  const [status, setStatus] = useState("OK");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));
  const [mensaje4Customer, setMensaje4Customer] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [moneda, setMoneda] = useState(determinaMoneda(sessionStorage.getItem("pais")!,sessionStorage.getItem("flujos")!));

  const hideModalPospagoConTarjeta = (respuesta: any, mensaje: any) => {
    setModalPospagoConTarjetaShow(false);
    setMensaje4Customer(mensaje);
    if (respuesta) {
      if (respuesta.action === "error") {
        setModalErrorShow(true);
        setModalConfirmadoShow(false);
      } else if (respuesta.action === "terminar") {
        setModalConfirmadoShow(true);
        setModalErrorShow(false);
        //obtieneSaldoFecha(origen, banderaCelular);
      }
    }
  };

  const hideModalPrepagoConTarjeta = (respuesta: any) => {
    setModalPrepagoConTarjetaShow(false);

    if (respuesta) {
      if (respuesta.action === "error") {
        setModalErrorShow(true);
      } else if (respuesta.action === "terminar") {
        setModalConfirmadoShow(true);
      }
    }
  };

  const showModalPospago = (saldo: any) => {
    if (tipoPago === "POS") {
      setModalPospagoConTarjetaShow(true);
    } else {
      setModalPrepagoConTarjetaShow(true);
    }
  };

  const hideModalError = (respuesta: any) => {
    if (respuesta) {
      if (respuesta.action === "reintentar") {
        showModalPospago(0);
      }
    }

    setModalErrorShow(false);
  };

  const estadoCuentaInformación = async (noCuenta: string) => {

    isLoading(true);

    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );

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
            "Fecha de corte: " +
            campos["ns0:FECHA_CORTE"][0].substring(0, 10);
          setFechaCorte(campos["ns0:FECHA_CORTE"][0].substring(0, 10));
          let cliente = "Cliente: " + campos["ns0:NOMBRE_SUSCRIPTOR"][0];
          let fechaPagoOportuno =
            "Aproveche descuento pago oportuno antes del: " +
            campos["ns0:FECHA_PAGO_OPORTUNO"][0].substring(0, 10);
          setPagoOportuno(
            campos["ns0:FECHA_PAGO_OPORTUNO"][0].substring(0, 10)
          );
          let descuentoPagoOportuno = "$ " + campos["ns0:DESCUENTO_PO"][0];
          let pagarAntes =
            "Evite corte del servicio, pague antes de: " +
            campos["ns0:FECHA_CORTE_SERVICIO"][0].substring(0, 10);

          let cargos: any = campos["ns0:CARGOS"];

          setPaquete(
            flujo === "Sky+"
              ? sessionStorage.getItem("Producto")
              : campos["ns0:PAQUETE"][0]
          );
          let costoPaquete = parseInt(cargos[0]["ns0:MONTO"][0]);
          setCostoPaquete(
            costoPaquete.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          );

          let totalParseado = parseFloat(campos["ns0:TOTAL_A_PAGAR"][0]);
          setTotal(totalParseado.toString());

          let arregloMontos: any = [];
          let arregloDescuentos: any = [];

          cargos.forEach((element: any, index: number) => {
            if (!element["ns0:MONTO"][0].includes("-") && index !== 0) {
              let montoParseado = parseInt(element["ns0:MONTO"][0]);
              let obj = {
                descripcion: element["ns0:DESCRIPCION"][0],
                monto: montoParseado.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
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

    }

   }; //fin de estadoCuentaInformación

  const descargaEstadoCuenta = async () => {

    isLoading(true);

    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );

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
              "Fecha de corte: " +
              campos["ns0:FECHA_CORTE"][0].substring(0, 10);
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
            let total = "Total a pagar:  $ " + campos["ns0:TOTAL_A_PAGAR"][0] + " " + moneda;

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

            doc.save(estadoCuenta + ".pdf");
          }
        );

        setStatus("OK");
        setMessage("Tu estado de cuenta ha sido descargado");
        setShow(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        isLoading(false);

      }else{

        setStatus("ERROR");
        setMessage("Error al procesar la factura");
        setShow(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        console.error(ConsultaEstadoCuentaRespuesta.cabecera.msgerror);
        isLoading(false);
      }
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

  const obtieneEstadosDeCuenta = async () => {

    isLoading(true);    

    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );

    const ConsultaFacturasDO: ConsultaFacturas_Entrada =  builtRecargaConsultaPrecioRecargaInput(
      sessionStorage.getItem("cuenta")!,
      sessionStorage.getItem("EmailNotif")!,
      tmp
      
    );
    let ConsultaFacturasParametros = ConsultaFacturas_Parametros(ConsultaFacturasDO);
    let ConsultaFacturasRespuesta: ConsultaFacturas_Respuesta = await ConsultaWS(ConsultaFacturasParametros);

    if (ConsultaFacturasRespuesta.cabecera && ConsultaFacturasRespuesta.cabecera.coderror === "0") {

      let resultados = ConsultaFacturasRespuesta.resultados;
      if (resultados.length !== 0) {
        estadoCuentaInformación(resultados[1].numerofactura.value);
        setEstadoCuenta(resultados[1].numerofactura.value);
      }

      isLoading(false);

    }else{
      console.error(ConsultaFacturasRespuesta.cabecera.msgerror);
      isLoading(false);
    }
  }//find e ontieneestadosDeCuenta

  useEffect(() => {

    executeConsultWallet();
    obtieneEstadosDeCuenta();

  }, []);

  const corrigeNumeros = (param1: number) => {
    if (param1.toString().length == 1) {
      return "0" + param1;
    } else {
      return "" + param1;
    }
  };

  const corrigeAnho = (param1: number) => {
    let tiempo = param1.toString();

    return tiempo.substring(2, 4);
  };

  const formatTheDate = (fecha: string) => {
    let objectDate = new Date(fecha);

    let day = objectDate.getDate();

    let month = objectDate.getMonth();

    let year = objectDate.getFullYear();

    let retorno =
      corrigeNumeros(day) +
      "/" +
      corrigeNumeros(month) +
      "/" +
      corrigeAnho(year);

    return retorno;
  };

  return (
    <>
      <Loading isLoading={loading} />
      <ConfirmMessage status={status} message={message} showAlert={showAlert} />
      <Container className={styles["contenedor"]} fluid>
        <Row style={{ paddingBottom: "1.5vw" }}>
          <Col xs={12} xl={8}>
            <h1 className={styles["spectrum"]}>
              <span className="textoSpectrum">Estado de cuenta</span>
            </h1>
          </Col>
          <Col xs={12} xl={4}>
            <Stack direction="horizontal" className={styles["alineaBotones"]}>
              <a
                className={styles.enlace + " " + styles.margenEnlace}
                onClick={descargaEstadoCuenta}
              >
                <img src={descargarIcono} className={styles.icono} />
                <strong>Descargar</strong>
              </a>
            </Stack>
          </Col>
        </Row>

        <Card className={styles.card} style={{ borderRadius: 10 }}>
          <Card.Header
            style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
            className={styles.cabeceraCard}
          >
            <div className={styles.centraCabecera}>
              <div id="big" className="d-none d-xl-block d-lg-block ">
                <Row className={styles.cabeceraTexto}>
                  <Col>
                    <span>
                      <label>Titular:</label> <strong>{suscriptor}</strong>
                    </span>
                  </Col>

                  <Col style={{ textAlign: "right" }}>
                    {flujo !== "Sky+" ? (
                      tipoPago === "POS" ? (
                        <span>
                          Pago oportuno:{" "}
                          <strong>{formatTheDate(pagoOportuno)}</strong>
                        </span>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
                <Row className={styles.cabeceraTexto}>
                  <Col>
                    <span>
                      Número de cuenta: <strong>{cuenta}</strong>
                    </span>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    {flujo !== "Sky+" ? (
                      tipoPago === "POS" ? (
                        <span>
                          Precio regular:{" "}
                          <strong>{formatTheDate(fechaCorte!)}</strong>
                        </span>
                      ) : (
                        <span>
                          Fin de recarga:{" "}
                          <strong>{formatTheDate(fechaFin!)}</strong>
                        </span>
                      )
                    ) : (
                      <span>
                        Fecha limite de pago: <strong>{fechaFin!}</strong>
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
                      Titular: <strong>{suscriptor}</strong>
                    </span>
                  </p>
                  <p className={styles.cabeceraTextoSmall}>
                    <span>
                      Número de cuenta: <strong>{cuenta}</strong>
                    </span>
                  </p>
                </Row>
                <Row className={styles.cabeceraTexto}>
                  {tipoPago === "POS" ? (
                    <div>
                      {pagoOportuno !== null ? (
                        <p className={styles.cabeceraTextoSmall}>
                          <span>
                            Pago oportuno:{" "}
                            <strong>{formatTheDate(pagoOportuno)}</strong>
                          </span>
                        </p>
                      ) : (
                        <></>
                      )}
                      {fechaFin !== null ? (
                        <p className={styles.cabeceraTextoSmall}>
                          <span>
                            Precio regular:{" "}
                            <strong>{formatTheDate(fechaFin!)}</strong>
                          </span>
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
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
          <Card.Body className={styles.cardBody}>
            <Card.Text>
              <Row style={{ marginBottom: "1vw" }}>
                <Col>
                  <span className={styles.descripcionMonto}>
                    <strong>Descripción</strong>
                  </span>
                </Col>
                <Col className={styles.alineaMontos}>
                  <span className={styles.descripcionMonto}>
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
              <Row className={styles["linea"]}>
                <hr></hr>
              </Row>
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
              <Row className={styles["linea"]}>
                <hr></hr>
              </Row>

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
            </Card.Text>
          </Card.Body>

          <Row className={styles["seccionTotales"]}>
            <Col>
              <span className={styles["total"]}>
                <strong>Total</strong>
              </span>
            </Col>
            <Col className={styles.alineaMontoTotal}>
              <span style={{ color: "#000FBE" }} className={styles["total"]}>
                <strong>${total}{' '}{moneda}</strong>
              </span>
            </Col>
          </Row>

          <div id="big" className="d-none d-xl-block d-lg-block ">
            <Row style={{ marginBottom: "2vw" }}>
              <Col className={styles.espacioBotonDerecho}>
                <Button
                  className={styles.boton}
                  style={{ float: "right" }}
                  onClick={showModalPospago}
                >
                  Pagar con tarjeta
                </Button>
              </Col>
              <Col className={styles.espacioBotonIzquierdo}>
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
              Tu estado de cuenta se enviará a: usuario@dominio.com
            </p>
            <Stack>
              <Button className={styles.botonMod}>
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
        show={modalPospagoConTarjetaShow}
        onHide={(resp: any, mensaje: any) =>
          hideModalPospagoConTarjeta(resp, mensaje)
        }
        allItCards={allMyBines}
        saldoAPagar={total}
        fechaLimite={fechaCorte}
        origen={"SKY"}
      />
      <ModalConfirmado
        show={modalConfirmadoShow}
        title={"¡Gracias!"}
        subtitle={mensaje4Customer}
        msgButon="Volver a inicio"
        onHide={() => {
          setModalConfirmadoShow(false);
        }}
      />
      <ModalPrepagoConTarjeta
        show={modalPrepagoConTarjetaShow}
        onHide={(resp: any) => hideModalPrepagoConTarjeta(resp)}
        allItCards={allMyBines}
        saldoAPagar={total}
        fechaLimite={fechaCorte}
        origen={"SKY"}
      />

      <ModalError
        subtitle={mensaje4Customer}
        show={modalErrorShow}
        onHide={(resp: any) => hideModalError(resp)}
      />
    </>
  );
};
