import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GuardarAvatar_Parametros(datos: any, url: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "setAvatar",
    rutaEndPoint: url+"/avatar",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Avatars,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface GuardarAvatar_Entrada {
  catalogoAvatarId:  string;
}

export function builtGuardarAvatar_Entrada(
  l_catalogoAvatarId:  string
) 

{
  var retorno: GuardarAvatar_Entrada = {
    catalogoAvatarId:  l_catalogoAvatarId,
  };

  return retorno;
}

//SALIDA

export interface GuardarAvatar_Salida {
    id:                 string;
    catalogoAvatarId:   string;
}

export type GuardarAvatar_Respuesta = EncabezadoRespuestaInterna &
GuardarAvatar_Salida;