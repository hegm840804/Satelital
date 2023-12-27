import styles from "./cuentas-seguimiento-mensajeria.module.css";
import { tokenSalesForceParametros } from "../../Commons/ConfigRed";
import { useEffect, useState } from "react";
import flecha from "../../assets/img/Iconos/flechaAbajo.svg";
import {
  Col,
  Row,
  Container,
  Button,
  Modal,
  Card,
  Collapse,
} from "react-bootstrap";
import CuentaSeguimientoModal from "../Detalle/CuentaSeguimientoModal";
import TrackingNumberLabel from "../Detalle/TrackingNumberLabel";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import CuentaSeguimientoStepper from "../Detalle/CuentaSeguimientoStepper";
import Loading from "../../General/Loading";
import {
  builtGetToken4SkyCelularEntrada,
  GetToken4SkyCelular_Entrada,
  GetToken4SkyCelular_Parametros,
  GetToken4SkyCelular_Respuesta,
} from "../../Commons/Services/GetToken4SkyCelular";
import {
  builtGetPrimaryData4SkyCelularEntrada,
  GetPrimaryData4SkyCelular_Entrada,
  GetPrimaryData4SkyCelular_Parametros,
  GetPrimaryData4SkyCelular_Respuesta,
} from "../../Commons/Services/GetPrimaryData4SkyCelular";
import {
  builtGetOrderByAccountId4TrackingServiceEntrada,
  GetOrderByAccountId4TrackingService_Entrada,
  GetOrderByAccountId4TrackingService_Parametros,
  GetOrderByAccountId4TrackingService_Respuesta,
} from "../../Commons/Services/GetOrderByAccountId4TrackingService";

const CuentaSeguimientoMensajeria = () => {
  const [banderaDatosRecuperados, setbanderaDatosRecuperados] = useState(false);
  const [ordenesArray, setOrdenesArray] = useState<any>([]);
  const [acordeon, setAcordeon] = useState(-1);

  const [currentKey, setcurrentKey] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, isLoading] = useState(false);

  const [currentordenId, setcurrentordenId] = useState("");

  useEffect(() => {
    doObtenerToken();

    //doObtenerToken2();
  }, []);

  const doObtenerToken = async () => {
    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const GetToken4SkyCelularDO: GetToken4SkyCelular_Entrada =
      builtGetToken4SkyCelularEntrada(
        tokenSalesForceParametros.client_id,
        tokenSalesForceParametros.client_secret,
        tokenSalesForceParametros.username,
        tokenSalesForceParametros.password
      );
    let GetToken4SkyCelularParametros = GetToken4SkyCelular_Parametros(
      GetToken4SkyCelularDO
    );
    let GetToken4SkyCelularRespuesta: GetToken4SkyCelular_Respuesta =
      await ConsultaWS(GetToken4SkyCelularParametros);

    if (
      GetToken4SkyCelularRespuesta.access_token &&
      GetToken4SkyCelularRespuesta.access_token != "" &&
      GetToken4SkyCelularRespuesta.access_token != null
    ) {
      const retorno = GetToken4SkyCelularRespuesta.access_token;

      if (retorno != "" || retorno != null) {
        setbanderaDatosRecuperados(true);
        doPrimaryData(retorno);
      }
    } else {
      console.error("Error al obtener el token");
      console.error(GetToken4SkyCelularRespuesta.EBMHeaderResponse);
    }

    //----------------------------------------------------------------------------------------------------------------------------
    isLoading(false);
  };

  const doPrimaryData = async (param1: string) => {
    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const GetPrimaryData4SkyCelularDO: GetPrimaryData4SkyCelular_Entrada =
      builtGetPrimaryData4SkyCelularEntrada(
        `${sessionStorage.getItem("Usuario")}`,
        `${sessionStorage.getItem("cuenta")}`,
        param1
      );
    let GetPrimaryData4SkyCelularParametros =
      GetPrimaryData4SkyCelular_Parametros(GetPrimaryData4SkyCelularDO);
    let GetPrimaryData4SkyCelularRespuesta: GetPrimaryData4SkyCelular_Respuesta =
      await ConsultaWS(GetPrimaryData4SkyCelularParametros);

    if (
      GetPrimaryData4SkyCelularRespuesta.result &&
      GetPrimaryData4SkyCelularRespuesta.result != null
    ) {
      const retorno = GetPrimaryData4SkyCelularRespuesta.result.accountId;

      if (retorno == "" || retorno == null || retorno.length == 0) {
        setbanderaDatosRecuperados(false);
      } else {
        setbanderaDatosRecuperados(true);
        doGetOrderByAccountId4TrackingService(param1, retorno);
      }
    } else {
      console.error("Error al obtener Datos primarios");
      console.error(GetPrimaryData4SkyCelularRespuesta.errormessage);
      console.error(GetPrimaryData4SkyCelularRespuesta.errorno);
    }

    //----------------------------------------------------------------------------------------------------------------------------
    isLoading(false);
  };

  const doGetOrderByAccountId4TrackingService = async (
    token_p: string,
    accountid_p: string
  ) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const GetOrderByAccountId4TrackingServiceDO: GetOrderByAccountId4TrackingService_Entrada =
      builtGetOrderByAccountId4TrackingServiceEntrada(
        accountid_p,
        "0",
        token_p
      );
    let GetOrderByAccountId4TrackingServiceParametros =
      GetOrderByAccountId4TrackingService_Parametros(
        GetOrderByAccountId4TrackingServiceDO
      );

    let GetOrderByAccountId4TrackingServiceRespuesta: GetOrderByAccountId4TrackingService_Respuesta =
      await ConsultaWS(GetOrderByAccountId4TrackingServiceParametros);

    if (
      GetOrderByAccountId4TrackingServiceRespuesta.Ordenes &&
      GetOrderByAccountId4TrackingServiceRespuesta.Ordenes != null &&
      GetOrderByAccountId4TrackingServiceRespuesta.Ordenes.length > 0
    ) {
      setOrdenesArray(GetOrderByAccountId4TrackingServiceRespuesta.Ordenes);
    } else {
      console.error(GetOrderByAccountId4TrackingServiceRespuesta);
    }
  };

  function toggleAcordeon(index: number) {
    if (index !== acordeon) {
      setAcordeon(index);
    } else {
      setAcordeon(-1);
    }
  }

  const showDetails = (param_id: string) => {
    setcurrentordenId(param_id);
    handleShow();
  };

  return (
    <>
      <div id="big" className="d-none d-xl-block d-lg-block ">
        <Loading isLoading={loading} />
        <Container className={styles["contenedorCabecera"]} fluid>
          <h1 className={styles["spectrum"]}>
            <span className="textoSpectrum">
              Seguimiento de envío de equipo por mensajería
            </span>
          </h1>
          <p className={styles["subtituloGeneral"]}>
            Rastrea el envío de tu equipo hasta recibirlo en tu domicilio.
          </p>

          {ordenesArray.map((item: any, index: number) => (
            <Container className={styles["containerCollapse"]} fluid>
              <div className={styles["containerInterno"]}>
                <div
                  className={
                    acordeon === index
                      ? styles["botonCollapseFocus"]
                      : styles["botonCollapse"]
                  }
                >
                  <span>
                    <b>{item.OrderNumber}</b>
                  </span>
                  <span
                    key={index}
                    className={styles["flecha"]}
                    onClick={() => toggleAcordeon(index)}
                  >
                    <img
                      src={flecha}
                      aria-controls="example-collapse-text"
                      aria-expanded={acordeon === index ? true : false}
                      className={
                        acordeon === index ? styles["rota"] : styles[""]
                      }
                    />
                  </span>
                </div>
                <Collapse in={acordeon === index ? true : false}>
                  <div id="example-collapse-text">
                    <hr style={{ marginTop: "-0.4vw" }} />

                    <Row>
                      <Col>
                        <Row className={styles["mynewbgcolor"]}>
                          <Col>
                            <span className={styles["subtitle"]}>
                              Numero de órden:
                            </span>
                            <span className={styles["subtitle2"]}>
                              {item.OrderNumber}
                            </span>
                            <br></br>

                            <span className={styles["subtitle3"]}>
                              Fecha de órden:
                            </span>
                            <span className={styles["subtitle4"]}>
                              {item.StartDate}
                            </span>
                          </Col>

                          <Col>
                            <div className={styles["cardblanca"]}>
                              <Button
                                variant="primary"
                                type="submit"
                                className={styles.chatButton}
                                onClick={() => {
                                  showDetails(item.Id);
                                }}
                              >
                                <p className={styles["estado"]}>
                                  {item.Substatus}
                                </p>
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} md={4}>
                        <div style={{ marginLeft: 60, marginTop: 70 }}>
                          {""}
                          <CuentaSeguimientoStepper
                            orden_id={item.Id}
                            current_token={currentKey}
                          />
                        </div>
                      </Col>
                      <Col xs={6} md={8}>
                        <div className={styles["alturaprincipal"]}>
                          <span className={styles["metodo"]}>
                            Método de envío:
                            <span className={styles["metodo1"]}>Estafeta</span>
                          </span>
                          <br></br>
                          <span className={styles["metodo"]}>
                            Dirección de envío:
                            <span className={styles["metodo1"]}>
                              {sessionStorage.getItem("direccion")}
                            </span>
                          </span>

                          <br></br>
                          <span className={styles["metodo"]}>
                            Código de seguimiento:
                            <span className={styles["metodo1"]}>
                              <TrackingNumberLabel
                                orden_id={item.Id}
                                current_token={currentKey}
                              />
                            </span>
                          </span>
                          <br></br>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Collapse>
              </div>
            </Container>
          ))}
        </Container>
      </div>



      <div id="small" className="d-lg-none d-xl-none">
        <Container className={styles["contenedorCabeceraSmall"]}>
          <p className={styles["spectrumSmall"]}>
            <span>Seguimiento de envío de</span>
          </p>
          <p className={styles["spectrum2Small"]}>
            <span>equipo por mensajería</span>
          </p>
          <p className={styles["subtituloGeneral"]}>
            Rastrea el envío de tu equipo hasta recibirlo
          </p>
          <p className={styles["subtituloGeneral"]}>en tu domicilio.</p>
        </Container>
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
                <CuentaSeguimientoModal
                  orden_id={currentordenId}
                  current_token={currentKey}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CuentaSeguimientoMensajeria;
