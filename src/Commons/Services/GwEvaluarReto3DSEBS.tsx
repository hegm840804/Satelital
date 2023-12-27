import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GwEvaluarReto3DSEBS_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GwEvaluarReto3DSEBS",
    rutaEndPoint: "/GwEvaluarReto3DSEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export function builtRecargaConsultaPrecioRecargaInput(
  p_ComercioId: string,
  p_CodigoSKY: string,
  p_CantidadTotal: string,
  p_Moneda: string,
  p_Id: string,
  p_TelefonoMovil: string,
  p_ModoTransaccion: string,
  p_ReferenciaId: string,
  p_UrlDeRetorno: string,
  p_Canal: string
) {
  var retorno: GwEvaluarReto3DSEBS_Entrada = builtGwEvaluarReto3DSEBSEntrada(
    builtComercioInfo(p_ComercioId, p_CodigoSKY),
    builtOrdenInfo(builtDetallesCantidad(p_CantidadTotal, p_Moneda)),
    builtInstrumentoDePagoInfo(p_Id),
    builtCompradorInfo(p_TelefonoMovil),
    builtAutenticacionInfo(
      p_ModoTransaccion,
      p_ReferenciaId,
      p_UrlDeRetorno,
      p_Canal
    )
  );

  return retorno;
}

export interface GwEvaluarReto3DSEBS_Entrada {
  ComercioInfo: ComercioInfo;
  OrdenInfo: OrdenInfo;
  InstrumentoDePagoInfo: InstrumentoDePagoInfo;
  CompradorInfo: CompradorInfo;
  AutenticacionInfo: AutenticacionInfo;
}

export function builtGwEvaluarReto3DSEBSEntrada(
  p_ComercioInfo: ComercioInfo,
  p_OrdenInfo: OrdenInfo,
  p_InstrumentoDePagoInfo: InstrumentoDePagoInfo,
  p_CompradorInfo: CompradorInfo,
  p_AutenticacionInfo: AutenticacionInfo
) {
  var retorno: GwEvaluarReto3DSEBS_Entrada = {
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
  ReferenciaId: string;
  UrlDeRetorno: string;
  Canal: string;
}

export function builtAutenticacionInfo(
  p_ModoTransaccion: string,
  p_ReferenciaId: string,
  p_UrlDeRetorno: string,
  p_Canal: string
) {
  var retorno: AutenticacionInfo = {
    ModoTransaccion: p_ModoTransaccion,
    ReferenciaId: p_ReferenciaId,
    UrlDeRetorno: p_UrlDeRetorno,
    Canal: p_Canal,
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
  TelefonoMovil: string;
}

export function builtCompradorInfo(p_TelefonoMovil: string) {
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
  CantidadTotal: string;
  Moneda: string;
}

export function builtDetallesCantidad(
  p_CantidadTotal: string,
  p_Moneda: string
) {
  var retorno: DetallesCantidad = {
    CantidadTotal: p_CantidadTotal,
    Moneda: p_Moneda,
  };

  return retorno;
}

//SALIDA

export interface GwEvaluarReto3DSEBS_Salida {
  RespuestaGenerarReto: RespuestaGenerarReto;
}

export interface RespuestaGenerarReto {
  FechaTransaccionUTC: Date;
  Estado: string;
  id: string;
  EstadoSky: EstadoSky;
  ReferenciaInfo: ReferenciaInfo;
  ErrorInfo: ErrorInfo;
  InformacionDeAutenticacion: InformacionDeAutenticacion;
  InformacionDePago: InformacionDePago;
}

export interface ErrorInfo {
  Razon: string;
  Mensaje: string;
}

export interface EstadoSky {
  Id: string;
  Mensaje: string;
  Estado: string;
}

export interface InformacionDeAutenticacion {
  acsUrl: string;
  xid: string;
  stepUpUrl: string;
  authenticationTransactionId: string;
  pareq: string;
  veresEnrolled: string;
  proxyPan: number;
  authenticationPath: string;
  proofXml: string;
  specificationVersion: string;
  token: string;
  accessToken: string;
  ecommerceIndicator: null;
  eciRaw: null;
  parRes: null;
  cavv: null;
  ucafCollectionIndicator: null;
  ucafAuthenticationData: null;
  directoryServerTransactionId: null;
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


export type GwEvaluarReto3DSEBS_Respuesta = EncabezadoRespuestaInterna &
GwEvaluarReto3DSEBS_Salida;