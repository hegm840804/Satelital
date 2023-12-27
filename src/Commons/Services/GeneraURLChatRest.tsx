import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GeneraURLChatRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GeneraURLChatRest",
    rutaEndPoint: "/generaURLChatRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA
export interface GeneraURLChatRest_Entrada {
  Cuenta: string;
  Email: string;
  TipoAtencion: string;
}

export function builtGeneraURLChatRestEntrada(
  l_Cuenta: string,
  l_Email: string,
  l_TipoAtencion: string
) {
  var retorno: GeneraURLChatRest_Entrada = {
    Cuenta: l_Cuenta,
    Email: l_Email,
    TipoAtencion: l_TipoAtencion,
  };

  return retorno;
}

//SALIDA

export interface GeneraURLChatRest_Salida {
  CabeceraOutput: CabeceraOutput;
  GeneraChatRNOutput: GeneraChatRNOutput;
}

export interface CabeceraOutput {
  Codigo: string;
  Mensaje: string;
}

export interface GeneraChatRNOutput {
  URLRN: string;
}

export type GeneraURLChatRest_Respuesta = EncabezadoRespuestaInterna &
  GeneraURLChatRest_Salida;
