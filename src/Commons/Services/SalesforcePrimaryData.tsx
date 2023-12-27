import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function SalesforcePrimaryData_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "",
    rutaEndPoint:
      "/services/apexrest/vlocity_cmt/v1/integrationprocedure/mvnoapp_PrimaryData",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: false,
    DESTINO_SERVICIO: DestinoConexion.Token,
    parametros: { ...datos},
  };

  return par;
}

export interface SalesforcePrimaryData_Entrada {
  accountNumber: string;
}

export interface SalesforcePrimaryData_Salida {
  errormessage: string;
  errorno: string;
  name: string;
  result: Result;
}

export interface Result {
  username: string;
  userId: string;
  status: string;
  statusMobile: string;
  recordType: string;
  name: string;
  accountNumberMobile: string;
  accountNumberIzzi: string;
  accountNumber: string;
  accountId: string;
}

export type SalesforcePrimaryData_Respuesta = SalesforcePrimaryData_Salida;
