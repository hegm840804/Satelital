import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./metodos-pago.module.css";
import React, { useEffect, useState } from "react";
import azteca from '../../../src/assets/img/bancosytiendas/BA_logo@3x.png';
import copel from '../../../src/assets/img/bancosytiendas/BanCoppel_logo@3x.png';
import banorte from '../../../src/assets/img/bancosytiendas/Banorte_logo@3x.png';
import hsbc from '../../../src/assets/img/bancosytiendas/hsbc_logo@3x.png';
import bbva from '../../../src/assets/img/bancosytiendas/lg-bbva26@3x.png';
import scotia from '../../../src/assets/img/bancosytiendas/scotia.png';
import Loading from '../../General/Loading';

function ListaBancos(props:any) {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const bancos = [
    {
      nombre: "BANCO AZTECA",
      convenio: "00 00 00",
      referencia: "000 000 000",
      imagen:azteca,
    },
    {
      nombre: "BANCOPEL",
      convenio: "00 00 00",
      referencia: "000 000 000",
      imagen:copel,
    },
    {
      nombre: "BANORTE",
      convenio: "00 00 00",
      referencia: "000 000 000",
      imagen:banorte,
    },
    {
      nombre: "BBVA",
      convenio: "00 00 00",
      referencia: "000 000 000",
      imagen:bbva,
    },
    {
      nombre: "HSBC",
      convenio: "00 00 00",
      referencia: "000 000 000",
      imagen:hsbc,
    },
    {
      nombre: "SCOTIABANK",
      convenio: "00 00 00",
      referencia: "000 000 000",
      imagen:scotia,
    },

  ];

  const getLocation = () => {
    isLoading(true);
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
      isLoading(false);
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus("");
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        isLoading(false);
      }, () => {
        setStatus('Unable to retrieve your location');
        isLoading(false);
      });
    }
  }


  function abreMaps(entidad:string ){
    
    window.open("Https://www.google.com/maps/search/"+ entidad+ "/@" + lat + ","+lng + ",14.0z?entry=ttu", '_blank');
  }

  useEffect(() => {
    getLocation();
  }, []);    


  return (
    <>
      <Loading isLoading={loading} />
      <Container fluid className={styles["contenedor"]}>
        <Row>
          <Col style={{ paddingBottom: "20px", marginTop:"-35px" }}>
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
                  fill="#000FBE" />
              </svg>

              <span className={styles["metodospago"]}>
                <strong>{sessionStorage.getItem("tipoCliente") === "POS" ? "Volver a todos los métodos de pago":"Volver a todos los métodos de recargas"}</strong>
              </span>
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className={styles["fontTitleSpectrum"]}>
              <span className="textoSpectrum">Bancos</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col style={{ paddingBottom: "20px" }}>
            <ol className={styles["lista"]}>
              <li>
                <span  className={styles["pagotiendas"]}> Proporciona al cajero su número de cuenta SKY (cifra de 12 dígitos que inicia con 401 o 501)  </span>
              </li>
              <li>
                <span  className={styles["pagotiendas"]}>{sessionStorage.getItem("tipoCliente") === "POS" ? "Indica el monto a pagar.":"Indica el monto a recargar."}</span>
              </li>
            </ol>

           

          </Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 12 }}
            md={{ span: 11 }}
            xl={{ span: 12 }}
            className={styles["separacionCards"]}
          >

              <Row>
                {bancos.map((banco, index) => {
                  return (
                    <Col
                      xs={{ span: 12 }}
                      lg={{ span: 4 }}
                      key={"col-saldo-" + index}
                      className={styles["pb-calc"]}
                    >
                      <Card className={styles["cardSize"]}>
                        <Card.Body className={styles["startContentCard"]} onClick={() => abreMaps(banco.nombre)}>
                          <img src={banco.imagen} className={styles.imagen} />
                          <span
                            className={styles["fontTitleCardBancos"] + " gris-oscuro"}
                          >
                          </span>
                          <span
                            className={styles["fontSubtitleCard"] + " gris-oscuro"}
                          >
                            {/* convenio: {banco.convenio} */}
                          </span>
                          <span
                            className={styles["fontSubtitleCard"] + " gris-oscuro"}
                          >
                            {/* referencia: {banco.referencia} */}
                          </span>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>

          </Col>
        </Row>
      </Container></>
    
  );
}

export default ListaBancos;
