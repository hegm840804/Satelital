import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GetCase_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "",
    rutaEndPoint:
      "/services/apexrest/vlocity_cmt/v1/integrationprocedure/mvnoapp_GetCase",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: false,
    DESTINO_SERVICIO: DestinoConexion.Token,
    parametros: { ...datos },
  };

  return par;
}

export interface GetCase_Entrada {
  AccountId: string;
  offset: string;
  OnlyOpenCases: boolean;
}

export interface GetCase_Salida {
  Cases: Case[];
}

export interface Case {
  CaseNumber: string;
  Id: string;
}

export type GetCase_Respuesta = GetCase_Salida;
