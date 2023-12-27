import React, { useState, useEffect, useContext } from "react";
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
import { ConsultaWS, ConsultaWSPPV } from "../../Commons/ServiciosBase";
import { Tarjeta } from "../../Commons/Services/ConsultarIRD";
import { AnyAaaaRecord } from "dns";
import Loading from "../../General/Loading";

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

  // const [eventosPagoPorVer, setEventosPagoPorVer] = useState<PPEContratado[]>(
  //   []
  // );
  const [indices, setIndices] = useState<any>([]);
  const [eventosPagoPorVer, setEventosPagoPorVer] = useState<any>([]);
  const [loading, isLoading] = useState(false);

  const doConsultarPPV = async (tarjeta: string) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarPPVDO: ConsultarPPV_Entrada = builtConsultarPPVEntrada(
      tarjeta,
      `${sessionStorage.getItem("cuenta")}`,
      `HIJUMP`
    );
    let ConsultarPPVParametros = ConsultarPPV_Parametros(ConsultarPPVDO);

    let ConsultarPPVRespuesta: any = await ConsultaWSPPV(
      ConsultarPPVParametros
    );

    return ConsultarPPVRespuesta;
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

  const iteracionTarjetas = async () => {
    const array: Tarjeta[] = JSON.parse(sessionStorage.getItem("tarjetas")!);
    let ar: any = [];

    array.forEach(async (item: any, i: number) => {
      isLoading(true);
      const res: any = await doConsultarPPV(item.TarjetaInteligente);
      const arreglo: any[] = res.data.PPEContratados;
      const confirmacion = res.data.respuesta;

      if (i === 0) {
        while (confirmacion === "") {}

        if (arreglo !== undefined) {
          ar = arreglo;
          setEventosPagoPorVer(ar);

          if (ar.length > 0) {
            let arTempIndices: { id: number; isOpen: boolean }[] = [];
            ar.forEach((e: any, i: number) => {
              arTempIndices.push({ id: i, isOpen: false });
            });
            setIndices(arTempIndices);
            setTotalEstados(arTempIndices.length);
          }
          isLoading(false);
        }
      } else {
        while (confirmacion === "") {}

        if (arreglo !== undefined) {
          let arInterno = [...ar, ...arreglo];

          setEventosPagoPorVer(arInterno);

          if (arInterno.length > 0) {
            let arTempIndices: { id: number; isOpen: boolean }[] = [];
            arInterno.forEach((e: any, i: number) => {
              arTempIndices.push({ id: i, isOpen: false });
            });
            setIndices(arTempIndices);
            setTotalEstados(arTempIndices.length);
          }
        }
      } //find e else

      //funcionIterativa(array.length, array);
      isLoading(false);
    });
  };

  const consultarTarjetas = () => {
    const array: Tarjeta[] = JSON.parse(sessionStorage.getItem("tarjetas")!);
    let arrayTarjetas: any = [];

    isLoading(true);

    array.forEach((element) => {
      arrayTarjetas.push(element.TarjetaInteligente);
    });

    var promises = arrayTarjetas.map((tarjeta: string) => {
      return new Promise((resolve, reject) => {
        resolve(doConsultarPPV(tarjeta));
      });
    });

    Promise.all(promises).then(function (values) {
      let arrayAcumulador: any = [];

      if (values !== undefined) {
        values.forEach((value) => {
          let eventos = value.data.PPEContratados;

          if (eventos !== undefined) {
            eventos.forEach((evento: any) => {
              arrayAcumulador.push(evento);
            });
          }
        });
      }

      if (arrayAcumulador.length > 0) {
        let arregloOrdenado = ordenamientoEventos(arrayAcumulador);

        if (arregloOrdenado.length > 25) {
          let arregloLimitado = [];

          arregloLimitado = arregloOrdenado.slice(0, 25);
          setEventosPagoPorVer(arregloLimitado);
          creaIndices(arregloLimitado);
        } else {
          setEventosPagoPorVer(arregloOrdenado);
          creaIndices(arregloOrdenado);
        }
      }

      isLoading(false);
    });
  }; //fin de consultarTarjetas

  const ordenamientoEventos = (array: any) => {
    let arreglo = array.sort(
      (a: any, b: any) =>
        new Date(a.HoraEvento).getTime() < new Date(b.HoraEvento).getTime()
    );

    return arreglo;
  };

  const creaIndices = (array: any) => {
    let arTempIndices: { id: number; isOpen: boolean }[] = [];
    array.forEach((e: any, i: number) => {
      arTempIndices.push({ id: i, isOpen: false });
    });
    setIndices(arTempIndices);
    setTotalEstados(arTempIndices.length);
  };

  useEffect(() => {
    //iteracionTarjetas();
    consultarTarjetas();
    actualiza(false);
  }, [update]);

  const builtComponentToReturn = (param: any) => {
    if (eventosPagoPorVer.length > 0 && indices.length > 0) {
      return (
        <>
          <Loading isLoading={loading} />
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
                      <span>{formatoFecha(item.HoraEvento)}</span>
                    </Col>
                    <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                      <span>{item.EVENTO.slice(9, item.EVENTO.length)}</span>
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
          <Loading isLoading={loading} />
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
