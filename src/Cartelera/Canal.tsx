import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./Canal.module.css";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/esm/Form";

import next from "../../assets/img/Iconos/arrowNext.png";
import prev from "../assets/img/Iconos/arrowPrev.png";

import hbomax from "../assets/img/Cartetelera/big/hbomax_gde.png";
import foxsports from "../assets/img/Cartetelera/big/foxsport_gde.png";
import universal from "../assets/img/Cartetelera/big/universal_gde.png";
import izzi from "../assets/img/Cartetelera/thumbnail/Afizzionados.png";
import {
  ConsultarServiciosAdicionalesRest_Respuesta,
  ConsultarServiciosAdicionalesRest_Parametros,
  ConsultarServiciosAdicionalesRequest,
  builtConsultarServiciosAdicionalesRequest,
  ConsultarServiciosAdicionalesRest_Entrada,
  builtConsultarServiciosAdicionalesRest_Entrada,
  ConsultarServiciosAdicionale,
} from "../Commons/Services/ConsultarServiciosAdicionalesRest";
import {
  builtSolicitudDeServicio,
  SolicitudDeServicio,
  builtContratacionServicios,
  ContratacionServicios,
  AltaSolicitudDeServicio_Entrada,
  builtAltaSolicitudDeServicio_Entrada,
  AltaSolicitudDeServicio_Parametros,
  AltaSolicitudDeServicio_Respuesta,
  CambioFormaPago,
  builtCambioFormaPago,
  DatosFiscales,
  builtDatosFiscales,
  Direccion,
  builtDireccion,
  CompraControlRemoto,
  builtCompraControlRemoto,
  ActivaRemoteBooking,
  builtActivaRemoteBooking,
  InfoPPE,
  builtInfoPPE,
  Pagos,
  builtPagos,
  DatosTDC,
  builtDatosTDC,
  RespuestaACI,
  builtRespuestaACI,
} from "../Commons/Services/AltaSolicitudDeServicioRest";
import { ConsultaWS } from "../Commons/ServiciosBase";
import Loading from "../General/Loading";
import {
  Product,
  builtProduct,
  ListOfProducts,
  builtListOfProducts,
  Instance,
  builtInstance,
  ListOfInstances,
  builtListOfInstances,
  ServiceInfoRequest,
  builtServiceInfoRequest,
  GestionarSSComprarServiciosRequestEBM,
  builtGestionarSSComprarServiciosRequestEBM,
  GestionarSSComprarServicios_Entrada,
  builtGestionarSSComprarServicios_Entrada,
  GestionarSSComprarServicios_Parametros,
  GestionarSSComprarServicios_Respuesta,
} from "../Commons/Services/GestionarSSComprarServiciosRest";
import ConfirmMessage from "../General/ConfirmMessage";
import {
  ConsultarProducto_Respuesta,
  ConsultarProducto_Entrada,
  builtConsultarProductoEntrada,
  ConsultarProducto_Parametros,
} from "../Commons/Services/ConsultarProducto";

import { Tarjeta } from "../Commons/Services/ConsultarIRD";

import disneyplus_max from "../assets/img/Cartetelera/big/ott-destacados-disney.png";
import starplus_max from "../assets/img/Cartetelera/big/ott-destacados-star.png";
import comboplus_max from "../assets/img/Cartetelera/big/ott-destacados-combo.png";
import vixplus_max from "../assets/img/Cartetelera/big/ott-destacados-vix.png";
import golden from "../assets/img/Cartetelera/big/Goldenpremiere.png";

const Canal = (props: any) => {
  const {
    titulo1,
    imagen1,
    imagenSmall1,
    precio1,
    descripcion1,
    muestra1,
    canal1,
    categoria1,
  }: any = { ...props };
  const [showModalTerminosCondiciones, setShowModalTerminosCondiciones] =
    useState(false);
  const [showModalQuieresContratar, setShowModalQuieresContratar] =
    useState(false);
  const [tarjetas, setTarjetas] = useState<any[]>([]);
  const [seleccionTarjeta, setSeleccionTarjeta] = useState("");
  const [seleccionIRD, setSeleccionIRD] = useState("");
  const [loading, isLoading] = useState(false);

  const [status1, setStatus1] = useState("OK");
  const [message1, setMessage1] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  //modal 1
  const handleShowModalTerminosCondiciones = () =>
    setShowModalTerminosCondiciones(true);
  const handleCloseModalTerminosCondiciones = () =>
    setShowModalTerminosCondiciones(false);

  //modal2
  const handleShowModalQuieresContratar = () =>
    setShowModalQuieresContratar(true);
  const handleCloseModalQuieresContratar = () =>
    setShowModalQuieresContratar(false);

  const obtieneTarjeta = (e: any) => {
    var cardSelected = e.target.value;
    var arraycardIntelligent = cardSelected.split("+");
    setSeleccionTarjeta(arraycardIntelligent[0]);
    setSeleccionIRD(arraycardIntelligent[1]);
  };

  useEffect(() => {
    let tarjetas: any = "";
    if (sessionStorage.getItem("tarjetas") !== null) {
      tarjetas = sessionStorage.getItem("tarjetas");
    }
    if (tarjetas !== "") {
      let arTarjetas = JSON.parse(tarjetas);
      let arTarjetasTemp: any[] = [];
      arTarjetas.forEach((element: any) => {
        if (
          element.Categoria !== "SKY IPC UHD" ||
          element.Categoria !== "SKY HMC EHD"
        ) {
          arTarjetasTemp.push(element);
        }
      });
      setTarjetas(arTarjetasTemp);
    }
  }, []);

  const getImages = (titulo: string, source: string) => {
    if (titulo.includes("izzi") || titulo.includes("IZZI")) {
      return izzi;
    } else if (
      titulo.includes("HBO") ||
      (titulo.includes("hbo") && titulo.includes("MAX")) ||
      titulo.includes("max")
    ) {
      return hbomax;
    } else if (titulo.includes("fox sports") || titulo.includes("Fox Sports")) {
      return foxsports;
    } else if (titulo.includes("universal") || titulo.includes("Universal")) {
      return universal;
    } else if (titulo.includes("disney") || titulo.includes("Disney")) {
      return disneyplus_max;
    } else if (titulo.includes("star") || titulo.includes("Star")) {
      return starplus_max;
    } else if (titulo.includes("combo") || titulo.includes("Combo")) {
      return comboplus_max;
    } else if (titulo.includes("vix") || titulo.includes("Vix")) {
      return vixplus_max;
    } else if (titulo.includes("golden Premiere") || titulo.includes("Golden")) {
      return golden;
    } else {
      return source;
    }
  };

  const getStyle = (titulo: string) => {
    if (
      titulo.includes("HBO") ||
      (titulo.includes("hbo") && titulo.includes("MAX")) ||
      titulo.includes("max")
    ) {
      return "imagen";
    } else if (titulo.includes("fox sports") || titulo.includes("Fox Sports")) {
      return "imagen";
    } else if (titulo.includes("universal") || titulo.includes("Universal")) {
      return "imagen";
    } else {
      return "imagenNoContemplada";
    }
  };

  const doContratarCanal = async () => {
    if (
      categoria1 &&
      categoria1 != null &&
      categoria1 != "" &&
      canal1 &&
      canal1 != null &&
      canal1 != ""
    ) {
      doAltaSolicitudDeServicio(titulo1, precio1, canal1, categoria1);
    } else {
      //Streaming

      doGestionarSSComprarServicios(titulo1, precio1, canal1, categoria1);
    }
  };

  const doGestionarSSComprarServicios = async (
    p_titulo2: string,
    p_precio2: string,
    p_canal2: string,
    p_categoria2: string
  ) => {
    //----------------------------------------------------------------------------------------------------------------------------
    let tarjetaMaster: Tarjeta = {
      TarjetaInteligente: "",
      IRD: "",
      Ubicacion: "",
      Status: "",
      Jerarquia: "",
      Categoria: "",
      Flg_funcionalidad: "",
    };
    if (sessionStorage.getItem("tarjetaMaster") !== null) {
      tarjetaMaster = JSON.parse(sessionStorage.getItem("tarjetaMaster")!);
    }
    isLoading(true);
    const product: Product = builtProduct("Servicio " + p_titulo2, "Add");

    const listOfProducts: ListOfProducts = builtListOfProducts([product]);
    const instance: Instance = builtInstance(
      tarjetaMaster.TarjetaInteligente,
      tarjetaMaster.IRD!,
      listOfProducts
    );
    const listOfInstances: ListOfInstances = builtListOfInstances([instance]);
    const serviceInfoRequest: ServiceInfoRequest = builtServiceInfoRequest(
      "Servicio Adicional",
      `${sessionStorage.getItem("cuenta")}`,
      "Service OTT",
      "Venta a suscriptor",
      "Solicitud de Aprovisionamiento",
      "Web",
      listOfInstances
    );

    const gestionarSSComprarServiciosRequestEBM: GestionarSSComprarServiciosRequestEBM =
      builtGestionarSSComprarServiciosRequestEBM(serviceInfoRequest);
    const gestionarSSComprarServiciosEntrada: GestionarSSComprarServicios_Entrada =
      builtGestionarSSComprarServicios_Entrada(
        gestionarSSComprarServiciosRequestEBM
      );

    let GestionarSSComprarServiciosParametros =
      GestionarSSComprarServicios_Parametros(
        gestionarSSComprarServiciosEntrada
      );
    let GestionarSSComprarServiciosRespuesta: GestionarSSComprarServicios_Respuesta =
      await ConsultaWS(GestionarSSComprarServiciosParametros);
    //----------------------------------------------------------------------------------------------------------------------------

    if (
      GestionarSSComprarServiciosRespuesta
        .GestionarSSComprarServiciosResponseEBM.ServiceInfoResponse.NumeroSS &&
      GestionarSSComprarServiciosRespuesta
        .GestionarSSComprarServiciosResponseEBM.ServiceInfoResponse.NumeroSS !=
        null &&
      GestionarSSComprarServiciosRespuesta
        .GestionarSSComprarServiciosResponseEBM.ServiceInfoResponse.NumeroSS !=
        ""
    ) {
      setStatus1("OK");
      setMessage1(
        "Servicio contrato exitosamente " +
          GestionarSSComprarServiciosRespuesta
            .GestionarSSComprarServiciosResponseEBM.ServiceInfoResponse.NumeroSS
      );
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);
        setSeleccionTarjeta("0");
        muestra1(true);
      }, 3000);
    } else {
      console.error(GestionarSSComprarServiciosRespuesta);
      setStatus1("ERROR");
      setMessage1(
        "No puede contratar "
          .concat(p_titulo2)
          .concat(" por favor llame a atención a clientes.")
      );
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);

        setSeleccionTarjeta("0");
        muestra1(true);
      }, 3000);
    }
    isLoading(false);
  };

  const doAltaSolicitudDeServicio = async (
    p_titulo2: string,
    p_precio2: string,
    p_canal2: string,
    p_categoria2: string
  ) => {
    //----------------------------------------------------------------------------------------------------------------------------
    isLoading(true);
    const cambioFormaPago: CambioFormaPago = builtCambioFormaPago(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );
    const datosFiscales: DatosFiscales = builtDatosFiscales("", "", "", "", "");
    const direccion: Direccion = builtDireccion("", "", "", "", "", "", "", "");

    const contratacionServicios: ContratacionServicios =
      builtContratacionServicios(
        `${sessionStorage.getItem("Paquete")}`,
        p_titulo2,
        p_titulo2,
        p_canal2, //l_NoCanalALaCarta: string,
        p_precio2,
        "N" //l_PenalizacionVETVCA: string
      );

    const compraControlRemoto: CompraControlRemoto = builtCompraControlRemoto(
      "",
      "",
      "",
      "",
      ""
    );

    const activaRemoteBooking: ActivaRemoteBooking = builtActivaRemoteBooking(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );

    const infoPPE: InfoPPE = builtInfoPPE(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );

    const datosTDC: DatosTDC = builtDatosTDC("", "", "", "", "", "");

    const respuestaACI: RespuestaACI = builtRespuestaACI(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );

    const pagos: Pagos = builtPagos("", "", "", datosTDC, respuestaACI);

    const solicitudDeServicio: SolicitudDeServicio = builtSolicitudDeServicio(
      `${sessionStorage.getItem("cuenta")}`,
      "Web",
      "Canales a la Carta",
      p_titulo2,
      seleccionTarjeta,
      `${sessionStorage.getItem("RowIdContacto")}`,
      `${sessionStorage.getItem("EmailNotif")}`,
      `${sessionStorage.getItem("pais")}`,
      `${sessionStorage.getItem("Producto")}`, //`${sessionStorage.getItem("TipoCuenta")}`,
      `${sessionStorage.getItem("NombreSuscriptor")}`,
      datosFiscales,
      direccion,
      contratacionServicios,
      compraControlRemoto,
      activaRemoteBooking,
      infoPPE,
      pagos,
      cambioFormaPago,
      "HIJUMP",
      `${sessionStorage.getItem("idSesion")}`
    );
    const AltaSolicitudDeServicioEntrada: AltaSolicitudDeServicio_Entrada =
      builtAltaSolicitudDeServicio_Entrada(solicitudDeServicio);
    let AltaSolicitudDeServicioParametros = AltaSolicitudDeServicio_Parametros(
      AltaSolicitudDeServicioEntrada
    );

    let AltaSolicitudDeServicioRespuesta: AltaSolicitudDeServicio_Respuesta =
      await ConsultaWS(AltaSolicitudDeServicioParametros);

    if (
      AltaSolicitudDeServicioRespuesta.NumeroSolicitud &&
      AltaSolicitudDeServicioRespuesta.NumeroSolicitud != null &&
      AltaSolicitudDeServicioRespuesta.NumeroSolicitud !== ""
    ) {
      setStatus1("OK");
      setMessage1(
        "Servicio contrato exitosamente " +
          AltaSolicitudDeServicioRespuesta.NumeroSolicitud
      );
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);
        setSeleccionTarjeta("0");
        muestra1(true);
      }, 3000);
    } else {
      console.error(AltaSolicitudDeServicioRespuesta);
      setStatus1("ERROR");
      setMessage1(AltaSolicitudDeServicioRespuesta.resultadodesc);
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);
        setSeleccionTarjeta("0");
        muestra1(true);
      }, 3000);
    }
    isLoading(false);
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const validateCreditCard = () => {
    if (
      seleccionTarjeta &&
      seleccionTarjeta !== null &&
      seleccionTarjeta !== "" &&
      seleccionTarjeta !== "0"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const doValidateEnoughCredit = () => {
    let saldoCuentaConsultado: number =
      sessionStorage.getItem("Paquete") !== ""
        ? Number(sessionStorage.getItem("Paquete"))
        : 0;

    if (saldoCuentaConsultado < 0) {
      //La cuenta tiene saldo a favor
      const saldoAfavor = saldoCuentaConsultado * -1;
      if (saldoAfavor < precio1) {
        //El saldo a favor de la cuenta no cubre totalmente el precio del PPE
        //Se manda a pagar la diferencia con TC
        const totalDiferenciaPorPagar = precio1 - saldoAfavor;
        setStatus1("ERROR");
        setMessage1(
          `Se tendra que pagar con tarjeta la siguiente diferencia: ${totalDiferenciaPorPagar}`
        );
        setShowAlert1(true);
        setTimeout(() => {
          setShowAlert1(false);
        }, 5000);
        //alert(`Se tendra que pagar con tarjeta la siguiente diferencia: ${totalDiferenciaPorPagar}`);
        return false;
      } else {
        return true;
      }
    } else {
      //La cuenta no tiene saldo a favor, se manda a pagar con TC el PPE con el saldo + precio
      //respuesta.totalPorPagar = saldoCuentaConsultado + precio;
      setStatus1("ERROR");
      setMessage1(
        `Se tendra que pagar con tarjeta la siguiente diferencia: ${
          saldoCuentaConsultado + precio1
        }`
      );
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);
      }, 5000);
      return false;
    }
  };

  const doConsultarProducto = async () => {
    //var retorno = false;
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarProductoEntrada: ConsultarProducto_Entrada =
      builtConsultarProductoEntrada(
        sessionStorage.getItem("cuenta")!,
        titulo1,
        seleccionTarjeta
      );
    let ConsultarProductoParametros = ConsultarProducto_Parametros(
      ConsultarProductoEntrada
    );

    let ConsultarProductoRespuesta: ConsultarProducto_Respuesta =
      await ConsultaWS(ConsultarProductoParametros);

    if (
      ConsultarProductoRespuesta.ProductoContratado &&
      ConsultarProductoRespuesta.ProductoContratado !== "" &&
      ConsultarProductoRespuesta.ProductoContratado !== null
    ) {
      if (ConsultarProductoRespuesta.ProductoContratado === "N") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const doConsultarServiciosAdicionales = async () => {
    //----------------------------------------------------------------------------------------------------------------------------
    const consultarServiciosAdicionalesRequest: ConsultarServiciosAdicionalesRequest =
      builtConsultarServiciosAdicionalesRequest(
        "Servicio Adicional",
        "Service OTT",
        sessionStorage.getItem("cuenta")!,
        seleccionTarjeta,
        seleccionIRD,
        "Sky Mexico"
      );
    const consultarServiciosAdicionalesRestEntrada: ConsultarServiciosAdicionalesRest_Entrada =
      builtConsultarServiciosAdicionalesRest_Entrada(
        consultarServiciosAdicionalesRequest
      );
    let consultarServiciosAdicionalesParametros =
      ConsultarServiciosAdicionalesRest_Parametros(
        consultarServiciosAdicionalesRestEntrada
      );
    let ConsultarServiciosAdicionalesRestRespuesta: ConsultarServiciosAdicionalesRest_Respuesta =
      await ConsultaWS(consultarServiciosAdicionalesParametros);
    if (
      ConsultarServiciosAdicionalesRestRespuesta.ConsultarServiciosAdicionales &&
      ConsultarServiciosAdicionalesRestRespuesta.ConsultarServiciosAdicionales !==
        null &&
      typeof ConsultarServiciosAdicionalesRestRespuesta.ConsultarServiciosAdicionales !=
        "undefined"
    ) {
      return ConsultarServiciosAdicionalesRestRespuesta
        .ConsultarServiciosAdicionales.ConsultarServiciosAdicionales;
    } else {
      return [];
    }

    //----------------------------------------------------------------------------------------------------------------------------
  };
  //----------------------------------------------------------------------------------------------------------------------------

  const doValidaciones = async () => {
    //SE VALIDA SELECCION DE TARJETA INTELIGENTE
    if (validateCreditCard()) {
      if (
        categoria1 &&
        categoria1 != null &&
        categoria1 != "" &&
        canal1 &&
        canal1 != null &&
        canal1 != ""
      ) {
        //PELICULAS;DEPORTES;ADULTOS
        doConsultarProducto().then((respuesta: boolean) => {
          if (respuesta) {
            if (sessionStorage.getItem("tipoCliente") === "PRE") {
              if (doValidateEnoughCredit()) {
                handleShowModalTerminosCondiciones();
              }
            } else {
              handleShowModalTerminosCondiciones();
            }
          } else {
            console.error("Este título ya está contratado para esta cuenta");
            setStatus1("ERROR");
            setMessage1("Este título ya está contratado para esta cuenta");
            setShowAlert1(true);
            setTimeout(() => {
              setShowAlert1(false);
            }, 3000);
            //alert();
          }
        });
      } else {
        //STREAMING
        //SE VALIDA SI LA TRAJETA TIENE DERECHO AL STREAMING
        //SI TIENE MAS DE 1 TARJETA Y SELECCIONA UNA QUE NO TENGA
        doConsultarServiciosAdicionales().then(
          (res: ConsultarServiciosAdicionale[]) => {
            if (res.length > 0) {
              doConsultarProducto().then((respuesta: boolean) => {
                if (respuesta) {
                  if (sessionStorage.getItem("tipoCliente") === "PRE") {
                    if (doValidateEnoughCredit()) {
                      handleShowModalTerminosCondiciones();
                    }
                  } else {
                    handleShowModalTerminosCondiciones();
                  }
                } else {
                  console.error(
                    "Este título ya está contratado para esta cuenta"
                  );
                  setStatus1("ERROR");
                  setMessage1(
                    "Este título ya está contratado para esta cuenta"
                  );
                  setShowAlert1(true);
                  setTimeout(() => {
                    setShowAlert1(false);
                  }, 3000);
                  //alert();
                }
              });
            } else {
              console.error(
                "La tarjeta inteligente, no tiene derecho a comprar este título"
              );
              setStatus1("ERROR");
              setMessage1(
                "La tarjeta inteligente, no tiene derecho a comprar este título"
              );
              setShowAlert1(true);
              setTimeout(() => {
                setShowAlert1(false);
              }, 3000);
            }
          }
        );
      }
      //SE VALIDA SI LA PELICULA YA ESTA CONTRATADA
    } else {
      console.error("Favor de seleccionar una Tarjeta Inteligente");
      setStatus1("ERROR");
      setMessage1("Favor de seleccionar una Tarjeta Inteligente");
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);
      }, 3000);
      //alert("");
    }
  };

  return (
    <>
      <div id="big" className="d-none d-xl-block d-lg-block ">
        <ConfirmMessage
          status={status1}
          message={message1}
          showAlert={showAlert1}
        />
        <Loading isLoading={loading} />
        <Container className={styles.contenedor} fluid>
          <Row className={styles["headerRow"]}>
            <Col className={styles["columnaCar"]}>
              <a
                onClick={() => {
                  muestra1(true);
                }}
                className={styles["flecha"]}
              >
                {" "}
                <img src={prev} style={{ width: ".5vw" }} />
              </a>
              <span className={styles["spectrum"]}>Aplicaciones</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className={styles["title"]}>
                Disfruta de las opciones que tenemos para ti con cargo extra.
              </p>
            </Col>
          </Row>
        </Container>

        <Container className={styles.contenedor} fluid>
          <Row>
            <Col lg={6} xl={6}>
              <Row>
                <Col lg={6} xl={6}>
                  <span className={styles["tituloazul"]}>{titulo1}</span>
                </Col>
                <Col lg={6} xl={6} className={styles["alignPrice"]}>
                  <span className={styles.tituloazul2}>${precio1}</span>
                  <span className={styles.tituloazul3}>/mes</span>
                </Col>
              </Row>
              <Row className={styles["texto"] + " pt-4"}>
                <ul>
                  {descripcion1.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Row>
            </Col>
            <Col lg={6} xl={6}>
              <div className={styles["centrar"]}>
                <img
                  src={getImages(titulo1, imagen1)}
                  className={styles[getStyle(titulo1)]}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={styles["tituloMargin"]}>
              <span className={styles["tituloazul"]}>Selecciona tu TV</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className={styles["title"]}>
                Elige el equipo en el que desfrutarás de los canales
                seleccionados
              </p>
            </Col>
          </Row>
          {tarjetas != null && tarjetas.length > 0 ? (
            <Row>
              <Col>
                <Form.Label>Tarjeta inteligente</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className={styles.select}
                  onChange={obtieneTarjeta}
                >
                  <option value="0">Selecciona tarjeta</option>
                  {tarjetas.map((tarjeta: any, index: number) => {
                    return (
                      <option
                        key={index}
                        value={`${tarjeta.TarjetaInteligente}+${tarjeta.IRD}`}
                      >
                        {tarjeta.TarjetaInteligente}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
            </Row>
          ) : (
            <p>No Hay Tarjetas Inteligentes para Mostrar</p>
          )}

          <Row>
            <Col>
              <div className={styles["centrar"]}>
                <Button
                  variant="primary"
                  className={styles["botonazul"]}
                  onClick={() => {
                    doValidaciones();
                    //
                  }}
                >
                  Contratar
                </Button>
                {"  "}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/***************************
      Inicia seccion responsiva
      *****************************/}

      <div id="small" className="d-lg-none d-xl-none">
        <Container className={styles.contenedorSmall}>
          <Row>
            <Col className={styles["titleContainer"]}>
              <span className={styles["spectrum"]}>Aplicaciones</span>
              <p className={styles["title"]}>
                Disfruta de las opciones que tenemos para ti con cargo extra.
              </p>
            </Col>
          </Row>
          <Row className={styles["imgContainer"]}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={getImages(titulo1, imagenSmall1)}
                className={styles["imagenSmall"]}
              />
            </div>
          </Row>
        </Container>

        <Container className={styles.contenedorSmall}>
          <Row className={styles["titleContainer"]}>
            <Col style={{ paddingLeft: "4vw" }}>
              <p className={styles["tituloazulSmall"]}>{titulo1}</p>
            </Col>
            <Col className={styles["precio_mesSmall"]}>
              <p style={{ textAlign: "right" }}>
                <span className={styles.tituloazul2Small}>${precio1}</span>
                <span className={styles.tituloazul3Small}>/mes</span>
              </p>
            </Col>
          </Row>
          <Row className={styles["textoSmall"]}>
            <ul>
              {descripcion1.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Row>

          <Row>
            <Col
              style={{ paddingLeft: "4vw", marginTop: "1vw" }}
              className={styles["tituloMargin"]}
            >
              <span className={styles["tituloazulSmall"]}>
                Selecciona tu TV
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className={styles["title"]}>
                Elige el equipo en el que desfrutarás de los canales
                seleccionados
              </p>
            </Col>
          </Row>
          {tarjetas != null && tarjetas.length > 0 ? (
            <Row>
              <Col>
                <Form.Label
                  style={{ paddingLeft: "0vw" }}
                  className={styles["textoSmall"]}
                >
                  Tarjeta inteligente
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className={styles.selectSmall}
                  onChange={obtieneTarjeta}
                >
                  <option value="0">Selecciona tarjeta</option>
                  {tarjetas.map((tarjeta: any, index: number) => {
                    return (
                      <option key={index} value={tarjeta.TarjetaInteligente}>
                        {tarjeta.TarjetaInteligente}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
            </Row>
          ) : (
            <></>
          )}

          <Row className={styles["centrarSmall"]}>
            <Col className={styles["buttonContainer"]}>
              <Button
                variant="primary"
                className={styles["botonazulSmall"]}
                onClick={() => {
                  doValidaciones();
                }}
              >
                Contratar
              </Button>
            </Col>
            <Col className={styles["buttonContainer"]}>
              {
                <Button
                  variant="primary"
                  className={styles["botonCancelarSmall"]}
                  onClick={(event) => {
                    muestra1(true);
                  }}
                >
                  Cancelar
                </Button>
              }
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        show={showModalTerminosCondiciones}
        onHide={handleCloseModalTerminosCondiciones}
        size="lg"
        centered
        className={styles["modalSize"]}
      >
        <Modal.Header
          className={styles["modalHeader"]}
          closeButton
        ></Modal.Header>
        <Modal.Header
          className="d-lg-none d-xl-none"
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body className={styles.contenedorModal}>
          <Container>
            <Row className={styles["alignCenterCenterColumn"]}>
              <Col>
                <h2 className={styles.titulo}>Términos y condiciones</h2>
              </Col>
            </Row>

            <Row className={styles["alignCenterCenterColumn"]}>
              <Col>
                <p className={styles.descripcion}>
                  {" "}
                  Al aceptar la contratación del Servicio SKY on-line (en
                  línea), estoy de acuerdo y acepto los términos y condiciones
                  del contrato de prestación de servicios, arrendamiento y
                  comodato (en adelante el contrato) mismo que se encuentra
                  registrado y ha sido aprobado por el Instituto Federal de
                  Telecomunicaciones y la Procuraduría Federal del Consumidor,
                  el cual he leído y describe los términos y condiciones de
                  contratación, para mayor referencia y futuras consultas se
                  encuentra disponible en todo momento en la página web:
                  www.sky.com.mx, asimismo al aceptar la contratación on-line,
                  SKY se obliga a entregarme una copia de mi contrato al momento
                  de realizar la instalación respectiva de todos los componentes
                  y equipos necesario para la prestación del servicio en mi
                  domicilio.
                </p>
              </Col>
            </Row>

            <Row className={styles["alignCenterCenterColumn"]}>
              <Col md={{ span: 3 }}>
                <Button
                  className={styles.botonModalDetalles}
                  onClick={(event) => {
                    handleShowModalQuieresContratar();
                    handleCloseModalTerminosCondiciones();
                  }}
                >
                  Aceptar
                </Button>
              </Col>
            </Row>

            <Row className={styles["alignCenterCenterColumn"]}>
              <Col md={{ span: 3 }}>
                <Button
                  className={styles.botonCancelarSmall}
                  onClick={(event) => {
                    handleCloseModalTerminosCondiciones();
                  }}
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalQuieresContratar}
        onHide={handleCloseModalQuieresContratar}
        size="lg"
        centered
        className={styles["modalSize"]}
      >
        <Modal.Header
          className={styles["modalHeader"]}
          closeButton
        ></Modal.Header>
        <Modal.Body className={styles.contenedor}>
          <Container>
            <Row className={styles["alignCenterCenterColumn"]}>
              <Col>
                <h2 className={styles.titulo}>
                  {"¿Quieres contratar " + titulo1 + "?"}
                </h2>
              </Col>
            </Row>
            <Row className={styles["alignCenterCenterColumn"]}>
              <Col>
                <p className={styles.descripcionModalConfirmacion}>
                  {"Se agregará un cargo mensual de $" +
                    precio1 +
                    " a partir de tu próxima factura."}
                </p>
              </Col>
            </Row>

            <Row className={styles["alignCenterCenterColumn"]}>
              <Col md={{ span: 3 }}>
                <Button
                  className={styles.botonazulModal}
                  onClick={(event) => {
                    doContratarCanal();
                    handleCloseModalQuieresContratar();
                  }}
                >
                  Contratar
                </Button>
              </Col>
            </Row>
            <Row className={styles["alignCenterCenterColumn"]}>
              <Col md={{ span: 3 }}>
                <Button
                  className={styles.botonCancelarModal}
                  onClick={(event) => {
                    //handleCloseModalQuieresContratar();
                    muestra1(true);
                  }}
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Canal;
