import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GwProcesarTransaccionDMEBS_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GwProcesarTransaccionDMEBS",
    rutaEndPoint: "/GwProcesarTransaccionDMEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendBilletera,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export function builtGwProcesarTransaccionDMEBSInput(
  p_ComercioId: string,
  p_CodigoReferencia: string,
  p_CodigoAccion: string,
  p_TransaccionDecisionId: string,
  p_Comentarios: string
) {
  var retorno: GwProcesarTransaccionDMEBS_Entrada =
    builtGwProcesarTransaccionDMEBS_Entrada(
      builtComercioInfo(p_ComercioId),
      p_CodigoReferencia,
      p_CodigoAccion,
      p_TransaccionDecisionId,
      p_Comentarios
    );

  return retorno;
}

export interface GwProcesarTransaccionDMEBS_Entrada {
  ComercioInfo: ComercioInfo;
  CodigoReferencia: string;
  CodigoAccion: string;
  TransaccionDecisionId: string;
  Comentarios: string;
}

export function builtGwProcesarTransaccionDMEBS_Entrada(
  p_ComercioInfo: ComercioInfo,
  p_CodigoReferencia: string,
  p_CodigoAccion: string,
  p_TransaccionDecisionId: string,
  p_Comentarios: string
) {
  var retorno: GwProcesarTransaccionDMEBS_Entrada = {
    ComercioInfo: p_ComercioInfo,
    CodigoReferencia: p_CodigoReferencia,
    CodigoAccion: p_CodigoAccion,
    TransaccionDecisionId: p_TransaccionDecisionId,
    Comentarios: p_Comentarios,
  };

  return retorno;
}

export interface ComercioInfo {
  ComercioId: string;
}

export function builtComercioInfo(p_ComercioId: string) {
  var retorno: ComercioInfo = {
    ComercioId: p_ComercioId,
  };

  return retorno;
}

//SALIDA
export interface GwProcesarTransaccionDMEBS_Salida {
    CodigoReferencia:      string;
    TransaccionDecisionId: string;
    Decision:              string;
    TokenRespuesta:        string;
    CodigoRespuesta:       string;
    CodigoRespuestaAccion: string;
}



export type GwProcesarTransaccionDMEBS_Respuesta = EncabezadoRespuestaInterna &
GwProcesarTransaccionDMEBS_Salida;




