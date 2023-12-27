import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GetOrderDetail4TrackingService_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GetOrderDetail4TrackingService",
    rutaEndPoint: "/getOrderDetail4TrackingService",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA
export interface GetOrderDetail4TrackingService_Entrada {
  orderId: string;
  token: string;
}

export function builtGetOrderDetail4TrackingServiceEntrada(
  l_orderId: string,
  l_token: string
) {
  var retorno: GetOrderDetail4TrackingService_Entrada = {
    orderId: l_orderId,
    token: l_token,
  };

  return retorno;
}

//SALIDA
export interface GetOrderDetail4TrackingService_Salida {
    Order:        Order;
    errormessage: string;
    errorno:      number;
    name:         string;
}

export interface Order {
    OrderItem:               OrderItem[];
    Type:                    string;
    Status:                  string;
    StartDate:               Date;
    OrderNumber:             string;
    Id:                      string;
    Fecha_Inicio_de_Orden:   Date;
    EffectiveRecurringTotal: number;
    EffectiveOneTimeTotal:   number;
    TrackingNumber:string;
}

export interface OrderItem {
    Attributes?:             Attributes;
    Name:                    string;
    EffectiveRecurringTotal: number;
    EffectiveOneTimeTotal:   number;
}

export interface Attributes {
    Voz?:                    string;
    UnidadDatosStreaming?:   string;
    UnidadDatosPromo?:       string;
    UnidadDatosAdicionales?: string;
    UnidadDatos?:            string;
    TipoFacturacion?:        string;
    SMS?:                    string;
    RedesSociales?:          string;
    DatosStreaming?:         string;
    DatosPromo?:             string;
    DatosAdicionales?:       string;
    Datos?:                  string;
    DatoGranel?:             string;
    CargoActivacion?:        string;
    AppStreaming?:           string;
    MSISDN?:                 number;
    IMSI?:                   string;
    ICCID?:                  string;
}


export type GetOrderDetail4TrackingService_Respuesta = EncabezadoRespuestaInterna &
GetOrderDetail4TrackingService_Salida;