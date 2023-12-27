import React, { useState, useEffect } from "react";
import styles from "./HistorialPagoPorVer.module.css";
import {
  Col,
  Row,
  Container,
  Button,
  Modal,
  Card,
  Collapse,
} from "react-bootstrap";
import { FiChevronDown } from "react-icons/fi";
import { Paginacion } from "../../Commons/paginacion/Paginacion";
import {
  ConsultarPPV_Entrada,
  builtConsultarPPVEntrada,
  ConsultarPPV_Parametros,
  ConsultarPPV_Respuesta,
  PPEContratado,
} from "../../Commons/Services/ConsultarPPV";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import { Tarjeta } from "../../Commons/Services/ConsultarIRD";
import { AnyAaaaRecord } from "dns";

const HistorialPagoPorVer2 = ({ update, actualiza }: any) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [estadosPorPagina, setEstadosPorPagina] = useState(5);
  const [disputesSavedArray, setDisputesSavedArray] = useState([]);
  const [totalEstados, setTotalEstados] = useState(0);
  //const totalEstados = disputesSavedArray.length;
  const ultimoIndice = paginaActual * estadosPorPagina;
  const primerIndice = ultimoIndice - estadosPorPagina;
  const [mensajeVacio, setMensajeVacio] = useState(
    "No hay informacion para mostrar"
  );

  const [eventosPagoPorVer, setEventosPagoPorVer] = useState<PPEContratado[]>(
    []
  );
  const [indices, setIndices] = useState<any>();

  const doConsultarPPV = async () => {
    var array: Tarjeta[] = JSON.parse(sessionStorage.getItem("tarjetas")!);

    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarPPVDO: ConsultarPPV_Entrada = builtConsultarPPVEntrada(
      "7001209536166",
      //array[0].TarjetaInteligente, //"7000914935341",
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
      let ar = ConsultarPPVRespuesta.PPEContratados;
      let arTemp: { id: number; isOpen: boolean }[] = [];

      ar.forEach((e, i: number) => {
        arTemp.push({ id: i, isOpen: false });
      });

      setIndices(arTemp);
      setEventosPagoPorVer(ConsultarPPVRespuesta.PPEContratados);
      setTotalEstados(ConsultarPPVRespuesta.PPEContratados.length);
    } else {
      setEventosPagoPorVer([]);
      console.error("No hay eventos para mostrar");
    }
  };

  const handleClick = (item: any) => {
    setIndices(
      indices.map((e: any) =>
        e.id === item ? { ...e, isOpen: !e.isOpen } : { ...e, isOpen: false }
      )
    );
  };

  const formatoFecha = (fecha: string) => {
    fecha = fecha.slice(0, 10);

    return fecha;
  };

  // const formatoHora = (hora: string) => {
  //   hora = hora.slice(0,10);

  //   return hora;
  // };

  useEffect(() => {
    doConsultarPPV();
    actualiza(false);
  }, [update]);

  const builtComponentToReturn = (param: any) => {
    if (eventosPagoPorVer.length > 0) {
      return (
        <>
          <Container fluid className={styles["container"]}>
            <Row className={styles["subheaderRowGrid"]}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <p className={styles["title"]}>
                  Tus Pagos por Evento Contratados
                </p>
              </Col>
            </Row>
          </Container>

          <div
            id="bigGrid"
            className={"d-none d-sm-block d-md-block d-lg-block d-xl-block"}
          >
            <Container
              fluid
              className={
                styles["subheaderRowGrid"] + " " + styles["historialGrid"]
              }
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
                  className={styles["adjustColWidthFecha"]}
                >
                  <span>Fecha</span>
                </Col>
                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                  <span>Titulo</span>
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  className={styles["adjustColWidthStatus"]}
                >
                  <span>Canal</span>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                  <span>Horario Evento</span>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                  <span>Status del Evento</span>
                </Col>
              </Row>
              {eventosPagoPorVer
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
                      <span>{formatoFecha(item.FECHA_ORDEN)}</span>
                    </Col>
                    <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                      <span>{item.EVENTO}</span>
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
                        styles["adjustColWidthStatus"]
                      }
                    >
                      <span>{item.Canal}</span>
                    </Col>
                    <Col
                      xs={2}
                      sm={2}
                      md={2}
                      lg={2}
                      xl={2}
                      className={styles["alignToLeft"]}
                    >
                      <span>{item.HoraEvento.slice(10, 19)}</span>
                    </Col>
                    <Col
                      xs={2}
                      sm={2}
                      md={2}
                      lg={2}
                      xl={2}
                      className={styles["alignToLeft"]}
                    >
                      <span>{item.ESTATUS_EVENTO}</span>
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
            {eventosPagoPorVer
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
                                {formatoFecha(item.HoraEvento)}
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
                              className={
                                indices[index].isOpen
                                  ? styles["iconArrowUp"]
                                  : styles["iconArrowDown"]
                              }
                              onClick={() => handleClick(index)}
                            />
                          </Col>
                        </Row>
                        <Row className={styles["textContainer"]}>
                          <Collapse in={indices[index].isOpen}>
                            <Container fluid>
                              <Row>
                                <Col>
                                  <p
                                    className={
                                      styles["listCardTitle"] +
                                      " " +
                                      styles["topList"]
                                    }
                                  >
                                    Título
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardDesc"]}>
                                    {item.EVENTO}
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardTitle"]}>
                                    Canal
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardDesc"]}>
                                    {item.Canal}
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardTitle"]}>
                                    Horario del Evento
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardDesc"]}>
                                    {item.HoraEvento.slice(10, 19)}
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardTitle"]}>
                                    Status del Evento
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles["listCardDesc"]}>
                                    {item.ESTATUS_EVENTO}
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
          <Container fluid className={styles["contenedorNoHistorial"]}>
            <Row className={styles["subheaderRowGrid"]}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <p className={styles["title"]}>
                  Tus Pagos por Evento Contratados
                </p>
              </Col>
            </Row>
            <div className={styles["aviso"]}>
              <p className={styles["avisoTitulo"]}>
                Parece que aún no has contratado ningún evento
              </p>
              <p className={styles["avisoTexto"]}>
                Cuando contrates uno podrás visualizarlo aquí
              </p>
            </div>
          </Container>
        </>
      );
    }
  };

  return <>{builtComponentToReturn(disputesSavedArray)}</>;
};

export default HistorialPagoPorVer2;
