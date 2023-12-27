import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function RegistrarSugerenciaRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "RegistrarSugerenciaRest",
    rutaEndPoint: "/EnterpriseFlows/Sel/RegistrarSugerenciaRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export function builtRegistrarSugerenciaRest_Input(
  l_descripcion: string,
  l_sesionId: string,
  l_pais: string,
  l_contactoId: string,
  l_numeroCuentaCliente: string,
  l_paqueteContratadoActual: string
) {
  var retorno: RegistrarSugerenciaRest_Entrada = builtRegistrarSugerenciaRest_Entrada(
    builtSugerencia(
      l_descripcion,
      l_sesionId,
      l_pais,
      l_contactoId,
      l_numeroCuentaCliente,
      l_paqueteContratadoActual
    )
  );

  return retorno;
}

//ENTRADA

export interface RegistrarSugerenciaRest_Entrada {
  Sugerencia: Sugerencia;
}

export function builtRegistrarSugerenciaRest_Entrada(l_Sugerencia: Sugerencia) {
  var retorno: RegistrarSugerenciaRest_Entrada = {
    Sugerencia: l_Sugerencia,
  };

  return retorno;
}

export interface Sugerencia {
  descripcion: string;
  sesionId: string;
  pais: string;
  contactoId: string;
  numeroCuentaCliente: string;
  paqueteContratadoActual: string;
}

export function builtSugerencia(
  l_descripcion: string,
  l_sesionId: string,
  l_pais: string,
  l_contactoId: string,
  l_numeroCuentaCliente: string,
  l_paqueteContratadoActual: string
) {
  var retorno: Sugerencia = {
    descripcion: l_descripcion,
    sesionId: l_sesionId,
    pais: l_pais,
    contactoId: l_contactoId,
    numeroCuentaCliente: l_numeroCuentaCliente,
    paqueteContratadoActual: l_paqueteContratadoActual,
  };

  return retorno;
}

export type RegistrarSugerenciaRest_Respuesta = EncabezadoRespuestaInterna;
