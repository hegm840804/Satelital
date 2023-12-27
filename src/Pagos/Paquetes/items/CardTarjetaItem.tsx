import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./CardTarjetaItem.module.css";
import editButton from "../../../assets/img/Pagos/editButton.png";
import pagoRecurrenteButton from "../../../assets/img/Pagos/pagoRecurrenteButton.png";
import visaLogo from "../../../assets/img/Pagos/visaLogo.png";
import masterLogo from "../../../assets/img/Pagos/mastercardLogo.png";
import americanExpressLogo from "../../../assets/img/Pagos/americanExpressLogo.png";

const CardTarjetaItem = (
  {
    onlyOneCard,
    showEditButton,
    setModalShow,
    setTarjetaSeleccionada,
    setModalPagoRecurrenteShow,
  }: any,
  props: any
) => {
  function showModal(datosTarjeta: any) {
    setTarjetaSeleccionada(datosTarjeta);
    setModalShow(true);
  }

  function getCardImagenLogo(param: string) {
    if (param === "visa") {
      return visaLogo;
    } else if (param === "american express") {
      return americanExpressLogo;
    } else if (param === "mastercard") {
      return masterLogo;
    }
  }

  function getCardCapitalName(param: string) {
    if (param === "visa") {
      return "VISA";
    } else if (param === "american express") {
      return "AMEX";
    } else if (param === "mastercard") {
      return "MCARD";
    } else {
      return "NA";
    }
  }

  function showModalPagorecurrente(datosTarjeta: any) {
    setTarjetaSeleccionada(datosTarjeta);
    setModalPagoRecurrenteShow(true);
  }

  return (
    <Container fluid {...props}>
      {showEditButton && showEditButton === "Y" && (
        <Row className={styles["buttonEdit"]}>
          <img
            src={editButton}
            className={styles["imgSize"] + " " + styles["imgLeft"]}
            onClick={() => showModal(onlyOneCard)}
          />
          <img
            src={pagoRecurrenteButton}
            className={styles["imgSize"] + " " + styles["imgLeft"]}
            onClick={() => showModalPagorecurrente(onlyOneCard)}
          />
        </Row>
      )}
      <Card className={styles["cardCredit"]}>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col
                xs={{ span: 4 }}
                md={{ span: 4 }}
                className={styles["centerLogoCreditCard"]}
                styles={{ padding: "0px" }}
              >
                <img
                  src={getCardImagenLogo(onlyOneCard.DescripcionTipoTarjeta)}
                  className={styles["imgSizeLogo"]}
                />
              </Col>
              <Col xs={{ span: 8 }} md={{ span: 8 }}>
                <Container fluid>
                  <Row>
                    <Col className={styles["colTarjeta"]}>
                      <span
                        className={
                          styles["fontCreditCardTitle"] + " gris-oscuro"
                        }
                      >
                        Terminada en{" "}
                        {onlyOneCard.MaskedPan.substring(
                          onlyOneCard.MaskedPan.length - 4
                        )}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles["colTarjeta"]}>
                      <span
                        className={
                          styles["fontCreditCardSubtitle"] + " gris-claro"
                        }
                      >
                        {getCardCapitalName(onlyOneCard.DescripcionTipoTarjeta)}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span
                        className={
                          styles["fontCreditCardSubtitle"] + " gris-claro"
                        }
                      >
                        Vencimiento: {onlyOneCard.FechaExp}
                      </span>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CardTarjetaItem;
