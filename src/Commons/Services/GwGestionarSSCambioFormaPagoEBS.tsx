import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GwGestionarSSCambioFormaPagoEBS_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GwGestionarSSCambioFormaPagoEBS",
    rutaEndPoint: "/GwGestionarSSCambioFormaPagoEBS ",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Backend,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface GwGestionarSSCambioFormaPagoEBS_Entrada {
  PagoRequestEBO: PagoRequestEBO;
}

export function builtGwGestionarSSCambioFormaPagoEBSEntrada(
  l_Operacion: string,
  l_Proceso: string,
  l_Cuenta: string,
  l_PayOffFlag: string,
  l_CodigoSKY: string,
  l_PaymentCardNumber: string,
  l_PaymentInstrument: string,
  l_InstrumentIdentifier: string,
  l_AuthenticationTransactioId: string | null,
  l_xid: string | null,
  l_BillFrequency: string,
  l_BillType: string,
  l_PaymentMethod: string,
  l_PaymentSystem: string,
  l_PaymentBillFeeFlag: string,
  l_Comments: string,
  l_Origen: string,
  l_ListOfServiceInstance: ListOfServiceInstance
) {
  var retorno: GwGestionarSSCambioFormaPagoEBS_Entrada = {
    PagoRequestEBO: builtPagoRequestEBO(
      l_Operacion,
      l_Proceso,
      l_Cuenta,
      l_PayOffFlag,
      l_CodigoSKY,
      l_PaymentCardNumber,
      l_PaymentInstrument,
      l_InstrumentIdentifier,
      l_AuthenticationTransactioId,
      l_xid,
      l_BillFrequency,
      l_BillType,
      l_PaymentMethod,
      l_PaymentSystem,
      l_PaymentBillFeeFlag,
      l_Comments,
      l_Origen,
      l_ListOfServiceInstance
    ),
  };

  return retorno;
}

export interface PagoRequestEBO {
  Operacion: string;
  Proceso: string;
  Cuenta: string;
  PayOffFlag: string;
  CodigoSKY: string;
  PaymentCardNumber: string;
  PaymentInstrument: string;
  InstrumentIdentifier: string;
  AuthenticationTransactioId: string | null;
  xid: string | null;
  BillFrequency: string;
  BillType: string;
  PaymentMethod: string;
  PaymentSystem: string;
  PaymentBillFeeFlag: string;
  Comments: string;
  Origen: string;
  ListOfServiceInstance: ListOfServiceInstance;
}

export function builtPagoRequestEBO(
  l_Operacion: string,
  l_Proceso: string,
  l_Cuenta: string,
  l_PayOffFlag: string,
  l_CodigoSKY: string,
  l_PaymentCardNumber: string,
  l_PaymentInstrument: string,
  l_InstrumentIdentifier: string,
  l_AuthenticationTransactioId: string | null,
  l_xid: string | null,
  l_BillFrequency: string,
  l_BillType: string,
  l_PaymentMethod: string,
  l_PaymentSystem: string,
  l_PaymentBillFeeFlag: string,
  l_Comments: string,
  l_Origen: string,
  l_ListOfServiceInstance: ListOfServiceInstance
) {
  var retorno: PagoRequestEBO = {
    Operacion: l_Operacion,
    Proceso: l_Proceso,
    Cuenta: l_Cuenta,
    PayOffFlag: l_PayOffFlag,
    CodigoSKY: l_CodigoSKY,
    PaymentCardNumber: l_PaymentCardNumber,
    PaymentInstrument: l_PaymentInstrument,
    InstrumentIdentifier: l_InstrumentIdentifier,
    AuthenticationTransactioId: l_AuthenticationTransactioId,
    xid: l_xid,
    BillFrequency: l_BillFrequency,
    BillType: l_BillType,
    PaymentMethod: l_PaymentMethod,
    PaymentSystem: l_PaymentSystem,
    PaymentBillFeeFlag: l_PaymentBillFeeFlag,
    Comments: l_Comments,
    Origen: l_Origen,
    ListOfServiceInstance: l_ListOfServiceInstance,
  };

  return retorno;
}

export interface ListOfServiceInstance {
  ServiceInstance: any[];
}

export function builtListOfServiceInstance(l_ServiceInstance: any[]) {
  var retorno: ListOfServiceInstance = {
    ServiceInstance: l_ServiceInstance,
  };

  return retorno;
}

//SALIDA

export interface GwGestionarSSCambioFormaPagoEBS_Salida {
  PagoResponseEBO: PagoResponseEBO;
}

export interface PagoResponseEBO {
  Operacion: string;
  Proceso: string;
  Cuenta: number;
  Origen: string;
  ErrorCode: string;
  ErrorMessage: string;
  SRNumber: string|null|undefined;
}

export type GwGestionarSSCambioFormaPagoEBS_Respuesta =
  EncabezadoRespuestaInterna & GwGestionarSSCambioFormaPagoEBS_Salida;
