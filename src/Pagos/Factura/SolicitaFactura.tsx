import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Stack,
} from "react-bootstrap";
import { Buffer } from "buffer";
import styles from "./SolicitaFactura.module.css";
import {
  ConsultarDatosFiscales_Parametros,
  ConsultaDatosFiscales_Respuesta,
  ConsultaDatosFiscales_Entrada,
} from "../../Commons/Services/ConsultarDatosFiscalesRest";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import Loading from "../../General/Loading";
import {
  DBUnificadoregimenfiscalOutput,
  builtConsultarRegimenFiscalRestEntrada,
  ConsultarRegimenFiscalRest_Entrada,
  ConsultarRegimenFiscalRest_Parametros,
  ConsultarRegimenFiscalRest_Respuesta,
} from "../../Commons/Services/ConsultarRegimenFiscalRest";

import {
  builtConsultarUsoCFDIRestEntrada,
  ConsultarUsoCFDIRest_Entrada,
  ConsultarUsoCFDIRest_Parametros,
  ConsultarUsoCFDIRest_Respuesta,
  DBConsultarUsoCFDIOutput,
} from "../../Commons/Services/ConsultarUsoCFDIRest";

import {
  builtRecargaConsultaPrecioRecargaInput,
  RegistrarDatosFiscalesRest_Entrada,
  RegistrarDatosFiscalesRest_Parametros,
  RegistrarDatosFiscalesRest_Respuesta,
} from "../../Commons/Services/RegistrarDatosFiscalesRest";
import {
  builtActualizaDatosFiscalesEBFRestInput,
  ActualizaDatosFiscalesEBFRest_Entrada,
  ActualizaDatosFiscalesEBFRest_Parametros,
  ActualizaDatosFiscalesEBFRest_Respuesta,
} from "../../Commons/Services/ActualizaDatosFiscalesEBFRest";
import { FacturasDisponibles } from "./FacturasDisponibles";
import ConfirmMessage from "../../General/ConfirmMessage";

export const SolicitaFactura = () => {
  const [razonSocial4Dashboard, setRazonSocial4Dashboard] = useState("");
  const [razonSocial4Update, setRazonSocial4Update] = useState("");
  const [rfc4Dashboard, setRFC4Dashboard] = useState("");
  const [rfc4Update, setRFC4Update] = useState("");
  const [tipoPersona4Dashboard, setTipoPersona4Dashboard] = useState("");
  const [tipoPersona4Update, setTipoPersona4Update] = useState("");
  const [regimenFiscal4Dashboard, setRegimenFiscal4Dashboard] = useState("");
  const [regimenFiscal4Update, setRegimenFiscal4Update] = useState("");
  const [usoCfdi4Dashboard, setUsoCfdi4Dashboard] = useState("");
  const [usoCfdi4Update, setUsoCfdi4Update] = useState("");
  const [cp4Dashboard, setCP4Dashboard] = useState("");
  const [cp4Update, setCP4Update] = useState("");
  const [calle4Dashboard, setCalle4Dashboard] = useState("");
  const [calle4Update, setCalle4Update] = useState("");
  const [numeroExt4Dashboard, setNumeroExt4Dashboard] = useState("");
  const [numeroExt4Update, setNumeroExt4Update] = useState("");
  const [numeroInt4Dashboard, setNumeroInt4Dashboard] = useState("");
  const [numeroInt4Update, setNumeroInt4Update] = useState("");
  const [colonia4Dashboard, setColonia4Dashboard] = useState("");
  const [colonia4Update, setColonia4Update] = useState("");
  const [ciudad4Dashboard, setCiudad4Dashboard] = useState("");
  const [ciudad4Update, setCiudad4Update] = useState("");
  const [municipio4Dashboard, setMunicipio4Dashboard] = useState("");
  const [municipio4Update, setMunicipio4Update] = useState("");
  const [estado4Dashboard, setEstado4Dashboard] = useState("");
  const [estado4Update, setEstado4Update] = useState("");

  const [status, setStatus] = useState(false);
  const [errorCredenciales, setErrorCredenciales] = useState(false);
  const [statusRFC, setStatusRFC] = useState(false);
  const [tipoFactura, setTipoFactura] = useState("");
  const [cuenta, setCuenta] = useState(sessionStorage.getItem("cuenta"));
  const [loading, isLoading] = useState(false);
  const [acepta, setAcepta] = useState(false);
  const [regimenes, setRegimenes] = useState<DBUnificadoregimenfiscalOutput[]>(
    []
  );
  const [cdfis, setCFDIS] = useState<DBConsultarUsoCFDIOutput[]>([]);

  //validaciones
  const [razonLong, setRazonLong] = useState(false);
  const [razonCaracter, setRazonCaracter] = useState(false);
  const [rfcLong, setRFCLong] = useState(false);
  const [rfcCaracter, setRFCCaracter] = useState(false);
  const [calleLong, setCalleLong] = useState(false);
  const [calleCaracter, setCalleCaracter] = useState(false);
  const [numIntLong, setNumIntLong] = useState(false);
  const [numIntCaracter, setNumIntCaracter] = useState(false);
  const [numExtLong, setNumExtLong] = useState(false);
  const [numExtCaracter, setNumExtCaracter] = useState(false);
  const [coloniaLong, setColoniaLong] = useState(false);
  const [coloniaCaracter, setColoniaCaracter] = useState(false);
  const [cpLong, setCPLong] = useState(false);
  const [cpCaracter, setCPCaracter] = useState(false);
  const [ciudadLong, setCiudadLong] = useState(false);
  const [ciudadCaracter, setCiudadCaracter] = useState(false);
  const [municipioLong, setMunicipioLong] = useState(false);
  const [municipioCaracter, setMunicipioCaracter] = useState(false);
  const [estadoLong, setEstadoLong] = useState(false);
  const [estadoCaracter, setEstadoCaracter] = useState(false);
  const [show, setShow] = useState(false);

  const [status1, setStatus1] = useState("OK");
  const [message1, setMessage1] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const [status2, setStatus2] = useState("OK");
  const [message2, setMessage2] = useState("");
  const [showAlert2, setShowAlert2] = useState(false);
  const [showModalAviso1, setShowModalAviso1] = useState(false);
  const [showModalAviso2, setShowModalAviso2] = useState(false);

  var regEx = /^(?!\s)[A-Za-z0-9ñáéíóúÁÉÍÓÚ\s]+$/; //solo para letras, numeros y espacios
  var regExRFC = /^(?!\s)[A-Za-z0-9]+$/; //solo para letras, numeros sin espacios
  var regExDir = /^(?!\s)[A-Za-z0-9-.ñáéíóúÁÉÍÓÚ\s]+$/; //solo para letras, numeros espacios punto y guion
  var regExNum = /^(?!\s)[0-9]+$/; //solo numeros
  var regExLetras = /^(?!\s)[A-Za-zñáéíóúÁÉÍÓÚ\s]+$/; //solo para letras y espacios

  const obtienePersona = async (e: any) => {
    if (e.target.value === "FISICA") {
      obtieneRegimenesFiscales("FISICA");
      return setTipoPersona4Update("FISICA");
    }

    if (e.target.value === "MORAL") {
      obtieneRegimenesFiscales("MORAL");
      return setTipoPersona4Update("MORAL");
    }
  };

  const aceptaTerminos = (e: any) => {
    setAcepta(e);
  };

  const obtieneRegimen = async (e: any) => {
    setRegimenFiscal4Update(e.target.value);

    if (e.target.value !== "0") {
      obtieneCFDIS(tipoPersona4Update, e.target.value);
    } else {
      setCFDIS([]);
    }
  };

  const obtieneCFDI = async (e: any) => {
    setUsoCfdi4Update(e.target.value);
  };

  const handleShow = () => {
    setShow(true);
  };

  const manejaToast = (status:string, mensaje:string) => {
    setStatus2(status);
    setMessage2(mensaje);
    setShowAlert2(true);
    setTimeout(() => {
      setShowAlert2(false);
    }, 3000);
  }

  const handleClose = () => {
    setRazonSocial4Update(razonSocial4Dashboard);
    setRFC4Update(rfc4Dashboard);
    setTipoPersona4Update(tipoPersona4Dashboard);
    setRegimenFiscal4Update(regimenFiscal4Dashboard);
    setUsoCfdi4Update(usoCfdi4Dashboard);
    setCP4Update(cp4Dashboard);
    setCalle4Update(calle4Dashboard);
    setNumeroExt4Update(numeroExt4Dashboard);
    setNumeroInt4Update(numeroInt4Dashboard);
    setColonia4Update(colonia4Dashboard);
    setCiudad4Update(ciudad4Dashboard);
    setMunicipio4Update(municipio4Dashboard);
    setEstado4Update(estado4Dashboard);
    setAcepta(false);
    setShow(false);
  };

  const valida = (e: any, campo: string) => {
    switch (campo) {
      case "razon":
        setRazonSocial4Update(e);
        e.length > 51 ? setRazonLong(true) : setRazonLong(false);
        regEx.test(e) === false
          ? setRazonCaracter(true)
          : setRazonCaracter(false);
        break;

      case "rfc":
        setRFC4Update(e.toLocaleUpperCase());
        e.length < 14 && e.length > 11 ? setRFCLong(false) : setRFCLong(true);
        regExRFC.test(e) === false
          ? setRFCCaracter(true)
          : setRFCCaracter(false);
        break;

      case "calle":
        setCalle4Update(e.toLocaleUpperCase());
        e.length > 51 ? setCalleLong(true) : setCalleLong(false);
        regExDir.test(e) === false
          ? setCalleCaracter(true)
          : setCalleCaracter(false);
        break;

      case "numInt":
        setNumeroInt4Update(e);
        e.length > 11 ? setNumIntLong(true) : setNumIntLong(false);
        regExDir.test(e) === false
          ? setNumIntCaracter(true)
          : setNumIntCaracter(false);
        break;

      case "numExt":
        setNumeroExt4Update(e);
        e.length > 11 ? setNumExtLong(true) : setNumExtLong(false);
        regExDir.test(e) === false
          ? setNumExtCaracter(true)
          : setNumExtCaracter(false);
        break;

      case "colonia":
        setColonia4Update(e);
        e.length > 51 ? setColoniaLong(true) : setColoniaLong(false);
        regExDir.test(e) === false
          ? setColoniaCaracter(true)
          : setColoniaCaracter(false);
        break;

      case "cp":
        setCP4Update(e);
        e.length > 5 ? setCPLong(true) : setCPLong(false);
        regExNum.test(e) === false ? setCPCaracter(true) : setCPCaracter(false);
        break;

      case "ciudad":
        setCiudad4Update(e);
        e.length > 25 ? setCiudadLong(true) : setCiudadLong(false);
        regExLetras.test(e) === false
          ? setCiudadCaracter(true)
          : setCiudadCaracter(false);
        break;

      case "municipio":
        setMunicipio4Update(e);
        e.length > 25 ? setMunicipioLong(true) : setMunicipioLong(false);
        regExLetras.test(e) === false
          ? setMunicipioCaracter(true)
          : setMunicipioCaracter(false);
        break;

      case "estado":
        setEstado4Update(e);
        e.length > 20 ? setEstadoLong(true) : setEstadoLong(false);
        regExLetras.test(e) === false
          ? setEstadoCaracter(true)
          : setEstadoCaracter(false);
        break;

      default:
        break;
    }
  };

  const obtieneDatosFiscales = async () => {
    setStatus(true);
    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultaDatosFiscalesDO: ConsultaDatosFiscales_Entrada = {
      numeroCuenta: `${sessionStorage.getItem("cuenta")}`,
    };
    let par = ConsultarDatosFiscales_Parametros(ConsultaDatosFiscalesDO);

    let ConsultaDatosFiscalesRespuesta: ConsultaDatosFiscales_Respuesta =
      await ConsultaWS(par);
    if (
      ConsultaDatosFiscalesRespuesta.EBMHeaderResponse &&
      ConsultaDatosFiscalesRespuesta.EBMHeaderResponse.ErrorNegocio.Estado ==
      "ok" &&
      ConsultaDatosFiscalesRespuesta.EBMHeaderResponse.ErrorTecnico.code ===
      "ok"
    ) {
      //CODIGO QUE PROCESA LA RESPUESTA response.data

      let datos: any = ConsultaDatosFiscalesRespuesta.InformacionFiscal;

      setRazonSocial4Dashboard(datos.RazonSocial);
      setRazonSocial4Update(datos.RazonSocial);
      setRFC4Dashboard(datos.RFC);
      setRFC4Update(datos.RFC);
      setCP4Dashboard(datos.CodigoPostal);
      setCP4Update(datos.CodigoPostal);
      setCalle4Dashboard(datos.Calle);
      setCalle4Update(datos.Calle);
      setNumeroExt4Dashboard(datos.NumeroExterior);
      setNumeroExt4Update(datos.NumeroExterior);
      setNumeroInt4Dashboard(datos.NumeroInterior);
      setNumeroInt4Update(datos.NumeroInterior);
      setColonia4Dashboard(datos.Colonia);
      setColonia4Update(datos.Colonia);
      setCiudad4Dashboard(datos.Ciudad);
      setCiudad4Update(datos.Ciudad);
      setMunicipio4Dashboard(datos.Municipio);
      setMunicipio4Update(datos.Municipio);
      setEstado4Dashboard(datos.Estado);
      setEstado4Update(datos.Estado);
      setTipoFactura(datos.TipoFactura);

      if (
        datos.RFC &&
        datos.RFC !== null &&
        datos.RFC !== "" &&
        datos.RFC !== "null"
      ) {
        setStatusRFC(true);
      } else {
      }

      if (datos.tipopersona === null) {
        setTipoPersona4Dashboard("0");
        setTipoPersona4Update("0");
      } else {
        setTipoPersona4Dashboard(datos.tipopersona);
        setTipoPersona4Update(datos.tipopersona);
        obtieneRegimenesFiscales(datos.tipopersona);
      }

      if (datos.regimenfiscal === null) {
        setRegimenFiscal4Dashboard("0");
        setRegimenFiscal4Update("0");
      } else {
        setRegimenFiscal4Dashboard(datos.regimenfiscal);
        setRegimenFiscal4Update(datos.regimenfiscal);
        obtieneCFDIS(datos.tipopersona, datos.regimenfiscal);
      }

      if (datos.usocfdi === null) {
        setUsoCfdi4Dashboard("0");
        setUsoCfdi4Update("0");
      } else {
        setUsoCfdi4Dashboard(datos.usocfdi);
        setUsoCfdi4Update(datos.usocfdi);
      }

      setErrorCredenciales(true);
      setStatus(false);

      isLoading(false);
    } else {
      //CODIGO QUE PROCESA EL ERROR response.data
      if (ConsultaDatosFiscalesRespuesta) {
        console.error(ConsultaDatosFiscalesRespuesta.EBMHeaderResponse); // => the response payload
        isLoading(false);
      }
    }
    //----------------------------------------------------------------------------------------------------------------------------
  }; //termina obtieneDatos

  const actualizaDatos = async (e: any) => {
    e.preventDefault();

    if (
      acepta === true &&
      razonSocial4Update !== null &&
      rfc4Update !== null &&
      calle4Update !== null &&
      numeroExt4Update !== null &&
      colonia4Update !== null &&
      cp4Update !== null &&
      ciudad4Update !== null &&
      municipio4Update !== null &&
      estado4Update !== null &&
      tipoPersona4Update !== "0" &&
      regimenFiscal4Update !== "0" &&
      usoCfdi4Update !== "0" &&
      razonLong === false &&
      razonCaracter === false &&
      rfcLong === false &&
      rfcCaracter === false &&
      calleLong === false &&
      calleCaracter === false &&
      numExtLong === false &&
      numExtCaracter === false &&
      coloniaLong === false &&
      coloniaCaracter === false &&
      cpLong === false &&
      cpCaracter === false &&
      ciudadLong === false &&
      ciudadCaracter === false &&
      municipioLong === false &&
      municipioCaracter === false &&
      estadoLong === false &&
      estadoCaracter === false
    ) {
      isLoading(true);
      const ActualizaDatosFiscalesEBFRestDO: ActualizaDatosFiscalesEBFRest_Entrada =
        builtActualizaDatosFiscalesEBFRestInput(
          cuenta!,
          statusRFC
            ? "Actualización de Informacion Fiscal"
            : "Alta de Informacion Fiscal BlueTelecomm",
          "Correo",
          tipoFactura,
          razonSocial4Update,
          calle4Update,
          colonia4Update,
          municipio4Update,
          ciudad4Update,
          cp4Update,
          estado4Update,
          razonSocial4Update,
          numeroExt4Update,
          numeroInt4Update,
          rfc4Update,
          "DatosFiscales",
          "app",
          tipoPersona4Update,
          regimenFiscal4Update.replace(" ", ""),
          usoCfdi4Update.replace(" ", ""),
          "APP_BT",
          ""
        );
      let ActualizaDatosFiscalesEBFRestParametros =
        ActualizaDatosFiscalesEBFRest_Parametros(
          ActualizaDatosFiscalesEBFRestDO
        );

      let ActualizaDatosFiscalesEBFRestRespuesta: ActualizaDatosFiscalesEBFRest_Respuesta =
        await ConsultaWS(ActualizaDatosFiscalesEBFRestParametros);

      processResponse(ActualizaDatosFiscalesEBFRestRespuesta);
      isLoading(false);

    } else {
      if (acepta === false) {
        setShowModalAviso1(true);
      }

      if (
        razonSocial4Update === "" ||
        rfc4Update === "" ||
        calle4Update === "" ||
        numeroExt4Update === "" ||
        colonia4Update === "" ||
        cp4Update === "" ||
        ciudad4Update === "" ||
        municipio4Update === "" ||
        estado4Update === "" ||
        tipoPersona4Update === "0" ||
        regimenFiscal4Update === "0" ||
        usoCfdi4Update === "0" ||
        razonLong === true ||
        razonCaracter === true ||
        rfcLong === true ||
        rfcCaracter === true ||
        calleLong === true ||
        numExtCaracter === true ||
        coloniaLong === true ||
        coloniaCaracter === true ||
        cpLong === true ||
        cpCaracter === true ||
        ciudadLong === true ||
        ciudadCaracter === true ||
        municipioLong === true ||
        municipioCaracter === true ||
        estadoLong === true ||
        estadoCaracter === true ||
        tipoPersona4Update === "" ||
        regimenFiscal4Update === "" ||
        usoCfdi4Update === ""
      ) {
        setShowModalAviso2(true);
      }
    }
  }; //fin de actualizaDatos

  const processResponse = (param1: any) => {
    if (
      param1.EBMHeaderResponse &&
      param1.EBMHeaderResponse.ErrorNegocio.Estado == "ok" &&
      param1.EBMHeaderResponse.ErrorTecnico.code === "ok"
    ) {
      setStatus1("OK");
      setMessage1("Datos Guardados Correctamente");
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);
      }, 3000);
      handleClose();
      obtieneDatosFiscales();
      isLoading(false);
      handleClose();
    } else {
      console.error(param1.EBMHeaderResponse);
      setStatus1("ERROR");
      setMessage1("Error al guardar los datos");
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);
      }, 3000);
      handleClose();
      isLoading(false);
      handleClose();
    }
  };

  const obtieneRegimenesFiscales = async (tipoPersona: string) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarRegimenFiscalDO: ConsultarRegimenFiscalRest_Entrada =
      builtConsultarRegimenFiscalRestEntrada(tipoPersona);
    let ConsultarRegimenFiscalRestParametros =
      ConsultarRegimenFiscalRest_Parametros(ConsultarRegimenFiscalDO);

    let ConsultarRegimenFiscalRestRespuesta: ConsultarRegimenFiscalRest_Respuesta =
      await ConsultaWS(ConsultarRegimenFiscalRestParametros);

    if (
      ConsultarRegimenFiscalRestRespuesta &&
      ConsultarRegimenFiscalRestRespuesta
        .DBUnificadoregimenfiscalOutputCollection
        .DBUnificadoregimenfiscalOutput != null &&
      ConsultarRegimenFiscalRestRespuesta
        .DBUnificadoregimenfiscalOutputCollection.DBUnificadoregimenfiscalOutput
        .length > 0
    ) {
      setRegimenes(
        ConsultarRegimenFiscalRestRespuesta
          .DBUnificadoregimenfiscalOutputCollection
          .DBUnificadoregimenfiscalOutput
      );
      isLoading(false);
    } else {
      console.error(ConsultarRegimenFiscalRestRespuesta);
      isLoading(false);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  }; //fin de obtieneRegimenesFiscales

  const obtieneCFDIS = async (tipoPersona: string, tipoRegimen: string) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarUsoCFDIRestDO: ConsultarUsoCFDIRest_Entrada =
      builtConsultarUsoCFDIRestEntrada(tipoRegimen, tipoPersona);
    let ConsultarUsoCFDIRestParametros = ConsultarUsoCFDIRest_Parametros(
      ConsultarUsoCFDIRestDO
    );

    let ConsultarUsoCFDIRestRespuesta: ConsultarUsoCFDIRest_Respuesta =
      await ConsultaWS(ConsultarUsoCFDIRestParametros);

    if (
      ConsultarUsoCFDIRestRespuesta &&
      ConsultarUsoCFDIRestRespuesta.DBConsultarUsoCFDIOutputCollection
        .DBConsultarUsoCFDIOutput !== null &&
      ConsultarUsoCFDIRestRespuesta.DBConsultarUsoCFDIOutputCollection
        .DBConsultarUsoCFDIOutput.length > 0
    ) {
      setCFDIS(
        ConsultarUsoCFDIRestRespuesta.DBConsultarUsoCFDIOutputCollection
          .DBConsultarUsoCFDIOutput
      );
      isLoading(false);
    } else {
      console.error(ConsultarUsoCFDIRestRespuesta);
      isLoading(false);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  }; //fin de obtieneCFDI

  useEffect(() => {
    obtieneDatosFiscales();
  }, []);

  return (
    <>
      <Loading isLoading={loading} />
      <ConfirmMessage
        status={status1}
        message={message1}
        showAlert={showAlert1}
      />
      <ConfirmMessage
        status={status2}
        message={message2}
        showAlert={showAlert2}
      />
      <Container fluid className={styles.contenedor}>
        <Row>
          <Col xs={{ span: 12 }} lg={{ span: 11 }}>
            <div id="big" className="d-none d-xl-block d-lg-block ">
              <h1 className={styles["spectrum"]}>
                <span className="textoSpectrum">Información fiscal</span>
              </h1>
            </div>
            <div id="small" className="d-lg-none d-xl-none">
              <h1 className={styles["spectrumSmall"]}>
                <span className="textoSpectrum">Información fiscal</span>
              </h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 11 }}
            className={"gris-claro " + styles["subtituloSmall"]}
          >
            <span>
              En esta sección podrás revisar todo lo relacionado con la
              facturación de tus servicios contratados.
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul className={styles["clausulas"]}>
              <li className={styles["clausulasLink"]}>
                {" "}
                <b>Cláusulas legales</b>
              </li>
              <li>Solo se factura al titular de la cuenta.</li>
              <li>
                Si requiere modificar los datos fiscales, podrás realizarlos
                entrando nuevamente a la página web.
              </li>
              <li>
                No podrás generar facturas anteriores al registro de los datos
                fiscales.
              </li>
              <li>Método de envío: Correo.</li>
              <li>Tipo de factura: Papel y OTA.</li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Container fluid className={styles["contenedorColumna"]}>
        <Row>
          <Col>
            <p className={styles["informacion"]}>
              La generación de facturas se realizará en la siguiente fecha de
              corte a partir del registro web
            </p>
          </Col>
        </Row>
      </Container>
      <Container fluid className={styles.contenedor}>
        <div id="big" className="d-none d-xl-block d-lg-block ">
          <Row>
            <Col>
              <p className={styles["tituloInformacion"]}>
                Información fiscal actual
              </p>
              <p className={styles["subtituloInformacion"]}>
                Registra o actualiza tus datos fiscales
              </p>
            </Col>
            <Col className={styles["columnaBotonInformacion"]}>
              <Button className={styles["botonInfo"]} onClick={handleShow}>
                {statusRFC ? "Actualizar información" : "Guardar información"}
              </Button>
            </Col>
          </Row>
        </div>
        <div id="small" className="d-lg-none d-xl-none">
          <Row>
            <Col>
              <p className={styles["tituloInformacion"]}>
                Información fiscal actual
              </p>
              <p className={styles["subtituloInformacion"]}>
                Registra o actualiza tus datos fiscales
              </p>
            </Col>
          </Row>
        </div>

        <Row>
          <Col className={styles["columnaCardInformacion"]}>
            <Card className={styles["card"]}>
              <Row>
                <Col xs={12} lg={4}>
                  <p className={styles["textCard"]}>
                    <b>Razón social:</b> {razonSocial4Dashboard}
                  </p>
                  <p className={styles["textCard"]}>
                    <b>RFC: </b> {rfc4Dashboard}
                  </p>
                  <p className={styles["textCard"]}>
                    <b>Calle:</b> {calle4Dashboard}
                  </p>
                  <p className={styles["textCard"]}>
                    <b>número exterior:</b> {numeroExt4Dashboard}
                  </p>
                  <p className={styles["textCard"]}>
                    <b>Número interior:</b> {numeroInt4Dashboard}
                  </p>
                </Col>
                <Col xs={12} lg={4}>
                  <p className={styles["textCard"]}>
                    <b>Colonia:</b> {colonia4Dashboard}
                  </p>
                  <p className={styles["textCard"]}>
                    <b>Delegación o municipio: </b> {municipio4Dashboard}
                  </p>
                  <p className={styles["textCard"]}>
                    <b>Ciudad:</b> {ciudad4Dashboard}
                  </p>
                  <p className={styles["textCard"]}>
                    <b>Estado:</b> {estado4Dashboard}
                  </p>
                  <p className={styles["textCard"]}>
                    <b>Código postal:</b> {cp4Dashboard}
                  </p>
                </Col>
                <Col xs={12} lg={4}>
                  <p className={styles["textCard"]}>
                    <b>Tipo de persona:</b>
                    <Form.Select value={tipoPersona4Dashboard.replace(" ", "")} disabled>
                      <option value="0">Seleccionar</option>
                      <option value="FISICA">Física</option>
                      <option value="MORAL">Moral</option>
                    </Form.Select>
                  </p>
                  <p className={styles["textCard"]}>
                    <b>Régimen fiscal: </b>
                    <Form.Select
                      value={regimenFiscal4Dashboard.replace(" ", "")}
                      disabled
                    >
                      <option value="0">Sin Seleccionar</option>
                      {regimenes &&
                        regimenes.map((item: any, key: number) => {
                          return (
                            <option key={key + 1} value={item.Regimen_fiscal}>
                              {item.descripcion}
                            </option>
                          );
                        })}
                    </Form.Select>
                  </p>
                  <p className={styles["textCard"]}>
                    <b>Uso de CFDI:</b>
                    <Form.Select value={usoCfdi4Dashboard.replace(" ", "")} disabled>
                      <option value="0">Sin Seleccionar</option>
                      {cdfis.map((item: any, key: number) => {
                        return (
                          <option key={key + 1} value={item.CFDI}>
                            {item.DESCRIPCION}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </p>
                </Col>
              </Row>
            </Card>
            <div className={styles["aviso"]}>
              <a
                href="https://www.sky.com.mx/avisoprivacidad"
                className={styles["clausulasLink"]}
              >
                <b>Aviso de privacidad</b>
              </a>
            </div>
            <div id="small" className="d-lg-none d-xl-none">
              <Button className={styles["botonInfo"]} onClick={handleShow}>
                {statusRFC ? "Actualizar información" : "Guardar información"}
              </Button>
            </div>
          </Col>
        </Row>

        <FacturasDisponibles funcionManejaToast = {manejaToast}/>
      </Container>

      <Container className={styles.contenedorModal}>
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header
            closeButton
            style={{ borderBottom: "none" }}
          ></Modal.Header>
          <Modal.Body style={{ paddingTop: "0px" }}>
            <p className={styles.tituloModal}>
              Captura tu nueva información fiscal
            </p>
            <p className={styles.subtituloModal}>Actualiza tus datos</p>
            <Row>
              <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                <Form className={styles.formSmall}>
                  <Row className={styles.espacioInput}>
                    <Col xs={12} lg={4} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Razón social
                      </span>{" "}
                      <span className={styles.asterisco}>
                        {razonLong === true ? "Máximo 50 carácteres" : ""}
                      </span>
                      <span className={styles.asterisco}>
                        {razonCaracter === true ? "Sólo letras y números" : ""}
                      </span>
                      <Form.Control
                        placeholder="Razón social"
                        value={razonSocial4Update}
                        name="razonSocial"
                        onChange={(event) =>
                          valida(event.target.value, "razon")
                        }
                      />
                    </Col>
                    <Col xs={12} lg={4} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>RFC (sin
                        guiones){" "}
                        <span className={styles.asterisco}>
                          {rfcLong === true ? "Sólo 12 ó 13 carácteres" : ""}
                        </span>
                        <span className={styles.asterisco}>
                          {rfcCaracter === true ? "Sólo letras y números" : ""}
                        </span>
                      </span>
                      <Form.Control
                        placeholder="RFC"
                        value={rfc4Update}
                        name="rfc"
                        onChange={(event) => valida(event.target.value, "rfc")}
                      />
                    </Col>
                    <Col xs={12} lg={4} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Tipo de
                        persona
                      </span>
                      <Form.Select
                        onChange={obtienePersona}
                        value={tipoPersona4Update}
                      >
                        <option value="0">Seleccionar</option>
                        <option value="FISICA">Física</option>
                        <option value="MORAL">Moral</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  <Row className={styles.espacioInput}>
                    <Col xs={12} lg={4} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Régimen
                        fiscal
                      </span>
                      <Form.Select
                        onChange={obtieneRegimen}
                        value={regimenFiscal4Update.replace(" ", "")}
                      >
                        <option value="0">Seleccionar</option>
                        {regimenes &&
                          regimenes.map((item: any, key: number) => {
                            return (
                              <option key={key + 1} value={item.Regimen_fiscal}>
                                {item.descripcion}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Col>
                    <Col xs={12} lg={4} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Uso de CFDI
                      </span>
                      <Form.Select
                        onChange={obtieneCFDI}
                        value={usoCfdi4Update.replace(" ", "")}
                      >
                        <option value="0">Seleccionar</option>
                        {cdfis.map((item: any, key: number) => {
                          return (
                            <option key={key + 1} value={item.CFDI}>
                              {item.DESCRIPCION}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Col>
                    <Col xs={12} lg={4} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Código postal{" "}
                        <span className={styles.asterisco}>
                          {cpLong === true ? "Máximo 5 carácteres" : ""}
                        </span>
                        <span className={styles.asterisco}>
                          {cpCaracter === true ? "Sólo números" : ""}
                        </span>
                      </span>
                      <Form.Control
                        placeholder="Código postal"
                        value={cp4Update}
                        name="codigo"
                        onChange={(event) => valida(event.target.value, "cp")}
                      />
                    </Col>
                  </Row>

                  <Row className={styles.espacioInput}>
                    <Col xs={12} lg={3} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Calle{" "}
                        <span className={styles.asterisco}>
                          {calleLong === true ? "Máximo 50 carácteres" : ""}
                        </span>
                        <span className={styles.asterisco}>
                          {calleCaracter === true
                            ? "Sólo letras y números"
                            : ""}
                        </span>
                      </span>
                      <Form.Control
                        placeholder="Calle"
                        value={calle4Update}
                        name="calle"
                        onChange={(event) =>
                          valida(event.target.value, "calle")
                        }
                      />
                    </Col>
                    <Col xs={12} lg={3} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Número
                        exterior{" "}
                        <span className={styles.asterisco}>
                          {numExtLong === true ? "Máximo 10 carácteres" : ""}
                        </span>
                        <span className={styles.asterisco}>
                          {numExtCaracter === true
                            ? "Sólo letras y números"
                            : ""}
                        </span>
                      </span>
                      <Form.Control
                        placeholder="Número exterior"
                        value={numeroExt4Update}
                        name="numeroExt"
                        onChange={(event) =>
                          valida(event.target.value, "numExt")
                        }
                      />
                    </Col>
                    <Col xs={12} lg={3} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        Número interior{" "}
                        <span className={styles.asterisco}>
                          {numIntLong === true ? "Máximo 10 carácteres" : ""}
                        </span>
                        <span className={styles.asterisco}>
                          {numIntCaracter === true
                            ? "Sólo letras y números"
                            : ""}
                        </span>
                      </span>
                      <Form.Control
                        placeholder="Número interior"
                        value={numeroInt4Update}
                        name="numeroInt"
                        onChange={(event) =>
                          valida(event.target.value, "numInt")
                        }
                      />
                    </Col>
                    <Col xs={12} lg={3} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Colonia{" "}
                        <span className={styles.asterisco}>
                          {coloniaLong === true ? "Máximo 50 carácteres" : ""}
                        </span>
                        <span className={styles.asterisco}>
                          {coloniaCaracter === true
                            ? "Sólo letras y números"
                            : ""}
                        </span>
                      </span>
                      <Form.Control
                        placeholder="Colonia"
                        value={colonia4Update}
                        name="colonia"
                        onChange={(event) =>
                          valida(event.target.value, "colonia")
                        }
                      />
                    </Col>
                  </Row>

                  <Row className={styles.espacioInput}>
                    <Col xs={12} lg={3} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Ciudad{" "}
                        <span className={styles.asterisco}>
                          {ciudadLong === true ? "Máximo 25 carácteres" : ""}
                        </span>
                        <span className={styles.asterisco}>
                          {ciudadCaracter === true ? "Sólo letras" : ""}
                        </span>
                      </span>
                      <Form.Control
                        placeholder="Ciudad"
                        value={ciudad4Update}
                        name="ciudad"
                        onChange={(event) =>
                          valida(event.target.value, "ciudad")
                        }
                      />
                    </Col>
                    <Col xs={12} lg={3} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Alcaldía o
                        Municipio{" "}
                        <span className={styles.asterisco}>
                          {municipioLong === true ? "Máximo 25 carácteres" : ""}
                        </span>
                        <span className={styles.asterisco}>
                          {municipioCaracter === true ? "Sólo letras" : ""}
                        </span>
                      </span>
                      <Form.Control
                        placeholder="Alcaldía o Municipio "
                        value={municipio4Update}
                        name="municipio"
                        onChange={(event) =>
                          valida(event.target.value, "municipio")
                        }
                      />
                    </Col>
                    <Col xs={12} lg={3} className={styles.separaInputSmall}>
                      <span className={styles.etiqueta}>
                        <span className={styles.asterisco}>*</span>Estado{" "}
                        <span className={styles.asterisco}>
                          {estadoLong === true ? "Máximo 20 carácteres" : ""}
                        </span>
                        <span className={styles.asterisco}>
                          {estadoCaracter === true ? "Sólo letras" : ""}
                        </span>
                      </span>
                      <Form.Control
                        placeholder="Estado"
                        value={estado4Update}
                        name="estado"
                        onChange={(event) =>
                          valida(event.target.value, "estado")
                        }
                      />
                    </Col>
                  </Row>

                  <Row>
                    <span className={styles.etiqueta}>
                      <span className={styles.asterisco}>*</span>Campos
                      obligatorios
                    </span>
                  </Row>
                  <Row style={{ marginTop: "1vw" }}>
                    <Col className={styles.alineaTerminos}>
                      <Form.Check
                        type="checkbox"
                        label="He leído y acepto los"
                        checked={acepta}
                        onChange={(e) => aceptaTerminos(e.target.checked)}
                      />

                      <a
                        href="https://www.sky.com.mx/avisoprivacidad"
                        className={styles.link}
                      >
                        Términos y condiciones
                      </a>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      xs={{ span: 12, offset: 0 }}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button className={styles.boton} onClick={actualizaDatos}>
                        Solicitar cambio
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      xs={{ span: 12, offset: 0 }}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        className={styles.botonCancelar}
                        onClick={handleClose}
                      >
                        Cancelar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>

      <Modal
        show={showModalAviso1}
        onHide={() => setShowModalAviso1(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body className={styles.bodyModalAviso}>
          <div className={styles.infoModalAviso}>
            <p className={styles.descripcionModalAviso}>
              Favor de aceptar términos y condiciones
            </p>
            <Stack>
              <Button
                className={styles.botonCancelarModalAviso}
                onClick={() => setShowModalAviso1(false)}
              >
                <b>Cancelar</b>
              </Button>
            </Stack>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalAviso2}
        onHide={() => setShowModalAviso2(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body className={styles.bodyModalAviso}>
          <div className={styles.infoModalAviso}>
            <p className={styles.descripcionModalAviso}>
              Datos incorrectos o incompletos
            </p>
            <Stack>
              <Button
                className={styles.botonCancelarModalAviso}
                onClick={() => setShowModalAviso2(false)}
              >
                <b>Cancelar</b>
              </Button>
            </Stack>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
