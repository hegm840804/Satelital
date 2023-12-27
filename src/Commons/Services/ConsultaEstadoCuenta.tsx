import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultaEstadoCuenta_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultaEstadoCuenta",
    rutaEndPoint: "/consultaEstadoCuenta",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface ConsultaEstadoCuenta_Entrada {
  user: string;
  password: string;
  noFactura: string;
}

export function builtConsultaEstadoCuentaEntrada(
  l_user: string,
  l_password: string,
  l_noFactura: string
) {
  var retorno: ConsultaEstadoCuenta_Entrada = {
    user: l_user,
    password: l_password,
    noFactura: l_noFactura,
  };

  return retorno;
}

//SALIDA
export interface ConsultaEstadoCuenta_Salida {
    cabecera:          Cabecera;
    facturaformateada: string;
}

export interface Cabecera {
    coderror: string;
    msgerror: string;
}

export type ConsultaEstadoCuenta_Respuesta = EncabezadoRespuestaInterna &
ConsultaEstadoCuenta_Salida;