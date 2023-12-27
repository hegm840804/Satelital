import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GetAssets4SkyCelular_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GetAssets4SkyCelular",
    rutaEndPoint: "/getAssets4SkyCelular",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA
export interface GetAssets4SkyCelular_Entrada {
  AccountId: string;
  Token: string;
}

export function builtGetAssets4SkyCelularEntrada(
  l_AccountId: string,
  l_Token: string
) {
  var retorno: GetAssets4SkyCelular_Entrada = {
    AccountId: l_AccountId,
    Token: l_Token,
  };

  return retorno;
}

//SALIDA
export interface GetAssets4SkyCelular_Salida {
  Assets: Asset[];
  errormessage: string;
  errorno: number;
  name: string;
}

export interface Asset {
  Status: string;
  RecordTypeName: string;
  Price: number;
  Name: string;
  Id: string;
  Family: string;
  Attributes: Attribute;
}

export interface Attribute {
  Datos: string;
  DatosPromo: string;
  DatosAdicionales: any[];
  DatosStreaming: string;
}

export type GetAssets4SkyCelular_Respuesta = EncabezadoRespuestaInterna &
  GetAssets4SkyCelular_Salida;
