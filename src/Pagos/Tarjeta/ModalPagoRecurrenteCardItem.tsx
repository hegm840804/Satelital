import { Col, Form, Row } from "react-bootstrap";
import styles from "./datosUsuario.module.css";

const ModalPagoRecurrenteCardItem = ({ datosTarjeta}:any) => {

    function splitExpireDate(cadena:string,separador:string,posicion:number){
        const myArray = cadena.split(separador);
        return myArray[posicion];
      }


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
                value={splitExpireDate(datosTarjeta.FechaExp,'/',0)}
              />
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
                value={splitExpireDate(datosTarjeta.FechaExp,'/',1)}
              />
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
                value={datosTarjeta.CVV}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default ModalPagoRecurrenteCardItem