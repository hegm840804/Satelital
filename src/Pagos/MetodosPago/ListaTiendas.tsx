import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./metodos-pago.module.css";
import React, { useEffect, useState } from "react";
import cashi from '../../../src/assets/img/bancosytiendas/lg-cashi@3x.png';
import fresco from '../../../src/assets/img/bancosytiendas/lg-fresko2@3x.png';
import chedraui from '../../../src/assets/img/bancosytiendas/logo-chedraui@3x.png';
import telecom from '../../../src/assets/img/bancosytiendas/logo-financiera-telecomm@3x.png';
import oxxo from '../../../src/assets/img/bancosytiendas/oxxo_logo@3x.png';
import seven from '../../../src/assets/img/bancosytiendas/sevenE_logo@3x.png';
import soriana from '../../../src/assets/img/bancosytiendas/soriana_logo@3x.png';
import Loading from '../../General/Loading';

function ListaTiendas(props: any) {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const tiendas = [
    {
      nombre: "7+eleven",
      info: "info Tienda",
      imagen: seven,
    },
    {
      nombre: "cashi",
      info: "info Tienda",
      imagen: cashi,

    },
    {
      nombre: "fresko",
      info: "info Tienda",
      imagen: fresco,

    },
    {
      nombre: "chedraui",
      info: "info Tienda",
      imagen: chedraui,

    },
    {
      nombre: "telecom",
      info: "info Tienda",
      imagen: telecom,
    },
    {
      nombre: "oxxo",
      info: "info Tienda",
      imagen: oxxo,
    },

    {
      nombre: "soriana",
      info: "info Tienda",
      imagen: soriana,
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


  function abreMaps(entidad: string) {

    window.open("Https://www.google.com/maps/search/" + entidad + "/@" + lat + "," + lng + ",14.0z?entry=ttu", '_blank');
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <div id="big" className="d-none d-xl-block d-lg-block ">
        <Loading isLoading={loading} />
        <Container fluid className={styles["containerTiendas"]}>
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

                <span className={styles["metodospago"]}>
                  <strong>Volver a todos los métodos de pago</strong>
                </span>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className={styles["fontTitleSpectrum"]}>
                <span className="textoSpectrum">Tiendas</span>
              </h3>
            </Col>
          </Row>
          <Row>
            <Col className={styles["infoTienda"]} md={{ span: 11 }}>
              <p className={styles["pagotiendas"]}>
                El pago puede tardar hasta 24 horas hábiles en verse reflejado, esto depende de cada establecimiento y sus sistemas. Una vez reflejado el pago, se generará la recarga.
              </p>

              <p className={styles["pagotiendas"]}>
                Nota importante: Algunos establecimientos cobran comisión. Verifícala para que puedas realizar el pago.
              </p>
            </Col>
          </Row>
          <Row >
            <Col xs={{ span: 12 }} md={{ span: 11 }} xl={{ span: 12 }} style={{ padding: "25px 25px 25px 0" }}>
              <Container fluid >
                <Row className={styles["micontenerdor2"]}>
                  {tiendas.map((tienda, index) => {
                    return (
                      <Col
                        xs={{ span: 12 }}
                        lg={{ span: 4 }}
                        key={"col-saldo-" + index}
                        className={styles["pb-calc"]}
                      >
                        <Card className={styles["cardSizeTienda"]} onClick={() => abreMaps(tienda.nombre)}>
                          <img src={tienda.imagen} className={styles.imagen} />
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>

      <div id="small" className="d-lg-none d-xl-none">
        <Loading isLoading={loading} />
        <Container className={styles["containerTiendasSmall"]}>
          <Row>
            <Col className={styles["colVolverTiendasSmall"]}>
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

                <span className={styles["metodospago"]}>
                  <strong>Volver a todos los métodos de pago</strong>
                </span>
              </a>
            </Col>
          </Row>
          <Row>
            <Col className={styles["colInfoTiendasSmall"]}>
              <h3 className={styles["fontTitleSpectrum"]}>
                <span className="textoSpectrum">Tiendas</span>
              </h3>
            </Col>
          </Row>
          <Row className={styles["rowInfoTiendasSmall"]}>
            <Col className={styles["colInfoTiendasSmall"]}>
              <p className={styles["pagotiendas"]}>
                El pago puede tardar hasta 24 horas hábiles en verse reflejado, esto depende de cada establecimiento y sus sistemas. Una vez reflejado el pago, se generará la recarga.
              </p>

              <p className={styles["pagotiendas"]}>
                Nota importante: Algunos establecimientos cobran comisión. Verifícala para que puedas realizar el pago.
              </p>
            </Col>
          </Row>
          <Row >

            {tiendas.map((tienda, index) => {
              return (
                <Col key={"col-saldo-" + index} className={styles["colCardSmall"]} >
                  <Card className={styles["cardSizeTiendaSmall"]} onClick={() => abreMaps(tienda.nombre)}>
                    <img src={tienda.imagen} className={styles.imagen} />
                  </Card>
                </Col>
              );
            })}

          </Row>
        </Container>
      </div>


    </>
  );
}

export default ListaTiendas;
