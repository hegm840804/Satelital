import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GetToken4SkyCelular_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GetToken4SkyCelular",
    rutaEndPoint: "/getToken4SkyCelular",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface GetToken4SkyCelular_Entrada {
  ClientId: string;
  ClientSecret: string;
  UserName: string;
  PassWord: string;
}

export function builtGetToken4SkyCelularEntrada(
  l_ClientId: string,
  l_ClientSecret: string,
  l_UserName: string,
  l_PassWord: string
) {
  var retorno: GetToken4SkyCelular_Entrada = {
    ClientId: l_ClientId,
    ClientSecret: l_ClientSecret,
    UserName: l_UserName,
    PassWord: l_PassWord,
  };

  return retorno;
}

//SALIDA
export interface GetToken4SkyCelular_Salida {
    access_token: string;
    instance_url: string;
    id:           string;
    token_type:   string;
    issued_at:    string;
    signature:    string;
}

export type GetToken4SkyCelular_Respuesta = EncabezadoRespuestaInterna &
GetToken4SkyCelular_Salida;