import { Col } from "react-bootstrap";
import styles from "../Seguimiento/cuentas-seguimiento-mensajeria.module.css";

import { useEffect, useState } from "react";

import {
  builtGetOrderDetail4TrackingServiceEntrada,
  GetOrderDetail4TrackingService_Entrada,
  GetOrderDetail4TrackingService_Parametros,
  GetOrderDetail4TrackingService_Respuesta,
} from "../../Commons/Services/GetOrderDetail4TrackingService";
import { ConsultaWS } from "../../Commons/ServiciosBase";

const CuentaSeguimientoModal = (props: any) => {
  const { orden_id, current_token }: any = { ...props };

  const [detailOrderArray, setdetailOrderArray] = useState<any>([]);
  useEffect(() => {
    doGetOrderDetail(current_token, orden_id);

    //doObtenerToken2();
  }, []);

  const doGetOrderDetail = async (token_p: string, orderid_p: string) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const GetOrderDetail4TrackingServiceDO: GetOrderDetail4TrackingService_Entrada =
      builtGetOrderDetail4TrackingServiceEntrada(orderid_p, token_p);
    let GetOrderDetail4TrackingServiceParametros =
      GetOrderDetail4TrackingService_Parametros(
        GetOrderDetail4TrackingServiceDO
      );
    let GetOrderDetail4TrackingServiceRespuesta: GetOrderDetail4TrackingService_Respuesta =
      await ConsultaWS(GetOrderDetail4TrackingServiceParametros);

    if (
      GetOrderDetail4TrackingServiceRespuesta.Order &&
      GetOrderDetail4TrackingServiceRespuesta.Order != null &&
      GetOrderDetail4TrackingServiceRespuesta.Order.OrderItem.length > 0
    ) {
      setdetailOrderArray(
        GetOrderDetail4TrackingServiceRespuesta.Order.OrderItem
      );
    } else {
      console.error(GetOrderDetail4TrackingServiceRespuesta);
    }
  };

  const doMytable = () => {
    return (
      <table className={styles["table"]}>
        <tr className={styles["tr"]}>
          <th className={styles["th"]}>Nombre</th>
          <th className={styles["th"]}>Detalle</th>
        </tr>

        {detailOrderArray.map((item: any, index: number) => {
          return (
            <tr className={styles["tr"]}>
              <td className={styles["td"]}>{item.Name}</td>
              <td className={styles["td"]}>
                {doShowAttributes(item.Name, item)}
              </td>
            </tr>
          );
        })}
      </table>
    );
  };

  const doShowAttributes = (pram_name: string, pram_item: any) => {
    if (pram_item.Attributes) {
      if (pram_name.includes("Sky Celular")) {
        return (
          <>
            <div className={styles["td"]}>
              <p>Streaming: {pram_item.Attributes.AppStreaming}</p>
              <p>Cargo Activacion: {pram_item.Attributes.CargoActivacion}</p>
              <p>Dato a Granel: {pram_item.Attributes.DatoGranel}</p>
              <p>
                Datos: {pram_item.Attributes.Datos}{" "}
                {pram_item.Attributes.UnidadDatos}
              </p>
              <p>
                Datos Adicionales: {pram_item.Attributes.DatosAdicionales}{" "}
                {pram_item.Attributes.UnidadDatosAdicionales}
              </p>
              <p>
                DatosPromo: {pram_item.Attributes.DatosPromo}{" "}
                {pram_item.Attributes.UnidadDatosPromo}
              </p>
              <p>
                DatosStreaming: {pram_item.Attributes.DatosStreaming}{" "}
                {pram_item.Attributes.UnidadDatosStreaming}
              </p>
              <p>RedesSociales: {pram_item.Attributes.RedesSociales}</p>
              <p>SMS: {pram_item.Attributes.SMS}</p>
              <p>TipoFacturacion: {pram_item.Attributes.CargoActivacion}</p>
              <p>Voz: {pram_item.Attributes.Voz}</p>
            </div>
          </>
        );
      } else if (pram_name.includes("SIM ")) {
        return (
          <>
            <div className={styles["td"]}>
              {" "}
              <p>ICCID: {pram_item.Attributes.ICCID}</p>
              <p>IMSI: {pram_item.Attributes.IMSI}</p>
              <p>MSISDN: {pram_item.Attributes.MSISDN}</p>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className={styles["td"]}>
              {" "}
              <p>Sin Consideración</p>
            </div>
          </>
        );
      }
    } else {
      return (
        <>
          <p>N/A</p>
        </>
      );
    }
  };

  return (
    <>
      <Col className={styles["exclamation"]}>{doMytable()}</Col>
    </>
  );
};

export default CuentaSeguimientoModal;
