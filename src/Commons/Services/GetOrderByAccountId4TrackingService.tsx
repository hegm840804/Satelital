import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GetOrderByAccountId4TrackingService_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GetOrderByAccountId4TrackingService",
    rutaEndPoint: "/getOrderByAccountId4TrackingService",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

export interface GetOrderByAccountId4TrackingService_Entrada {
  AccountId: string;
  offset: string;
  token: string;
}

export function builtGetOrderByAccountId4TrackingServiceEntrada(
  l_AccountId: string,
  l_offset: string,
  l_token: string
) {
  var retorno: GetOrderByAccountId4TrackingService_Entrada = {
    AccountId: l_AccountId,
    offset: l_offset,
    token: l_token,
  };

  return retorno;
}


//SALIDA

export interface GetOrderByAccountId4TrackingService_Salida {
    Ordenes:      Orden[];
    errormessage: string;
    errorno:      number;
    name:         string;
}

export interface Orden {
    Type:                    string;
    Substatus:               string;
    Status:                  string;
    StartDate:               string;
    RecordTypeName:          string;
    OrderNumber:             string;
    Id:                      string;
    EffectiveRecurringTotal: number;
    EffectiveOneTimeTotal:   number;
    TrackingNumber?:         string;
}


export type GetOrderByAccountId4TrackingService_Respuesta = EncabezadoRespuestaInterna &
GetOrderByAccountId4TrackingService_Salida;
