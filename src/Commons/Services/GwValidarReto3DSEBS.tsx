import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GwValidarReto3DSEBS_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GwValidarReto3DSEBS",
    rutaEndPoint: "/GwValidarReto3DSEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export function builtGwValidarReto3DSEBSInput(
  p_ModoTransaccion: string,
  p_TransaccionId: string,
  p_TelefonoMovil: number,
  p_Id: string,
  p_CantidadTotal: number,
  p_Moneda: string,
  p_ComercioId: string,
  p_CodigoSKY: string
) {
  var retorno: GwValidarReto3DSEBS_Entrada = builtGwValidarReto3DSEBS_Entrada(
    builtComercioInfo(p_ComercioId, p_CodigoSKY),
    builtOrdenInfo(builtDetallesCantidad(p_CantidadTotal, p_Moneda)),
    builtInstrumentoDePagoInfo(p_Id),
    builtCompradorInfo(p_TelefonoMovil),
    builtAutenticacionInfo(p_ModoTransaccion, p_TransaccionId)
  );

  return retorno;
}

export interface GwValidarReto3DSEBS_Entrada {
  ComercioInfo: ComercioInfo;
  OrdenInfo: OrdenInfo;
  InstrumentoDePagoInfo: InstrumentoDePagoInfo;
  CompradorInfo: CompradorInfo;
  AutenticacionInfo: AutenticacionInfo;
}

export function builtGwValidarReto3DSEBS_Entrada(
  p_ComercioInfo: ComercioInfo,
  p_OrdenInfo: OrdenInfo,
  p_InstrumentoDePagoInfo: InstrumentoDePagoInfo,
  p_CompradorInfo: CompradorInfo,
  p_AutenticacionInfo: AutenticacionInfo
) {
  var retorno: GwValidarReto3DSEBS_Entrada = {
    ComercioInfo: p_ComercioInfo,
    OrdenInfo: p_OrdenInfo,
    InstrumentoDePagoInfo: p_InstrumentoDePagoInfo,
    CompradorInfo: p_CompradorInfo,
    AutenticacionInfo: p_AutenticacionInfo,
  };

  return retorno;
}

export interface AutenticacionInfo {
  ModoTransaccion: string;
  TransaccionId: string;
}

export function builtAutenticacionInfo(
  p_ModoTransaccion: string,
  p_TransaccionId: string
) {
  var retorno: AutenticacionInfo = {
    ModoTransaccion: p_ModoTransaccion,
    TransaccionId: p_TransaccionId,
  };

  return retorno;
}

export interface ComercioInfo {
  ComercioId: string;
  CodigoSKY: string;
}

export function builtComercioInfo(p_ComercioId: string, p_CodigoSKY: string) {
  var retorno: ComercioInfo = {
    ComercioId: p_ComercioId,
    CodigoSKY: p_CodigoSKY,
  };

  return retorno;
}

export interface CompradorInfo {
  TelefonoMovil: number;
}

export function builtCompradorInfo(p_TelefonoMovil: number) {
  var retorno: CompradorInfo = {
    TelefonoMovil: p_TelefonoMovil,
  };

  return retorno;
}

export interface InstrumentoDePagoInfo {
  Id: string;
}

export function builtInstrumentoDePagoInfo(p_Id: string) {
  var retorno: InstrumentoDePagoInfo = {
    Id: p_Id,
  };

  return retorno;
}

export interface OrdenInfo {
  DetallesCantidad: DetallesCantidad;
}

export function builtOrdenInfo(p_DetallesCantidad: DetallesCantidad) {
  var retorno: OrdenInfo = {
    DetallesCantidad: p_DetallesCantidad,
  };

  return retorno;
}

export interface DetallesCantidad {
  CantidadTotal: number;
  Moneda: string;
}

export function builtDetallesCantidad(
  p_CantidadTotal: number,
  p_Moneda: string
) {
  var retorno: DetallesCantidad = {
    CantidadTotal: p_CantidadTotal,
    Moneda: p_Moneda,
  };

  return retorno;
}

//SALIDA
export interface GwValidarReto3DSEBS_Salida {
  RespuestaGenerarReto: RespuestaGenerarReto;
}

export interface RespuestaGenerarReto {
  FechaTransaccionUTC: Date;
  Estado: string;
  id: string;
  EstadoSky: EstadoSky;
  ReferenciaInfo: ReferenciaInfo;
  InformacionDeAutenticacion: InformacionDeAutenticacion;
  InformacionDePago: InformacionDePago;
}

export interface EstadoSky {
  Id: string;
  Mensaje: string;
  Estado: string;
}

export interface InformacionDeAutenticacion {
  xid: null;
  authenticationTransactionId: null;
  veresEnrolled: null;
  specificationVersion: string;
  token: string;
  ecommerceIndicator: null;
  eciRaw: string;
  parRes: string;
  cavv: null;
  ucafCollectionIndicator: string;
  ucafAuthenticationData: null;
  directoryServerTransactionId: string;
}

export interface InformacionDePago {
  Tarjeta: Tarjeta;
}

export interface Tarjeta {
  Bin: number;
  Tipo: string;
}

export interface ReferenciaInfo {
  Codigo: string;
}

export type GwValidarReto3DSEBS_Respuesta = EncabezadoRespuestaInterna &
GwValidarReto3DSEBS_Salida;