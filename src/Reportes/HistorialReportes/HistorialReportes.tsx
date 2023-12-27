import styles from "./HistorialReportes.module.css";
import { useState, useEffect, useContext } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Modal,
  Card,
  Collapse,
} from "react-bootstrap";
import exclamation from "../../../src/assets/img/Reportes/exclamation-circle.png";
import { FiChevronDown } from "react-icons/fi";
import Loading from "../../General/Loading";
import { Paginacion } from "../../Commons/paginacion/Paginacion";

import {
  builtGetReportesEntrada,
  GetReportes_Entrada,
  GetReportes_Parametros,
  GetReportes_Respuesta,
} from "../../Commons/Services/GetReportes";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import { isNull } from "util";
import ContextFlujos from "../../Context/ContextFlujos";

const HistorialReportes = () => {
  let flagArray: boolean[] = [];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [numAclaracion, setNumAclaracion] = useState("");
  const [status, setStatus] = useState("");
  const [subject, setSubject] = useState("");
  const [product, setProduct] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const [flags, setFlag] = useState(flagArray);
  const [flag, refreshFlags] = useState(false);
  const [reportData, setReportData] = useState<any[]>([]);
  const [cuenta, setCuenta] = useState(sessionStorage.getItem("cuenta"));
  const [loading, isLoading] = useState(false);
  const [reportesPorPagina, setReportesPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);
  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));
  const { reportesHist, setReportesHist } = useContext(ContextFlujos) as any;
  const [actualizaTabla, setActualizaTabla] = useState(reportesHist);


  const totalReportes = reportData.length;

  const ultimoIndice = paginaActual * reportesPorPagina;
  const primerIndice = ultimoIndice - reportesPorPagina;



  function showDetails(
    num: string,
    status: string,
    subject: string,
    product: string,
    date: string,
    desc: string
  ) {
    setNumAclaracion(num);
    setStatus(status);
    setSubject(subject);
    setProduct(product);
    setDate(date);
    setDesc(desc ? desc : "");
    handleShow();
  }

  function handleReporte(id: number) {
    flags[id] = !flags[id];
    setFlag(flags);
    refreshFlags(!flag);
  }

  const getReportes = async () => {
    isLoading(true);
    let account: any;

    if (sessionStorage.getItem("dataPrimary") !== "") {

      let primary: any = sessionStorage.getItem("dataPrimary");

      if (primary !== "") {
        account = await JSON.parse(primary);
      }
    }

    const GetReportesDO: GetReportes_Entrada = builtGetReportesEntrada(account.accountId!);
    let GetReportesParametros = GetReportes_Parametros(GetReportesDO);
    let GetReportesRespuesta: GetReportes_Respuesta = await ConsultaWS(
      GetReportesParametros
    );
    if (
      GetReportesRespuesta.Cases &&
      GetReportesRespuesta.Cases != null &&
      GetReportesRespuesta.Cases.length > 0
    ) {
      setReportData(GetReportesRespuesta.Cases);
      setReportesHist(false);
      isLoading(false);
    } else {
      console.error("Error al obtener reportes");
      console.error(GetReportesRespuesta.errormessage);
      console.error(GetReportesRespuesta.errorno);
      isLoading(false);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  useEffect(() => {
    setCuenta(sessionStorage.getItem("cuenta"));
    if (flujo !== "DTH") {
      getReportes();
    }

  }, []);


  useEffect(() => {
    if (reportesHist === true) {
      if (flujo !== "DTH") {
        getReportes();
      }
    }

  }, [reportesHist]);

  function formatDate(strDate: any) {
    if (strDate) {
      let dateArray = strDate.substring(0, 10).split("-");
      return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
    }
  }

  const gridData = [
    {
      fecha: "01/12/2023",
      numAclaracion: "000000000000",
      producto: "Sky celular",
      motivo: "Extravío",
    },
    {
      fecha: "01/12/2023",
      numAclaracion: "000000000000",
      producto: "Sky internet",
      motivo: "Robo",
    },
    {
      fecha: "01/12/2023",
      numAclaracion: "000000000000",
      producto: "Sky celular",
      motivo: "Daño",
    },
    {
      fecha: "01/12/2023",
      numAclaracion: "000000000000",
      producto: "Sky internet",
      motivo: "Extravío",
    },
    {
      fecha: "01/12/2023",
      numAclaracion: "000000000000",
      producto: "Sky celular",
      motivo: "Daño",
    },
  ];

  for (let i = 0; i < gridData.length; i++) {
    flagArray.push(false);
  }

  if (flujo !== "DTH") {
    if (reportData.length > 0) {

      return (
        <>
          <Loading isLoading={loading} />
          <Container fluid className={styles["container"]}>
            <Row className={styles["subheaderRowGrid"]}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <p className={styles["title"]}>Tu historial de reportes</p>
              </Col>
            </Row>
          </Container>
          <div
            id="bigGrid"
            className={"d-none d-sm-block d-md-block d-lg-block d-xl-block"}
          >
            <Container
              fluid
              className={styles["subheaderRowGrid"] + " " + styles["historialGrid"]}
            >
              <Row
                className={styles["subheaderRowGrid"] + " " + styles["gridHeader"]}
              >
                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                  <span>Fecha</span>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                  <span>No. de caso</span>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                  <span>Motivo</span>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} />
              </Row>
              {reportData
                .map((data, index) => (
                  <Row
                    className={styles["subheaderRowGrid"] + " " + styles["grid"]}
                    key={"bigRow_" + index}
                  >
                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                      <span>{formatDate(data.CreateDate)}</span>
                    </Col>
                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                      <span>{data.CaseNumber}</span>
                    </Col>
                    <Col
                      xs={4}
                      sm={4}
                      md={4}
                      lg={4}
                      xl={4}
                      className={styles["alignToLeft"]}
                    >
                      <span>{data.Subject}</span>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                      <Button
                        className={styles["detallesButton"]}
                        onClick={() =>
                          showDetails(
                            data.CaseNumber,
                            data.Status,
                            data.Subject,
                            data.Id,
                            formatDate(data.CreateDate)!,
                            data.Description
                          )
                        }
                      >
                        Ver detalle
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
                itemsPorPagina={reportesPorPagina}
                pageActual={paginaActual}
                setPageActual={setPaginaActual}
                itemsTotal={totalReportes}
              />
            </Container>
          </div>

          <div id="smallGrid" className={"d-sm-none d-md-none d-lg-none d-xl-none"}>
            {reportData.map((data, index) => (
              <Row className={styles["aclararionRow"]} key={"smallRow_" + index}>
                <Col
                  className={styles["smallColMargin"]}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Card className={styles["reporteCard"]}>
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
                          <p
                            className={
                              !flags[index]
                                ? styles["titleCard"]
                                : styles["titleCard"] +
                                " " +
                                styles["titleCardOpenMargin"]
                            }
                          >
                            <span className={styles["paqueteAlign"]}>
                              {formatDate(data.CreateDate)}
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
                              !flags[index]
                                ? styles["iconArrowDown"]
                                : styles["iconArrowUp"]
                            }
                            onClick={() => handleReporte(index)}
                          />
                        </Col>
                      </Row>
                      <Row className={styles["textContainer"]}>
                        <Collapse in={!!flags[index]}>
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
                                  {formatDate(data.CreateDate)}
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p className={styles["listCardTitle"]}>
                                  No. de caso
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p className={styles["listCardDesc"]}>
                                  {data.CaseNumber}
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p className={styles["listCardTitle"]}>Motivo</p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p className={styles["listCardDesc"]}>
                                  {data.Subject}
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Button
                                  className={styles["detallesButton"]}
                                  onClick={() =>
                                    showDetails(
                                      data.CaseNumber,
                                      data.Status,
                                      data.Subject,
                                      data.Id,
                                      formatDate(data.CreateDate)!,
                                      data.Description
                                    )
                                  }
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
            ))}
          </div>

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
                    <p className={styles["modalTitle"]}>Detalle del reporte</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className={styles["modalSubtitle"]}>
                      <span>
                        <b>Número de reporte:</b>
                        {" " + numAclaracion}
                      </span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className={styles["modalSubtitle"]}>
                      <span>
                        <b>Status:</b>
                        {" " + status}
                      </span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className={styles["modalSubtitle"]}>
                      <span>
                        <b>Motivo:</b>
                        {subject ? " " + subject : ""}
                      </span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className={styles["modalSubtitle"]}>
                      <span>
                        <b>Fecha:</b>
                        {" " + date}
                      </span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className={styles["modalSubtitle"]}>
                      <span>
                        <b>Descripción:</b>
                        {desc ? " " + desc.substring(0, 100) : ""}
                      </span>
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col className={styles["modalSubtitleFoot"]}></Col>
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        </>
      );


    } else {

      return (
        <>
          <Container fluid className={styles["contenedorNoHistorial"]}>
            <Row className={styles["subheaderRowGridNoHistorial"]}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <p className={styles["titleNoHistorial"]}>
                  Tu historial de reportes
                </p>
              </Col>
            </Row>
            <div className={styles["avisoNoHistorial"]}>
              <p className={styles["avisoTituloNoHistorial"]}>
                Parece que aún no has hecho ningún reporte
              </p>
              <p className={styles["avisoTextoNoHistorial"]}>
                Cuando realices un reporte podrás visualizarlo aquí
              </p>
            </div>
          </Container>
        </>
      );

    }

  } else {
    return (<></>);

  }




}

export default HistorialReportes;
