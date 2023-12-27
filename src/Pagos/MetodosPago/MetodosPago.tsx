import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./metodos-pago.module.css";
import { useContext, useEffect, useState } from "react";
import ContextFlujos from "../../Context/ContextFlujos";

function MetodosPago(props: any) {

  const [tipoCliente, setTipoCliente] = useState(sessionStorage.getItem("tipoCliente"));
  const { setSkyPlus, setSkyCelular, setPais } = useContext(ContextFlujos) as any;

  const metodos = [
    {
      nombre: "Bancos",
      icon: (
        <svg
          width="19"
          height="16"
          viewBox="0 0 19 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          
        >
          <path
            d="M2.48828 5H17.4883C17.7383 5 17.9883 4.78125 17.9883 4.5V3.375C17.9883 3.15625 17.832 2.96875 17.6445 2.90625L10.332 0.09375C10.207 0.03125 10.082 0 9.98828 0C9.86328 0 9.73828 0.03125 9.61328 0.09375L2.30078 2.90625C2.11328 2.96875 1.98828 3.15625 1.98828 3.375V4.5C1.98828 4.78125 2.20703 5 2.48828 5ZM9.98828 1.5625L15.082 3.5H4.86328L9.98828 1.5625ZM18.4883 14.5H17.9883V12.5C17.9883 11.9688 17.457 11.5 16.832 11.5H15.9883V6H14.4883V11.5H12.4883V6H10.9883V11.5H8.98828V6H7.48828V11.5H5.48828V6H3.98828V11.5H3.11328C2.48828 11.5 1.98828 11.9688 1.98828 12.5V14.5H1.48828C1.20703 14.5 0.988281 14.75 0.988281 15V15.5C0.988281 15.7812 1.20703 16 1.48828 16H18.4883C18.7383 16 18.9883 15.7812 18.9883 15.5V15C18.9883 14.75 18.7383 14.5 18.4883 14.5ZM16.4883 14.5H3.48828V13H16.4883V14.5Z"
            fill="#6E6E6E"
          />
        </svg>
      ),
      url: "/pagos/listabancos",
    },
    {
      nombre: "Tiendas",
      icon: (
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1107 3.71875L14.4293 0.46875C14.2741 0.1875 14.0154 0 13.7309 0H3.28034C2.99579 0 2.71125 0.1875 2.55604 0.46875L0.900517 3.71875C0.124489 5.1875 0.641841 7.1875 1.88349 7.8125V14.9062C1.88349 15.5312 2.24563 16 2.71125 16H14.2999C14.7397 16 15.1277 15.5312 15.1277 14.9062V7.8125C16.3693 7.1875 16.8608 5.1875 16.1107 3.71875ZM13.8861 14.5H3.12513V11.5H13.8861V14.5ZM13.8602 10H3.12513V8C3.74595 7.875 4.28917 7.5 4.67719 6.96875C5.1428 7.59375 5.81536 8 6.59139 8C7.34155 8 8.01411 7.59375 8.47973 6.96875C8.94534 7.59375 9.64377 8 10.3939 8C11.17 8 11.8425 7.59375 12.3081 6.96875C12.6961 7.5 13.2394 7.875 13.8602 8V10ZM15.1018 5.84375C15.0242 6.0625 14.8173 6.4375 14.4034 6.5C14.3517 6.5 14.2741 6.53125 14.2223 6.53125C13.8343 6.53125 13.498 6.3125 13.2394 5.96875L12.3081 4.71875L11.4028 5.96875C11.1441 6.3125 10.7819 6.5 10.3939 6.5C10.0318 6.5 9.66964 6.3125 9.41096 5.96875L8.50559 4.71875L7.57436 5.96875C7.31568 6.3125 6.95354 6.5 6.59139 6.5C6.20338 6.5 5.8671 6.3125 5.60842 5.96875L4.67719 4.71875L3.74595 5.96875C3.48728 6.3125 3.151 6.5 2.76298 6.5C2.71125 6.5 2.63365 6.5 2.58191 6.5C2.16803 6.4375 1.96109 6.0625 1.88349 5.84375C1.75415 5.5 1.70241 5 1.93522 4.53125L3.48728 1.5H13.498L15.0501 4.53125C15.2829 5 15.2312 5.5 15.1018 5.84375Z"
            fill="#6E6E6E"
          />
        </svg>
      ),
      url: "/pagos/listatiendas",
    },
    // {
    //   nombre: "Transferencias",
    //   icon: (
    //     <svg
    //       width="20"
    //       height="14"
    //       viewBox="0 0 20 14"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M10 4.03125C8.59375 4.03125 7.5 5.375 7.5 7.03125C7.5 8.71875 8.59375 10.0625 10 10.0625C11.375 10.0625 12.5 8.71875 12.5 7.03125C12.5 5.375 11.375 4.03125 10 4.03125ZM19.4062 0.71875C18.1875 0.21875 16.9688 0 15.75 0C11.9062 0 8.0625 1.96875 4.21875 1.96875C3.25 1.96875 2.28125 1.84375 1.3125 1.53125C1.21875 1.5 1.09375 1.46875 1 1.46875C0.46875 1.46875 0 1.90625 0 2.46875V12.4062C0 12.7812 0.21875 13.1562 0.5625 13.3125C1.78125 13.8125 3 14 4.21875 14C8.0625 14 11.9062 12.0625 15.75 12.0625C16.7188 12.0625 17.6875 12.1875 18.6562 12.5C18.75 12.5312 18.875 12.5312 18.9688 12.5312C19.5 12.5312 20 12.125 20 11.5625V1.625C20 1.25 19.75 0.875 19.4062 0.71875ZM18.5 9.09375C17.6562 9.1875 16.9688 9.8125 16.7812 10.625C16.4375 10.5938 16.125 10.5625 15.75 10.5625C13.6562 10.5625 11.5938 11.0938 9.625 11.5938C7.71875 12.0625 5.9375 12.5 4.21875 12.5C3.96875 12.5 3.71875 12.5 3.46875 12.5C3.4375 11.4062 2.5625 10.5625 1.5 10.5625V5.03125C2.46875 5.03125 3.25 4.34375 3.4375 3.40625C3.6875 3.4375 3.9375 3.46875 4.21875 3.46875C6.3125 3.46875 8.375 2.9375 10.3438 2.4375C12.25 1.96875 14.0312 1.5 15.75 1.5C16.0938 1.5 16.4062 1.53125 16.75 1.5625C16.7812 2.5625 17.5312 3.375 18.5 3.5V9.09375Z"
    //         fill="#6E6E6E"
    //       />
    //     </svg>
    //   ),
    //   url: "/pagos/listatransferencias",
    // },
  ];

  useEffect(() => {
    if (sessionStorage.getItem("flujos") === "Sky+") {
      setSkyPlus({ estado: false });
      setPais("MEX");
    }else{
      setPais(sessionStorage.getItem("pais"));
    }

    if (sessionStorage.getItem("flujos") === "DTH/SkyCelular" || sessionStorage.getItem("flujos") === "DTH/DTH/SkyCelular/Sky+") {
      setSkyCelular({ estado: true });
    }


  }, []);

  return (
    <Container fluid className={styles["contenedor"]}>
      <Row>
        <Col>
          <h3 className={styles["fontTitleSpectrum"]}>
            {tipoCliente === "POS" ?
              <span className="textoSpectrum">Métodos de pago</span>
              :
              <span className="textoSpectrum">Métodos de recarga</span>
            }

          </h3>
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingBottom: "20px" }} className={styles["fontSizeAddCard"]}>
          <span>
            Elige la forma de pago más cómoda para ti.
          </span>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 11 }} xl={{ span: 11 }} className={styles["colCard"]}>
          <Container fluid className={styles["containerCard"]}>
            <Row>
              {metodos.map((metodo, index) => {
                return (
                  <Col
                    md={{ span: 4 }}
                    key={"col-saldo-" + index}
                    className={styles["pb-calc"]}
                  >
                    <Card className={styles["cardSize2"]}>
                      <Card.Body className={styles["centerContentCard"]}>
                        <div id="big" className="d-none d-xl-block d-lg-block ">
                          <div  className={styles["orderMetodoPago"]} >
                            {metodo.icon}
                            <br />
                            <span>
                              <a
                                href={metodo.url}
                                style={{ paddingTop: "10px" }}
                                className={styles["orderMetodoPago"] +" "+styles["fontTitleCard"] + " gris-oscuro"}
                              >
                                {" "}
                                {metodo.nombre}
                              </a>
                            </span>
                          </div>
                        </div>

                        <div id="small" className="d-lg-none d-xl-none">
                          <Row>
                          <Col  className={styles["orderMetodoPago"]} >
                            <span>{metodo.icon}</span>
                          </Col>
                          <Col>
                            <span>
                              <a
                                href={metodo.url}
                                style={{ paddingTop: "10px" }}
                                className={styles["orderMetodoPago"] +" "+styles["fontTitleCard"] + " gris-oscuro"}
                              >
                                {metodo.nombre}
                              </a>
                            </span>
                          </Col>
                          </Row>
                        </div>                        
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
  );
}

export default MetodosPago;
