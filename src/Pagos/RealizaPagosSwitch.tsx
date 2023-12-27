import { useState, useEffect } from "react";
import MisTarjetas from "../Pagos/Paquetes/MisTarjetas";
import SaldosPendientes from "../Pagos/Paquetes/SaldosPendientes";
import HistorialPagos from "../Pagos/Historial/HistorialPagos";
import styles from "./RealizarPagoSwitch.module.css";
import { Col, Container, Row, Stack, Tab, Tabs } from "react-bootstrap";

const RealizaPagosSwitch = () => {
  const [tipoCliente, setTipoCliente] = useState(
    sessionStorage.getItem("tipoCliente")
  );
  const [active, setActive] = useState("video");

  const [localFlagSkyCelular, setlocalFlagSkyCelular] = useState(false);
  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));
  function handleClick(key: string) {
    setActive(key);
  }

  //

  useEffect(() => {
    //setlocalFlagSkyCelular(true);
    setlocalFlagSkyCelular(
      `${sessionStorage.getItem("flujos")}`.includes("SkyCelular")
    );
  }, []);

  const builtComponenetToRender = (param1: boolean) => {
    if (param1) {
      return (
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
            title={"Sky"}
            key={"video"}
          >
            <SaldosPendientes
              banderaCelular={localFlagSkyCelular}
              origen={"SkySatelital"}
              tipoPago={tipoCliente}
            />
            <MisTarjetas origen={"SkySatelital"} />
            {flujo !== "Sky+" ? (<HistorialPagos origen={"SkySatelital"} />) : ("")}
            
          </Tab>
          <Tab
            tabClassName={
              active === "internet"
                ? styles["divTabsActive"] + " " + styles["tabInternet"]
                : styles["tabInternet"]
            }
            eventKey={"internet"}
            title={"Sky celular"}
            key={"internet"}
          >
            <SaldosPendientes
              banderaCelular={localFlagSkyCelular}
              origen={"SkyCelular"}
              tipoPago={tipoCliente}
            />
            <MisTarjetas origen={"SkyCelular"} />
          </Tab>
        </Tabs>
      );
    } else {
      return (
        <>
          <SaldosPendientes
            banderaCelular={localFlagSkyCelular}
            origen={"SkySatelital"}
            tipoPago={tipoCliente}
          />
          <MisTarjetas origen={"SkySatelital"} />
          {flujo !== "Sky+" ? (<HistorialPagos origen={"SkySatelital"} />) : ("")}
        </>
      );
    }
  };

  return (
    <>
      <div id="big" className="d-none d-xl-block d-lg-block ">
        <Row>
          <Col className={styles["tabContainer"]}>
            {builtComponenetToRender(localFlagSkyCelular)}
          </Col>
        </Row>
      </div>

      {/*************************
      Inicia seccion responsiva
      ***************************/}

      <div id="small" className="d-lg-none d-xl-none">
        <Row>
          <Row>
            <Col className={styles["tabContainer"]}>
              {builtComponenetToRender(localFlagSkyCelular)}
            </Col>
          </Row>
        </Row>
      </div>
    </>
  );
};

export default RealizaPagosSwitch;
