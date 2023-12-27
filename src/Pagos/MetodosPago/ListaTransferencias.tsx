import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./metodos-pago.module.css";
import React from "react";

function ListaTransferencias(props:any) {
  const transferencias = [
    {
      cbu: "0000000000000",
      alias: "ALIAS.ALIAS.ALIAS",
      noCuenta: "000-000000000-000",
      tipoCuenta: "Cuenta corriente",
    },
  ];
  return (
    <Container fluid style={{ padding: "50px" }}>
      <Row>
        <Col style={{ paddingBottom: "20px" }}>
          <a
            href="/pagos/metodospago"
            className={styles["fontLinkVolverMetodos"]}
          >
            <svg
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.86621 7.53332L0.799544 4.46666C0.732877 4.39999 0.685766 4.32777 0.658211 4.24999C0.630655 4.17221 0.616655 4.08888 0.616211 3.99999C0.616211 3.9111 0.630211 3.82777 0.658211 3.74999C0.686211 3.67221 0.733322 3.59999 0.799544 3.53332L3.86621 0.466658C3.98843 0.344436 4.14399 0.283325 4.33288 0.283325C4.52177 0.283325 4.67732 0.344436 4.79954 0.466658C4.92177 0.58888 4.98288 0.744436 4.98288 0.933325C4.98288 1.12221 4.92177 1.27777 4.79954 1.39999L2.19954 3.99999L4.79954 6.59999C4.92177 6.72221 4.98288 6.87777 4.98288 7.06666C4.98288 7.25555 4.92177 7.4111 4.79954 7.53332C4.67732 7.65555 4.52177 7.71666 4.33288 7.71666C4.14399 7.71666 3.98843 7.65555 3.86621 7.53332Z"
                fill="#000FBE"
              />
            </svg>

            <span style={{ paddingLeft: "10px" }}>
              Volver a todos los métodos de pago
            </span>
          </a>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className={styles["fontTitleSpectrum"]}>
            <span className="textoSpectrum">Transferencia bancaria</span>
          </h3>
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingBottom: "20px" }}>
          <span className={styles["fontSizeAddCard"] + " gris-oscuro"}>
          {sessionStorage.getItem("tipoCliente") === "POS" ? "Realiza tu pago por transferencia electrónica con la siguiente referencia.":"Realiza tu recarga por transferencia electrónica con la siguiente referencia."}
          </span>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 11 }} xl={{ span: 11 }} style={{ padding: "0px" }}>
          <Container fluid>
            {transferencias.map((transf, index) => {
              return (
                <Row>
                  <Col
                    md={{ span: 12 }}
                    key={"col-saldo-" + index}
                    className={styles["pb-calc"]}
                  >
                    <Card className={styles["cardSize"]}>
                      <Card.Body className={styles["startContentCard"]}>
                        <div className={styles["alignIconCopyText"]}>
                          <span
                            style={{ paddingRight: "15px" }}
                            className={
                              styles["fontTitleCardBancos"] + " gris-oscuro"
                            }
                          >
                            CBU: {transf.cbu}
                          </span>
                          <svg
                            onClick={() =>
                              navigator.clipboard.writeText(transf.cbu)
                            }
                            style={{ cursor: "pointer" }}
                            width="15"
                            height="17"
                            viewBox="0 0 15 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.16667 16.8333C1.70833 16.8333 1.31583 16.67 0.989168 16.3433C0.662501 16.0167 0.499446 15.6245 0.500001 15.1667V3.50001H2.16667V15.1667H11.3333V16.8333H2.16667ZM5.5 13.5C5.04167 13.5 4.64917 13.3367 4.3225 13.01C3.99583 12.6833 3.83278 12.2911 3.83333 11.8333V1.83334C3.83333 1.37501 3.99667 0.982506 4.32333 0.65584C4.65 0.329173 5.04222 0.166118 5.5 0.166673H13C13.4583 0.166673 13.8508 0.330007 14.1775 0.656673C14.5042 0.98334 14.6672 1.37556 14.6667 1.83334V11.8333C14.6667 12.2917 14.5033 12.6842 14.1767 13.0108C13.85 13.3375 13.4578 13.5006 13 13.5H5.5ZM5.5 11.8333H13V1.83334H5.5V11.8333Z"
                              fill="#989898"
                            />
                          </svg>
                        </div>
                        <div className={styles["alignIconCopyText"]}>
                          <span
                            style={{ paddingRight: "15px" }}
                            className={
                              styles["fontTitleCardBancos"] + " gris-oscuro"
                            }
                          >
                            Alias: {transf.alias}
                          </span>
                          <svg
                            onClick={() =>
                              navigator.clipboard.writeText(transf.alias)
                            }
                            style={{ cursor: "pointer" }}
                            width="15"
                            height="17"
                            viewBox="0 0 15 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.16667 16.8333C1.70833 16.8333 1.31583 16.67 0.989168 16.3433C0.662501 16.0167 0.499446 15.6245 0.500001 15.1667V3.50001H2.16667V15.1667H11.3333V16.8333H2.16667ZM5.5 13.5C5.04167 13.5 4.64917 13.3367 4.3225 13.01C3.99583 12.6833 3.83278 12.2911 3.83333 11.8333V1.83334C3.83333 1.37501 3.99667 0.982506 4.32333 0.65584C4.65 0.329173 5.04222 0.166118 5.5 0.166673H13C13.4583 0.166673 13.8508 0.330007 14.1775 0.656673C14.5042 0.98334 14.6672 1.37556 14.6667 1.83334V11.8333C14.6667 12.2917 14.5033 12.6842 14.1767 13.0108C13.85 13.3375 13.4578 13.5006 13 13.5H5.5ZM5.5 11.8333H13V1.83334H5.5V11.8333Z"
                              fill="#989898"
                            />
                          </svg>
                        </div>

                        <span
                          className={
                            styles["fontTitleCardBancos"] + " gris-oscuro"
                          }
                        >
                          Cuenta: {transf.noCuenta}
                        </span>
                        <span
                          className={
                            styles["fontTitleCardBancos"] + " gris-oscuro"
                          }
                        >
                          Tipo de cuenta: {transf.tipoCuenta}
                        </span>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              );
            })}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default ListaTransferencias;
