import styles from "./SolucionFallas.module.css";
import React, { useState } from "react";
import {
  Col,
  Row,
  Tabs,
  Tab,
  Container,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
  FormGroup,
} from "react-bootstrap";

const SolucionFallas = () => {
  const [showVide, setShowVideo] = useState(false);
  const [showInternet, setShowInternet] = useState(false);
  const [active, setActive] = useState("video");

  function handleClick(key: string) {
    setActive(key);
  }

  return (
    <>
      <Row className={styles["headerRow"]}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <span className={styles["spectrum"]}>Solución a fallas</span>
        </Col>
      </Row>
      <Row>
        <Col className={styles["tabContainer"]}>
          <Tabs
            id="videoTab"
            className={styles["divTabs"]}
            onSelect={(key) => handleClick(key!)}
          >
            <Tab
              tabClassName={
                active === "video"
                  ? styles["divTabsActive"] + " " + styles["tabVideo"]
                  : styles["tabVideo"]
              }
              eventKey={"video"}
              title={"Fallas de video"}
              key={"video"}
            >
              <Row className={styles["subheaderRow"]}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <span className={styles["title"]}>Falla de video</span>
                </Col>
              </Row>
              <Row className={styles["subheaderRowDesc"]}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <span className={styles["subtitle"]}>
                    Intenta las siguientes soluciones rápidas a los problemas
                    más comunes de tu equipo/servicio Sky.
                  </span>
                </Col>
              </Row>
              <Row
                className={
                  styles["subheaderRowDesc"] +
                  " " +
                  styles["subheaderRowDescSmall"]
                }
              >
                <Col
                  xs={12}
                  sm={12}
                  md={5}
                  lg={5}
                  xl={5}
                  className={styles["solutionContainer"]}
                >
                  <ul>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col className={styles["banner"]}>
                  <Row>
                    <Col className={styles["titleBanner"]}>
                      <span>Estamos para ayudarte</span>
                    </Col>
                  </Row>
                  <Row className={styles["subtitleBannerContainer"]}>
                    <Col className={styles["subtitleBanner"]}>
                      <span>
                        Si el problema persiste, comunícate con nosotros por Whatsapp:
                        <b>0000-0000</b>
                      </span>
                    </Col>
                  </Row>
                  <Row className={styles["buttonBannerContainer"]}>
                    <Col>
                      <Button href="https://wa.me/525551690592?text=Hola" variant="primary" type="submit" className={styles.buttonBanner}>
                        Abrir Whatsapp
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Tab>
            <Tab
              tabClassName={
                active === "internet"
                  ? styles["divTabsActive"] + " " + styles["tabInternet"]
                  : styles["tabInternet"]
              }
              eventKey={"internet"}
              title={"Falla de equipo de internet"}
              key={"internet"}
            >
              <Row className={styles["subheaderRow"]}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <span className={styles["title"]}>
                    Falla de equipo de internet
                  </span>
                </Col>
              </Row>
              <Row className={styles["subheaderRowDesc"]}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <span className={styles["subtitle"]}>
                    Intenta las siguientes soluciones rápidas a los problemas
                    más comunes de tu equipo/servicio Sky.
                  </span>
                </Col>
              </Row>
              <Row
                className={
                  styles["subheaderRowDesc"] +
                  " " +
                  styles["subheaderRowDescSmall"]
                }
              >
                <Col
                  xs={12}
                  sm={12}
                  md={5}
                  lg={5}
                  xl={5}
                  className={styles["solutionContainer"]}
                >
                  <ul>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                  </ul>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>

    </>
  );
};

export default SolucionFallas;
