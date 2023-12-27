import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarRegimenFiscalRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarRegimenFiscalRest",
    rutaEndPoint: "/EnterpriseServices/Sel/ConsultarRegimenFiscalRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface ConsultarRegimenFiscalRest_Entrada {
  TipoPersona: string;
}

export function builtConsultarRegimenFiscalRestEntrada(l_TipoPersona: string) {
  var retorno: ConsultarRegimenFiscalRest_Entrada = {
    TipoPersona: l_TipoPersona,
  };

  return retorno;
}

//SALIDA

export interface ConsultarRegimenFiscalRest_Salida {
  DBUnificadoregimenfiscalOutputCollection: DBUnificadoregimenfiscalOutputCollection;
}

export interface DBUnificadoregimenfiscalOutputCollection {
  DBUnificadoregimenfiscalOutput: DBUnificadoregimenfiscalOutput[];
}

export interface DBUnificadoregimenfiscalOutput {
  Regimen_fiscal: number;
  descripcion: string;
  persona_fisica: string;
  persona_moral: string;
}

export type ConsultarRegimenFiscalRest_Respuesta = 
  ConsultarRegimenFiscalRest_Salida;
