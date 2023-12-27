import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function OrquestarProcesoPago_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "OrquestarProcesoPago",
    rutaEndPoint: "/GwOrquestarProcesoPagoPMPEBF",
    sistemaOrigen: "Web",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendBilletera,
    parametros: { ...datos },
  };

  return par;
}

export function OrquestarProcesoPago_Input(
  l_nombreEmpresaTransaccion: string,
  l_tipoTarjeta: string,
  l_cvvTarjeta: string,
  l_nombreTitularTarjeta: string,
  l_numeroTarjeta: string,
  l_fechaExpTarjeta: string,
  l_tipoOperacion: string,
  l_entidadBancaria: string,
  l_IdSesion: string,
  l_loginUsr: string,
  l_importePagoMonedaLocal: string,
  l_horaActual: string,
  l_fechaActual: string,
  l_importePago: string,
  l_comentarios: string,
  l_tipoCambio: string,
  l_CodigoSKY: string,
  l_Captura: string,
  l_codeStore: string,
  l_idTransaccion: string,
  l_MerchantId: string,
  l_numeroCuentaClienteSky: string,
  l_Token: string,
  l_tokenVoltage: string,
  l_tipoPago: string,
  l_EcommerceIndicator: string,
  l_pais: string,
  l_sistemaOrigenPago: string,
  l_propositoPago: string,
  l_codigoMoneda: string
) {
  var retorno: OrquestarProcesoPago_Entrada = {
    DatosTarjeta_Entrada: builtDatosTarjetaEntrada(
      l_nombreEmpresaTransaccion,
      l_tipoTarjeta,
      l_cvvTarjeta,
      l_nombreTitularTarjeta,
      l_numeroTarjeta,
      l_fechaExpTarjeta
    ),
    DatosTransaccion_Entrada: builtDatosTransaccionEntrada(
      l_tipoOperacion,
      l_entidadBancaria,
      l_IdSesion,
      l_loginUsr,
      l_importePagoMonedaLocal,
      l_horaActual,
      l_fechaActual,
      l_importePago,
      l_comentarios,
      l_tipoCambio,
      l_CodigoSKY,
      l_Captura,
      l_codeStore,
      l_idTransaccion,
      l_MerchantId,
      l_numeroCuentaClienteSky,
      l_Token,
      l_tokenVoltage,
      l_tipoPago,
      l_EcommerceIndicator,
      l_pais,
      l_sistemaOrigenPago,
      l_propositoPago,
      l_codigoMoneda
    ),
  };

  return retorno;
}

//ENTRADA
export interface OrquestarProcesoPago_Entrada {
  DatosTarjeta_Entrada: DatosTarjetaEntrada;
  DatosTransaccion_Entrada: DatosTransaccionEntrada;
}

export function OrquestarProcesoPago_Entrada(
  l_DatosTarjeta_Entrada: DatosTarjetaEntrada,
  l_DatosTransaccion_Entrada: DatosTransaccionEntrada
) {
  var retorno: OrquestarProcesoPago_Entrada = {
    DatosTarjeta_Entrada: l_DatosTarjeta_Entrada,
    DatosTransaccion_Entrada: l_DatosTransaccion_Entrada,
  };

  return retorno;
}

export interface DatosTarjetaEntrada {
  nombreEmpresaTransaccion: string;
  tipoTarjeta: string;
  cvvTarjeta: string;
  nombreTitularTarjeta: string;
  numeroTarjeta: string;
  fechaExpTarjeta: string;
}

export function builtDatosTarjetaEntrada(
  l_nombreEmpresaTransaccion: string,
  l_tipoTarjeta: string,
  l_cvvTarjeta: string,
  l_nombreTitularTarjeta: string,
  l_numeroTarjeta: string,
  l_fechaExpTarjeta: string
) {
  var retorno: DatosTarjetaEntrada = {
    nombreEmpresaTransaccion: l_nombreEmpresaTransaccion,
    tipoTarjeta: l_tipoTarjeta,
    cvvTarjeta: l_cvvTarjeta,
    nombreTitularTarjeta: l_nombreTitularTarjeta,
    numeroTarjeta: l_numeroTarjeta,
    fechaExpTarjeta: l_fechaExpTarjeta,
  };

  return retorno;
}

export interface DatosTransaccionEntrada {
  tipoOperacion: string;
  entidadBancaria: string;
  IdSesion: string;
  loginUsr: string;
  importePagoMonedaLocal: string;
  horaActual: string;
  fechaActual: string;
  importePago: string;
  comentarios: string;
  tipoCambio: string;
  CodigoSKY: string;
  Captura: string;
  codeStore: string;
  idTransaccion: string;
  MerchantId: string;
  numeroCuentaClienteSky: string;
  Token: string;
  tokenVoltage: string;
  tipoPago: string;
  EcommerceIndicator: string;
  pais: string;
  sistemaOrigenPago: string;
  propositoPago: string;
  codigoMoneda: string;
}

export function builtDatosTransaccionEntrada(
  l_tipoOperacion: string,
  l_entidadBancaria: string,
  l_IdSesion: string,
  l_loginUsr: string,
  l_importePagoMonedaLocal: string,
  l_horaActual: string,
  l_fechaActual: string,
  l_importePago: string,
  l_comentarios: string,
  l_tipoCambio: string,
  l_CodigoSKY: string,
  l_Captura: string,
  l_codeStore: string,
  l_idTransaccion: string,
  l_MerchantId: string,
  l_numeroCuentaClienteSky: string,
  l_Token: string,
  l_tokenVoltage: string,
  l_tipoPago: string,
  l_EcommerceIndicator: string,
  l_pais: string,
  l_sistemaOrigenPago: string,
  l_propositoPago: string,
  l_codigoMoneda: string
) {
  var retorno: DatosTransaccionEntrada = {
    tipoOperacion: l_tipoOperacion,
    entidadBancaria: l_entidadBancaria,
    IdSesion: l_IdSesion,
    loginUsr: l_loginUsr,
    importePagoMonedaLocal: l_importePagoMonedaLocal,
    horaActual: l_horaActual,
    fechaActual: l_fechaActual,
    importePago: l_importePago,
    comentarios: l_comentarios,
    tipoCambio: l_tipoCambio,
    CodigoSKY: l_CodigoSKY,
    Captura: l_Captura,
    codeStore: l_codeStore,
    idTransaccion: l_idTransaccion,
    MerchantId: l_MerchantId,
    numeroCuentaClienteSky: l_numeroCuentaClienteSky,
    Token: l_Token,
    tokenVoltage: l_tokenVoltage,
    tipoPago: l_tipoPago,
    EcommerceIndicator: l_EcommerceIndicator,
    pais: l_pais,
    sistemaOrigenPago: l_sistemaOrigenPago,
    propositoPago: l_propositoPago,
    codigoMoneda: l_codigoMoneda,
  };

  return retorno;
}

//SALIUDA
export interface OrquestarProcesoPago_Salida {
    RespuestaPagoTarjeta: RespuestaPagoTarjeta;
}



export interface RespuestaPagoTarjeta {
    respuestaMotorPago:        string;
    mensajeRespuestaMotorPago: string;
    codigoRespuestaMotorPago:  string;
    numeroAutorizacionPago:    string;
    numeroReferenciaPago:      string;
    respuestaBRM:              string;
    nombreMotorPagos:          null;
    origStan:                  null;
    origMsg:                   null;
}

export type OrquestarProcesoPago_Respuesta = EncabezadoRespuestaInterna &
OrquestarProcesoPago_Salida;