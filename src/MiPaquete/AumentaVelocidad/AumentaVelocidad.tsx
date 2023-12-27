import React from "react";
import styles from "./AumentaVelocidad.module.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import Slider from "react-slick";
//import * as Slider from "react-slick";

const AumentaVelocidad = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Row className={styles["subheaderRow"]}>
        <Col>
          <p className={styles["title"]}>
            Aumenta tu velocidad por el tiempo que necesites
          </p>
        </Col>
      </Row>

      <Row className={styles["paqueteRowSlider"]}>
        <Slider {...settings}>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
            className={styles["colGrid"]}
          >
            <Card className={styles["paqueteCard"]}>
              <Card.Body className={styles["cardContainer"]}>
                <p className={styles["titleCard"]}>Paquete aceléralo</p>
                <p className={styles["priceCard"]}>Precio</p>
                <p className={styles["validCard"]}>Vigencia</p>
                <Button
                  href="/servicios/appsky"
                  variant="primary"
                  type="submit"
                  className={styles.button}
                >
                  Agregar
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
            className={styles["colGrid"]}
          >
            <Card className={styles["paqueteCard"]}>
              <Card.Body className={styles["cardContainer"]}>
                <p className={styles["titleCard"]}>Paquete aceléralo</p>
                <p className={styles["priceCard"]}>Precio</p>
                <p className={styles["validCard"]}>Vigencia</p>
                <Button
                  href="/servicios/appsky"
                  variant="primary"
                  type="submit"
                  className={styles.button}
                >
                  Agregar
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
            className={styles["colGrid"]}
          >
            <Card className={styles["paqueteCard"]}>
              <Card.Body className={styles["cardContainer"]}>
                <p className={styles["titleCard"]}>Paquete aceléralo</p>
                <p className={styles["priceCard"]}>Precio</p>
                <p className={styles["validCard"]}>Vigencia</p>
                <Button
                  href="/servicios/appsky"
                  variant="primary"
                  type="submit"
                  className={styles.button}
                >
                  Agregar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Slider>
      </Row>

      <Row className={styles["paqueteRow"]}>
        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
          <Card className={styles["paqueteCard"]}>
            <Card.Body className={styles["cardContainer"]}>
              <p className={styles["titleCard"]}>Paquete aceléralo</p>
              <p className={styles["priceCard"]}>Precio</p>
              <p className={styles["validCard"]}>Vigencia</p>
              <Button
                href="/servicios/appsky"
                variant="primary"
                type="submit"
                className={styles.button}
              >
                Agregar
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
          <Card className={styles["paqueteCard"]}>
            <Card.Body className={styles["cardContainer"]}>
              <p className={styles["titleCard"]}>Paquete aceléralo</p>
              <p className={styles["priceCard"]}>Precio</p>
              <p className={styles["validCard"]}>Vigencia</p>
              <Button
                href="/servicios/appsky"
                variant="primary"
                type="submit"
                className={styles.button}
              >
                Agregar
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
          <Card className={styles["paqueteCard"]}>
            <Card.Body className={styles["cardContainer"]}>
              <p className={styles["titleCard"]}>Paquete aceléralo</p>
              <p className={styles["priceCard"]}>Precio</p>
              <p className={styles["validCard"]}>Vigencia</p>
              <Button
                href="/servicios/appsky"
                variant="primary"
                type="submit"
                className={styles.button}
              >
                Agregar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AumentaVelocidad;
