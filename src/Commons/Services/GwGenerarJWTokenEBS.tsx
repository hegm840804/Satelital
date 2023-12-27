import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GwGenerarJWTokenEBS_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GwGenerarJWTokenEBS",
    rutaEndPoint: "/GwGenerarJWTokenEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA
export interface GwGenerarJWTokenEBS_Entrada {
  ComercioInfo: ComercioInfo;
  InstrumentoDePagoInfo: InstrumentoDePagoInfo;
}

export function builtGwGenerarJWTokenEBSEntrada(
  p_comercioid: string,
  p_codigosky: string,
  p_id: string
) {
  var retorno: GwGenerarJWTokenEBS_Entrada = {
    ComercioInfo: builtComercioInfo(p_comercioid, p_codigosky),
    InstrumentoDePagoInfo: builtInstrumentoDePagoInfo(p_id),
  };

  return retorno;
}

export interface ComercioInfo {
  ComercioId: string;
  CodigoSKY: string;
}

export function builtComercioInfo(p_comercioid: string, p_codigosky: string) {
  var retorno: ComercioInfo = {
    ComercioId: p_comercioid,
    CodigoSKY: p_codigosky,
  };

  return retorno;
}

export interface InstrumentoDePagoInfo {
  Id: string;
}

export function builtInstrumentoDePagoInfo(p_id: string) {
  var retorno: InstrumentoDePagoInfo = {
    Id: p_id,
  };

  return retorno;
}

//SALIDA
export interface GwGenerarJWTokenEBS_Salida {
  RespuestaGenerarJWToken: RespuestaGenerarJWToken;
}

export interface RespuestaGenerarJWToken {
  FechaTransaccionUTC: Date;
  Estado: string;
  id: string;
  ReferenciaInfo: ReferenciaInfo;
  InformacionDeAutenticacionDeInvocacion: InformacionDeAutenticacionDeInvocacion;
}

export interface InformacionDeAutenticacionDeInvocacion {
  accessToken: string;
  UrlParaCollecionDeDatos: string;
  referenceId: string;
  token: string;
}

export interface ReferenciaInfo {
  Codigo: string;
}

export type GwGenerarJWTokenEBS_Respuesta = EncabezadoRespuestaInterna &
  GwGenerarJWTokenEBS_Salida;
