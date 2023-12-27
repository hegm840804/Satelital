import { useEffect, useState } from "react";
import {
  builtGetOrderDetail4TrackingServiceEntrada,
  GetOrderDetail4TrackingService_Entrada,
  GetOrderDetail4TrackingService_Parametros,
  GetOrderDetail4TrackingService_Respuesta,
} from "../../Commons/Services/GetOrderDetail4TrackingService";
import { ConsultaWS } from "../../Commons/ServiciosBase";
const TrackingNumberLabel = (props: any) => {
  const { orden_id, current_token }: any = { ...props };

  const [trackingNumber, settrackingNumber] = useState("");

  useEffect(() => {
    doGetTrackingId(current_token, orden_id);
  }, []);

  const doGetTrackingId = async (token_p: string, orderid_p: string) => {
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
      if (GetOrderDetail4TrackingServiceRespuesta.Order) {
        if (GetOrderDetail4TrackingServiceRespuesta.Order.TrackingNumber) {
          settrackingNumber(
            GetOrderDetail4TrackingServiceRespuesta.Order.TrackingNumber
          );
        } else {
          console.error("no existe nodo trackingNumber");
          settrackingNumber("NA");
        }
      } else {
        console.error("no existe nodo order");
        settrackingNumber("NA");
      }
    } else {
      console.error(GetOrderDetail4TrackingServiceRespuesta);
      settrackingNumber("NA");
    }
   };
  return (
    <>
      <label>{trackingNumber}</label>
    </>
  );
};

export default TrackingNumberLabel;
