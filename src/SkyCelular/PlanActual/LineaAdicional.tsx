import { useEffect, useState } from "react";
import styles from "./LineaAdicional.module.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  ConsultarBalanceOferta_Respuesta,
  ConsultarBalanceOferta_Parametros,
  ConsultarBalanceOferta_entrada,
  ConsultarBalanceOfertaInput,
  Bolsa,
} from "../../Commons/Services/ConsultarBalanceOferta2";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import { tokenSalesForceParametros } from "../../Commons/ConfigRed";
import {
  builtGetToken4SkyCelularEntrada,
  GetToken4SkyCelular_Entrada,
  GetToken4SkyCelular_Parametros,
  GetToken4SkyCelular_Respuesta,
} from "../../Commons/Services/GetToken4SkyCelular";
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
} from "../../Commons/Services/GetAssets4SkyCelular";
import facebook from "../../assets/img/Iconos/face.png";
import whatsapp from "../../assets/img/Iconos/whats.png";
import twitter from "../../assets/img/Iconos/twit.png";
import instagram from "../../assets/img/Iconos/insta.png";
import uber from "../../assets/img/Iconos/uber.png";

export const LineaAdicional = () => {
  const [assets, setAssets] = useState({ Name: "", MSISDN: "", Price: "" });
  const [attr, setAttr] = useState({
    Datos: "",
    DatosPromo: "",
    DatosAdicionales: "",
    DatosStreaming: "",
    Voz: "",
    SMS: "",
  });
  const [misdn, setMisdn] = useState();
  const [redes, setRedes] = useState([]);
  const [bolsas, setBolsas] = useState<any>([]);
  const [datosIncluidos, setDatosIncluidos] = useState(0);
  const [datosPromo, setDatosPromo] = useState(0);
  const [datosAdicionales, setDatosAdicionales] = useState(0);
  const [datosStreaming, setDatosStreaming] = useState(0);
  const arregloRedes = ["facebook", "whatsapp", "twitter", "instagram", "uber"];

  const doObtieneBolsas = async (param1: string) => {
    //isLoading(true);

    const ConsultarBalanceOfertaDO: ConsultarBalanceOferta_entrada =
      ConsultarBalanceOfertaInput(param1); //    {NumeroCuenta:};
    let par = ConsultarBalanceOferta_Parametros(ConsultarBalanceOfertaDO);

    let ConsultarBalanceOfertaRespuesta: ConsultarBalanceOferta_Respuesta =
      await ConsultaWS(par);

    const retorno =
      ConsultarBalanceOfertaRespuesta.SC_INT_AS_ConsultaConsumoDatos_Salida
        .CABECERA.COD_ERROR;

    if (retorno == "" || retorno == null || retorno == "0") {
      setBolsas(
        ConsultarBalanceOfertaRespuesta.SC_INT_AS_ConsultaConsumoDatos_Salida
          .ListaBolsas.Bolsas
      );

      setDatosIncluidos(parseInt(bolsas[8].Datos_Utilizados));
      setDatosPromo(parseInt(bolsas[2].Datos_Utilizados));
      setDatosAdicionales(parseInt(bolsas[4].Datos_Utilizados));
      setDatosStreaming(parseInt(bolsas[7].Datos_Utilizados));
      //setbanderaDatosRecuperados(true);
      //setbolsaArray(ConsultarBalanceOfertaRespuesta.SC_INT_AS_ConsultaConsumoDatos_Salida.ListaBolsas.Bolsas);

      //setBolsaPrincipal(
      //ConsultarBalanceOfertaRespuesta.SC_INT_AS_ConsultaConsumoDatos_Salida.ListaBolsas.Bolsas[0].Nombre_Bolsa);
    } else {
      //setbanderaDatosRecuperados(false);
    }

    //isLoading(false);
  };

  const doObtenerActivos = async (param1: string, param2: string) => {
    //isLoading(true);

    const GetAssets4SkyCelularDo: GetAssets4SkyCelular_Entrada =
      builtGetAssets4SkyCelularEntrada(param2, param1);
    let GetAssets4SkyCelularParametros = GetAssets4SkyCelular_Parametros(
      GetAssets4SkyCelularDo
    );
    let GetAssets4SkyCelularRespuesta: GetAssets4SkyCelular_Respuesta =
      await ConsultaWS(GetAssets4SkyCelularParametros);

    if (
      GetAssets4SkyCelularRespuesta.Assets &&
      GetAssets4SkyCelularRespuesta.Assets.length > 0
    ) {
      var MiArregloAssets: any[] = GetAssets4SkyCelularRespuesta.Assets;

      MiArregloAssets.map((item, index) => {
        if (item.Family === "Movil") {
          //arregloLocalCelularService.push(item);
          //setbanderaTelefoniaInfo(true);
        } else if (item.Family === "Internet") {
          //setbanderaInternetInfo(true);
          //arregloLocalInternetService.push(item);
        } else {
          //setbanderaTelefoniaInfo(false);
          //setbanderaInternetInfo(false);
        }
      });
    } else {
      console.error("Error al obtener los activos");
      console.error(GetAssets4SkyCelularRespuesta.errorno);
      console.error(GetAssets4SkyCelularRespuesta.errormessage);
    }

    //isLoading(false);
  };

  const doPrimaryData = async (param1: string) => {
    //isLoading(true);
    const GetPrimaryData4SkyCelularDO: GetPrimaryData4SkyCelular_Entrada =
      builtGetPrimaryData4SkyCelularEntrada(
        `${sessionStorage.getItem("Usuario")}`,
        //"skycelhfyryrh1222@yopmail.com",
        //"501284897292",
        `${sessionStorage.getItem("cuentaSkyPlus")}`,
        param1
      );
    let GetPrimaryData4SkyCelularParametros =
      GetPrimaryData4SkyCelular_Parametros(GetPrimaryData4SkyCelularDO);
    let GetPrimaryData4SkyCelularRespuesta: GetPrimaryData4SkyCelular_Respuesta =
      await ConsultaWS(GetPrimaryData4SkyCelularParametros);

    if (
      GetPrimaryData4SkyCelularRespuesta.result &&
      GetPrimaryData4SkyCelularRespuesta.result != null
    ) {
      const retorno = GetPrimaryData4SkyCelularRespuesta.result.accountId;

      if (retorno == "" || retorno == null || retorno.length == 0) {
        //setbanderaDatosRecuperados(false);
      } else {
        //setbanderaDatosRecuperados(true);
        doObtenerActivos(param1, retorno);
      }
    } else {
      console.error("Error al obtener Datos primarios");
      console.error(GetPrimaryData4SkyCelularRespuesta.errormessage);
      console.error(GetPrimaryData4SkyCelularRespuesta.errorno);
    }

    //isLoading(false);
  };

  const doObtenerToken = async () => {
    //isLoading(true);

    const GetToken4SkyCelularDO: GetToken4SkyCelular_Entrada =
      builtGetToken4SkyCelularEntrada(
        tokenSalesForceParametros.client_id,
        tokenSalesForceParametros.client_secret,
        tokenSalesForceParametros.username,
        tokenSalesForceParametros.password
      );
    let GetToken4SkyCelularParametros = GetToken4SkyCelular_Parametros(
      GetToken4SkyCelularDO
    );

    let GetToken4SkyCelularRespuesta: GetToken4SkyCelular_Respuesta =
      await ConsultaWS(GetToken4SkyCelularParametros);

    if (
      GetToken4SkyCelularRespuesta.access_token &&
      GetToken4SkyCelularRespuesta.access_token != "" &&
      GetToken4SkyCelularRespuesta.access_token != null
    ) {
      const retorno = GetToken4SkyCelularRespuesta.access_token;

      if (retorno == "" || retorno == null || retorno.length == 0) {
        //setbanderaDatosRecuperados(false);
      } else {
        //setbanderaDatosRecuperados(true);
        doPrimaryData(retorno);
      }
    } else {
      console.error("Error al obtener el token");
      console.error(GetToken4SkyCelularRespuesta.EBMHeaderResponse);
    }

    //isLoading(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("assets") !== null) {
      let dataAssets = JSON.parse(sessionStorage.getItem("assets")!);
      setAssets(dataAssets[0]);
      setAttr(dataAssets[0].Attributes);
      let cadena: string = dataAssets[0].Attributes.RedesSociales;
      let ar: any = cadena.split(",");
      setRedes(ar);
    }

    let cel: string = assets.MSISDN;
    doObtieneBolsas(cel);

    //doObtenerToken();
  }, []);

  return (
    <>
      <Container className={styles["contenedorCabecera"]} fluid>
        <h1 className={styles["spectrum"]}>
          <span className="textoSpectrum">Conoce tu plan actual</span>
        </h1>
        <p className={styles["subtituloGeneral"]}>
          Revisa todo lo que te ofrece tu plan celular actual.
        </p>
      </Container>

      <Container className={styles["contenedor"]} fluid>
        <Card id={styles["lineaadicional"]} className={styles.contenedorCard}>
          <Card.Body>
            <Card.Title>
              <div id="big" className="d-none d-xl-block d-lg-block ">
                <Row>
                  <Col>
                    <span className={styles["colorletra"]}>Tu plan actual</span>{" "}
                    <span className={styles["plan"]}>{assets.Name}</span>
                  </Col>
                  <Col>
                    <span className={styles["colorletra3"]}>
                      ${assets.Price}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className={styles["colorletra4"]}>
                      Número Celular:{" "}
                    </span>
                    <span className={styles["colorletra5"]}>
                      {assets.MSISDN}
                    </span>
                  </Col>
                  <Col>
                    <span className={styles["colorletra6"]}>
                      Facturado mensual
                    </span>
                  </Col>
                </Row>
              </div>
              <div id="small" className="d-lg-none d-xl-none">
                <Row>
                  <div>
                    <span className={styles["colorletra"]}>Tu plan actual</span>{" "}
                    <span className={styles["colorletra3"]}>{assets.Name}</span>
                  </div>
                  <p style={{ height: "4.5vw", marginBottom: "10vw" }}>
                    <span className={styles["colorletra4"]}>
                      Número Celular:{" "}
                    </span>
                    <span className={styles["colorletra5"]}>
                      {assets.MSISDN}
                    </span>
                  </p>
                </Row>
                <Row>
                  <div style={{ height: "10.2vw" }}>
                    <span className={styles["colorletra3Small"]}>
                      ${assets.Price}
                    </span>
                  </div>
                  <p style={{ height: "4.5vw" }}>
                    <span className={styles["colorletra6Small"]}>
                      Facturado mensual
                    </span>
                  </p>
                </Row>
              </div>
            </Card.Title>

            <Card.Text>
              <div id="big" className="d-none d-xl-block d-lg-block ">
                <Row className={styles["alturacuadros"]}>
                  <Col style={{ padding: "0 0.5vw 0 0.5vw" }}>
                    <Card className={styles["cuadro"]}>
                      <Card.Body style={{ padding: "0px" }}>
                        <p className={styles["textodatos"]}>Datos Incluidos</p>
                        <p className={styles["textodatosgb"]}>
                          {attr.Datos} GB
                        </p>
                        <p className={styles["textodatosconsumidos"]}>
                          <strong>
                            Has usado {datosIncluidos} GB de {attr.Datos} GB
                          </strong>
                        </p>
                        <ProgressBar
                          className={styles["barra"]}
                          now={datosIncluidos}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col style={{ padding: "0 0.5vw 0 0.5vw" }}>
                    <Card className={styles["cuadro"]}>
                      <Card.Body style={{ padding: "0px" }}>
                        <p className={styles["textodatos"]}>
                          Datos promocionales
                        </p>
                        <p className={styles["textodatosgb"]}>
                          {attr.DatosPromo} GB
                        </p>
                        <p className={styles["textodatosconsumidos"]}>
                          <strong>
                            Has usado {datosPromo} GB de {attr.DatosPromo} GB
                          </strong>
                        </p>
                        <ProgressBar
                          className={styles["barra"]}
                          now={datosPromo}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col style={{ padding: "0 0.5vw 0 0.5vw" }}>
                    <Card className={styles["cuadro"]}>
                      <Card.Body style={{ padding: "0px" }}>
                        <p className={styles["textodatos"]}>
                          Datos adicionales
                        </p>
                        <p className={styles["textodatosgb"]}>
                          {attr.DatosAdicionales} GB
                        </p>
                        <p className={styles["textodatosconsumidos"]}>
                          <strong>
                            Has usado {datosAdicionales} GB de{" "}
                            {attr.DatosAdicionales} GB
                          </strong>
                        </p>
                        <ProgressBar
                          className={styles["barra"]}
                          now={datosAdicionales}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col style={{ padding: "0 0.5vw 0 0.5vw" }}>
                    <Card className={styles["cuadro"]}>
                      <Card.Body style={{ padding: "0px" }}>
                        <p className={styles["textodatos"]}>
                          Datos para Streaming
                        </p>
                        <p className={styles["textodatosgb"]}>
                          {attr.DatosStreaming} GB
                        </p>
                        <p className={styles["textodatosconsumidos"]}>
                          <strong>
                            Has usado {datosStreaming} GB de{" "}
                            {attr.DatosStreaming} GB
                          </strong>
                        </p>
                        <ProgressBar
                          className={styles["barra"]}
                          now={datosStreaming}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col>
                    <Card className={styles["cardRed"]}>
                      <Card.Body style={{ padding: "0px" }}>
                        <p className={styles["textodatosred"]}>
                          Redes Sociales
                        </p>
                        <p
                          className={styles["textodatosgb"]}
                          style={{ marginBottom: "0px" }}
                        >
                          Ilimitadas
                        </p>
                        {redes.map((item, index) => (
                          <p key={index} className={styles["red"]}>
                            {item}
                          </p>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/*tewrmina row para cards*/}
              </div>

              {/************************
               * seccion para celulares
               ************************/}
              <div id="small" className="d-lg-none d-xl-none">
                <Row className={styles["alturacuadros"]}>
                  <Card className={styles["cuadro"]}>
                    <Card.Body style={{ padding: "0px" }}>
                      <p className={styles["textodatosgb"]}>
                        Datos Incluidos {attr.Datos} GB
                      </p>
                      <p className={styles["textodatosconsumidos"]}>
                        <strong>
                          Has usado {datosIncluidos} GB de {attr.Datos} GB
                        </strong>
                      </p>
                      <ProgressBar
                        className={styles["barra"]}
                        now={datosIncluidos}
                      />
                    </Card.Body>
                  </Card>

                  <Card className={styles["cuadro"]}>
                    <Card.Body style={{ padding: "0px" }}>
                      <p className={styles["textodatosgb"]}>
                        Datos promocionales {attr.DatosPromo} GB
                      </p>
                      <p className={styles["textodatosconsumidos"]}>
                        <strong>
                          Has usado {datosPromo} GB de {attr.DatosPromo} GB
                        </strong>
                      </p>
                      <ProgressBar
                        className={styles["barra"]}
                        now={datosPromo}
                      />
                    </Card.Body>
                  </Card>

                  <Card className={styles["cuadro"]}>
                    <Card.Body style={{ padding: "0px" }}>
                      <p className={styles["textodatosgb"]}>
                        Datos adicionales {attr.DatosAdicionales} GB
                      </p>
                      <p className={styles["textodatosconsumidos"]}>
                        <strong>
                          Has usado {datosAdicionales} GB de{" "}
                          {attr.DatosAdicionales} GB
                        </strong>
                      </p>
                      <ProgressBar
                        className={styles["barra"]}
                        now={datosAdicionales}
                      />
                    </Card.Body>
                  </Card>

                  <Card className={styles["cuadro"]}>
                    <Card.Body style={{ padding: "0px" }}>
                      <p className={styles["textodatosgb"]}>
                        Datos para Streaming {attr.DatosStreaming} GB
                      </p>
                      <p className={styles["textodatosconsumidos"]}>
                        <strong>
                          Has usado {datosStreaming} GB de {attr.DatosStreaming}{" "}
                          GB
                        </strong>
                      </p>
                      <ProgressBar
                        className={styles["barra"]}
                        now={datosStreaming}
                      />
                    </Card.Body>
                  </Card>

                  <Card className={styles["cuadro"]}>
                    <Card.Body style={{ padding: "0px" }}>
                      <p className={styles["textodatosred"]}>
                        Redes Sociales Ilimitadas
                      </p>
                      {redes.map((item, index) => (
                        <p key={index} className={styles["red"]}>
                          {item}
                        </p>
                      ))}
                    </Card.Body>
                  </Card>
                </Row>
                {/*tewrmina row para cards*/}
              </div>

              <hr className={styles["linea"]} />
              {attr.Voz === "ILIMITADO" && attr.SMS === "ILIMITADO" ? (
                <div>
                  <Row>
                    <Col className={styles["titulo"]} sx={12}>
                      <strong>SMS y Minutos ilimitados</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles["subtitulo"]} sx={12}>
                      <span>Llama sin límite en México, EEUU y Canadá</span>
                    </Col>
                  </Row>
                </div>
              ) : (
                <></>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
        {/*termina card contenedora*/}
      </Container>
    </>
  );
};
