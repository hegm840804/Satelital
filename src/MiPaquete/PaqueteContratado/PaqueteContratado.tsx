import styles from "./PaqueteContratado.module.css";
import { Col, Row, Card, Collapse, Container } from "react-bootstrap";
import { FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import Loading from "../../General/Loading";
import {
  builtGetToken4SkyCelularEntrada,
  GetToken4SkyCelular_Entrada,
  GetToken4SkyCelular_Parametros,
  GetToken4SkyCelular_Respuesta,
} from "../../Commons/Services/GetToken4SkyCelular";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import { tokenSalesForceParametros } from "../../Commons/ConfigRed";
import {
  builtGetPrimaryData4SkyCelularEntrada,
  GetPrimaryData4SkyCelular_Entrada,
  GetPrimaryData4SkyCelular_Parametros,
  GetPrimaryData4SkyCelular_Respuesta,
} from "../../Commons/Services/GetPrimaryData4SkyCelular";

import {
  builtGetAssets4SkyCelularEntrada,
  GetAssets4SkyCelular_Entrada,
  GetAssets4SkyCelular_Parametros,
  GetAssets4SkyCelular_Respuesta,
  Asset,
} from "../../Commons/Services/GetAssets4SkyCelular";

const PaqueteContratado = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 576;
  const [open1, setOpen1] = useState(isMobile ? true : false);
  const [open2, setOpen2] = useState(isMobile ? true : false);
  const [open3, setOpen3] = useState(isMobile ? true : false);
  const [open4, setOpen4] = useState(isMobile ? true : false);
  const [paquete, setPaquete] = useState(sessionStorage.getItem("Paquete"));
  const [paqueteSkyPlus, setPaqueteSkyPlus] = useState(
    sessionStorage.getItem("PaqueteSky+")
  );
  const [paqueteCelular, setPaqueteCelular] = useState("");
  const [paqueteInternet, setPaqueteInternet] = useState("");
  const [incluidos, setIncluidos] = useState("");
  const [promocionales, setPromocionales] = useState("");
  const [adicionales, setAdicionales] = useState<any[]>([]);
  const [streaming, setStreaming] = useState("");
  const [cardCelular, setCardCelular] = useState(false);
  const [cardInternet, setCardInternet] = useState(false);
  const [loading, isLoading] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  //const [assetsSkyCel, setAssetsSkyCel] = useState<Asset[]>([]);
  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));

  //const [servicios, setServicios] = useState(JSON.parse(sessionStorage.getItem("servicios")|| "{}"));

  const paquetesSky = [
    ["88 canales de video", "70 en HD"],
    ["119 canales de video", "93 en HD"],
    [
      "141 canales de video",
      "111 en HD",
      "Tecnología 4K",
      "Grabación de contenidos",
    ],
  ];

  let paqueteMinusculas: string | null = sessionStorage.getItem("Paquete");
  let paqueteSky: any = [];

  if (paqueteMinusculas !== null) {
    paqueteMinusculas = paqueteMinusculas.toLocaleLowerCase();

    if (paqueteMinusculas.includes("silver")) {
      paqueteSky = paquetesSky[0];
    } else if (paqueteMinusculas.includes("gold")) {
      paqueteSky = paquetesSky[1];
    } else {
      paqueteSky = paquetesSky[2];
    }
  }

  function handleShow(id: string) {
    if (id == "1") {
      setOpen1(!open1);
    } else if (id == "2") {
      setOpen2(!open2);
    } else if (id == "3") {
      setOpen3(!open3);
    } else if (id == "4") {
      setOpen4(!open4);
    }
    //setOpen(!open);
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    setOpen1(!open1);
    setOpen2(!open2);
    setOpen3(!open3);
    setOpen4(!open4);
  }

  useEffect(() => {
    //obtieneDatosPaqueteCelular();

    let cadena: any = "1";
    let arregloTemp: Asset[] = [];

    //let arregloTempSkyCel: Asset[] = [];
    if (flujo !== "DTH") {
      
        if (null !== sessionStorage.getItem("assets")) {
          cadena = sessionStorage.getItem("assets");
          let assetsData: Asset[] = JSON.parse(cadena);

          assetsData.forEach((element: Asset, index: number) => {
              if (element.Family === "Movil" && element.Status === "Active") {
                setCardCelular(true);
                setPaqueteCelular(element.Name);
                setIncluidos(element.Attributes.Datos);
                setPromocionales(element.Attributes.DatosPromo);
                setAdicionales(element.Attributes.DatosAdicionales);
                if (element.Attributes.DatosStreaming !== "N/A") {
                  setStreaming(element.Attributes.DatosStreaming);                  
                }
              }
          });
        
          assetsData.forEach((element: Asset, index: number) => {
            if (element.Family === "Internet" && element.Status === "Active") {
              setCardInternet(true);
              setPaqueteInternet(element.Name);
            }
          });
        
          assetsData.forEach((element: Asset, index: number) => {
            if (element.Family === "Adicional") {
              if (element.Name !== "Dispositivo Móvil") {
                arregloTemp.push(element);
              }
            }
          
            //if (element.Family === "Movil") {
            //if (element.Name.includes("Sky Celular")) {
            //arregloTempSkyCel.push(element);
            //}
            //}
          });
          setAssets(arregloTemp);
        
          //setAssetsSkyCel(arregloTempSkyCel)
        }
    }
  }, []);

  return (
    <>
      <Loading isLoading={loading} />
      <Container fluid>
        <Row className={styles["headerRow"]}>
          <Col>
            <span className={styles["spectrum"]}>Mi paquete</span>
            <p className={styles["title"]}>
              Visualiza tu paquete Sky y los servicios adicionales contratados.
            </p>
          </Col>
        </Row>

        <Row className={styles["paqueteRow"]}>
          {flujo !== "Sky+" ? (
            <Col
              className={styles["smallColMargin"]}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Card className={styles["paqueteCard"]}>
                <Card.Body className={styles["cardContainer"]}>
                  <Row className={styles["titleContainer"]}>
                    <Col
                      className={styles["titleCol"]}
                      xs={8}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <p className={styles["titleCard"]}>
                        <span className={styles["paqueteAlign"]}>
                          {paquete}
                        </span>
                      </p>
                    </Col>
                    <Col
                      className={styles["buttonCol"]}
                      xs={4}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <FiChevronDown
                        className={
                          !open1
                            ? styles["iconArrowDown"]
                            : styles["iconArrowUp"]
                        }
                        onClick={() => handleShow("1")}
                      />
                    </Col>
                  </Row>
                  <Row className={styles["textContainer"]}>
                    <Collapse in={!open1}>
                      <Col id={"contents_" + "1"}>
                        <hr className={styles["hrCard"]} />
                        <div>
                          {paqueteSky.map((item: any) => (
                            <p className={styles["listCard"]}>{item}</p>
                          ))}
                        </div>
                      </Col>
                    </Collapse>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            <></>
          )}

          {flujo === "Sky+" ||
          flujo === "DTH/Sky+" ||
          flujo === "DTH/SkyCelular/Sky+" ? (
            <Col
              className={styles["smallColMargin"]}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Card className={styles["paqueteCard"]}>
                <Card.Body className={styles["cardContainer"]}>
                  <Row className={styles["titleContainer"]}>
                    <Col
                      className={styles["titleCol"]}
                      xs={8}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <p className={styles["titleCard"]}>
                        <span className={styles["paqueteAlign"]}>Sky+</span>
                      </p>
                    </Col>
                    <Col
                      className={styles["buttonCol"]}
                      xs={4}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <FiChevronDown
                        className={
                          !open2
                            ? styles["iconArrowDown"]
                            : styles["iconArrowUp"]
                        }
                        onClick={() => handleShow("2")}
                      />
                    </Col>
                  </Row>
                  <Row className={styles["textContainer"]}>
                    <Collapse in={!open2}>
                      <Col id={"contents_" + "1"}>
                        <hr className={styles["hrCard"]} />
                        <p className={styles["listCard"]}>{paqueteSkyPlus}</p>
                      </Col>
                    </Collapse>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            <></>
          )}
          {assets.length > 0 ? (
            <Col
              className={styles["smallColMargin"]}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Card className={styles["paqueteCard"]}>
                <Card.Body className={styles["cardContainer"]}>
                  <Row className={styles["titleContainer"]}>
                    <Col
                      className={styles["titleCol"]}
                      xs={8}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <p className={styles["titleCard"]}>
                        <span className={styles["paqueteAlign"]}>
                          Adicionales
                        </span>
                      </p>
                    </Col>
                    <Col
                      className={styles["buttonCol"]}
                      xs={4}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <FiChevronDown
                        className={
                          !open3
                            ? styles["iconArrowDown"]
                            : styles["iconArrowUp"]
                        }
                        onClick={() => handleShow("3")}
                      />
                    </Col>
                  </Row>
                  <Row className={styles["textContainer"]}>
                    <Collapse in={!open3}>
                      <Col id={"contents_" + "1"}>
                        <hr className={styles["hrCard"]} />
                        {assets.map((item: any) => (
                          <p className={styles["listCard"]}>{item.Name}</p>
                        ))}
                      </Col>
                    </Collapse>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            <></>
          )}
          {cardCelular ? (
            <Col
              className={styles["smallColMargin"]}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Card className={styles["paqueteCard"]}>
                <Card.Body className={styles["cardContainer"]}>
                  <Row className={styles["titleContainer"]}>
                    <Col
                      className={styles["titleCol"]}
                      xs={8}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <p className={styles["titleCard"]}>
                        <span className={styles["paqueteAlign"]}>
                          {paqueteCelular}
                        </span>
                      </p>
                    </Col>
                    <Col
                      className={styles["buttonCol"]}
                      xs={4}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <FiChevronDown
                        className={
                          !open3
                            ? styles["iconArrowDown"]
                            : styles["iconArrowUp"]
                        }
                        onClick={() => handleShow("3")}
                      />
                    </Col>
                  </Row>
                  <Row className={styles["textContainer"]}>
                    <Collapse in={!open3}>
                      <Col id={"contents_" + "1"}>
                        <hr className={styles["hrCard"]} />
                        <p className={styles["listCard"]}>
                          {incluidos + " GB incluidos"}
                        </p>
                        <p className={styles["listCard"]}>
                          {promocionales + " GB promocionales"}
                        </p>
                        <p className={styles["listCard"]}>
                          {adicionales + " GB adicionales"}
                        </p>
                        <p className={styles["listCard"]}>
                          {streaming + " GB para Streaming"}
                        </p>
                      </Col>
                    </Collapse>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            <></>
          )}

          {cardInternet ? (
            <Col
              className={styles["smallColMargin"]}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Card className={styles["paqueteCard"]}>
                <Card.Body className={styles["cardContainer"]}>
                  <Row className={styles["titleContainer"]}>
                    <Col
                      className={styles["titleCol"]}
                      xs={8}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <p className={styles["titleCard"]}>
                        <span className={styles["paqueteAlign"]}>
                          Internet
                        </span>
                      </p>
                    </Col>
                    <Col
                      className={styles["buttonCol"]}
                      xs={4}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <FiChevronDown
                        className={
                          !open3
                            ? styles["iconArrowDown"]
                            : styles["iconArrowUp"]
                        }
                        onClick={() => handleShow("3")}
                      />
                    </Col>
                  </Row>
                  <Row className={styles["textContainer"]}>
                    <Collapse in={!open3}>
                      <Col id={"contents_" + "1"}>
                        <hr className={styles["hrCard"]} />
                        <p className={styles["listCard"]}>{paqueteInternet}</p>
                      </Col>
                    </Collapse>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </Container>
    </>
  );
};

export default PaqueteContratado;
