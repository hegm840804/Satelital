import {
  ConsultarBalanceOferta_Respuesta,
  ConsultarBalanceOferta_Parametros,
  ConsultarBalanceOferta_entrada,
  ConsultarBalanceOfertaInput,
  Bolsa,
} from "../../../Commons/Services/ConsultarBalanceOferta2";
import { ConsultaWS } from "../../../Commons/ServiciosBase";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "../PlanActual.module.css";

const PlanActualContenedorTelefoniaCard = (props: any) => {
  const { num_telefono }: any = { ...props };
  const [banderaDatosRecuperados, setbanderaDatosRecuperados] = useState(false);
  const [bolsaArray, setbolsaArray] = useState<Bolsa[]>([]);

  useEffect(() => {
    doObtieneBolsas(num_telefono);
  }, []);

  const doObtieneBolsas = async (param1: string) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarBalanceOfertaDO: ConsultarBalanceOferta_entrada =
      ConsultarBalanceOfertaInput(param1); //    {NumeroCuenta:};
    let par = ConsultarBalanceOferta_Parametros(ConsultarBalanceOfertaDO);

    let ConsultarBalanceOfertaRespuesta: ConsultarBalanceOferta_Respuesta =
      await ConsultaWS(par);

    const retorno =
      ConsultarBalanceOfertaRespuesta.SC_INT_AS_ConsultaConsumoDatos_Salida
        .CABECERA.COD_ERROR;

    if (retorno == "" || retorno == null || retorno == "0") {
      setbanderaDatosRecuperados(true);
      setbolsaArray(
        ConsultarBalanceOfertaRespuesta.SC_INT_AS_ConsultaConsumoDatos_Salida
          .ListaBolsas.Bolsas
      );
    } else {
      setbanderaDatosRecuperados(false);
      console.error(ConsultarBalanceOfertaRespuesta);
    }

    //----------------------------------------------------------------------------------------------------------------------------
  };

  const getInformacionAmenidadesContratas = (
    param1: string,
    param2: string
  ) => {
    if (param1 == "999999999") {
      return "Ilimitado";
    } else if (param1 == "953.67") {
      return "Ilimitado";
    } else {
      return param1 + " " + param2;
    }
  };

  const getInformacionAmenidadesGastadas = (
    param1: string,
    param2: string,
    param3: string,
    param4: string
  ) => {
    if (param3 == "999999999") {
      return "";
    } else if (param3 == "953.67") {
      return "";
    } else {
      return `Has usado ${
        param1 + " " + param2
      } de ${getInformacionAmenidadesContratas(param3, param4)}`;
    }
  };

  if (banderaDatosRecuperados) {
    return (
      <>
        <Row className={styles["alturacuadros"]}>
          {bolsaArray!.map((item, index) => (
            <Col style={{ padding: "0 0.5vw 0 0.5vw" }}>
              <Card className={styles["cuadro"]}>
                <Card.Body style={{ padding: "0px" }}>
                  <p className={styles["textodatos"]}>{item.Oferta}</p>
                  <p className={styles["textodatosgb"]}>
                    {getInformacionAmenidadesContratas(
                      item.Datos_Disponibles,
                      item.Unidad_Datos_Disponibles!
                    )}
                  </p>
                  <p className={styles["textodatosconsumidos"]}>
                    <strong>
                      {getInformacionAmenidadesGastadas(
                        item.Datos_Utilizados,
                        item.Unidad_Datos_Utilizados!,
                        item.Datos_Disponibles,
                        item.Unidad_Datos_Disponibles!
                      )}
                    </strong>
                  </p>
                  <ProgressBar className={styles["barra"]} now={0} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  } else {
    return (
      <>
        <p>No Informacion para mostrar</p>
      </>
    );
  }
};

export default PlanActualContenedorTelefoniaCard;
