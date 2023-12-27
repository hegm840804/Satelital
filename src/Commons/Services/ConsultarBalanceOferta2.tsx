import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarBalanceOferta_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarBalanceOferta",
    rutaEndPoint: "/consultarBalanceOferta",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface ConsultarBalanceOferta_entrada {
  msisdn: string;
}

export function ConsultarBalanceOfertaInput(p_msisdn: string) {
  var retorno: ConsultarBalanceOferta_entrada = {
    msisdn: p_msisdn,
  };

  return retorno;
}

//SALIDA
export interface ConsultarBalanceOferta_Salida {
  SC_INT_AS_ConsultaConsumoDatos_Salida: SCINTASConsultaConsumoDatosSalida;
}

export interface SCINTASConsultaConsumoDatosSalida {
  CABECERA: Cabecera;
  ListaBolsas: ListaBolsas;
}

export interface Cabecera {
  COD_ERROR: string;
  MSG_ERROR: string;
}

export interface ListaBolsas {
  Bolsas: Bolsa[];
}

export interface Bolsa {
  Nombre_Bolsa: string;
  Oferta: string;
  Fecha_Efectiva: string;
  Fecha_Expiracion: string;
  Total_Datos: string;
  Datos_Disponibles: string;
  Datos_Utilizados: string;
  Unidad_Total_Datos?: string;
  Unidad_Datos_Disponibles?: string;
  Unidad_Datos_Utilizados?: string;
}

export type ConsultarBalanceOferta_Respuesta = EncabezadoRespuestaInterna &
  ConsultarBalanceOferta_Salida;
