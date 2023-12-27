import axios from "axios";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
  Collapse,
} from "react-bootstrap";
import { decryptBase64ArrayByteToString } from "../../Commons/EncriptText";
import { Paginacion } from "../../Commons/paginacion/Paginacion";
import styles from "./FacturasDisponibles.module.css";
import descargarIcono from "../../assets/img/Iconos/iconoDescarga.png";
import logo from "../../assets/img/BarraSuperior/skyLogo.png";
import { Buffer } from "buffer";
import flecha from "../../assets/img/Iconos/flechaAbajo.svg";
import ConfirmMessage from "../../General/ConfirmMessage";
import {
  builtRecargaConsultaPrecioRecargaInput,
  ConsultaFacturas_Entrada,
  ConsultaFacturas_Parametros,
  ConsultaFacturas_Respuesta,
} from "../../Commons/Services/ConsultaFacturas";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import {
  builtConsultaEstadoCuentaEntrada,
  ConsultaEstadoCuenta_Entrada,
  ConsultaEstadoCuenta_Parametros,
  ConsultaEstadoCuenta_Respuesta,
} from "../../Commons/Services/ConsultaEstadoCuenta";
import Loading from "../../General/Loading";

export const FacturasDisponibles = ({ funcionManejaToast }: any) => {
  const [facturas, setFacturas] = useState<any>([]);
  const [facturasOriginales, setFacturasOriginales] = useState<any>([]);
  const [loading, isLoading] = useState(false);
  const [estadosPorPagina, setEstadosPorPagina] = useState(10);
  const [paginaActual, setPaginaActual] = useState(1);

  const totalEstados = facturas.length;

  const ultimoIndice = paginaActual * estadosPorPagina;
  const primerIndice = ultimoIndice - estadosPorPagina;

  const [status1, setStatus1] = useState("OK");
  const [message1, setMessage1] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);

  const dias = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  const handleClick = (item: any) => {
    setFacturas(
      facturas.map((e: any) =>
        e.id === item.id ? { ...e, isOpen: !e.isOpen } : { ...e, isOpen: false }
      )
    );
  };

  const selectAnio = (e: any) => {
    let arregloFiltro: any = [];

    if (facturasOriginales.length > 0) {
      facturasOriginales.forEach((item: any) => {
        if (item.fechafactura !== null) {
          let date = item.fechafactura.value.slice(0, 4);

          if (date.includes(e.target.value)) {
            arregloFiltro.push(item);
          }
        }
      });

      setFacturas(arregloFiltro);
    }
  };

  const selectMes = (e: any) => {
    console.info(e.target.value);
  };

  const selectDia = (e: any) => {
    console.info(e.target.value);
  };

  const formatoFecha = (fecha: string) => {
    let ar = [];
    let f = "";

    if (fecha !== null) {
      ar = fecha.split("-");
      f = ar[2] + "/" + ar[1] + "/" + ar[0];
    }

    return f;
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

          doc.save(noCuenta + ".pdf");

          funcionManejaToast("OK", "Tu estado de cuenta ha sido descargado");
        }
      );

      isLoading(false);
    } else {
      funcionManejaToast("ERROR", "Error al procesar la factura");
      isLoading(false);
    }
  }; //fin de descargaEstadoDeCuenta

  const obtieneEstadosDeCuenta = async () => {
    isLoading(true);
    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );

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
      ConsultaFacturasRespuesta.cabecera.coderror === "0"
    ) {
      const res = ConsultaFacturasRespuesta.resultados;
      const ar: object[] = [];

      if (res.length > 0) {
        res.forEach((element: object, i: number) => {
          if (i !== 0 && i < 50) {
            ar.push(element);
          }
        });

        const temp = ar.map((e, i) => ({ ...e, id: i }));
        const dataOriginal: object[] = temp.map((e) => ({
          ...e,
          isOpen: false,
        }));
        setFacturasOriginales(dataOriginal);
        setFacturas(dataOriginal);
      }

      isLoading(false);
    } else {
      console.error(ConsultaFacturasRespuesta.cabecera.msgerror);
      isLoading(false);
    }
  }; //find e ontieneestadosDeCuenta

  useEffect(() => {
    obtieneEstadosDeCuenta();
  }, []);

  return (
    <>
      <ConfirmMessage
        status={status1}
        message={message1}
        showAlert={showAlert1}
      />
      <Loading isLoading={loading} />
      <Container className={styles["contenedorTitulo"]} fluid>
        <Row>
          <Col>
            <p className={styles["tituloInformacion"]}>Facturas disponibles</p>
          </Col>
        </Row>
        <div id="big" className="d-none d-xl-block d-lg-block ">
          <Row>
            <Col xs={6} lg={2} xl={2}>
              <p className={styles["textoSelect"]}>Año</p>
              <Form.Select className={styles["select"]} onChange={selectAnio}>
                <option value="0">Seleccionar</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </Form.Select>
            </Col>
            <Col xs={6} lg={2} xl={2}>
              <p className={styles["textoSelect"]}>Mes</p>
              <Form.Select className={styles["select"]} onChange={selectMes}>
                <option value="0">Seleccionar</option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </Form.Select>
            </Col>

            <Col xs={6} lg={2} xl={2}>
              <p className={styles["textoSelect"]}>Día</p>
              <Form.Select className={styles["select"]} onChange={selectDia}>
                <option value="0">Seleccionar</option>
                {dias.map((dia: string, i: number) => (
                  <option value={i + 1}>{dia}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </div>
        <div id="small" className="d-lg-none d-xl-none">
          <Row>
            <Col>
              <p className={styles["textoSelect"]}>Año</p>
              <Form.Select className={styles["select"]}>
                <option value="0">Seleccionar</option>
                <option value="1">2023</option>
                <option value="2">2022</option>
                <option value="3">2021</option>
                <option value="4">2020</option>
                <option value="5">2019</option>
                <option value="6">2018</option>
                <option value="7">2017</option>
                <option value="8">2016</option>
                <option value="9">2015</option>
                <option value="10">2014</option>
              </Form.Select>
            </Col>

            <Col>
              <p className={styles["textoSelect"]}>Mes</p>
              <Form.Select className={styles["select"]}>
                <option value="0">Seleccionar</option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </Form.Select>
            </Col>

            <Col>
              <p className={styles["textoSelect"]}>Día</p>
              <Form.Select className={styles["select"]}>
                <option value="0">Seleccionar</option>
                {dias.map((dia: string, i: number) => (
                  <option value={i}>{dia}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </div>

        <div id="big" className="d-none d-xl-block d-lg-block ">
          <Container
            className={
              styles["subheaderRowGrid"] + " " + styles["historialGrid"]
            }
            fluid
          >
            <Row
              className={
                styles["subheaderRowGrid"] + " " + styles["gridHeader"]
              }
            >
              <Col
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                className={styles["adjustColWidth"]}
              >
                <span>Fecha</span>
              </Col>
              <Col
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={3}
                className={styles["adjustColWidth"]}
              >
                <span>No. de factura</span>
              </Col>
              <Col
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                className={styles["adjustColWidth"]}
              >
                <span>Fecha de corte</span>
              </Col>
              <Col
                xs={2}
                sm={3}
                md={3}
                lg={3}
                xl={2}
                className={styles["adjustColWidth"]}
              >
                <span>Por pagar</span>
              </Col>
               <Col
                xs={2}
                sm={3}
                md={3}
                lg={3}
                xl={3}
                className={styles["adjustColWidth"]}
              />
            </Row>

            {facturas
              .map((item: any, index: number) => (
                <Row
                  className={styles["subheaderRowGrid"] + " " + styles["grid"]}
                  key={index}
                >
                  <Col
                    xs={2}
                    sm={2}
                    md={2}
                    lg={2}
                    xl={2}
                    className={styles["adjustColWidth"]}
                  >
                    <span>
                      {item.fechafactura !== null
                        ? formatoFecha(item.fechafactura.value.slice(0, 10))
                        : ""}
                    </span>
                  </Col>
                  <Col
                    xs={2}
                    sm={2}
                    md={2}
                    lg={2}
                    xl={3}
                    className={styles["adjustColWidth"]}
                  >
                    <span>{item.numerofactura.value}</span>
                  </Col>
                  <Col
                    xs={2}
                    sm={2}
                    md={2}
                    lg={2}
                    xl={2}
                    className={
                      styles["alignToLeft"] + " " + styles["adjustColWidth"]
                    }
                  >
                    <span>{ formatoFecha(item.finperiodo.value.slice(0, 10))}</span>
                  </Col>
                  <Col
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={2}
                    className={
                      styles["alignToLeft"] + " " + styles["adjustColWidth"]
                    }
                  >
                    <span>$ {item.saldototal.value}</span>
                  </Col>
                  <Col
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    className={styles["adjustColWidth"]}
                  >
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
          <Container className={styles["contenedorSmall"]}>
            {facturas
              .map((item: any) => (
                <Card style={{ marginBottom: "3vw" }}>
                  <Row>
                    <Col className={styles["headerCard"]}>
                      <p className={styles["navegaSmall"]}>
                        <b>
                          {item.fechafactura !== null
                            ? formatoFecha(item.fechafactura.value.slice(0, 10))
                            : ""}
                        </b>
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
                        <b>Fecha de corte</b>
                      </p>
                      <p className={styles["infoCollapse"]}>
                        {formatoFecha(item.finperiodo.value.slice(0, 10))}
                      </p>
                      <p className={styles["subtituloInfo"]}>
                        <b>Por pagar</b>
                      </p>
                      <p className={styles["infoCollapse"]}>
                        $ {item.saldototal.value}
                      </p>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
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
      </Container>
    </>
  );
};
