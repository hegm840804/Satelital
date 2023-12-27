import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultaPagosPorEvento_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultaPagosPorEvento",
    rutaEndPoint: "/consultaPagosPorEvento",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}
//ENTRADA

export interface ConsultaPagosPorEvento_Entrada {
  user: string;
  password: string;
  banderaHD: string;
  country: string;
  paquete: string;
  tipoConsulta: string;
  tipoCuenta: string;
}

export function builtConsultaPagosPorEventEntrada(
  l_user: string,
  l_password: string,
  l_banderaHD: string,
  l_country: string,
  l_paquete: string,
  l_tipoConsulta: string,
  l_tipoCuenta: string
) {
  var retorno: ConsultaPagosPorEvento_Entrada = {
    user: l_user,
    password: l_password,
    banderaHD: l_banderaHD,
    country: l_country,
    paquete: l_paquete,
    tipoConsulta: l_tipoConsulta,
    tipoCuenta: l_tipoCuenta,
  };

  return retorno;
}

//SALIDA
export interface ConsultaPagosPorEvento_Salida {
  result: null;
  resultCode: null;
  ppe: any[];
}

export type ConsultaPagosPorEvento_Respuesta = EncabezadoRespuestaInterna &
  ConsultaPagosPorEvento_Salida;
