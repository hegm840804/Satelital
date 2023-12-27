import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  builtGetOrderDetail4TrackingServiceEntrada,
  GetOrderDetail4TrackingService_Entrada,
  GetOrderDetail4TrackingService_Parametros,
  GetOrderDetail4TrackingService_Respuesta,
} from "../../Commons/Services/GetOrderDetail4TrackingService";
import { ConsultaWS } from "../../Commons/ServiciosBase";
import { EstafetaParametros } from "../../Commons/ConfigRed";
import {
  builtAuthEstafetaEntrada,
  AuthEstafeta_Entrada,
  AuthEstafeta_Parametros,
  AuthEstafeta_Respuesta,
} from "../../Commons/Services/AuthEstafeta";
import {
  builtEstafetaExecuteQueryEntrada,
  EstafetaExecuteQuery_Entrada,
  EstafetaExecuteQuery_Parametros,
  EstafetaExecuteQuery_Respuesta,
} from "../../Commons/Services/EstafetaExecuteQuery";

const CuentaSeguimientoStepper = (props: any) => {
  const { orden_id, current_token }: any = { ...props };
  const [activeStep, setActiveStep] = useState(3);
  const [trackingNumber, settrackingNumber] = useState("");
  const [informacionRecepcion, setInformacionRecepcion] = useState([]);
  const [informacionEntrega, setInformacionEntrega] = useState([]);
  const [informacionHistorico, setInformacionHistorico] = useState([]);
  const [descripcionServicio, setDescripcionServicio] = useState("");
  const [estatusServicio, setEstatusServicio] = useState("");

  const [steps, setSteps] = useState<any>([]);

  //const steps: any[] = [];

  useEffect(() => {
    const { orden_id, current_token }: any = { ...props };
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
          doObtenerEstatoken();
        } else {
          settrackingNumber("0");
        }
      } else {
        settrackingNumber("0");
      }
    } else {
      console.error(GetOrderDetail4TrackingServiceRespuesta);
      settrackingNumber("NA");
    }
  };

  const doObtenerEstatoken = async () => {
    //----------------------------------------------------------------------------------------------------------------------------
    const AuthEstafetaDO: AuthEstafeta_Entrada = builtAuthEstafetaEntrada(
      "execute",
      "client_credentials"
    );
    let par = AuthEstafeta_Parametros(AuthEstafetaDO);
    let AuthEstafetaRespuesta: AuthEstafeta_Respuesta = await ConsultaWS(par);

    if (
      AuthEstafetaRespuesta.access_token &&
      AuthEstafetaRespuesta.access_token != null &&
      AuthEstafetaRespuesta.access_token != ""
    ) {
      doEstaInfo(AuthEstafetaRespuesta.access_token);
    } else {
      console.error(AuthEstafetaRespuesta);
    }
  };

  const doEstaInfo = async (param_estatoken: string) => {
    //----------------------------------------------------------------------------------------------------------------------------
    const EstafetaExecuteQueryDO: EstafetaExecuteQuery_Entrada =
      builtEstafetaExecuteQueryEntrada(
        EstafetaParametros.api_key,
        param_estatoken,
        EstafetaParametros.suscriber_id,
        EstafetaParametros.login,
        EstafetaParametros.password,
        trackingNumber
      );
    let EstafetaExecuteQueryParametros = EstafetaExecuteQuery_Parametros(
      EstafetaExecuteQueryDO
    );
    let EstafetaExecuteQueryRespuesta: EstafetaExecuteQuery_Respuesta =
      await ConsultaWS(EstafetaExecuteQueryParametros);

    if (
      EstafetaExecuteQueryRespuesta.ExecuteQueryResponse.ExecuteQueryResult
        .trackingData.TrackingData.pickupData &&
      EstafetaExecuteQueryRespuesta.ExecuteQueryResponse.ExecuteQueryResult
        .trackingData.TrackingData.history.History &&
      EstafetaExecuteQueryRespuesta.ExecuteQueryResponse.ExecuteQueryResult
        .trackingData.TrackingData.deliveryData
    ) {
      setSteps([]);

      var recepcion =
        EstafetaExecuteQueryRespuesta.ExecuteQueryResponse.ExecuteQueryResult
          .trackingData.TrackingData.pickupData;
      var myArray1 = [
        {
          label: "Recepción",
          description: `Origen ${recepcion.originName}, Hora Recepción: ${recepcion.pickupDateTime}`,
        },
      ];

      var historia =
        EstafetaExecuteQueryRespuesta.ExecuteQueryResponse.ExecuteQueryResult
          .trackingData.TrackingData.history.History;
      var myArray2 = [
        {
          label: "Historico",
          description: `Evento ${historia.eventDescriptionSPA}, Hora : ${historia.eventDateTime}`,
        },
      ];

      let mergedArray = [...myArray1, ...myArray2];

      var entrega =
        EstafetaExecuteQueryRespuesta.ExecuteQueryResponse.ExecuteQueryResult
          .trackingData.TrackingData.deliveryData;
      var myArray3 = [
        {
          label: "Entrega",
          description: `Recibió: ${entrega.receiverName}, Hora : ${entrega.deliveryDateTime}`,
        },
      ]; // no error
      let mergedArray2 = [...mergedArray, ...myArray3];

      setSteps(mergedArray2);
    } else {
      console.error(
        EstafetaExecuteQueryRespuesta.ExecuteQueryResponse.ExecuteQueryResult
          .trackingData.TrackingData
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step: any, index: number) => (
          <Step key={step.label}>
            <StepLabel>
              {step.label} {step.description}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}></Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CuentaSeguimientoStepper;
