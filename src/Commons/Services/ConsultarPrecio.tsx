import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarPrecio_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "consultarPrecio",
    rutaEndPoint: "/consultarPrecio",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    //DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA
export interface ConsultarPrecio_Entrada {
  numCanal: string;
  paisISO: string;
  SISTEMA: string;
  ctaSky: string;
  tipoCuenta: string;
}

export function builtConsultarPrecioEntrada(
  p_numCanal: string,
  p_paisISO: string,
  p_SISTEMA: string,
  p_ctaSky: string,
  p_tipoCuenta: string
) {
  var retorno: ConsultarPrecio_Entrada = {
    numCanal: p_numCanal,
    paisISO: p_paisISO,
    SISTEMA: p_SISTEMA,
    ctaSky: p_ctaSky,
    tipoCuenta: p_tipoCuenta,
  };

  return retorno;
}

//SALIDA
export interface ConsultarPrecio_Salida {
    resultado:     string;
    resultadodesc: string;
    costo:         string;
    pagoOportuno:  string;
}

export type ConsultarPrecio_Respuesta = EncabezadoRespuestaInterna &
ConsultarPrecio_Salida;

