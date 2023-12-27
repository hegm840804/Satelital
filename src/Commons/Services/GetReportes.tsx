import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GetReportes_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GetReportes",
    rutaEndPoint: "/getReportes",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface GetReportes_Entrada {
  numeroCuenta: string;
}

export function builtGetReportesEntrada(l_numeroCuenta: string) {
  var retorno: GetReportes_Entrada = {
    numeroCuenta: l_numeroCuenta,
  };

  return retorno;
}

//SALIDA
export interface GetReportes_Salida {
  Cases: Case[];
  errormessage: string;
  errorno: number;
  name: string;
}

export interface Case {
  Subject?: string;
  Status: string;
  Id: string;
  Description: string;
  CreateDate: Date;
  CaseNumber: string;
  Reason?: string;
}

export type GetReportes_Respuesta = EncabezadoRespuestaInterna &
GetReportes_Salida;
