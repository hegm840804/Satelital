import moment from "moment";
import styles from "./HistorialAclaraciones.module.css";
import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Modal,
  Card,
  Collapse,
} from "react-bootstrap";
import exclamation from "../../../src/assets/img/Aclaraciones/exclamation-circle.png";
import { FiChevronDown } from "react-icons/fi";
import { Paginacion } from "../../Commons/paginacion/Paginacion";

import {
  DetalleSolicitudDeServicio,
  ConsultaSolicitudDeServicio_Respuesta,
  ConsultaSolicitudDeServicio_Parametros,
  builtRecargaConsultaPrecioRecargaInput,
  ConsultaSolicitudDeServicio_Entrada,
} from "../../Commons/Services/ConsultaSolicitudDeServicioRest";
import { ConsultaWS } from "../../Commons/ServiciosBase";

export const HistorialAclaraciones = (props: any) => {
  const { disputesSavedArray }: any = { ...props };
  const collapsed = disputesSavedArray.map((item: any) => {
    return false;
  });

  const [collapsedControl, setCollapsedControl] = useState(collapsed);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [numAclaracion, setNumAclaracion] = useState("");
  const [flag, refreshFlags] = useState(false);

  const [numeroSolicitudVar, setnumeroSolicitudVar] = useState("");
  //{item.Area + " - " + item.SubAarea}
  const [areaVar, setareaVar] = useState("");
  const [subAreaVar, setsubAreaVar] = useState("");
  const [comentarioVar, setcomentarioVar] = useState("");
  const [tarjetainteligentevar, settarjetainteligentevar] = useState("");
  const [fechavar, setfechavar] = useState("");
  const [estatusvar, setestatusvar] = useState("");

  const [estadosPorPagina, setEstadosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);

  const totalEstados = disputesSavedArray.length;
  const ultimoIndice = paginaActual * estadosPorPagina;
  const primerIndice = ultimoIndice - estadosPorPagina;

  const [myLocalArray, setMyLocalArray] = useState<
    DetalleSolicitudDeServicio[]
  >([]);

  const [mensajeCarga, setMensajeCarga] = useState(
    "Obteniendo Informacion, espere un momento"
  );
  const [mensajeVacio1, setMensajeVacio1] = useState(
    "Parece que aún no has hecho ninguna aclaración"
  );

  const [mensajeVacio2, setMensajeVacio2] = useState(
    "Cuando realices una aclaración podrás visualizarlo aquí"
  );
  const [loading, isLoading] = useState(false);

  function formatDate(strDate: any) {
    if (strDate) {

      let dateArray = strDate.substring(0, 10).split("/");

      return dateArray[0] + "/" + dateArray[1] + "/" + dateArray[2];
    }

    return strDate;
  }

  function showDetails(
    p_numeroSolicitud: string,
    p_area: string,
    p_subarea: string,
    p_comentario: string,
    p_tarjetaInteligente: string,
    p_fecha: string,
    p_status: string
  ) {
    setnumeroSolicitudVar(p_numeroSolicitud);
    setareaVar(p_area);
    setsubAreaVar(p_subarea);
    setcomentarioVar(p_comentario);
    settarjetainteligentevar(p_tarjetaInteligente);
    setfechavar(p_fecha);
    setestatusvar(p_status);
    handleShow();
  }

  const doConsultaSolicitudDeServicio = async () => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultaSolicitudDeServicioDO: ConsultaSolicitudDeServicio_Entrada =
      builtRecargaConsultaPrecioRecargaInput(
        `${sessionStorage.getItem("rowId")}`,
        "Aclaracion de Pagos",
        "Cargo no Reconocido a TC"
      );
    let par = ConsultaSolicitudDeServicio_Parametros(
      ConsultaSolicitudDeServicioDO
    );

    let respuesta: ConsultaSolicitudDeServicio_Respuesta = await ConsultaWS(
      par
    );

    if (
      typeof respuesta.ConsultaSolicitudDeServicioProcessResponse
        .DetalleSolicitudDeServicio != "undefined"
    ) {
      setMyLocalArray(
        respuesta.ConsultaSolicitudDeServicioProcessResponse
          .DetalleSolicitudDeServicio
      );
    } else {
      setMyLocalArray([]);
    }

    //----------------------------------------------------------------------------------------------------------------------------
  };

  useEffect(() => {
    //doConsultaSolicitudDeServicio();
  }, []);

  const validarNulosYIndefinidios = (param: any) => {
    var retorno: string = "";
    if (param != null && typeof param != "undefined") {
      retorno = param;
    } else {
      retorno = "";
    }

    return retorno;
  };

  const manageCollapsed = (index: number) => {
    collapsedControl[index] = !collapsedControl[index];
    let newCollapsed = { ...collapsedControl };
    setCollapsedControl(newCollapsed);
  };

  const builtComponentToReturn = (param: any) => {
    return (
      <>
        <Container fluid className={styles["container"]}>
          <Row className={styles["subheaderRowGrid"] + " " + styles["pl-50"]}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <p className={styles["title"]}>Tu historial de aclaraciones</p>
            </Col>
          </Row>
        </Container>
        {disputesSavedArray.length > 0 && (
          <>
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
                    styles["subheaderRowGrid"] +
                    " " +
                    styles["gridHeader"] +
                    " " +
                    styles["spacer"]
                  }
                >
                  <Col
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    className={styles["adjustColWidthFecha"]}
                  >
                    <span>Fecha</span>
                  </Col>
                  <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                    <span>No. de solicitud</span>
                  </Col>
                  <Col
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    className={styles["adjustColWidthStatus"]}
                  >
                    <span>Status</span>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                    <span>Producto</span>
                  </Col>
                  <Col xs={3} sm={3} md={3} lg={3} xl={3} />
                </Row>
                {disputesSavedArray
                  .map((item: any) => (
                    <Row
                      className={
                        styles["subheaderRowGrid"] +
                        " " +
                        styles["grid"] +
                        " " +
                        styles["spacer"]
                      }
                      key={"bigRow_" + item.NumeroDeSolicitud}
                    >
                      <Col
                        xs={2}
                        sm={2}
                        md={2}
                        lg={2}
                        xl={2}
                        className={styles["adjustColWidthFecha"]}
                      >
                        <span>{formatDate(item.FechaCreacion)}</span>
                      </Col>
                      <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                        <span>{item.NumeroDeSolicitud}</span>
                      </Col>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        xl={1}
                        className={
                          styles["alignToLeft"] +
                          " " +
                          styles["adjustColWidthStatus"]
                        }
                      >
                        <span>{item.Estatus}</span>
                      </Col>
                      <Col
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        className={styles["alignToLeft"]}
                      >
                        <span>{item.Area + " - " + item.SubAarea}</span>
                      </Col>

                      <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Button
                          className={styles["detallesButton"]}
                          onClick={() => {
                            showDetails(
                              item.NumeroDeSolicitud,
                              item.Area,
                              item.SubAarea,
                              item.Comentario!,
                              item.TarjetaInteligente!,
                              item.FechaCreacion,
                              item.Estatus
                            );
                          }}
                        >
                          Ver detalle
                        </Button>
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
              {disputesSavedArray
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
                                  {formatDate(item.FechaCreacion)}
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
                                    <p
                                      className={
                                        styles["listCardTitle"] +
                                        " " +
                                        styles["topList"]
                                      }
                                    >
                                      Fecha
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <p className={styles["listCardDesc"]}>
                                      {item.FechaCreacion}
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <p className={styles["listCardTitle"]}>
                                      No. de aclaración
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <p className={styles["listCardDesc"]}>
                                      {item.NumeroDeSolicitud}
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <p className={styles["listCardTitle"]}>
                                      Producto
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <p className={styles["listCardDesc"]}>
                                    {item.Area + " - " + item.SubAarea}
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <p className={styles["listCardTitle"]}>
                                      Status
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <p className={styles["listCardDesc"]}>
                                      {item.Estatus}
                                    </p>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>
                                    <p className={styles["listCardDesc"]}>
                                      {item.Comentario}
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <Button
                                      className={styles["detallesButton"]}
                                      onClick={() => {
                                        showDetails(
                                          item.NumeroDeSolicitud,
                                          item.Area,
                                          item.SubAarea,
                                          item.Comentario!,
                                          item.TarjetaInteligente!,
                                          item.FechaCreacion,
                                          item.Estatus
                                        );
                                      }}
                                    >
                                      Ver detalle
                                    </Button>
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
              fluid
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
        )}
        {disputesSavedArray.length <= 0 && (
          <>
            <Container fluid className={styles["mensajeVacioContainer"]}>
              <div className={styles["centerMessage"]}>
                <p className={styles["mensajeVacio1"]}>{mensajeVacio1}</p>
                <p className={styles["mensajeVacio2"]}>{mensajeVacio2}</p>
              </div>
            </Container>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {builtComponentToReturn(disputesSavedArray)}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="border-0" closeButton />
        <Modal.Body>
          <Container className={styles["modalContainer"]}>
            <Row>
              <Col className={styles["exclamation"]}>
                <img src={exclamation} />
              </Col>
            </Row>
            <Row>
              <Col>
                <p className={styles["modalTitle"]}>Detalle de la aclaración</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className={styles["modalSubtitle"]}>
                  <span>
                    <b>Número de aclaración:</b>
                    {" " + numeroSolicitudVar}
                  </span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className={styles["modalSubtitle"]}>
                  <span>
                    <b>Status:</b>
                    {" " + estatusvar}
                  </span>
                </p>
              </Col>
            </Row>
            
            <Row>
              <Col>
                <p className={styles["modalSubtitle"]}>
                  <span>
                    <b>Producto:</b>
                    {areaVar + " - " + subAreaVar}
                  </span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className={styles["modalSubtitle"]}>
                  <span>
                    <b>Fecha:</b>
                    {" " + formatDate(fechavar)}
                  </span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className={styles["modalSubtitle"]}>
                  <span>
                    <b>Descripción:</b>
                    {" " + validarNulosYIndefinidios(tarjetainteligentevar)}
                  </span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col className={styles["modalSubtitleFoot"]}>
                {/* <p className={styles["modalSubtitle"]}>
                  <span>
                    Te llegara un mail de respuesta a{" "}
                    <b>{sessionStorage.getItem("Usuario")}</b> en los siguientes
                    7 (siete) días hábiles
                  </span>
                </p> */}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
