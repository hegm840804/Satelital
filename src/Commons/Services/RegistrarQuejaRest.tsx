import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function RegistrarQuejaRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "RegistrarQuejaRest",
    rutaEndPoint: "/EnterpriseFlows/Sel/RegistrarQuejaRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export function builtRegistrarQuejaRest_Input(
  l_descripcion: string,
  l_sesionId: string,
  l_pais: string,
  l_contactoId: string,
  l_numeroCuentaCliente: string,
  l_paqueteContratadoActual: string
) {
  var retorno: RegistrarQuejaRest_Entrada = builtRegistrarQuejaRest_Entrada(
    builtQueja(
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

export interface RegistrarQuejaRest_Entrada {
  Queja: Queja;
}

export function builtRegistrarQuejaRest_Entrada(l_Queja: Queja) {
  var retorno: RegistrarQuejaRest_Entrada = {
    Queja: l_Queja,
  };

  return retorno;
}

export interface Queja {
  descripcion: string;
  sesionId: string;
  pais: string;
  contactoId: string;
  numeroCuentaCliente: string;
  paqueteContratadoActual: string;
}

export function builtQueja(
  l_descripcion: string,
  l_sesionId: string,
  l_pais: string,
  l_contactoId: string,
  l_numeroCuentaCliente: string,
  l_paqueteContratadoActual: string
) {
  var retorno: Queja = {
    descripcion: l_descripcion,
    sesionId: l_sesionId,
    pais: l_pais,
    contactoId: l_contactoId,
    numeroCuentaCliente: l_numeroCuentaCliente,
    paqueteContratadoActual: l_paqueteContratadoActual,
  };

  return retorno;
}

export type RegistrarQuejaRest_Respuesta = EncabezadoRespuestaInterna;
