import styles from "./EstadoDeCuentaSwitch.module.css";
import { Col, Container, Row, Stack, Tab, Tabs } from "react-bootstrap"
import { EstadoDeCuentaInformacion } from "../../Pagos/EstadoCuenta/EstadoDeCuentaInformacion"
import { EstadosCuentaPasados } from "../../Pagos/EstadoCuenta/EstadosCuentaPasados"
import { useState } from "react";
import mailIcono from '../../assets/img/Iconos/iconoMail.png';
import descargarIcono from '../../assets/img/Iconos/iconoDescarga.png';


export const EstadoDeCuentaSwitch=()=>{
    const [active, setActive] = useState("video");

    function handleClick(key: string) {
        setActive(key);
    }


    return(
        <>
            <Container className={styles.contenedor}>
            <Row style={{ paddingBottom: '1.5vw' }}>
                    <Col xs={12} xl={8}>
                    <h1 className={styles["spectrum"]}>
                        <span className="textoSpectrum">Estado de cuenta</span>
                    </h1>
                    </Col>
                    <Col xs={12} xl={4}>
                        <Stack direction='horizontal' className={styles['alineaBotones']}>
                            <a  className={styles.enlace} ><img src={mailIcono} className={styles.icono} /><strong>Enviar por email</strong></a>
                            <a  className={styles.enlace + " " + styles.margenEnlace}><img src={descargarIcono} className={styles.icono} /><strong>Descargar</strong></a>
                        </Stack>
                    </Col>
                </Row>

                <div id="big" className="d-none d-xl-block d-lg-block ">
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
                            title={"A la carta"}
                            key={"video"}
                        >
                            <EstadoDeCuentaInformacion/>
                            <EstadosCuentaPasados/>

                        </Tab>
                        <Tab
                            tabClassName={
                            active === "internet"
                                ? styles["divTabsActive"] + " " + styles["tabInternet"]
                                : styles["tabInternet"]
                            }
                            eventKey={"internet"}
                            title={"Adultos"}
                            key={"internet"}
                        >
                            <EstadoDeCuentaInformacion/>
                            <EstadosCuentaPasados/>
                        </Tab>
                        </Tabs>
                    </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}