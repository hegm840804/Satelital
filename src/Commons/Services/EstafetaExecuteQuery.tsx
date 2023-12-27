import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function EstafetaExecuteQuery_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "EstafetaExecuteQuery",
    rutaEndPoint: "/estafetaExecuteQuery2",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface EstafetaExecuteQuery_Entrada {
  ApiKey: string;
  Token: string;
  SuscriberId: string;
  Login: string;
  Password: string;
  GuiaEstafeta: string;
}

export function builtEstafetaExecuteQueryEntrada(
  l_ApiKey: string,
  l_Token: string,
  l_SuscriberId: string,
  l_Login: string,
  l_Password: string,
  l_GuiaEstafeta: string
) {
  var retorno: EstafetaExecuteQuery_Entrada = {
    ApiKey: l_ApiKey,
    Token: l_Token,
    SuscriberId: l_SuscriberId,
    Login: l_Login,
    Password: l_Password,
    GuiaEstafeta: l_GuiaEstafeta,
  };

  return retorno;
}

//SAIDA

export interface EstafetaExecuteQuery_Salida {
    ExecuteQueryResponse: ExecuteQueryResponse;
}

export interface ExecuteQueryResponse {
    ExecuteQueryResult: ExecuteQueryResult;
}

export interface ExecuteQueryResult {
    trackingData: trackingData;
}

export interface trackingData {
    TrackingData: TrackingData;
}

export interface TrackingData {
    pickupData: pickupData;
    history:history;
    deliveryData:deliveryData;
}

export interface deliveryData {
    receiverName: string;
    deliveryDateTime: string;
    
}

export interface history {
    History: History;
    
}

export interface History {
    eventDescriptionSPA: string;
    eventDateTime: string;
}

export interface pickupData {
    originName: string;
    pickupDateTime: string;
}

export type EstafetaExecuteQuery_Respuesta = EncabezadoRespuestaInterna &
  EstafetaExecuteQuery_Salida;
