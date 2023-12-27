import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarUsoCFDIRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarUsoCFDIRest",
    rutaEndPoint: "/EnterpriseServices/Sel/ConsultarUsoCFDIRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface ConsultarUsoCFDIRest_Entrada {
  RegimenFiscal: string;
  TipoPersona: string;
}
export function builtConsultarUsoCFDIRestEntrada(
  l_RegimenFiscal: string,
  l_TipoPersona: string
) {
  var retorno: ConsultarUsoCFDIRest_Entrada = {
    RegimenFiscal: l_RegimenFiscal,
    TipoPersona: l_TipoPersona,
  };

  return retorno;
}

//SALIDA

export interface ConsultarUsoCFDIRest_Salida {
    DBConsultarUsoCFDIOutputCollection: DBConsultarUsoCFDIOutputCollection;
}

export interface DBConsultarUsoCFDIOutputCollection {
    DBConsultarUsoCFDIOutput: DBConsultarUsoCFDIOutput[];
}

export interface DBConsultarUsoCFDIOutput {
    CFDI:                  string;
    DESCRIPCION:           string;
    PERSONA_FISICA:        string;
    PERSONA_MORAL:         string;
    FECHA_INICIO_VIGENCIA: string;
    FECHA_FIN_VIGENCIA:    string;
}



export type ConsultarUsoCFDIRest_Respuesta = 
ConsultarUsoCFDIRest_Salida;