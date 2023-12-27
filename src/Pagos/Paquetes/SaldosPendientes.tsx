import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./SaldosPendientes.module.css";
import ModalPospagoConTarjeta from "./ModalPospagoConTarjeta";
import ModalConfirmado from "../Tarjeta/ModalConfirmado";
import ModalPrepagoConTarjeta from "./ModalPrepagoConTarjeta";
import ModalError from "./ModalError";
import Loading from "../../General/Loading";
import {
  ConsultarBilletera_Info,
  ConsultarBilletera_Respuesta,
  consultarBilletera_Parametros,
  ConsultarBilletera_Input,
} from "../../Commons/Services/GwConsultarBilleteraEBF";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import {
  ConsultarSaldosCorrientes_Respuesta,
  ConsultarSaldosCorrientes_Parametros,
  ConsultarSaldosCorrientes_Entrada,
  builtConsultarSaldosCorrientesInput,
} from "../../Commons/Services/ConsultarSaldosCorrientesRest";
import { getAccountNumberMobile } from "../../Utils/RealizaPagosUtils";
import { determinaMoneda } from "../../Utils/Monedas";

const SaldosPendientes = ({ tipoPago, origen, banderaCelular }: any) => {
  const [modalPospagoConTarjetaShow, setModalPospagoConTarjetaShow] =
    useState(false);
  const [modalConfirmadoShow, setModalConfirmadoShow] = useState(false);
  const [saldoAPagar, setSaldoApagar] = useState("");
  const [modalPrepagoConTarjetaShow, setModalPrepagoConTarjetaShow] =
    useState(false);
  const [modalErrorShow, setModalErrorShow] = useState(false);
  const [cuenta, setCuenta] = useState(sessionStorage.getItem("cuenta"));
  const [tipoCliente, setTipoCliente] = useState(sessionStorage.getItem("tipoCliente"));
  const [fechaLimite, setFechaLimite] = useState("");
  const [allMyBines, setAllMyBines] = useState<ConsultarBilletera_Info[]>([]);
  const [loading, isLoading] = useState(false);

  const [mobileAccount, setMobileAccount] = useState("");

  const [mensaje4Customer, setMensaje4Customer] = useState("");
  const [moneda, setMoneda] = useState(determinaMoneda(sessionStorage.getItem("pais")!,sessionStorage.getItem("flujos")!));

  const saldos = [
    { titulo: "Tu saldo es:", saldo: 580, fechaLimite: "10/02/2023" },
  ];

  useEffect(() => {
    getCuentaOrigen(origen, banderaCelular);
    executeConsultWallet(origen, banderaCelular);
    obtieneSaldoFecha(origen, banderaCelular);
  }, []);

  const getCuentaOrigen = async (param1: string, param2: boolean) => {
    if (param1 === "SkyCelular" && param2) {
      let res: any = await getAccountNumberMobile(
        `${sessionStorage.getItem("Usuario")}`,
        `${sessionStorage.getItem("cuenta")}`
      );

      sessionStorage.setItem("cuentaMobile", res);
    }
  };

  const executeConsultWallet = async (param1: string, param2: boolean) => {
    //----------------------------------------------------------------------------------------------------------------------------
    try {
      const ConsultarBilleteraDO: ConsultarBilletera_Input = {
        NumeroCuenta:
          param1 === "SkyCelular"
            ? `${sessionStorage.getItem("cuentaMobile")}`
            : `${sessionStorage.getItem("cuenta")}`,
      };
      let par = consultarBilletera_Parametros(ConsultarBilleteraDO);
      let ConsultarBilleteraRespuesta: ConsultarBilletera_Respuesta =
        await ConsultaWS(par);
      if (
        ConsultarBilleteraRespuesta.EBMHeaderResponse &&
        ConsultarBilleteraRespuesta.EBMHeaderResponse.ErrorNegocio
          .CodigoError == "0" &&
        ConsultarBilleteraRespuesta.EBMHeaderResponse.ErrorTecnico.code === "ok"
      ) {
        if (
          typeof ConsultarBilleteraRespuesta.ConsultarBilleteraListInput !=
          "undefined"
        ) {
          setAllMyBines(
            ConsultarBilleteraRespuesta.ConsultarBilleteraListInput
          );
        } else {
          setAllMyBines([]);
        }
      } else {
        console.error(ConsultarBilleteraRespuesta.EBMHeaderResponse);
      }
    } catch (error) {
      console.error(error);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const hideModalPospagoConTarjeta = (respuesta: any, mensaje: any) => {
    setModalPospagoConTarjetaShow(false);
    setMensaje4Customer(mensaje);
    if (respuesta) {
      if (respuesta.action === "error") {
        setModalErrorShow(true);
        setModalConfirmadoShow(false);
      } else if (respuesta.action === "terminar") {
        setModalConfirmadoShow(true);
        setModalErrorShow(false);

        obtieneSaldoFecha(origen, banderaCelular);
      }
    }
  };

  const hideModalPrepagoConTarjeta = (respuesta: any) => {
    setModalPrepagoConTarjetaShow(false);

    if (respuesta) {
      if (respuesta.action === "error") {
        setModalErrorShow(true);
      } else if (respuesta.action === "terminar") {
        setModalConfirmadoShow(true);
        obtieneSaldoFecha(origen, banderaCelular);
      }
    }
  };

  const showModalPospago = (saldo: any) => {
    if (tipoPago === "POS") {
      setModalPospagoConTarjetaShow(true);
    } else {
      setModalPrepagoConTarjetaShow(true);
    }
  };

  const hideModalError = (respuesta: any) => {
    if (respuesta) {
      if (respuesta.action === "reintentar") {
        showModalPospago(0);
      }
    }

    setModalErrorShow(false);
  };

  const obtieneSaldoFecha = async (param1: string, param2: boolean) => {
    try {
      isLoading(true);
      //----------------------------------------------------------------------------------------------------------------------------
      const ConsultarSaldosCorrientesDO: ConsultarSaldosCorrientes_Entrada =
        builtConsultarSaldosCorrientesInput(
          param1 === "SkyCelular"
            ? `${sessionStorage.getItem("cuentaMobile")}`
            : `${sessionStorage.getItem("cuenta")}`!
        );
      let par = ConsultarSaldosCorrientes_Parametros(
        ConsultarSaldosCorrientesDO
      );
      let ConsultarSaldosCorrientesRespuesta: ConsultarSaldosCorrientes_Respuesta =
        await ConsultaWS(par);

      if (
        ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse &&
        ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse.ErrorNegocio
          .Estado == "ok" &&
        ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse.ErrorTecnico
          .code === "ok"
      ) {
        let fecha =
          ConsultarSaldosCorrientesRespuesta.SaldosPorFacturarEBO
            .FechaProximoCorte;
        let saldo = obtenerSaldo(ConsultarSaldosCorrientesRespuesta); //ConsultarSaldosCorrientesRespuesta.SaldosPorFacturarEBO.SaldoTotalMasCargosPorFacturar;

        //let saldoFormato = parseInt(saldo);
        //setSaldoApagar(new Intl.NumberFormat().format(saldoFormato));
        setSaldoApagar(saldo);
        if (fecha !== null) {
          let arFecha:string[] = fecha.substring(0, 10).split("-");  
          setFechaLimite(arFecha[2] + "/" + arFecha[1] + "/" + arFecha[0]);
        }else{
          setFechaLimite("00/00/0000");
        }
        
        
        isLoading(false);
      } else {
        console.error(ConsultarSaldosCorrientesRespuesta.EBMHeaderResponse);
        isLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const obtenerSaldo = (
    p_ConsultarSaldosCorrientesRespuesta: ConsultarSaldosCorrientes_Respuesta
  ) => {
    if (
      p_ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
        .FechaPagoOportuno != null &&
      p_ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
        .FechaPagoOportuno != ""
    ) {
      return p_ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
        .SaldoTotalPagoOportuno;
    } else {
      return p_ConsultarSaldosCorrientesRespuesta.SaldosCorrientesEBO
        .SaldoTotal;
    }
  };

  return (
    <>
      <Container fluid className={styles["p-50"]}>
        <Loading isLoading={loading} />
        <Row>
          <Col>
            <h1 className={styles["fontTitleSpectrum"]}>
              {tipoCliente === "POS"?
              <span className="textoSpectrum">Pagar</span>
              :
              <span className="textoSpectrum">Recargar</span>
              }
            </h1>
          </Col>
        </Row>
        <Row>
          <Col
            style={{ paddingBottom: "20px" }}
            className={styles["fontSizeAddCard"]}
          >
            <span>
              Verifica tu saldo y realiza tu pago con tu método
              favorito.{" "}
            </span>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 11 }} xl={{ span: 11 }}>
            <Container fluid>
              <Row>
                {saldos.map((saldo, index) => {
                  return (
                    <Col
                      className={styles["pb-20"]}
                      xs={{ span: 12 }}
                      md={{ span: 12 }}
                      lg={{ span: 6 }}
                      xl={{ span: 4 }}
                      xxl={{ span: 3 }}
                      key={"col-saldo-" + index}
                    >
                      <Card className={styles["card"]}>
                        <Card.Body className={styles["centerLogoCreditCard2"]}>
                          <span
                            className={
                              styles["fontCreditCardTitle"] + " gris-oscuro"
                            }
                            style={{ paddingBottom: "10px" }}
                          >
                            {parseFloat(saldoAPagar) < 0 ? ("Tu saldo es:"):("Tu saldo es:")}
                          </span>
                          <span
                            className={styles["fontPrecioSaldo"]}
                            style={{ paddingBottom: "10px" }}
                          >
                            {parseFloat(saldoAPagar) < 0 ? (`-$${parseFloat(saldoAPagar)*-1}${' '}${moneda}` ):(`$${saldoAPagar}${' '}${moneda}`)}
                          </span>
                          <span
                            className={
                              styles["fontSizeAddCard"] + " gris-oscuro"
                            }
                            style={{ paddingBottom: "10px" }}
                          >
                            {"Antes del " + fechaLimite}
                          </span>
                          <Button
                            className={styles["buttonBlueContinue"]}
                            onClick={() => showModalPospago(saldo)}
                          >
                            {sessionStorage.getItem("tipoCliente") === "POS"
                              ? "Pagar con tarjeta"
                              : "Recargar con tarjeta"}
                          </Button>
                          <div style={{ paddingBottom: "10px" }}></div>
                          <Button
                            className={styles["buttonWhite"]}
                            href="/pagos/metodospago"
                          >
                            {sessionStorage.getItem("tipoCliente") === "POS"
                              ? "Otros métodos de pago"
                              : "Otros métodos de recarga"}
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <ModalPospagoConTarjeta
        show={modalPospagoConTarjetaShow}
        onHide={(resp: any, mensaje: any) =>
          hideModalPospagoConTarjeta(resp, mensaje)
        }
        allItCards={allMyBines}
        saldoAPagar={saldoAPagar}
        fechaLimite={fechaLimite}
        origen={origen}
      />
      <ModalConfirmado
        show={modalConfirmadoShow}
        title={"¡Gracias!"}
        subtitle={mensaje4Customer}
        msgButon="Volver a inicio"
        onHide={() => {
          setModalConfirmadoShow(false);
           window.location.reload();
        }}
      />
      <ModalPrepagoConTarjeta
        show={modalPrepagoConTarjetaShow}
        onHide={(resp: any) => hideModalPrepagoConTarjeta(resp)}
        allItCards={allMyBines}
        saldoAPagar={saldoAPagar}
        fechaLimite={fechaLimite}
        origen={origen}
      />

      <ModalError
        subtitle={mensaje4Customer}
        show={modalErrorShow}
        onHide={(resp: any) => hideModalError(resp)}
      />
    </>
  );
};

export default SaldosPendientes;
