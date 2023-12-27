import styles from "./CrearReporte.module.css";
import { useContext, useState } from "react";
import { Col, Row, Button, Modal, Form, FormControl } from "react-bootstrap";

import Loading from "../../General/Loading";
import ConfirmMessage from "../../General/ConfirmMessage";

import {
  builtSetReportesEntrada,
  SetReportes_Entrada,
  SetReportes_Parametros,
  SetReportes_Respuesta,
} from "../../Commons/Services/SetReportes";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import ContextFlujos from "../../Context/ContextFlujos";
import { builtRegistrarQuejaRest_Entrada, Queja, RegistrarQuejaRest_Entrada, RegistrarQuejaRest_Parametros, RegistrarQuejaRest_Respuesta } from "../../Commons/Services/RegistrarQuejaRest";
import { builtRegistrarSugerenciaRest_Entrada, RegistrarSugerenciaRest_Entrada, RegistrarSugerenciaRest_Parametros, RegistrarSugerenciaRest_Respuesta, Sugerencia } from "../../Commons/Services/RegistrarSugerenciaRest";

const CrearReporte = () => {
  const bigText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const maxtLength = 100;
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const [motivo, setMotivo] = useState("");
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [opcion, setOpcion] = useState("");
  const [cuenta, setCuenta] = useState(sessionStorage.getItem("cuenta"));
  const [cuentaSkyPlus, setCuentaSkyPlus] = useState(sessionStorage.getItem("cuentaSkyPlus"));
  const [status, setStatus] = useState("OK");
  const [message, setMessage] = useState("");
  const [loading, isLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));
  const { setReportesHist } = useContext(ContextFlujos) as any;
  const [bloqueoOpcion, setBloqueoOpcion] = useState(false);
  const [bloqueoMotivo, setBloqueoMotivo] = useState(false);
  const [validaMotivo, setValidaMotivo] = useState(false);
  const [validaDescripcion, setValidaDescripcion] = useState(false);
  const [validaMotivoLong, setValidaMotivoLong] = useState(false);
  const [validaDescripcionLong, setValidaDescripcionLong] = useState(false);
  const [desactiva, setDesactiva] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const aviso = (status: string, mensaje: string) => {
    setStatus(status);
    if (status == "Error") {
      setErrorAlertMessage(mensaje);
      setShowAlertError(true);
      setTimeout(() => {
        setShowAlertError(false);
      }, 3000);
    } else {
      setMessage(mensaje);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const handleShow = () => {
    //DTH
    if (flujo === "DTH" && producto === "satelital") {
      if (opcion !== "" && descripcion !== "") {
        setShow(true);
      } else {
        aviso("ERROR", "Llenar todo los campos");
      }
    } else {
      if (flujo === "DTH") {
        aviso("ERROR", "Llenar todo los campos");
      }
    }

    //dth/Sky+
    if (flujo === "DTH/Sky+" && producto === "satelital") {
      if (opcion !== "" && descripcion !== "") {
        setShow(true);
      } else {
        aviso("ERROR", "Llenar todo los campos");
      }
    } else if (flujo === "DTH/Sky+" && producto === "skyPlus") {
      if (motivo !== "" && descripcion !== "") {
        setShow(true);
      } else {
        aviso("ERROR", "Llenar todo los campos");
      }
    } else {
      if (flujo === "DTH/Sky+") {
        aviso("ERROR", "Llenar todo los campos");
      }
    }

    //dth/SkyCelular
    if (flujo === "DTH/SkyCelular" && producto === "satelital") {
      if (opcion !== "" && descripcion !== "") {
        setShow(true);
      } else {
        aviso("ERROR", "Llenar todo los campos");
      }
    } else if (flujo === "DTH/SkyCelular" && producto === "skyPlus") {
      if (motivo !== "" && descripcion !== "") {
        setShow(true);
      } else {
        aviso("ERROR", "Llenar todo los campos");
      }
    } else {
      if (flujo === "DTH/SkyCelular") {
        aviso("ERROR", "Llenar todo los campos");
      }
    }

    //sky+
    if (flujo === "Sky+") {
      if (motivo !== "" && descripcion !== "") {
        setShow(true);
      } else {
        aviso("ERROR", "Llenar todo los campos");
      }
    } else {
      if (flujo === "Sky+") {
        aviso("ERROR", "Llenar todo los campos");
      }
    }

  };//fin de handleShow

  function handleDisabled() {
    if (motivo && descripcion && producto) {
      return false;
    } else {
      return false;  /*para que no cambie de color false*/
    }
  }

  function manejaBloqueo(e: string) {
    if (e === "satelital") {
      setProducto(e);
      setBloqueoOpcion(false);
      setBloqueoMotivo(true);
    } else if (e === "skyPlus" || e === "skyCelular") {
      setProducto(e);
      setBloqueoOpcion(true);
      setBloqueoMotivo(false);
    } else {
      setProducto(e);
      setBloqueoOpcion(false);
      setBloqueoMotivo(false);
    }
  }

  const generaReporte = () => {

    if (flujo === "DTH") {
      if (producto === "satelital") {
        if (opcion === "queja") {
          reporteQueja();
        } else {
          reporteSugerencia()
        }
      }
    }

    if (flujo === "DTH/Sky+" || flujo === "DTH/SkyCelular" || flujo === "DTH/SkyCelular/Sky+") {
      if (producto === "satelital") {
        if (opcion === "queja") {
          reporteQueja();
        } else {
          reporteSugerencia()
        }
      } else {

        setReportes();
      }
    }


    if (flujo === "Sky+") {
      setReportes();
    }
  }//find e generaReporte

  const setReportes = async () => {
    isLoading(true);
    setIsDisabled(true);
    const SetReportesDO: SetReportes_Entrada = builtSetReportesEntrada(
      cuentaSkyPlus!,
      producto,
      descripcion,
      motivo,
      `${sessionStorage.getItem("idSesion")}`,
      `${sessionStorage.getItem("Usuario")}`
    );
    let SetReportesParametros = SetReportes_Parametros(SetReportesDO);
    let SetReportesRespuesta: SetReportes_Respuesta = await ConsultaWS(
      SetReportesParametros
    );


    if (
      SetReportesRespuesta.code &&
      SetReportesRespuesta.code != null &&
      SetReportesRespuesta.code == "-2"
    ) {
      setStatus("ERROR");
      setMessage(SetReportesRespuesta.description);
    } else if (!SetReportesRespuesta.code) {
      setStatus("ERROR");
      setMessage("Falla al generar el reporte. Intentar mas tarde");
    } else {
      setStatus("OK");
      setMessage(SetReportesRespuesta.description);
      setReportesHist(true);
    }


    setShow(false);
    setShowAlert(true);
    isLoading(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    setDescripcion("");
    setMotivo("");
    setProducto("");
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const reporteQueja = async () => {
    isLoading(true);
    setDesactiva(true);

    let contactoId: string = cuenta + "-01";

    let queja: Queja = {
      descripcion: descripcion,
      sesionId: `${sessionStorage.getItem("idSesion")}`,
      pais: `${sessionStorage.getItem("pais")}`,
      contactoId: contactoId,
      numeroCuentaCliente: cuenta!,
      paqueteContratadoActual: `${sessionStorage.getItem("Paquete")}`
    };

    const ReporteQuejaDO: RegistrarQuejaRest_Entrada = builtRegistrarQuejaRest_Entrada(queja);
    let RegistrarQuejaRestParametros = RegistrarQuejaRest_Parametros(ReporteQuejaDO);
    let RegistrarQuejaRespuesta: RegistrarQuejaRest_Respuesta = await ConsultaWS(
      RegistrarQuejaRestParametros
    );



    if (RegistrarQuejaRespuesta.EBMHeaderResponse.ErrorNegocio.Estado != null &&
      RegistrarQuejaRespuesta.EBMHeaderResponse.ErrorNegocio.CodigoError == "0") {
      setStatus("OK");
      setMessage("Reporte generado con éxito");
      setReportesHist(true);
      setShow(false);
      setShowAlert(true);
      isLoading(false);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      setDescripcion("");
      setProducto("");
      setOpcion("");
      setDesactiva(false);

    } else {
      setStatus("ERROR");
      setMessage("Falla al generar el reporte. Intentar mas tarde");
      setShow(false);
      setShowAlert(true);
      isLoading(false);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setDesactiva(false);
    }


  };//fin de reporteQueja

  const reporteSugerencia = async () => {
    isLoading(true);
    setDesactiva(true);

    let contactoId: string = cuenta + "-01";

    let sugerencia: Sugerencia = {
      descripcion: descripcion,
      sesionId: `${sessionStorage.getItem("idSesion")}`,
      pais: `${sessionStorage.getItem("pais")}`,
      contactoId: contactoId,
      numeroCuentaCliente: cuenta!,
      paqueteContratadoActual: `${sessionStorage.getItem("Paquete")}`
    };

    const ReporteSugerenciaDO: RegistrarSugerenciaRest_Entrada = builtRegistrarSugerenciaRest_Entrada(sugerencia);
    let RegistrarSugerenciaRestParametros = RegistrarSugerenciaRest_Parametros(ReporteSugerenciaDO);
    let RegistrarSugerenciaRespuesta: RegistrarSugerenciaRest_Respuesta = await ConsultaWS(
      RegistrarSugerenciaRestParametros
    );



    if (
      RegistrarSugerenciaRespuesta.EBMHeaderResponse.ErrorNegocio.Estado != null &&
      RegistrarSugerenciaRespuesta.EBMHeaderResponse.ErrorNegocio.CodigoError == "0") {
      setStatus("OK");
      setMessage("Reporte generado con éxito");
      setReportesHist(true);
      setShow(false);
      setShowAlert(true);
      isLoading(false);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      setDescripcion("");
      setProducto("");
      setOpcion("");
      setDesactiva(false);
    } else {
      setStatus("ERROR");
      setMessage("Falla al generar el reporte. Intentar mas tarde");
      setShow(false);
      setShowAlert(true);
      isLoading(false);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setDesactiva(false);
    }
  };

  const valida = (e: any, campo: string) => {

    let regExLetras = /^(?!\s)[A-Za-zñáéíóúÁÉÍÓÚ\s]+$/; //solo para letras y espacios

    if (campo === "motivo") {
      setMotivo(e);
      e.length === 40 ? setValidaMotivoLong(true) : setValidaMotivoLong(false);
      regExLetras.test(e) === false ? setValidaMotivo(true) : setValidaMotivo(false);
    }

    if (campo === "descripcion") {
      setDescripcion(e);
      e.length === 100 ? setValidaDescripcionLong(true) : setValidaDescripcionLong(false);
      regExLetras.test(e) === false ? setValidaDescripcion(true) : setValidaDescripcion(false);
    }

  }

  return (
    <>
      <Loading isLoading={loading} />
      <Row className={styles["alertContainer"]}>
        <Col className={styles["messageStyle"]}>
          <ConfirmMessage status={status} message={message} showAlert={showAlert} />
        </Col>
      </Row>

      <Row className={styles["headerRow"]}>
        <Col>
          <span className={styles["spectrum"]}>Reportes</span>
        </Col>
      </Row>

      <Row className={styles["subheaderRowTitle"]}>
        <Col>
          <p className={styles["subtitle"]}>
            Déjanos toda la información de tu reporte del servicio para poder
            resolverlo.
          </p>
        </Col>
      </Row>
      <Row className={styles["subheaderRow"]}>
        <Col xs={12} sm={12} md={3} lg={3} xl={3}>
          <Form id="producto" className={styles["form"]}>
            <Form.Group
              className="mb-3"
              controlId="aclaracionesForm.productoSelect"
            >
              <Form.Label>
                <span className={styles.asterisco}>*{' '}</span>Producto
              </Form.Label>

              {flujo === "DTH" ?
                <Form.Select id="productoSelect" onChange={(e) => manejaBloqueo(e.target.value)} value={producto}>
                  <option value="">Seleccionar</option>
                  <option value="satelital">Satelital</option>
                </Form.Select> :
                <></>}

              {flujo === "DTH/Sky+" ?
                <Form.Select id="productoSelect" onChange={(e) => manejaBloqueo(e.target.value)} value={producto}>
                  <option value="">Seleccionar</option>
                  <option value="satelital">Satelital</option>
                  <option value="skyPlus">Sky+</option>
                </Form.Select> :
                <></>}

              {flujo === "DTH/SkyCelular" ?
                <Form.Select id="productoSelect" onChange={(e) => manejaBloqueo(e.target.value)} value={producto}>
                  <option value="">Seleccionar</option>
                  <option value="satelital">Satelital</option>
                  <option value="skyCelular">Sky Celular</option>
                </Form.Select> :
                <></>}

              {flujo === "DTH/Sky+/SkyCelular" ?
                <Form.Select id="productoSelect" onChange={(e) => manejaBloqueo(e.target.value)} value={producto}>
                  <option value="">Seleccionar</option>
                  <option value="satelital">Satelital</option>
                  <option value="skyPlus">Sky+</option>
                  <option value="skyCElular">Sky Celular</option>
                </Form.Select> :
                <></>}

              {flujo === "Sky+" ?
                <Form.Select id="opcionSelect" onChange={(e) => manejaBloqueo(e.target.value)} value={producto}>
                  <option value="">Seleccionar</option>
                  <option value="skyPlus">Sky+</option>
                </Form.Select> : <></>}

            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} sm={12} md={3} lg={3} xl={3}>
          <Form className={styles["form"]} >
            <Form.Group className="mb-3" controlId="aclaracionesForm.productoSelect">
              <Form.Label>
                <span className={styles.asterisco}>*{' '}</span>Sugerencia/Queja
              </Form.Label>
              {flujo !== "Sky+" ?
                <Form.Select id="productoSelect" onChange={(e) => setOpcion(e.target.value)} disabled={bloqueoOpcion} value={opcion}  >
                  <option value="">Seleccionar</option>
                  <option value="queja">Queja</option>
                  <option value="sugerencia">Sugerencia</option>
                </Form.Select> :
                <Form.Select
                  id="productoSelect"
                  onChange={(e) => setOpcion(e.target.value)}
                  disabled
                >
                  <option value="">Seleccionar</option>
                  <option value="queja">Queja</option>
                  <option value="sugerencia">Sugerencia</option>
                </Form.Select>}
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form className={styles["form"]}>
            <Form.Group
              className="mb-3"
              controlId="aclaracionesForm.motivoSelect"
            >
              <Form.Label><span className={styles.asterisco}>*{' '}</span>Motivo
                {validaMotivo ? <span className={styles.asterisco}>{' '}(Sólo texto)</span> : <span></span>}
                {validaMotivoLong ? <span className={styles.asterisco}>{' '}(Máximo 40 carácteres)</span> : <span></span>}
              </Form.Label>
              <FormControl type="text" maxLength={40} onChange={(e) => valida(e.target.value, "motivo")} disabled={bloqueoMotivo} value={motivo} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className={styles["subheaderRow"]}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Form className={styles["form"]}>
            <Form.Group
              className="mb-3"
              controlId="aclaracionesForm.descripcionTextarea"
            >
              <Form.Label><span className={styles.asterisco}>*{' '}</span>Descripción
                {validaDescripcion ? <span className={styles.asterisco}>{' '}(Sólo texto)</span> : <span></span>}
                {descripcion.length > 100 ? <span className={styles.asterisco}>{' '}(Máximo 100 carácteres)</span> : <span></span>}
              </Form.Label>
              <Form.Control maxLength={200} as="textarea" rows={3} onChange={(e) => valida(e.target.value, "descripcion")} value={descripcion}
                style={{ resize: 'none' }} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className={styles["subheaderRow"] + " " + styles["textAreaCounter"]}>
        <Col xs={11} sm={11} md={11} lg={11} xl={11} />
        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
          <p className={styles["textAreaCounter"]}>
            {descripcion.length}/{maxtLength}
          </p>
        </Col>
      </Row>
      <Row className={styles["subheaderRowCampos"]}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <p className={styles["subtitle"]}>
            <span className={styles.asterisco}>*{' '}</span>Campos obligatorios
          </p>
        </Col>
      </Row>
      <Row className={styles["subheaderRowCampos"]}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button
            variant="primary"
            type="submit"
            className={styles.button}
            disabled={handleDisabled()}
            onClick={handleShow}
          >
            <div className="botonreportar">Reportar</div>
          </Button>
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="border-0" closeButton />
        <Modal.Body>
          <p className={styles["modalTitle"]}>
            ¿Estás seguro que quieres generar esta reporte?
          </p>
          <p className={styles["modalSubtitle"]}>
            No se podrá eliminar una vez creado
          </p>
          <div className={styles["divButton"]}>
            <Button className={styles["createButton"]} onClick={generaReporte} disabled={desactiva}>
              Generar reporte
            </Button>
          </div>
          <div className={styles["divButton"]}>
            <Button className={styles["cancelButton"]} onClick={handleClose} >
              <span style={{ fontWeight: 900 }}>Cancelar</span>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CrearReporte;
