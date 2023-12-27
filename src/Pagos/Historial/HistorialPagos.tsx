import React, { useEffect, useState } from "react";
import {
  ConsultarPago_Entrada,
  ConsultarPago_Parametros,
  ConsultarPago_Respuesta,
  Pago,
} from "../../Commons/Services/ConsultarPago";
import { FiChevronDown } from "react-icons/fi";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import { Container, Col, Row, Button, Card, Collapse } from "react-bootstrap";
import styles from "./HistorialPagos.module.css";
import { Paginacion } from "../../Commons/paginacion/Paginacion";
import { determinaMoneda } from "../../Utils/Monedas";

const HistorialPagos = ({ tipoPago, origen }: any) => {

  const [pagosArray, setPagosArray] = React.useState<Pago[]>([]);
  const totalEstados = pagosArray.length;
  const [estadosPorPagina, setEstadosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);
  const ultimoIndice = paginaActual * estadosPorPagina;
  const primerIndice = ultimoIndice - estadosPorPagina;
  const collapsed = pagosArray.map((item: any) => {
    return false;
  });
  const [collapsedControl, setCollapsedControl] = useState(collapsed);
  const [mensajeVacio, setMensajeVacio] = useState(
    "Parece que aún no has hecho ninguna recarga"
  );
  const [mensajeVacio2, setMensajeVacio2] = useState(
    "Cuando realices una recarga podrás visualizarla aquí"
  );
  const [moneda, setMoneda] = useState(determinaMoneda(sessionStorage.getItem("pais")!,sessionStorage.getItem("flujos")!));

  React.useEffect(() => {
    doConsultarPagos(origen);
  }, []);

  const doConsultarPagos = async (param1: string) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarPagoDO: ConsultarPago_Entrada = {
      RowId: `${sessionStorage.getItem("rowId")}`,
    };
    let ConsultarPagoParametros = ConsultarPago_Parametros(ConsultarPagoDO);

    let ConsultarPagoRespuesta: ConsultarPago_Respuesta = await ConsultaWS(
      ConsultarPagoParametros
    );

    if (
      ConsultarPagoRespuesta.ListaPagos &&
      ConsultarPagoRespuesta.ListaPagos.Pago.length > 0
    ) {
      setPagosArray(ConsultarPagoRespuesta.ListaPagos.Pago);
    } else {
      setPagosArray([]);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const manageCollapsed = (index: number) => {
    collapsedControl[index] = !collapsedControl[index];
    let newCollapsed = { ...collapsedControl };
    setCollapsedControl(newCollapsed);
  };

  const formatoFecha = (fecha: string) => {
    let fechaSplit = fecha.split("T");
    let fechaSinHrSplit = fechaSplit[0].split("-");
    let fechaFinal = fechaSinHrSplit[2] + "/" + fechaSinHrSplit[1] + "/" + fechaSinHrSplit[0];
    let fechaHrSplit = fechaSplit[1].split(".");
    let returnFecha = fechaFinal + " " + fechaHrSplit[0];
    
    return returnFecha.slice(0,10);

  };

  const formatoPago = (fecha: string) => {
    let fechaSinHrSplit = fecha.split("-");
    let fechaFinal = fechaSinHrSplit[2] + "/" + fechaSinHrSplit[1] + "/" + fechaSinHrSplit[0];
    
    return fechaFinal

  };

  const builtComponentToReturn = (param: any) => {
    if (param.length > 0) {
      return (
        <>
          <Container fluid className={styles["p-50"]}>
            <Row className={styles["subheaderRowGrid"]}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <p className={styles["fontTitleMisTarjetas"] + " gris-oscuro"}>
                  Tu historial de pagos
                </p>
              </Col>
            </Row>
          </Container>


          <div
            id="bigGrid"
            className={"d-none d-sm-block d-md-block d-lg-block d-xl-block"}
          >
            <Container fluid className={styles["p-50"] + " " + styles["historialGrid"]}>
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
                  className={styles["adjustColWidthFecha"]}
                >
                  <span>Fecha de Pago</span>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                  <span>No. de Referencia Sky</span>
                </Col>
                <Col
                  xs={1}
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  className={styles["adjustColWidthStatus"]}
                >
                  <span>Importe</span>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                  <span>Estado</span>
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  className={styles["adjustColWidthFecha"]}
                >
                  <span>No. de Tarjeta</span>
                </Col>
              </Row>
              {param
                .map((item: any, index: number) => (
                  <Row
                    className={
                      styles["subheaderRowGrid"] + " " + styles["grid"]
                    }
                    key={"bigRow_" + index}
                  >
                    <Col
                      xs={2}
                      sm={2}
                      md={2}
                      lg={2}
                      xl={2}
                      className={styles["adjustColWidthFecha"]}
                    >
                      <span>{formatoFecha(item.FechaPago)}</span>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                      <span>{item.NoReferencia}</span>
                    </Col>
                    <Col
                      xs={1}
                      sm={2}
                      md={1}
                      lg={1}
                      xl={1}
                      className={
                        styles["alignToLeft"] +
                        " " +
                        styles["adjustColWidthStatus"]
                      }
                    >
                     <span> {`$${item.Importe}${' '}${moneda}`}</span>
                    </Col>
                    <Col
                      xs={2}
                      sm={2}
                      md={2}
                      lg={2}
                      xl={2}
                      className={styles["alignToLeft"]}
                    >
                      <span>{item.Estatus + " - " + item.EstatusSBL}</span>
                    </Col>
                    <Col
                      xs={2}
                      sm={2}
                      md={2}
                      lg={2}
                      xl={2}
                      className={
                        styles["alignToLeft"] +
                        " " +
                        styles["adjustColWidthFecha"]
                      }
                    >
                      <span>{item.NoTarjeta}</span>
                    </Col>
                  </Row>
                ))
                .slice(primerIndice, ultimoIndice)}
            </Container>
          </div>


          <div
            id="smallGrid"
            className={
              "d-sm-none d-md-none d-lg-none d-xl-none " +
              styles["smallGridContainer"]
            }
          >
            {param
              .map((item: any, index: number) => (
                <Row
                  className={styles["aclararionRow"]}
                  key={"smallRow1_" + index}
                >
                  <Col
                    className={styles["smallColMargin"]}
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                  >
                    <Card className={styles["aclaracionCard"]}>
                      <Card.Body className={styles["cardContainer"]}>
                        <Row className={styles["titleContainer"]}>
                          <Col
                            className={styles["titleCol"]}
                            xs={8}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                            <p className={styles["titleCard"]}>
                              <span className={styles["paqueteAlign"]}>
                                {formatoFecha(item.FechaPago)}
                              </span>
                            </p>
                          </Col>
                          <Col
                            className={styles["buttonCol"]}
                            xs={4}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                            <FiChevronDown
                              onClick={() => manageCollapsed(index)}
                              className={styles["iconArrowDown"]}
                            />
                          </Col>
                        </Row>
                        <Row className={styles["textContainer"]}>
                          <Collapse in={collapsedControl[index]}>
                            <Container fluid>
                            <Row>
                                <Col>
                                  <p className={styles["listCardTitle"]}>
                                    No. de Referencia
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardDesc"]}>
                                    {item.NoReferencia}
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardTitle"]}>
                                    Importe
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardDesc"]}>
                                    {`$${item.Importe}${' '}${moneda}`}
                                  </p>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <p className={styles["listCardTitle"]}>
                                    Estado
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardDesc"]}>
                                    {item.Estatus === "AUTHORIZED" ? "Autorizado":"Rechazado"}
                                  </p>
                                </Col>
                              </Row>



                              <Row>
                                <Col>
                                  <p
                                    className={
                                      styles["listCardTitle"] +
                                      " " +
                                      styles["topList"]
                                    }
                                  >
                                    {" "}
                                    No. de Tarjeta{" "}
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardDesc"]}>
                                    {item.NoTarjeta}
                                  </p>
                                </Col>
                              </Row>

                              

                              

                              

                              
                            </Container>
                          </Collapse>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ))
              .slice(primerIndice, ultimoIndice)}
          </div>

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
        </>
      );
    } else {
      return (
        <>
          <Container fluid className={styles["p-50"]}>
            <Row className={styles["subheaderRowGrid"]}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <p className={styles["fontTitleMisTarjetas"] + " gris-oscuro"}>
                  {sessionStorage.getItem("tipoCliente") === "POS" ? "Tu historial de pagos" : "Tu historial de recargas"}
                </p>
              </Col>
            </Row>
          </Container>
          <Container fluid className={styles["p-50"]}>
            <p className={styles["mensajevacio1"]}>{mensajeVacio}</p>
            <p className={styles["mensajevacio2"]}>{mensajeVacio2}</p>
          </Container>
        </>
      );
    }
  };

  return <>{builtComponentToReturn(pagosArray)}</>;
};

export default HistorialPagos;
