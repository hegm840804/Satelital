import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarBalanceOferta_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "consultarBalanceOferta",
    rutaEndPoint: "/GwAttBalanceManagementEBS/consultarBalanceOferta",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSF,
    parametros: { ...datos },
  };

  return par;
}

export function ConsultarBalanceOfertaInput(l_Msisdn: string) {
  var retorno: ConsultarBalanceOferta_entrada =
    builtConsultarBalanceOferta_entrada(
      builtSCINTASConsultaConsumoDatosEntrada(l_Msisdn)
    );

  return retorno;
}

//ENTRADA
export interface ConsultarBalanceOferta_entrada {
  SC_INT_AS_ConsultaConsumoDatos_Entrada: SCINTASConsultaConsumoDatosEntrada;
}

export function builtConsultarBalanceOferta_entrada(
  l_SC_INT_AS_ConsultaConsumoDatos_Entrada: SCINTASConsultaConsumoDatosEntrada
) {
  var retorno: ConsultarBalanceOferta_entrada = {
    SC_INT_AS_ConsultaConsumoDatos_Entrada:
      l_SC_INT_AS_ConsultaConsumoDatos_Entrada,
  };

  return retorno;
}

export interface SCINTASConsultaConsumoDatosEntrada {
  Msisdn: string;
}

export function builtSCINTASConsultaConsumoDatosEntrada(l_Msisdn: string) {
  var retorno: SCINTASConsultaConsumoDatosEntrada = {
    Msisdn: l_Msisdn,
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