import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function DeterminarComercio_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GwDeterminarComercioEBS",
    rutaEndPoint: "/GwDeterminarComercioEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendBilletera,
    parametros: { ...datos },
  };

  return par;
}

export function builtInputVarDeterminarComercioInput(
  l_Pais: string,
  l_Sistema: string,
  l_CodigoTarjeta: string,
  l_AfiliacionRecurrente: string
) {
  var retorno: DeterminarComercio_Entrada =
    builtInputVarDeterminarComercioEntrada(
      builtInputVarConsultarComercioInput(
        l_Pais,
        l_Sistema,
        l_CodigoTarjeta,
        l_AfiliacionRecurrente
      )
    );

  return retorno;
}

//--ENTRADA
export interface DeterminarComercio_Entrada {
  ConsultarComercioInput: ConsultarComercioInput;
}

export function builtInputVarDeterminarComercioEntrada(
  l_ConsultarComercioInput: ConsultarComercioInput
) {
  var retorno: DeterminarComercio_Entrada = {
    ConsultarComercioInput: l_ConsultarComercioInput,
  };

  return retorno;
}

export interface ConsultarComercioInput {
  Pais: string;
  Sistema: string;
  CodigoTarjeta: string;
  AfiliacionRecurrente: string;
}

export function builtInputVarConsultarComercioInput(
  l_Pais: string,
  l_Sistema: string,
  l_CodigoTarjeta: string,
  l_AfiliacionRecurrente: string
) {
  var retorno: ConsultarComercioInput = {
    Pais: l_Pais,
    Sistema: l_Sistema,
    CodigoTarjeta: l_CodigoTarjeta,
    AfiliacionRecurrente: l_AfiliacionRecurrente,
  };

  return retorno;
}

//--SALIDA

export interface DeterminarComercio_Salida {
  BilleteraComercioCollection: BilleteraComercioCollection;
}

export interface BilleteraComercioCollection {
  BilleteraComercio: BilleteraComercio[];
}

export interface BilleteraComercio {
  pais: string;
  sistema: string;
  mid: string;
  afiliacion: string;
  clearingHouse: string;
  monedaIso: string;
  codigoMoneda: string;
  codigoTarjeta: string;
  tipoTarjeta: string;
  afiliacionRecurrente: string;
  sacPr: string;
  sacAk: string;
  sacSk: string;
  carOr: string;
  carAk: string;
  carAi: string;
  dfpOr: string;
}

export type DeterminarComercio_Respuesta = EncabezadoRespuestaInterna &
  DeterminarComercio_Salida;
