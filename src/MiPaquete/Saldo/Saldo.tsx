import React, { useEffect, useState } from "react";
import styles from "./Saldo.module.css";
import { Col, Row, Button, Container } from "react-bootstrap";
import { determinaMoneda } from "../../Utils/Monedas";

export const Saldo = () => {
  const [tipoCliente, setTipoCliente] = useState(
    sessionStorage.getItem("tipoCliente")
  );
  const [fechaFin, setFechaFin] = useState(sessionStorage.getItem("fechaFin"));
  //const [fechaFinRecarga, setFechaFinRecarga] = useState(sessionStorage.getItem("fechaFinRecarga"));
  const [saldo, setSaldo] = useState("");
  const [moneda, setMoneda] = useState(determinaMoneda(sessionStorage.getItem("pais")!,sessionStorage.getItem("flujos")!));

  const daFormatoSaldo = () => {
    let saldoSesion = sessionStorage.getItem("saldo");

    if (saldoSesion !== null) {

      let saldoFormato = parseInt(saldoSesion);
      //setSaldo(new Intl.NumberFormat().format(saldoFormato));
      setSaldo(new Intl.NumberFormat('es-MX').format(saldoFormato));
      
    } else {
      setSaldo("0");
    }
  };

  const daFormatoFecha = () => {
    if (fechaFin !== null) {
      let ar = fechaFin?.split("-");
      setFechaFin(ar[0]+"/"+ar[1]+"/"+ar[2]);
    }

  }

  useEffect(() => {
    daFormatoSaldo();
    daFormatoFecha();
  }, []);

  if (tipoCliente === "POS") {
    return (
      <>
        <Container fluid className={styles["container"]}>
          <Row className={styles["saldoRow"]}>
            <Col
              xs={12}
              sm={12}
              md={7}
              lg={7}
              xl={7}
              className={styles["saldoCol"]}
            >
              <span className={styles["tuSaldo"]}>
              {parseFloat(saldo) < 0 ? (<b>Tu saldo es:</b>):(<b>Tu saldo es:</b>)}
              {parseFloat(saldo) < 0 ? (<span className={styles["saldoText"]}> -${parseFloat(saldo)*-1}{' '}{moneda}</span>):(<span className={styles["saldoText"]}>$ {saldo}{' '}{moneda}</span>)}
                
              </span>
              <p className={styles["tuRecarga"]}>
                Tu pago vence antes del:{" "}
                <span className={styles["recargaText"]}>{fechaFin}</span>
              </p>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={5}
              lg={5}
              xl={5}
              className={styles["buttonCol"]}
            >
              <div className={styles.buttonDiv}>
                <Button
                  variant="primary"
                  type="submit"
                  className={styles["button"]}
                  href="/realizapagos"
                >
                  {sessionStorage.getItem("tipoCliente") === "POS" ? "Pagar con tarjeta":"Recarga con tarjeta"}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container fluid className={styles["container"]}>
          <Row className={styles["saldoRow"]}>
            <Col
              xs={12}
              sm={12}
              md={7}
              lg={7}
              xl={7}
              className={styles["saldoCol"]}
            >
              <span className={styles["tuSaldo"]}>
                Tu saldo es:{" "}
                <span className={styles["saldoText"]}>$ {saldo}{moneda}</span>
              </span>
              <p className={styles["tuRecarga"]}>
                Tu recarga vence el:{" "}
                <span className={styles["recargaText"]}>{fechaFin}</span>
              </p>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={5}
              lg={5}
              xl={5}
              className={styles["buttonCol"]}
            >
              <div className={styles.buttonDiv}>
                <Button
                  variant="primary"
                  type="submit"
                  className={styles["button"]}
                  href="/realizapagos"
                >
                  {sessionStorage.getItem("tipoCliente") === "POS" ? "Adelanta pagos":"Adelanta recargas"}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default Saldo;
