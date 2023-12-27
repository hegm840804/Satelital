import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function EvaluarRiesgo_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "EvaluarRiesgoOsbPciABCS",
    rutaEndPoint: "/GwEvaluarRiesgoEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendBilletera,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface EvaluarRiesgo_Entrada {
  ComercioInfo: ComercioInfo;
  AgregadorDePagoInfo: AgregadorDePagoInfo;
  OrdenInfo: OrdenInfo;
  PagoInfo: PagoInfo;
  DatosComerciante: DatosComerciante;
  DireccionIP: string;
  SesionId: string;
}

export function builtEvaluarRiesgo_Entrada(
  p_ComercioInfo: ComercioInfo,
  p_AgregadorDePagoInfo: AgregadorDePagoInfo,
  p_OrdenInfo: OrdenInfo,
  p_PagoInfo: PagoInfo,
  p_DatosComerciante: DatosComerciante,
  p_DireccionIP: string,
  p_SesionId: string
) {
  var retorno: EvaluarRiesgo_Entrada = {
    ComercioInfo: p_ComercioInfo,
    AgregadorDePagoInfo: p_AgregadorDePagoInfo,
    OrdenInfo: p_OrdenInfo,
    PagoInfo: p_PagoInfo,
    DatosComerciante: p_DatosComerciante,
    DireccionIP: p_DireccionIP,
    SesionId: p_SesionId,
  };

  return retorno;
}

export interface AgregadorDePagoInfo {
  AgregadorDePagoId: string;
  Nombre: string;
  SubComercianteInfo: SubComercianteInfo;
}

export function builtAgregadorDePagoInfo(
  p_AgregadorDePagoId: string,
  p_Nombre: string,
  p_SubComercianteInfo: SubComercianteInfo
) {
  var retorno: AgregadorDePagoInfo = {
    AgregadorDePagoId: p_AgregadorDePagoId,
    Nombre: p_Nombre,
    SubComercianteInfo: p_SubComercianteInfo,
  };

  return retorno;
}

export interface SubComercianteInfo {
  TarjetaDePagoId: string;
  Nombre: string;
  NumeroTelefonico: string;
  Pais: string;
  Region: string;
  CodigoPostal: string;
  Localidad: string;
  AreaAdministrativa: string;
  Email: string;
}

export function builtSubComercianteInfo(
  p_TarjetaDePagoId: string,
  p_Nombre: string,
  p_NumeroTelefonico: string,
  p_Pais: string,
  p_Region: string,
  p_CodigoPostal: string,
  p_Localidad: string,
  p_AreaAdministrativa: string,
  p_Email: string
) {
  var retorno: SubComercianteInfo = {
    TarjetaDePagoId: p_TarjetaDePagoId,
    Nombre: p_Nombre,
    NumeroTelefonico: p_NumeroTelefonico,
    Pais: p_Pais,
    Region: p_Region,
    CodigoPostal: p_CodigoPostal,
    Localidad: p_Localidad,
    AreaAdministrativa: p_AreaAdministrativa,
    Email: p_Email,
  };

  return retorno;
}

export interface ComercioInfo {
  ComercioId: string;
  CodigoSKY: string;
  TransaccionId: string;
  IndicadorComercio: string;
}

export function builtComercioInfo(
  p_ComercioId: string,
  p_CodigoSKY: string,
  p_TransaccionId: string,
  p_IndicadorComercio: string
) {
  var retorno: ComercioInfo = {
    ComercioId: p_ComercioId,
    CodigoSKY: p_CodigoSKY,
    TransaccionId: p_TransaccionId,
    IndicadorComercio: p_IndicadorComercio,
  };

  return retorno;
}

export interface DatosComerciante {
  Parametro: Parametro[];
}

export function builtDatosComerciante(p_Parametro: Parametro[]) {
  var retorno: DatosComerciante = {
    Parametro: p_Parametro,
  };

  return retorno;
}

export interface Parametro {
  NombreParametro: number;
  ValorParametro: string;
}

export function builtParametro(
  p_NombreParametro: number,
  p_ValorParametro: string
) {
  var retorno: Parametro = {
    NombreParametro: p_NombreParametro,
    ValorParametro: p_ValorParametro,
  };

  return retorno;
}

export interface OrdenInfo {
  DireccionFacturacion: DireccionFacturacion;
  DetalleMonto: DetalleMonto;
}

export function builtOrdenInfo(
  p_DireccionFacturacion: DireccionFacturacion,
  p_DetalleMonto: DetalleMonto
) {
  var retorno: OrdenInfo = {
    DireccionFacturacion: p_DireccionFacturacion,
    DetalleMonto: p_DetalleMonto,
  };

  return retorno;
}

export interface DetalleMonto {
  MontoTotal: string;
  MonedaISO: string;
}

export function builtDetalleMonto(
  p_CantidadTotal: string,
  p_Moneda: string
) {
  var retorno: DetalleMonto = {
    MontoTotal: p_CantidadTotal,
    MonedaISO: p_Moneda,
  };

  return retorno;
}

export interface DireccionFacturacion {
  Nombre: string;
  ApellidoMaterno: string;
  ApellidoPaterno: string;
  Cia: string;
  Direccion1: string;
  Direccion2: string;
  Localidad: string;
  AreaAdministrativa: string;
  CodigoPostal: string;
  Pais: string;
  Telefono: string;
  Email: string;
}

export function builtDireccionFacturacion(
  p_Nombre: string,
  p_ApellidoMaterno: string,
  p_ApellidoPaterno: string,
  p_Cia: string,
  p_Direccion1: string,
  p_Direccion2: string,
  p_Localidad: string,
  p_AreaAdministrativa: string,
  p_CodigoPostal: string,
  p_Pais: string,
  p_Telefono: string,
  p_Email: string
) {
  var retorno: DireccionFacturacion = {
    Nombre: p_Nombre,
    ApellidoMaterno: p_ApellidoMaterno,
    ApellidoPaterno: p_ApellidoPaterno,
    Cia: p_Cia,
    Direccion1: p_Direccion1,
    Direccion2: p_Direccion2,
    Localidad: p_Localidad,
    AreaAdministrativa: p_AreaAdministrativa,
    CodigoPostal: p_CodigoPostal,
    Pais: p_Pais,
    Telefono: p_Telefono,
    Email: p_Email,
  };

  return retorno;
}

export interface PagoInfo {
  DatosTarjeta: DatosTarjeta;
  InstrumentoDePago: InstrumentoDePago;
}

export function builtPagoInfo(
  p_DatosTarjeta: DatosTarjeta,
  p_InstrumentoDePago: InstrumentoDePago
) {
  var retorno: PagoInfo = {
    DatosTarjeta: p_DatosTarjeta,
    InstrumentoDePago: p_InstrumentoDePago,
  };

  return retorno;
}

export interface DatosTarjeta {
  MesDeExpiracion: string;
  AnioDeExpiracion: string;
  Tipo: string;
  Numero: string;
}

export function builtDatosTarjeta(
  p_MesDeExpiracion: string,
  p_AnioDeExpiracion: string,
  p_Tipo: string,
  p_Numero: string
) {
  var retorno: DatosTarjeta = {
    MesDeExpiracion: p_MesDeExpiracion,
    AnioDeExpiracion: p_AnioDeExpiracion,
    Tipo: p_Tipo,
    Numero: p_Numero,
  };

  return retorno;
}

export interface InstrumentoDePago {
  InstrumentoDePagoId: string;
}

export function builtInstrumentoDePago(p_InstrumentoDePagoId: string) {
  var retorno: InstrumentoDePago = {
    InstrumentoDePagoId: p_InstrumentoDePagoId,
  };

  return retorno;
}

export function buildNumberAndValuerparams(l_afiliacion: string) {
  var retorno: Parametro[];

  retorno = [
    builtParametro(1, `${l_afiliacion}`),
    builtParametro(
      2,
      `${validarNulosYIndefinidios(sessionStorage.getItem("cuenta"))}`
    ),
    builtParametro(
      10,
      `${validarNulosYIndefinidios(sessionStorage.getItem("Paquete"))}`
    ),
    builtParametro(
      11,
      `${validarNulosYIndefinidios(sessionStorage.getItem("CountryPais"))}`
    ),
    builtParametro(
      12,
      `${validarNulosYIndefinidios(sessionStorage.getItem("StateEstado"))}`
    ),
    builtParametro(
      13,
      `${validarNulosYIndefinidios(sessionStorage.getItem("CountyDelMun"))}`
    ),
    builtParametro(
      14,
      `${validarNulosYIndefinidios(sessionStorage.getItem("ProvinceColonia"))}`
    ),
    builtParametro(
      15,
      `${validarNulosYIndefinidios(sessionStorage.getItem("StreetAddrCalle"))}`
    ),
    builtParametro(
      16,
      `${validarNulosYIndefinidios(sessionStorage.getItem("NumInt"))}`
    ),
    builtParametro(
      17,
      `${validarNulosYIndefinidios(sessionStorage.getItem("AddrNumNumExt"))}`
    ),
    builtParametro(
      18,
      `${validarNulosYIndefinidios(sessionStorage.getItem("PostalCodeCP"))}`
    ),
    builtParametro(
      19,
      `${validarNulosYIndefinidios(
        sessionStorage.getItem("TelCasaLada")
      )}${validarNulosYIndefinidios(sessionStorage.getItem("TelCasa"))}`
    ),
    builtParametro(
      20,
      `${validarNulosYIndefinidios(
        sessionStorage.getItem("TelTrabLada")
      )}${validarNulosYIndefinidios(sessionStorage.getItem("TelTrab"))}`
    ),
    builtParametro(
      21,
      `${validarNulosYIndefinidios(
        sessionStorage.getItem("TelMovilLada")
      )}${validarNulosYIndefinidios(sessionStorage.getItem("TelMovil"))}`
    ),
    builtParametro(
      22,
      `${validarNulosYIndefinidios(sessionStorage.getItem("EmailNotif"))}`
    ),
    builtParametro(24, "SEL"),
    builtParametro(25, "PAGO_UNICO"),
  ];
  return retorno;
}

const validarNulosYIndefinidios = (param: any) => {
  var retorno: string = "";
  if (param != null && typeof param != "undefined") {
    retorno = param;
  } else {
    retorno = "";
  }

  return retorno;
};

//SALIDA

export interface EvaluarRiesgo_Salida {
  EBMHeaderResponse: EBMHeaderResponse;
  CodigoSKY: string;
  FechaTransaccionUTC: string;
  TokenAutenticacion: string;
  TransaccionId: string;
  InstrumentoDePago: InstrumentoDePago;
  EstatusRiesgo: string;
}

export interface EBMHeaderResponse {
  ErrorTecnico: ErrorTecnico;
  ErrorNegocio: ErrorNegocio;
}

export interface ErrorNegocio {
  Estado: string;
  CodigoError: string;
  DescripcionError: string;
}

export interface ErrorTecnico {
  code: string;
  summary: Detail;
  detail: Detail;
  Sistema: string;
}

export interface Detail {}

export interface InstrumentoDePago {
  InstrumentoDePagoId: string;
}

/*export function  {
  var retorno: EvaluarRiesgo_Entrada = builtEvaluarRiesgoEntrada(
    l_SesionId,
    l_DireccionIP,
    builtPagoInfo(builtInstrumentoDePago(l_InstrumentoDePagoId)),
    builtOrdenInfo(builtDetalleMonto(l_MontoTotal, l_MonedaISO)),
    builtComercioInfo(l_ComercioId, l_CodigoSKY, l_IndicadorComercio),
    l_DatosComerciante
  );

  return retorno;
}

//--ENTRADA

export interface EvaluarRiesgo_Entrada {
  SesionId: string;
  DireccionIP: string;
  PagoInfo: PagoInfo;
  OrdenInfo: OrdenInfo;
  ComercioInfo: ComercioInfo;
  DatosComerciante: DatosComerciante;
}

export function builtEvaluarRiesgoEntrada(
  l_SesionId: string,
  l_DireccionIP: string,
  l_PagoInfo: PagoInfo,
  l_OrdenInfo: OrdenInfo,
  l_ComercioInfo: ComercioInfo,
  l_DatosComerciante: DatosComerciante
) {
  var retorno: EvaluarRiesgo_Entrada = {
    SesionId: l_SesionId,
    DireccionIP:l_DireccionIP,
    PagoInfo: l_PagoInfo,
    OrdenInfo: l_OrdenInfo,
    ComercioInfo: l_ComercioInfo,
    DatosComerciante: l_DatosComerciante,
  };

  return retorno;
}

export interface ComercioInfo {
  ComercioId: string;
  CodigoSKY: string;
  IndicadorComercio: string;
}

export function builtComercioInfo(
  l_ComercioId: string,
  l_CodigoSKY: string,
  l_IndicadorComercio: string
) {
  var retorno: ComercioInfo = {
    ComercioId: l_ComercioId,
    CodigoSKY: l_CodigoSKY,
    IndicadorComercio: l_IndicadorComercio,
  };

  return retorno;
}

export interface DatosComerciante {
  Parametro: Parametro[];
}

export function builtDatosComerciante(l_Parametro: Parametro[]) {
  var retorno: DatosComerciante = {
    Parametro: l_Parametro,
  };

  return retorno;
}

export interface Parametro {
  NombreParametro: string;
  ValorParametro: string;
}

export function builtParametro(
  l_NombreParametro: string,
  l_ValorParametro: string
) {
  var retorno: Parametro = {
    NombreParametro: l_NombreParametro,
    ValorParametro: l_ValorParametro,
  };

  return retorno;
}

export interface OrdenInfo {
  DetalleMonto: DetalleMonto;
}

export function builtOrdenInfo(l_DetalleMonto: DetalleMonto) {
  var retorno: OrdenInfo = {
    DetalleMonto: l_DetalleMonto,
  };

  return retorno;
}

export interface DetalleMonto {
  MontoTotal: string;
  MonedaISO: string;
}

export function builtDetalleMonto(l_MontoTotal: string, l_MonedaISO: string) {
  var retorno: DetalleMonto = {
    MontoTotal: l_MontoTotal,
    MonedaISO: l_MonedaISO,
  };

  return retorno;
}

export interface PagoInfo {
  InstrumentoDePago: InstrumentoDePago;
}

export function builtPagoInfo(l_InstrumentoDePago: InstrumentoDePago) {
  var retorno: PagoInfo = {
    InstrumentoDePago: l_InstrumentoDePago,
  };

  return retorno;
}

export interface InstrumentoDePago {
  InstrumentoDePagoId: string;
}

export function builtInstrumentoDePago(l_InstrumentoDePagoId: string) {
  var retorno: InstrumentoDePago = {
    InstrumentoDePagoId: l_InstrumentoDePagoId,
  };

  return retorno;
}









//--SALIDA

export interface EvaluarRiesgo_Salida {
  CodigoSKY: string;
  FechaTransaccionUTC: Date;
  TokenAutenticacion: string;
  TransaccionId: string;
  InstrumentoDePago: InstrumentoDePago;
  EstatusRiesgo: string;
}

export interface InstrumentoDePago {
  InstrumentoDePagoId: string;
}

const validarNulosYIndefinidios = (param: any) => {
  var retorno: string = "";
  if (param != null && typeof param != "undefined") {
    retorno = param;
  } else {
    retorno = "";
  }

  return retorno;
};

//validarNulosYIndefinidios(param: any)

*/

export type EvaluarRiesgo_Respuesta = EncabezadoRespuestaInterna &
  EvaluarRiesgo_Salida;
