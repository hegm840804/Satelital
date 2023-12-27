import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GetPrimaryData4SkyCelular_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GetPrimaryData4SkyCelular",
    rutaEndPoint: "/getPrimaryData4SkyCelular",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA
export interface GetPrimaryData4SkyCelular_Entrada {
  username: string;
  accountNumber: string;
  token: string;
}

export function builtGetPrimaryData4SkyCelularEntrada(
  l_username: string,
  l_accountNumber: string,
  l_token: string
) {
  var retorno: GetPrimaryData4SkyCelular_Entrada = {
    username: l_username,
    accountNumber: l_accountNumber,
    token: l_token,
  };

  return retorno;
}

//SALIDA
export interface GetPrimaryData4SkyCelular_Salida {
    errormessage: string;
    errorno:      number;
    name:         string;
    result:       Result;
}

export interface Result {
    username:            string;
    userId:              string;
    statusMobile:        string;
    status:              string;
    recordType:          string;
    name:                string;
    accountNumberMobile: string;
    accountNumberIzzi:   string;
    accountNumber:       string;
    accountId:           string;
}

export type GetPrimaryData4SkyCelular_Respuesta = EncabezadoRespuestaInterna &
GetPrimaryData4SkyCelular_Salida;