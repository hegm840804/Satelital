import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function SetCase_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "",
    rutaEndPoint:
      "/services/apexrest/vlocity_cmt/v1/integrationprocedure/mvnoapp_CreateCase",
    sistemaOrigen: "",
    AGREGAR_ENCABEZADO: false,
    DESTINO_SERVICIO: DestinoConexion.Token,
    parametros: { ...datos },
  };

  return par;
}

export interface SetCase_Entrada {
  AccountId: string;
  Type: string;
  Description: string;
  Subject: string;
  ContactId: string;
  AssetType: string;
}

export interface SetCase_Salida {
  Case: Case;
  errormessage: string;
  errorno: string;
  name: string;
}

export interface Case {
  CaseNumber: string;
  Id: string;
}

export type SetCase_Respuesta = SetCase_Salida;
