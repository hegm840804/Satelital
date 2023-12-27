import styles from "./CrearAclaracion/CrearAclaracion.module.css";
import React, { useEffect, useState, useRef } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import {
  Col,
  Row,
  Button,
  Modal,
  Container,
  Form,
  InputGroup
} from "react-bootstrap";

import {
  builtSolicitudDeServicio,
  SolicitudDeServicio,
  builtContratacionServicios,
  ContratacionServicios,
  AltaSolicitudDeServicio_Entrada,
  builtAltaSolicitudDeServicio_Entrada,
  AltaSolicitudDeServicio_Parametros,
  AltaSolicitudDeServicio_Respuesta,
} from "../Commons/Services/AltaSolicitudDeServicioRest";

import {
  Attachment,
  builtAttachment,
  Parametro,
  builtParametro,
  EnviarEmail_Entrada,
  builtEnviarEmail_Entrada,
  EnviarEmail_Parametros,
} from "../Commons/Services/EnviarEmail";

import {
  DetalleSolicitudDeServicio,
  ConsultaSolicitudDeServicio_Respuesta,
  ConsultaSolicitudDeServicio_Parametros,
  builtRecargaConsultaPrecioRecargaInput,
  ConsultaSolicitudDeServicio_Entrada,
} from "../Commons/Services/ConsultaSolicitudDeServicioRest";
import { ConsultaWS } from "../Commons/ServiciosBase";

import { HistorialAclaraciones } from "./HistorialAclaraciones/HistorialAclaraciones";

import Loading from "../General/Loading";
import ConfirmMessage from "../General/ConfirmMessage";

const AclaracionesBis = () => {
  const [myLocalArray, setMyLocalArray] = useState<
    DetalleSolicitudDeServicio[]
  >([]);
  const maxtLength = 100;
  const [count, setCount] = React.useState(0);
  const [show, setShow] = useState(false);

  const [fileName, setfileName] = useState("");
  const [fileExtesion, setFileExtesion] = useState("");
  const [file, setFile] = useState(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, isLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [status, setStatus] = useState("OK");
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlertError, setShowAlertError] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState("");

  const handleClose = () => {
    doConsultaSolicitudDeServicio();
    setShow(false);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleShow = () => setShow(true);

  const helperList = [
    <>
      <span className="font-semibold"><b>Escribenos a:</b></span> servicioenlinea@sky.com.mx
    </>,
  ];

  const handleFileChange = (e: any) => {
    if (e.target) {
      if (e.target.files) {
        const files = e.target.files;
        if (files.length > 0) {
          const file = files[0];
          if (file.size > 1048576) {
            setStatus("Error");
            setErrorAlertMessage("El archivo elegido pesa mas de 1MB!");
            setShowAlertError(true);
            setTimeout(() => {
              setShowAlertError(false);
            }, 3000);

            // alert("El archivo elegido pesa mas de 1MB!");
          } else {
            setFile(file);
            setfileName(file.name);
            setFileExtesion(file.extension);
          }
        }
      }
    }
  };

  const handleFileButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const doDisputeRequest = async () => {
    isLoading(true);
    setIsDisabled(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const ContratacionServiciosRet: ContratacionServicios =
      builtContratacionServicios(
        `${sessionStorage.getItem("Paquete")}`,
        "",
        "",
        "",
        "",
        ""
      );

    const SolicitudDeServicioRet: SolicitudDeServicio =
      builtSolicitudDeServicio(
        `${sessionStorage.getItem("cuenta")}`,
        "Aclaracion de Pagos",
        "Cargo no Reconocido a TC",
        "Se envia la peticion e informacion para revision de cargos no reconocidos o aclaraciones de cobro",
        "",
        `${sessionStorage.getItem("RowIdContacto")}`,
        `${sessionStorage.getItem("EmailNotif")}`, //l_MailConfirmacion: string,
        `${sessionStorage.getItem("pais")}`, //l_Pais: string,
        `${sessionStorage.getItem("TipoCuenta")}`, //l_TipoCuenta: string,
        `${sessionStorage.getItem("NombreSuscriptor")}`, //l_NombreSuscriptor: string,
        null,
        null,
        ContratacionServiciosRet,
        null,
        null,
        null,
        null,
        null,
        "HIJUMP",
        `${sessionStorage.getItem("idSesion")}`
      );
    const AltaSolicitudDeServicioDO: AltaSolicitudDeServicio_Entrada =
      builtAltaSolicitudDeServicio_Entrada(SolicitudDeServicioRet);
    let par = AltaSolicitudDeServicio_Parametros(AltaSolicitudDeServicioDO);
    let AltaSolicitudDeServicioRespuesta: AltaSolicitudDeServicio_Respuesta =
      await ConsultaWS(par);

    //----------------------------------------------------------------------------------------------------------------------------

    file_to_base64(file).then((result) => {
      const parametrosVar: Parametro[] = [
        builtParametro(
          "NUMSS",
          `${AltaSolicitudDeServicioRespuesta.NumeroSolicitud}`
        ),
        builtParametro("CUENTA", `${sessionStorage.getItem("cuenta")}`),
        builtParametro(
          "NOMBRE_SUSCRIPTOR",
          `${sessionStorage.getItem("NombreSuscriptor")}`
        ),
      ];
      const attachmentVar: Attachment[] = [
        builtAttachment(fileName, fileExtesion, result),
      ];

      const EnviarEmailDO: EnviarEmail_Entrada = builtEnviarEmail_Entrada(
        "SEL",
        "CARGOSNORECONOCIDOS_MX",
        `${sessionStorage.getItem("EmailNotif")}`,
        `${sessionStorage.getItem("pais")}`,
        parametrosVar,
        attachmentVar
      );
      let par2 = EnviarEmail_Parametros(EnviarEmailDO);

      ConsultaWS(par2);

      setStatus("OK");
      setMessage("Tu aclaración fue generada con éxito");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);


      handleClose();
    });
    setFile(null);
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const file_to_base64 = async (a_file: any) => {
    let a_function = (file: any) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let base64_string = String(reader.result).split(",")[1];
          resolve(base64_string);
        };
        reader.onerror = (error) => reject(error);
      });
    return (await a_function(a_file)) as string;
  };

  const doConsultaSolicitudDeServicio = async () => {
    isLoading(true);
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
      const res =
        respuesta.ConsultaSolicitudDeServicioProcessResponse
          .DetalleSolicitudDeServicio;

      const temp = res.map((e, i) => ({ ...e, id: i }));
      setMyLocalArray(temp.map((e) => ({ ...e, isOpen: false })));
    } else {
      setMyLocalArray([]);
    }
    isLoading(false);
    //----------------------------------------------------------------------------------------------------------------------------
  };

  useEffect(() => {
    doConsultaSolicitudDeServicio();
  }, []);

  return (
    <>
      <Loading isLoading={loading} />
      <Container fluid className="p-0">
        <ConfirmMessage status={status} message={message} showAlert={showAlert} />
        <Row className={styles["headerRow"] + " " + styles["pl-45"]}>
          <Col style={{ paddingLeft: "0px" }}>
            <span className={styles["spectrum"]}>{sessionStorage.getItem("tipoCliente") === "POS" ? "Aclaraciones de pago":"Aclaraciones de recarga"}</span>
          </Col>
        </Row>
        <Row className={styles["subheaderRowTitle"] + " " + styles["pl-50"]}>
          <Col style={{ paddingLeft: "0px" }}>
            <p className={styles["subtitleHeader"]}>
            Envía una copia del Estado de Cuenta que emite la Institución Bancaria en donde se observe el cargo que solicitas que se aclare.
            </p>
          </Col>
        </Row>

        <Row className={styles["mynewbgcolor"]}>
          <Col className={styles["ml-50"]}>
            <p className={styles["subtitle"]}>
              Otras opciones de envío de información:
            </p>

            {helperList && (
              <ul className="unordered-list">
                {helperList.map((item, index) => {
                  return (
                    <li key={`list-item-${index}`} className={styles["optionList"] + " " + "list-item"}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            )}
            <p className={styles["subtitle1"]}>
              El formato de PNG no está soportado, se recomienda enviar
              documentos en formato PDF que no superen 1 MB
            </p>
          </Col>
        </Row>

        <Row className={styles["subheaderRowTitle"] + " " + styles["pl-50"]}>
          <Col style={{ paddingLeft: "40px" }}>
            <Container fluid>
              <Row>
                <Col style={{ paddingLeft: "0px" }}>
                <Form.Text id="passwordHelpBlock" muted>
                    <span className={styles["asterisco"]}>*</span>{' '}Estado de cuenta
                  </Form.Text>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 6 }} style={{ paddingLeft: "0px" }}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <AiOutlinePaperClip />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={file ? fileName : "Adjuntar archivo"}
                      readOnly
                      aria-label="nameFile"
                      aria-describedby="basic-addon1"
                      value={file ===null ?"" :fileName}

                    />
                    <div className={styles["adjuntarContainer"]}>
                    <button
                      className={styles.buttonWhite}
                      onClick={handleFileButtonClick}
                    >
                      {file ? "Actualizar" : "Adjuntar"}
                    </button>
                    </div>
                  </InputGroup>
                  <Form.Text id="passwordHelpBlock" muted>
                    <span className={styles["asterisco"]}>*</span>{' '}<span  style={{ fontWeight: "600" }}>Campos obligatorios</span>
                  </Form.Text>
                  <input
                    id="disputeFile"
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className={styles["hidden"]}
                  />
                </Col>
                <Col  className={styles["aclararContainer"]}>
                  <button
                    onClick={handleShow}
                    disabled={file ? false : true}
                    className={styles.button}
                  >
                    Aclarar
                  </button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container >

      <HistorialAclaraciones disputesSavedArray={myLocalArray} />

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
            ¿Estás seguro que quieres generar esta aclaración?
          </p>
          <p className={styles["modalSubtitle"]}>
            No se podrá eliminar una vez creada
          </p>
          <div className={styles["divButton"]}>
            <Button
              className={styles["createButton"]}
              onClick={doDisputeRequest}
              disabled={isDisabled}
            >
              Generar aclaración
            </Button>
          </div>
          <div className={styles["divButton"]}>
            <Button className={styles["cancelButton"]} onClick={handleClose}>
              <b>Cancelar</b>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AclaracionesBis;
