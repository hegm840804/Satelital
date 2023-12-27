import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarBines_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarBines",
    rutaEndPoint: "/GwConsultarBinesEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendBilletera,
    parametros: { ...datos },
  };

  return par;
}

//--ENTRADA
export interface ConsultarBines_Entrada {
  CardBIN: string;
  CardNumber: string;
  CountryCode: string;
}

//--SALIDA

export interface ConsultarBines_Salida {
  ClasificacionesLlamada: ClasificacionesLlamada;
}

export interface ClasificacionesLlamada {
  CardBIN: string;
  CardNumber: string;
  CountryCode: string;
  RecurrentFlag: string;
  BINType: string;
  CardType: string;
  ServiceFlag: string;
  ClearingHouseCve: string;
  ClearingHouse: string;
  DomesticFlag: string;
  BankCode: string;
  Bank: string;
}

export type ConsultarBines_Respuesta = EncabezadoRespuestaInterna &
  ConsultarBines_Salida;
