import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function SetReportes_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "SetReportes",
    rutaEndPoint: "/setReportes",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: false,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface SetReportes_Entrada {
  numeroCuenta: string;
  producto: string;
  descripcion: string;
  motivo: string;
  sessionId: string;
  username: string;
}

export function builtSetReportesEntrada(
  l_numeroCuenta: string,
  l_producto: string,
  l_descripcion: string,
  l_motivo: string,
  l_sessionId: string,
  l_username: string
) {
  var retorno: SetReportes_Entrada = {
    numeroCuenta: l_numeroCuenta,
    producto: l_producto,
    descripcion: l_descripcion,
    motivo: l_motivo,
    sessionId: l_sessionId,
    username: l_username,
  };

  return retorno;
}


//SALIDA
export interface SetReportes_Salida {
    code:        string;
    description: string;
}


export type SetReportes_Respuesta = EncabezadoRespuestaInterna &
SetReportes_Salida;