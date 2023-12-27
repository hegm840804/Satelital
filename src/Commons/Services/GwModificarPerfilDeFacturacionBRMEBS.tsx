import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GwModificarPerfilDeFacturacionBRMEBS_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GwModificarPerfilDeFacturacionBRMEBS",
    rutaEndPoint: "/GwModificarPerfilDeFacturacionBRMEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Backend,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface GwModificarPerfilDeFacturacionBRMEBS_Entrada {
  PerfilFacturacionEBO: PerfilFacturacionEBO;
}

export function builtGwModificarPerfilDeFacturacionBRMEBSEntrada(
  l_NumeroDeCuenta: string,
  l_PAN: string,
  l_CVV: string,
  l_NombreTarjeta: string,
  l_Vigencia: string,
  l_Pais: string,
  l_ClearingHouseId: string,
  l_BRMTypeCode: string,
  l_Emailaddress: string,
  l_PaymentInstrument: string,
  l_InstrumentIdentifier: string
) {
  var retorno: GwModificarPerfilDeFacturacionBRMEBS_Entrada = {
    PerfilFacturacionEBO: builtPerfilFacturacionEBO(
      l_NumeroDeCuenta,
      l_PAN,
      l_CVV,
      l_NombreTarjeta,
      l_Vigencia,
      l_Pais,
      l_ClearingHouseId,
      l_BRMTypeCode,
      l_Emailaddress,
      l_PaymentInstrument,
      l_InstrumentIdentifier
    ),
  };

  return retorno;
}

export interface PerfilFacturacionEBO {
  NumeroDeCuenta: string;
  PAN: string;
  CVV: string;
  NombreTarjeta: string;
  Vigencia: string;
  Pais: string;
  ClearingHouseId: string;
  BRMTypeCode: string;
  Emailaddress: string;
  PaymentInstrument: string;
  InstrumentIdentifier: string;
}

export function builtPerfilFacturacionEBO(
  l_NumeroDeCuenta: string,
  l_PAN: string,
  l_CVV: string,
  l_NombreTarjeta: string,
  l_Vigencia: string,
  l_Pais: string,
  l_ClearingHouseId: string,
  l_BRMTypeCode: string,
  l_Emailaddress: string,
  l_PaymentInstrument: string,
  l_InstrumentIdentifier: string
) {
  var retorno: PerfilFacturacionEBO = {
    NumeroDeCuenta: l_NumeroDeCuenta,
    PAN: l_PAN,
    CVV: l_CVV,
    NombreTarjeta: l_NombreTarjeta,
    Vigencia: l_Vigencia,
    Pais: l_Pais,
    ClearingHouseId: l_ClearingHouseId,
    BRMTypeCode: l_BRMTypeCode,
    Emailaddress: l_Emailaddress,
    PaymentInstrument: l_PaymentInstrument,
    InstrumentIdentifier: l_InstrumentIdentifier,
  };

  return retorno;
}

//SALIDA

export type GwModificarPerfilDeFacturacionBRMEBS_Respuesta =
  EncabezadoRespuestaInterna;
