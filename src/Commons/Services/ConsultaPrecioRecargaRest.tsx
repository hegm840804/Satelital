import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultaPrecioRecarga_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarPrecioRecargaRest",
    rutaEndPoint: "/EnterpriseServices/Sel/ConsultaPrecioRecargaRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export function builtInputVarRecargaConsultaPrecioRecargaInput(
  ol_NUMCUENTA: string
) {
  var retorno: RecargaConsultaPrecioRecarga_Entrada =
    builtInputVarRecargaConsultaPrecioRecarga_Entrada(
      builtInputVarRecargaConsultaPrecioRecargaEntrada(ol_NUMCUENTA)
    );

  return retorno;
}

export interface RecargaConsultaPrecioRecarga_Entrada {
  Recarga_consultaPrecioRecarga_Entrada: RecargaConsultaPrecioRecargaEntrada;
}

export function builtInputVarRecargaConsultaPrecioRecarga_Entrada(
  l_RecargaConsultaPrecioRecargaEntrada: RecargaConsultaPrecioRecargaEntrada
) {
  var retorno: RecargaConsultaPrecioRecarga_Entrada = {
    Recarga_consultaPrecioRecarga_Entrada:
      l_RecargaConsultaPrecioRecargaEntrada,
  };

  return retorno;
}

export interface RecargaConsultaPrecioRecargaEntrada {
  NUMCUENTA: string;
}

export function builtInputVarRecargaConsultaPrecioRecargaEntrada(
  ol_NUMCUENTA: string
) {
  var retorno: RecargaConsultaPrecioRecargaEntrada = {
    NUMCUENTA: ol_NUMCUENTA,
  };

  return retorno;
}

export interface RecargaConsultaPrecioRecarga_Salida {
    Recarga_consultaPrecioRecarga_Salida: RecargaConsultaPrecioRecargaSalida;
}




export interface RecargaConsultaPrecioRecargaSalida {
    CABECERA:          Cabecera;
    NUMCUENTA:         string;
    PRECIO_RECARGA:    string;
    PRECIO_RECARGA_15: string;
    SALDO:             string;
    FIN_RECARGA:       string;
    RESP_ERROR:        string;
}

export interface Cabecera {
    COD_ERROR: string;
    MSG_ERROR: string;
}

export type RecargaConsultaPrecioRecarga_Respuesta = EncabezadoRespuestaInterna &
RecargaConsultaPrecioRecarga_Salida;

