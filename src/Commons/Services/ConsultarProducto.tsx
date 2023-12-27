import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarProducto_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "consultarProducto",
    rutaEndPoint: "/EnterpriseServices/Siebel/PagoEvento/consultarProducto",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Siebel,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface ConsultarProducto_Entrada {
  NumeroCuenta: string;
  NombreProducto: string;
  TarjetaInteligente: string;
}

export function builtConsultarProductoEntrada(
  p_NumeroCuenta: string,
  p_NombreProducto: string,
  p_TarjetaInteligente: string
) {
  var retorno: ConsultarProducto_Entrada = {
    NumeroCuenta: p_NumeroCuenta,
    NombreProducto: p_NombreProducto,
    TarjetaInteligente: p_TarjetaInteligente,
  };

  return retorno;
}

//SALIDA

export interface ConsultarProducto_Salida {
  CodigoError: CodigoError;
  ProductoContratado: string;
}

export interface CodigoError {
  Codigo: string;
  Resumen: string;
  Detalle: string;
}

export type ConsultarProducto_Respuesta = ConsultarProducto_Salida;
