import { Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import styles from "./../datosUsuario.module.css";

const DatosTarjetaItem = ({
  datosTarjeta,
  newCVVCODE,
  newNumeroCuenta,
  newIdProspecto,
  newPaymentInstrument,
  newInstrumentId,
  newId,
  newANOCODE,
  newMESCODE,
}: any) => {
  const [localCVV, setLocalCVV] = useState("");
  const [localMes, setLocalMes] = useState("");
  const [localYear, setLocalYear] = useState("");

  const [cvvCaracter, setCvvCaracter] = useState(false);
  const [cvvLongAmex, setCvvLongAmex] = useState(false);
  const [cvvLong, setCvvLong] = useState(false);
  const [mesCaracter, setMesCaracter] = useState(false);
  const [anhoCaracter, setAnhoCaracter] = useState(false);

  var regEx = /^(?!\s)[A-Za-z0-9ñáéíóúÁÉÍÓÚ\s]+$/; //solo para letras, numeros y espacios
  var regExRFC = /^(?!\s)[A-Za-z0-9]+$/; //solo para letras, numeros sin espacios
  var regExDir = /^(?!\s)[A-Za-z0-9-.ñáéíóúÁÉÍÓÚ\s]+$/; //solo para letras, numeros espacios punto y guion
  var regExNum = /^(?!\s)[0-9]+$/; //solo numeros
  var regExLetras = /^(?!\s)[A-Za-zñáéíóúÁÉÍÓÚ\s]+$/; //solo para letras y espacios

  useEffect(() => {
    setLocalCVV(datosTarjeta.CVV);
    newCVVCODE(datosTarjeta.CVV);
    setLocalMes(splitExpireDate(datosTarjeta.FechaExp, "/", 0));

    newMESCODE(splitExpireDate(datosTarjeta.FechaExp, "/", 0));
    setLocalYear(splitExpireDate(datosTarjeta.FechaExp, "/", 1));
    newANOCODE(splitExpireDate(datosTarjeta.FechaExp, "/", 1));
  }, []);

  const valida = (p_nuevovalor: any, p_campo: string) => {
    switch (p_campo) {
      case "cvv":
        setLocalCVV(p_nuevovalor);
        if (datosTarjeta.TipoTarjeta === "003") {
          if (p_nuevovalor.length != 4) {
            setCvvLongAmex(true);
          } else {
            setCvvLongAmex(false);
          }
        } else {
          //VISA MASTER CARD
          if (p_nuevovalor.length != 3) {
            setCvvLong(true);
          } else {
            setCvvLong(false);
          }
        }
        regExNum.test(p_nuevovalor) === false
          ? setCvvCaracter(true)
          : setCvvCaracter(false);
        newCVVCODE(p_nuevovalor);
        break;

      case "mes":
        setLocalMes(p_nuevovalor);
        regExNum.test(p_nuevovalor) === false
          ? setMesCaracter(true)
          : setMesCaracter(false);

        newMESCODE(p_nuevovalor);
        break;

      case "anho":
        setLocalYear(p_nuevovalor);
        regExNum.test(p_nuevovalor) === false
          ? setAnhoCaracter(true)
          : setAnhoCaracter(false);

        newANOCODE(p_nuevovalor);
        break;

      default:
        break;
    }
  };

  function splitExpireDate(
    cadena: string,
    separador: string,
    posicion: number
  ) {
    const myArray = cadena.split(separador);
    return myArray[posicion];
  }

  const handleChangeCVV = (event: any) => {
    valida(event.target.value, "cvv");
    newNumeroCuenta(datosTarjeta.NumeroCuenta);
    newIdProspecto(datosTarjeta.IdProspecto);
    newPaymentInstrument(datosTarjeta.PaymentInstrument);
    newInstrumentId(datosTarjeta.InstrumentId);
    newId(datosTarjeta.Id);
  };

  const handleChangeMONTH = (event: any) => {
    valida(event.target.value, "mes");
    newNumeroCuenta(datosTarjeta.NumeroCuenta);
    newIdProspecto(datosTarjeta.IdProspecto);
    newPaymentInstrument(datosTarjeta.PaymentInstrument);
    newInstrumentId(datosTarjeta.InstrumentId);
    newId(datosTarjeta.Id);
  };

  const handleChangeYEAR = (event: any) => {
    valida(event.target.value, "anho");
    newNumeroCuenta(datosTarjeta.NumeroCuenta);
    newIdProspecto(datosTarjeta.IdProspecto);
    newPaymentInstrument(datosTarjeta.PaymentInstrument);
    newInstrumentId(datosTarjeta.InstrumentId);
    newId(datosTarjeta.Id);
  };

  return (
    <Form>
      <Form.Group className={styles["pb-row"]}>
        <Form.Label className={styles["font-size-label-form"] + " gris-oscuro"}>
          Nombre en la tarjeta
        </Form.Label>
        <Form.Control
          type="text"
          className={styles["styleInputText"]}
          placeholder="Nombre Apellido Apellido"
          value={datosTarjeta ? datosTarjeta.NombreTarjeta : ""}
        />
      </Form.Group>
      <Form.Group className={styles["pb-row"]}>
        <Form.Label className={styles["font-size-label-form"] + " gris-oscuro"}>
          Numero de tarjeta
        </Form.Label>
        <Form.Control
          className={styles["styleInputText"]}
          type="text"
          placeholder="0000 0000 0000 0000"
          value={datosTarjeta ? datosTarjeta.MaskedPan : ""}
        />
        <Row>
          <Col>
            <span className={styles["font-size-label-form"] + " gris-oscuro"}>
              Vencimiento
            </span>
          </Col>
        </Row>
        <Row className={styles["pb-row"]}>
          <Col>
            <Form.Group>
              <Form.Label
                className={styles["font-size-label-form"] + " gris-oscuro"}
              >
                Mes
              </Form.Label>
              <Form.Control
                className={styles["styleInputText"]}
                type="text"
                placeholder="00"
                pattern="[0-9]"
                inputMode="numeric"
                minLength={2}
                maxLength={2}
                value={localMes}
                onChange={handleChangeMONTH}
              />
              <span className={styles.etiqueta}>
                <span className={styles.asterisco}>
                  {mesCaracter === true ? "Sólo números" : ""}
                </span>
              </span>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label
                className={styles["font-size-label-form"] + " gris-oscuro"}
              >
                Año
              </Form.Label>
              <Form.Control
                className={styles["styleInputText"]}
                type="text"
                placeholder="0000"
                pattern="[0-9]"
                inputMode="numeric"
                minLength={4}
                maxLength={4}
                value={localYear}
                onChange={handleChangeYEAR}
              />
              <span className={styles.etiqueta}>
                <span className={styles.asterisco}>
                  {anhoCaracter === true ? "Sólo números" : ""}
                </span>
              </span>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label
                className={styles["font-size-label-form"] + " gris-oscuro"}
              >
                CVV
              </Form.Label>
              <Form.Control
                className={styles["styleInputText"]}
                type="password"
                placeholder="***"
                pattern="[0-9]"
                inputMode="numeric"
                minLength={3}
                maxLength={4}
                value={localCVV}
                onChange={handleChangeCVV}
              />
              <span className={styles.etiqueta}>
                <span className={styles.asterisco}>
                  {cvvLong === true
                    ? "La longitud del CVV debe de ser 3 digitos"
                    : cvvLongAmex === true
                    ? "La longitud del CVV para American Express son 4 digitos"
                    : ""}
                </span>
                <span className={styles.asterisco}>
                  {cvvCaracter === true ? "Sólo números" : ""}
                </span>
              </span>
            </Form.Group>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default DatosTarjetaItem;
