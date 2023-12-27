import React, { useContext, useState } from "react";
import styles from "./TabsAdultosCarta.module.css";
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
  Card,
  Collapse,
} from "react-bootstrap";
import { BannerTemporadasPPE2 } from "../../PagoPorEvento/Contratar/BannerTemporadasPPE/BannerTemporadasPPE2";
import CanalesCarta from "../CarteleraCarta/CanalesCarta";
import CanalesAdultos from "../CarteleraAdultos/CanalesAdultos";
import { FiChevronDown } from "react-icons/fi";
import adulto1 from "../../assets/img/Carta/Adulto1.png";
import adulto2 from "../../assets/img/Carta/Adulto2.png";
import adulto3 from "../../assets/img/Carta/Adulto3.png";
import flecha from "../../../src/assets/img/Iconos/flechaAbajo.svg";
import ContextFlujos from "../../Context/ContextFlujos";

const TabsAdultosCarta = (props: any) => {
  
  const {
    muestra1,
    indice1,
    arrayPeliculas1,
    arrayDeportes1,
    arrayAdultos1,
    arrayStreaming1,
    origen1,
  }: any = { ...props };

  const [active, setActive] = useState("peliculas");
  const [isOpenC, setIsOpenC] = useState(false);
  const [isOpenA, setIsOpenA] = useState(false);
  const [tipoCliente, setTipoCliente] = useState(
    sessionStorage.getItem("tipoCliente")
  ); //POS o PRE
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 576;
  //canales adultos

  function handleClick(key: string) {
    setActive(key);
  }

  const aperturaAdultos = () => {
    setIsOpenA(!isOpenA);
    isOpenC === true ? setIsOpenC(false) : setIsOpenC(false);
  };

  const { pais } = useContext(ContextFlujos) as any;

  return (
    <>
      <Container className={styles.contenedor} fluid>
        <div id="bigUpper" className="d-none d-xl-block d-lg-block ">
          <Row className={styles["headerRow"]}>
            <Col>
              <p className={styles["titulo"]}>
                <span className={styles["spectrum"]}>Más contenido</span>
              </p>
              <p className={styles["subtitle"]}>
                Complementa tu entretenimiento
              </p>
            </Col>
            <BannerTemporadasPPE2 />
          </Row>
        </div>
        <div id="smallUpper" className="d-lg-none d-xl-none">
          <Row className={styles["headerRowSmall1"]}>
            <Col>
              <p className={styles["titulo"]}>
                <span className={styles["spectrum"]}>Más contenido</span>
              </p>
              <p className={styles["subtitle"]}>
                Complementa tu entretenimiento
              </p>
            </Col>
            <BannerTemporadasPPE2 />
          </Row>
        </div>
      </Container>

      <Container className={styles.contenedorInferior}>
        <div id="big" className="d-none d-xl-block d-lg-block ">
          <Row>
            <Col className={styles["tabContainer"]}>
              <Tabs
                id="videoTab"
                className={styles["divTabs"]}
                onSelect={(key) => handleClick(key!)}
                defaultActiveKey={"peliculas"}
              >
                <Tab
                  tabClassName={
                    active === "peliculas"
                      ? styles["divTabsActive"] + " " + styles["tabVideo"]
                      : styles["tabVideo"]
                  }
                  eventKey={"peliculas"}
                  title={"Peliculas"}
                  key={"peliculas"}
                >
                  <CanalesCarta
                    arrayCanal2={arrayPeliculas1}
                    indice2={indice1}
                    muestra2={muestra1}
                    origen2={origen1}
                    nombreorigen={"peliculas"}
                  />
                 
                </Tab>
                <Tab
                  tabClassName={
                    active === "deportes"
                      ? styles["divTabsActive"] + " " + styles["tabVideo"]
                      : styles["tabVideo"]
                  }
                  eventKey={"deportes"}
                  title={"Deportes"}
                  key={"deportes"}

                >
                  <CanalesCarta
                    arrayCanal2={arrayDeportes1}
                    indice2={indice1}
                    muestra2={muestra1}
                    origen2={origen1}
                    nombreorigen={"deportes"}
                  />
                </Tab>
                <Tab
                  tabClassName={
                    active === "adultos"
                      ? styles["divTabsActive"] + " " + styles["tabVideo"]
                      : styles["tabVideo"]
                  }
                  eventKey={"adultos"}
                  title={"Adultos"}
                  key={"adultos"}
                >
                  <CanalesCarta
                    arrayCanal2={arrayAdultos1}
                    indice2={indice1}
                    muestra2={muestra1}
                    origen2={origen1}
                    nombreorigen={"adultos"}
                  />
                </Tab>

                {tipoCliente == "POS" && arrayStreaming1.length > 0 ? (
                  <Tab
                    tabClassName={
                      active === "streaming"
                        ? styles["divTabsActive"] + " " + styles["tabVideo"]
                        : styles["tabVideo"]
                    }
                    eventKey={"streaming"}
                    title={"Streaming"}
                    key={"streaming"}
                  >
                    <CanalesCarta
                      arrayCanal2={arrayStreaming1}
                      indice2={indice1}
                      muestra2={muestra1}
                      origen2={origen1}
                    nombreorigen={"streaming"}
                    />
                  </Tab>
                ) : (
                  ""
                )}
              </Tabs>
            </Col>
          </Row>
        </div>

        {/***************************** 
          inicia seccion para responsivo 
          *******************************/}
        <div id="small" className="d-lg-none d-xl-none">
          <Row>
            <Col className={styles["subHeaderTextSmallContainer"]}>
              <p className={styles["subHeaderTextSmall"]}>
                <b>
                  Disfruta de las opciones que tenemos para ti con cargo extra.
                </b>
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <CanalesCarta
                arrayCanal2={arrayPeliculas1}
                indice2={indice1}
                muestra2={muestra1}
                origen2={origen1}
                    nombreorigen={"peliculas"}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <CanalesCarta
                arrayCanal2={arrayDeportes1}
                indice2={indice1}
                muestra2={muestra1}
                origen2={origen1}
                    nombreorigen={"deportes"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CanalesCarta
                arrayCanal2={arrayAdultos1}
                indice2={indice1}
                muestra2={muestra1}
                origen2={origen1}
                    nombreorigen={"adultos"}
              />
            </Col>
          </Row>
          {tipoCliente == "POS" && arrayStreaming1.length > 0 && pais === "MEX"? (
            <Row>
              <Col>
                <CanalesCarta
                  arrayCanal2={arrayStreaming1}
                  indice2={indice1}
                  muestra2={muestra1}
                  origen2={origen1}
                    nombreorigen={"streaming"}
                />
              </Col>
            </Row>
          ) : (
            ""
          )}
        </div>
      </Container>
    </>
  );
};

export default TabsAdultosCarta;
