import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function AltaSolicitudDeServicio_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "AltaSolicitudDeServicioRest",
    rutaEndPoint: "/EnterpriseServices/Sel/AltaSolicitudDeServicioRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA
export interface AltaSolicitudDeServicio_Entrada {
  SolicitudDeServicio: SolicitudDeServicio;
}

export function builtAltaSolicitudDeServicio_Entrada(
  l_SolicitudDeServicio: SolicitudDeServicio
) {
  var retorno: AltaSolicitudDeServicio_Entrada = {
    SolicitudDeServicio: l_SolicitudDeServicio,
  };

  return retorno;
}

export interface SolicitudDeServicio {
  Cuenta: string | null;
  Area: string | null;
  SubArea: string | null;
  Descripcion: string | null;
  TarjetaInteligente: string | null;
  ContactoRowId: string | null;
  MailConfirmacion: string | null;
  Pais: string | null;
  TipoCuenta: string | null;
  NombreSuscriptor: string | null;
  DatosFiscales: DatosFiscales | null;
  Direccion: Direccion | null;
  ContratacionServicios: ContratacionServicios | null;
  CompraControlRemoto: CompraControlRemoto | null;
  ActivaRemoteBooking: ActivaRemoteBooking | null;
  InfoPPE: InfoPPE | null;
  Pagos: Pagos | null;
  CambioFormaPago: CambioFormaPago | null;
  Sistema: string | null;
  idSesion: string | null;
}

export function builtSolicitudDeServicio(
  l_Cuenta: string | null,
  l_Area: string | null,
  l_SubArea: string | null,
  l_Descripcion: string | null,
  l_TarjetaInteligente: string | null,
  l_ContactoRowId: string | null,
  l_MailConfirmacion: string | null,
  l_Pais: string | null,
  l_TipoCuenta: string | null,
  l_NombreSuscriptor: string | null,
  l_DatosFiscales: DatosFiscales | null,
  l_Direccion: Direccion | null,
  l_ContratacionServicios: ContratacionServicios | null,
  l_CompraControlRemoto: CompraControlRemoto | null,
  l_ActivaRemoteBooking: ActivaRemoteBooking | null,
  l_InfoPPE: InfoPPE | null,
  l_Pagos: Pagos | null,
  l_CambioFormaPago: CambioFormaPago | null,
  l_Sistema: string | null,
  l_idSesion: string | null
) {
  var retorno: SolicitudDeServicio = {
    Cuenta: l_Cuenta,
    Area: l_Area,
    SubArea: l_SubArea,
    Descripcion: l_Descripcion,
    TarjetaInteligente: l_TarjetaInteligente,
    ContactoRowId: l_ContactoRowId,
    MailConfirmacion: l_MailConfirmacion,
    Pais: l_Pais,
    TipoCuenta: l_TipoCuenta,
    NombreSuscriptor: l_NombreSuscriptor,
    DatosFiscales: l_DatosFiscales,
    Direccion: l_Direccion,
    ContratacionServicios: l_ContratacionServicios,
    CompraControlRemoto: l_CompraControlRemoto,
    ActivaRemoteBooking: l_ActivaRemoteBooking,
    InfoPPE: l_InfoPPE,
    Pagos: l_Pagos,
    CambioFormaPago: l_CambioFormaPago,
    Sistema: l_Sistema,
    idSesion: l_idSesion,
  };

  return retorno;
}

export interface ActivaRemoteBooking {
  Channel: string;
  MethodType: string;
  RecurringFlag: string;
  StartTime: string;
  ExpirationTime: string;
  Duration: string;
  EventID: string;
  RecordingType: string;
  RecordConfiguration: string;
  ProductCategory: string;
}
export function builtActivaRemoteBooking(
  l_Channel: string,
  l_MethodType: string,
  l_RecurringFlag: string,
  l_StartTime: string,
  l_ExpirationTime: string,
  l_Duration: string,
  l_EventID: string,
  l_RecordingType: string,
  l_RecordConfiguration: string,
  l_ProductCategory: string
) {
  var retorno: ActivaRemoteBooking = {
    Channel: l_Channel,
    MethodType: l_MethodType,
    RecurringFlag: l_RecurringFlag,
    StartTime: l_StartTime,
    ExpirationTime: l_ExpirationTime,
    Duration: l_Duration,
    EventID: l_EventID,
    RecordingType: l_RecordingType,
    RecordConfiguration: l_RecordConfiguration,
    ProductCategory: l_ProductCategory,
  };

  return retorno;
}

export interface CambioFormaPago {
  FechaExpiracion: string;
  NombreTarjetabiente: string;
  NumeroTarjeta: string;
  CodigoSeguridad: string;
  TipoTarjeta: string;
  NombreProducto: string;
  PaqueteActual: string;
  AceptaBeneficio: string;
}
export function builtCambioFormaPago(
  l_FechaExpiracion: string,
  l_NombreTarjetabiente: string,
  l_NumeroTarjeta: string,
  l_CodigoSeguridad: string,
  l_TipoTarjeta: string,
  l_NombreProducto: string,
  l_PaqueteActual: string,
  l_AceptaBeneficio: string
) {
  var retorno: CambioFormaPago = {
    FechaExpiracion: l_FechaExpiracion,
    NombreTarjetabiente: l_NombreTarjetabiente,
    NumeroTarjeta: l_NumeroTarjeta,
    CodigoSeguridad: l_CodigoSeguridad,
    TipoTarjeta: l_TipoTarjeta,
    NombreProducto: l_NombreProducto,
    PaqueteActual: l_PaqueteActual,
    AceptaBeneficio: l_AceptaBeneficio,
  };

  return retorno;
}

export interface CompraControlRemoto {
  NombreControl: string;
  BanderaDomicilioActual: string;
  IDControlRemoto: string;
  ImagenControlRemoto: string;
  ManualControlRemoto: string;
}
export function builtCompraControlRemoto(
  l_NombreControl: string,
  l_BanderaDomicilioActual: string,
  l_IDControlRemoto: string,
  l_ImagenControlRemoto: string,
  l_ManualControlRemoto: string
) {
  var retorno: CompraControlRemoto = {
    NombreControl: l_NombreControl,
    BanderaDomicilioActual: l_BanderaDomicilioActual,
    IDControlRemoto: l_IDControlRemoto,
    ImagenControlRemoto: l_ImagenControlRemoto,
    ManualControlRemoto: l_ManualControlRemoto,
  };

  return retorno;
}

export interface ContratacionServicios {
  PaqueteActual: string;
  ServicioAContratar: string;
  NombreCanalALaCarta: string;
  NoCanalALaCarta: string;
  PrecioCanalALaCarta: string;
  PenalizacionVETVCA: string;
}
export function builtContratacionServicios(
  l_PaqueteActual: string,
  l_ServicioAContratar: string,
  l_NombreCanalALaCarta: string,
  l_NoCanalALaCarta: string,
  l_PrecioCanalALaCarta: string,
  l_PenalizacionVETVCA: string
) {
  var retorno: ContratacionServicios = {
    PaqueteActual: l_PaqueteActual,
    ServicioAContratar: l_ServicioAContratar,
    NombreCanalALaCarta: l_NombreCanalALaCarta,
    NoCanalALaCarta: l_NoCanalALaCarta,
    PrecioCanalALaCarta: l_PrecioCanalALaCarta,
    PenalizacionVETVCA: l_PenalizacionVETVCA,
  };

  return retorno;
}

export interface DatosFiscales {
  RFC: string;
  RazonSocial: string;
  Compania: string;
  TipoFactura: string;
  MetodoEnvio: string;
}

export function builtDatosFiscales(
  l_RFC: string,
  l_RazonSocial: string,
  l_Compania: string,
  l_TipoFactura: string,
  l_MetodoEnvio: string
) {
  var retorno: DatosFiscales = {
    RFC: l_RFC,
    RazonSocial: l_RazonSocial,
    Compania: l_Compania,
    TipoFactura: l_TipoFactura,
    MetodoEnvio: l_MetodoEnvio,
  };

  return retorno;
}

export interface Direccion {
  Estado: string;
  Poblacion: string;
  DelMun: string;
  Colonia: string;
  CP: string;
  Calle: string;
  NoExt: string;
  NoInt: string;
}

export function builtDireccion(
  l_Estado: string,
  l_Poblacion: string,
  l_DelMun: string,
  l_Colonia: string,
  l_CP: string,
  l_Calle: string,
  l_NoExt: string,
  l_NoInt: string
) {
  var retorno: Direccion = {
    Estado: l_Estado,
    Poblacion: l_Poblacion,
    DelMun: l_DelMun,
    Colonia: l_Colonia,
    CP: l_CP,
    Calle: l_Calle,
    NoExt: l_NoExt,
    NoInt: l_NoInt,
  };

  return retorno;
}

export interface InfoPPE {
  NombreDelEvento: string;
  TipoEvento: string;
  Costo: string;
  MailFechaInicio: string;
  MailFechaTermino: string;
  CanalDisplay: string;
  Canal: string;
  IDEvento: string;
  FechaExpiracion: string;
  FechaInicio: string;
  Duracion: string;
  ZonaHoraria: string;
  TokenOverride: string;
  TokenValue: string;
  ppvGenreId: string;
  providerEventId: string;
  orderType: string;
  SKYTrackingId: string;
}

export function builtInfoPPE(
  l_NombreDelEvento: string,
  l_TipoEvento: string,
  l_Costo: string,
  l_MailFechaInicio: string,
  l_MailFechaTermino: string,
  l_CanalDisplay: string,
  l_Canal: string,
  l_IDEvento: string,
  l_FechaExpiracion: string,
  l_FechaInicio: string,
  l_Duracion: string,
  l_ZonaHoraria: string,
  l_TokenOverride: string,
  l_TokenValue: string,
  l_ppvGenreId: string,
  l_providerEventId: string,
  l_orderType: string,
  l_SKYTrackingId: string
) {
  var retorno: InfoPPE = {
    NombreDelEvento: l_NombreDelEvento,
    TipoEvento: l_TipoEvento,
    Costo: l_Costo,
    MailFechaInicio: l_MailFechaInicio,
    MailFechaTermino: l_MailFechaTermino,
    CanalDisplay: l_CanalDisplay,
    Canal: l_Canal,
    IDEvento: l_IDEvento,
    FechaExpiracion: l_FechaExpiracion,
    FechaInicio: l_FechaInicio,
    Duracion: l_Duracion,
    ZonaHoraria: l_ZonaHoraria,
    TokenOverride: l_TokenOverride,
    TokenValue: l_TokenValue,
    ppvGenreId: l_ppvGenreId,
    providerEventId: l_providerEventId,
    orderType: l_orderType,
    SKYTrackingId: l_SKYTrackingId,
  };

  return retorno;
}

export interface Pagos {
  MontopPago: string;
  FechaPago: string;
  MetodoPago: string;
  DatosTDC: DatosTDC;
  RespuestaACI: RespuestaACI;
}

export function builtPagos(
  l_MontopPago: string,
  l_FechaPago: string,
  l_MetodoPago: string,
  l_DatosTDC: DatosTDC,
  l_RespuestaACI: RespuestaACI
) {
  var retorno: Pagos = {
    MontopPago: l_MontopPago,
    FechaPago: l_FechaPago,
    MetodoPago: l_MetodoPago,
    DatosTDC: l_DatosTDC,
    RespuestaACI: l_RespuestaACI,
  };

  return retorno;
}

export interface DatosTDC {
  NoTarjeta: string;
  FechaExpiracion: string;
  NombreTarjetabiente: string;
  MesExpiracion: string;
  AnioExpiracion: string;
  TipoTarjeta: string;
}

export function builtDatosTDC(
  l_NoTarjeta: string,
  l_FechaExpiracion: string,
  l_NombreTarjetabiente: string,
  l_MesExpiracion: string,
  l_AnioExpiracion: string,
  l_TipoTarjeta: string
) {
  var retorno: DatosTDC = {
    NoTarjeta: l_NoTarjeta,
    FechaExpiracion: l_FechaExpiracion,
    NombreTarjetabiente: l_NombreTarjetabiente,
    MesExpiracion: l_MesExpiracion,
    AnioExpiracion: l_AnioExpiracion,
    TipoTarjeta: l_TipoTarjeta,
  };

  return retorno;
}

export interface RespuestaACI {
  CodigoRespuesta: string;
  CodigoAutorizacion: string;
  FechaAutorizacion: string;
  CodigoMoneda: string;
  PagoAplicado: string;
  MotivoRechazo: string;
  NoReferencia: string;
  EstatusPago: string;
}

export function builtRespuestaACI(
  l_CodigoRespuesta: string,
  l_CodigoAutorizacion: string,
  l_FechaAutorizacion: string,
  l_CodigoMoneda: string,
  l_PagoAplicado: string,
  l_MotivoRechazo: string,
  l_NoReferencia: string,
  l_EstatusPago: string
) {
  var retorno: RespuestaACI = {
    CodigoRespuesta: l_CodigoRespuesta,
    CodigoAutorizacion: l_CodigoAutorizacion,
    FechaAutorizacion: l_FechaAutorizacion,
    CodigoMoneda: l_CodigoMoneda,
    PagoAplicado: l_PagoAplicado,
    MotivoRechazo: l_MotivoRechazo,
    NoReferencia: l_NoReferencia,
    EstatusPago: l_EstatusPago,
  };

  return retorno;
}



//SALIDA
export interface AltaSolicitudDeServicio_Salida {
    resultado:       string;
    resultadodesc:   string;
    NumeroSolicitud: string;
}


export type AltaSolicitudDeServicio_Respuesta = AltaSolicitudDeServicio_Salida;