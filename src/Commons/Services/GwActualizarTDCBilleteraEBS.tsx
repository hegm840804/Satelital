import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ActualizarTDCBilletera_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ActualizarBilletera",
    rutaEndPoint: "/GwActualizarTDCBilleteraEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendBilletera,
    parametros: { ...datos },
  };

  return par;
}

export function builtActualizarTDCBilleteraInput(
  l_id: string,
  l_paymentInstrument: string,
  l_idProspecto: string,
  l_numeroCuenta: string,
  l_numeroContrato: string,
  l_email: string,
  l_nombreTarjeta: string,
  l_fechaExp: string,
  l_cvv: string,
  l_tipoTarjeta: string,
  l_instrumentId: string,
  l_maskedPan: string,
  l_recurrente: string,
  l_estatusDm: string,
  l_fechaDm: string,
  l_estatus3Ds: string,
  l_fecha3Ds: string,
  l_referencia3Ds: string,
  l_nombre: string,
  l_aPaterno: string,
  l_aMaterno: string,
  l_numTelefono: string,
  l_calle: string,
  l_numExt: string,
  l_numInt: string,
  l_estado: string,
  l_municipio: string,
  l_ciudad: string,
  l_colonia: string,
  l_codigopostal: string,
  l_codPais: string,
  l_monto: string
) {
  var retorno: ActualizarTDCBilletera_Entrada =
    builtActualizarTDCBilleteraEntrada(
      builtBilleteraDePagoCollection([
        builtBilleteraDePago(
          l_id,
          l_paymentInstrument,
          l_idProspecto,
          l_numeroCuenta,
          l_numeroContrato,
          l_email,
          l_nombreTarjeta,
          l_fechaExp,
          l_cvv,
          l_tipoTarjeta,
          l_instrumentId,
          l_maskedPan,
          l_recurrente,
          l_estatusDm,
          l_fechaDm,
          l_estatus3Ds,
          l_fecha3Ds,
          l_referencia3Ds,
          l_nombre,
          l_aPaterno,
          l_aMaterno,
          l_numTelefono,
          l_calle,
          l_numExt,
          l_numInt,
          l_estado,
          l_municipio,
          l_ciudad,
          l_colonia,
          l_codigopostal,
          l_codPais,
          l_monto
        ),
      ])
    );

  return retorno;
}

//--.ENTRADA
export interface ActualizarTDCBilletera_Entrada {
  BilleteraDePagoCollection: BilleteraDePagoCollection;
}

export function builtActualizarTDCBilleteraEntrada(
  l_BilleteraDePagoCollection: BilleteraDePagoCollection
) {
  var retorno: ActualizarTDCBilletera_Entrada = {
    BilleteraDePagoCollection: l_BilleteraDePagoCollection,
  };

  return retorno;
}

export interface BilleteraDePagoCollection {
  BilleteraDePago: BilleteraDePago[];
}

export function builtBilleteraDePagoCollection(
  l_BilleteraDePago: BilleteraDePago[]
) {
  var retorno: BilleteraDePagoCollection = {
    BilleteraDePago: l_BilleteraDePago,
  };

  return retorno;
}

export interface BilleteraDePago {
  id: string;
  paymentInstrument: string;
  idProspecto: string;
  numeroCuenta: string;
  numeroContrato: string;
  email: string;
  nombreTarjeta: string;
  fechaExp: string;
  cvv: string;
  tipoTarjeta: string;
  instrumentId: string;
  maskedPan: string;
  recurrente: string;
  estatusDm: string;
  fechaDm: string;
  estatus3Ds: string;
  fecha3Ds: string;
  referencia3Ds: string;
  nombre: string;
  aPaterno: string;
  aMaterno: string;
  numTelefono: string;
  calle: string;
  numExt: string;
  numInt: string;
  estado: string;
  municipio: string;
  ciudad: string;
  colonia: string;
  codigopostal: string;
  codPais: string;
  monto: string;
}

export function builtBilleteraDePago(
  l_id: string,
  l_paymentInstrument: string,
  l_idProspecto: string,
  l_numeroCuenta: string,
  l_numeroContrato: string,
  l_email: string,
  l_nombreTarjeta: string,
  l_fechaExp: string,
  l_cvv: string,
  l_tipoTarjeta: string,
  l_instrumentId: string,
  l_maskedPan: string,
  l_recurrente: string,
  l_estatusDm: string,
  l_fechaDm: string,
  l_estatus3Ds: string,
  l_fecha3Ds: string,
  l_referencia3Ds: string,
  l_nombre: string,
  l_aPaterno: string,
  l_aMaterno: string,
  l_numTelefono: string,
  l_calle: string,
  l_numExt: string,
  l_numInt: string,
  l_estado: string,
  l_municipio: string,
  l_ciudad: string,
  l_colonia: string,
  l_codigopostal: string,
  l_codPais: string,
  l_monto: string
) {
  var retorno: BilleteraDePago = {
    id: l_id,
    paymentInstrument: l_paymentInstrument,
    idProspecto: l_idProspecto,
    numeroCuenta: l_numeroCuenta,
    numeroContrato: l_numeroContrato,
    email: l_email,
    nombreTarjeta: l_nombreTarjeta,
    fechaExp: l_fechaExp,
    cvv: l_cvv,
    tipoTarjeta: l_tipoTarjeta,
    instrumentId: l_instrumentId,
    maskedPan: l_maskedPan,
    recurrente: l_recurrente,
    estatusDm: l_estatusDm,
    fechaDm: l_fechaDm,
    estatus3Ds: l_estatus3Ds,
    fecha3Ds: l_fecha3Ds,
    referencia3Ds: l_referencia3Ds,
    nombre: l_nombre,
    aPaterno: l_aPaterno,
    aMaterno: l_aMaterno,
    numTelefono: l_numTelefono,
    calle: l_calle,
    numExt: l_numExt,
    numInt: l_numInt,
    estado: l_estado,
    municipio: l_municipio,
    ciudad: l_ciudad,
    colonia: l_colonia,
    codigopostal: l_codigopostal,
    codPais: l_codPais,
    monto: l_monto,
  };

  return retorno;
}

export type ActualizarBilletera_Respuesta = EncabezadoRespuestaInterna;
