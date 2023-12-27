import styles from "./EstadosCuentaPasados.module.css";
import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import logo from "../../assets/img/BarraSuperior/skyLogo.png";
import Collapse from "react-bootstrap/Collapse";
import Card from "react-bootstrap/Card";
import flecha from "../../../src/assets/img/Iconos/flechaAbajo.svg";
import descargarIcono from "../../assets/img/Iconos/iconoDescarga.png";
import axios from "axios";
import { Buffer } from "buffer";
import Loading from "../../General/Loading";
import { jsPDF } from "jspdf";
import { decryptBase64ArrayByteToString } from "../../Commons/EncriptText";
import { Paginacion } from "../../Commons/paginacion/Paginacion";
import { builtConsultaEstadoCuentaEntrada, ConsultaEstadoCuenta_Entrada, ConsultaEstadoCuenta_Parametros, ConsultaEstadoCuenta_Respuesta } from "../../Commons/Services/ConsultaEstadoCuenta";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import { builtRecargaConsultaPrecioRecargaInput, ConsultaFacturas_Entrada, ConsultaFacturas_Parametros, ConsultaFacturas_Respuesta } from "../../Commons/Services/ConsultaFacturas";
import { determinaMoneda } from "../../Utils/Monedas";

export const EstadosCuentaPasados = ({funcionManejaToast}:any) => {

  const [facturas, setFacturas] = useState<any>([]);
  const [loading, isLoading] = useState(false);
  const [estadosPorPagina, setEstadosPorPagina] = useState(10);
  const [paginaActual, setPaginaActual] = useState(1);
  const [moneda, setMoneda] = useState(determinaMoneda(sessionStorage.getItem("pais")!,sessionStorage.getItem("flujos")!));

  const totalEstados = facturas.length;

  const ultimoIndice = paginaActual * estadosPorPagina;
  const primerIndice = ultimoIndice - estadosPorPagina;


  const handleClick = (item: any) => {
    setFacturas(
      facturas.map((e: any) =>
        e.id === item.id ? { ...e, isOpen: !e.isOpen } : { ...e, isOpen: false }
      )
    );
  };

  const descargaEstadoCuenta = async (noCuenta: string) => {

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

          doc.save(noCuenta + ".pdf");

          funcionManejaToast("OK", "Tu estado de cuenta ha sido descargado");
        }
      );

      isLoading(false);

    }else{
      funcionManejaToast("ERROR", "Error al procesar la factura");
      isLoading(false);
    }
  };//fin de descargaEstadoDeCuenta

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
      
      const res = ConsultaFacturasRespuesta.resultados;
      const ar: object[] = [];

      if (res.length > 0) {
        res.forEach((element: object, i: number) => {
          if (i !== 0 && i < 50) {
            ar.push(element);
          }
        });

        const temp = ar.map((e, i) => ({ ...e, id: i }));
        setFacturas(temp.map((e) => ({ ...e, isOpen: false })));
      }  

      isLoading(false);

    }else{
      console.error(ConsultaFacturasRespuesta.cabecera.msgerror);
      isLoading(false);
    }
  }//find e ontieneestadosDeCuenta

  useEffect(() => {

      obtieneEstadosDeCuenta();

  }, []);

  return (
    <>
      {/* <ConfirmMessage status={status1} message={message1} showAlert={showAlert1}/> */}
      <Loading isLoading={loading} />
      <div id="big" className="d-none d-xl-block d-lg-block ">
        <Container
          fluid
          style={{
            marginTop: "5vw",
            paddingLeft: "1vw",
            paddingRight: "8vw",
            marginLeft: "1.5vw",
          }}
        >
          <Row>
            <Col>
              <p className={styles["title"]}>Historial de Estados de Cuenta</p>
            </Col>
          </Row>
        </Container>

        <Container
          fluid
          className={styles["subheaderRowGrid"] + " " + styles["historialGrid"]}
        >
          <Row
            className={styles["subheaderRowGrid"] + " " + styles["gridHeader"]}
          >
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              <span>Fecha</span>
            </Col>
            <Col xs={2} sm={2} md={2} lg={3} xl={3}>
              <span>No. de referencia Sky</span>
            </Col>
            <Col xs={2} sm={2} md={2} lg={1} xl={1}>
              <span>Cargos</span>
            </Col>
            <Col xs={2} sm={3} md={3} lg={2} xl={1}>
              <span>Por pagar</span>
            </Col>
            <Col xs={2} sm={3} md={3} lg={1} xl={1}>
              <span>{sessionStorage.getItem("tipoCliente") === "POS" ? "Pagos":"Recargas"}</span>
            </Col>
            <Col xs={2} sm={3} md={3} lg={1} xl={1}>
              <span>Ajustes</span>
            </Col>
            <Col xs={2} sm={3} md={3} lg={2} xl={3} />
          </Row>
          {facturas
            .map((item: any, index: number) => (
              <Row
                className={styles["subheaderRowGrid"] + " " + styles["grid"]}
                key={index}
              >
                <Col xs={2} sm={2} md={2} lg={2} xl={2} className={styles["alignToLeft"]}>
                  <span>{item.fechafactura.value.slice(0, 10)}</span>
                </Col>
                <Col xs={2} sm={2} md={2} lg={3} xl={3} className={styles["alignToLeft"]}>
                  <span>{item.numerofactura.value}</span>
                </Col>
                <Col xs={2} sm={2} md={2} lg={1} xl={1} className={styles["alignToLeft"]}>
                  <span>$ {item.consumosdelmes.value}{' '}{moneda}</span>
                </Col>
                <Col xs={3} sm={3} md={3}  lg={2}  xl={1}  className={styles["alignToLeft"]}>
                  <span>$ {item.saldototal.value}{' '}{moneda}</span>
                </Col>
                <Col xs={3} sm={3} md={3} lg={1} xl={1} className={styles["alignToLeft"]}>
                  <span>$ {item.pagosafactura.value}{' '}{moneda}</span>
                </Col>
                <Col xs={3} sm={3} md={3} lg={1}  xl={1} className={styles["alignToLeft"]} >
                  <span>$ {item.ajustes.value}{' '}{moneda}</span>
                </Col>
                <Col xs={3} sm={3} md={3} lg={2} xl={3}>
                  <Button
                    className={styles["detallesButton"]}
                    onClick={() =>
                      descargaEstadoCuenta(item.numerofactura.value)
                    }
                  >
                    <img src={descargarIcono} className={styles.icono} />
                    <strong>Descargar</strong>
                  </Button>
                </Col>
              </Row>
            ))
            .slice(primerIndice, ultimoIndice)}
        </Container>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "100px",
          }}
        >
          <Paginacion
            itemsPorPagina={estadosPorPagina}
            pageActual={paginaActual}
            setPageActual={setPaginaActual}
            itemsTotal={totalEstados}
          />
        </Container>
      </div>

      {/*******************************
       * Inicia seccion responsiva
       ********************************/}
      <div id="small" className="d-lg-none d-xl-none">
        <Container fluid className={styles["contenedorCabeceraSmall"]}>
          <Row>
            <Col>
              <p className={styles["titleSmall"]}>
              Historial de Estados de Cuenta
              </p>
            </Col>
          </Row>
        </Container>

        <Container className={styles["contenedorSmall"]}>
          {facturas
            .map((item: any) => (
              <Card style={{ marginBottom: "3vw" }}>
                <Row>
                  <Col className={styles["headerCard"]}>
                    <p className={styles["navegaSmall"]}>
                      <b>{item.fechafactura.value.slice(0, 10)}</b>
                    </p>
                  </Col>
                  <Col>
                    <span>
                      <Button
                        style={{
                          background: "white",
                          border: "none",
                          float: "right",
                        }}
                        onClick={() => handleClick(item)}
                      >
                        <img
                          src={flecha}
                          aria-controls="example-collapse-text"
                          aria-expanded={item.isOpen}
                          className={
                            item.isOpen === true
                              ? styles["rota"]
                              : styles["noRota"]
                          }
                        />
                      </Button>
                    </span>
                  </Col>
                </Row>
                <Collapse in={item.isOpen}>
                  <div
                    id="example-collapse-text"
                    className={styles["infoCardSmall"]}
                  >
                    <p className={styles["subtituloInfo"]}>
                      <b>No. de referencia</b>
                    </p>
                    <p className={styles["infoCollapse"]}>
                      {item.numerofactura.value}
                    </p>
                    <p className={styles["subtituloInfo"]}>
                      <b>Cargos</b>
                    </p>
                    <p className={styles["infoCollapse"]}>
                      $ {item.consumosdelmes.value}{' '}{moneda}
                    </p>
                    <p className={styles["subtituloInfo"]}>
                      <b>Por pagar</b>
                    </p>
                    <p className={styles["infoCollapse"]}>
                      $ {item.saldototal.value}{' '}{moneda}
                    </p>
                    <p className={styles["subtituloInfo"]}>
                      <b>{sessionStorage.getItem("tipoCliente") === "POS" ? "Pagos":"Recargas"}</b>
                    </p>
                    <p className={styles["infoCollapse"]}>
                      $ {item.pagosafactura.value}{' '}{moneda}
                    </p>
                    <p className={styles["subtituloInfo"]}>
                      <b>Ajustes</b>
                    </p>
                    <p className={styles["infoCollapse"]}>
                      $ {item.ajustes.value}{' '}{moneda}
                    </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <a
                        onClick={() =>
                          descargaEstadoCuenta(item.numerofactura.value)
                        }
                        className={styles.enlace + " " + styles.margenEnlace}
                      >
                        <img src={descargarIcono} className={styles.icono} />
                        <strong>Descargar</strong>
                      </a>
                    </div>
                  </div>
                </Collapse>
              </Card>
            ))
            .slice(primerIndice, ultimoIndice)}
        </Container>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "100px",
          }}
        >
          <Paginacion
            itemsPorPagina={estadosPorPagina}
            pageActual={paginaActual}
            setPageActual={setPaginaActual}
            itemsTotal={totalEstados}
          />
        </Container>
      </div>
    </>
  );
};
