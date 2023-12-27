import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import {EncabezadoRespuestaInterna} from "../EncabezadoRespuestaInterna";

export function DeterminarComercioRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "DeterminarComercioRest",
    rutaEndPoint: "/GwDeterminarComercioEBS",
    sistemaOrigen: "AppSKY",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Cybersource,
    parametros: { ...datos },
  };
  return par;
}
export type DeterminarComercioRest_Datos = {
  ConsultarComercioInput: {
    Pais: string;
    Sistema: string;
    CodigoTarjeta: string;
    AfiliacionRecurrente: string;
  };
};

type DeterminarComercio_Modelo = {
  BilleteraComercioCollection: BilleteraComercio[];
};

export type BilleteraComercio = {
  pais: string;
  sistema: string;
  mid: string;
  afiliacion: string;
  clearingHouse: string;
  monedaIso: string;
  codigoMoneda: string;
  codigoTarjeta: string;
  tipoTarjeta: string;
  afilacionRecurrente: string;
  sacPr: string;
  sacAk: string;
  sacSk: string;
  carOr: string;
  carAk: string;
  carAi: string;
  dfpOr: string;
};

export type DeterminarComercioRest_Respuesta = EncabezadoRespuestaInterna &
  DeterminarComercio_Modelo;
