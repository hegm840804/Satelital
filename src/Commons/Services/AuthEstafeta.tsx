import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function AuthEstafeta_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "AuthEstafeta",
    rutaEndPoint: "/authEstafeta",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRDA
export interface AuthEstafeta_Entrada {
  scope: string;
  grant_type: string;
}

export function builtAuthEstafetaEntrada(
  l_scope: string,
  l_grant_type: string
) {
  var retorno: AuthEstafeta_Entrada = {
    scope: l_scope,
    grant_type: l_grant_type,
  };

  return retorno;
}

//SALIDA

export interface AuthEstafeta_Salida {
    access_token: null;
    token_type:   null;
    expires_in:   null;
    scope:        null;
}

export type AuthEstafeta_Respuesta = EncabezadoRespuestaInterna &
AuthEstafeta_Salida;
