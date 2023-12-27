import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GenerarIdentificadorUnicoDePago_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GenerarIdentificador",
    rutaEndPoint: "/GwGenerarIdentificadorUnicoDePagoEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendBilletera,
    parametros: { ...datos },
  };

  return par;
}

export function builtInputVarGenerarIdentificadorUnicoDePagoInput(
  l_ClearingHouse: string,
  l_Cuenta: string,
  l_Proceso: string,
  l_SistemaOrigen: string
) {
  var retorno: GenerarIdentificadorUnicoDePago_Entrada =
    builtInputVarGenerarIdentificadorUnicoDePagoEntrada(
      builtInputVarEntradaProcess(
        l_ClearingHouse,
        l_Cuenta,
        l_Proceso,
        l_SistemaOrigen
      )
    );

  return retorno;
}

//--ENTRADA
export interface GenerarIdentificadorUnicoDePago_Entrada {
  Entrada_Process: EntradaProcess;
}

export function builtInputVarGenerarIdentificadorUnicoDePagoEntrada(
  l_EntradaProcess: EntradaProcess
) {
  var retorno: GenerarIdentificadorUnicoDePago_Entrada = {
    Entrada_Process: l_EntradaProcess,
  };

  return retorno;
}

export interface EntradaProcess {
  ClearingHouse: string;
  Cuenta: string;
  Proceso: string;
  SistemaOrigen: string;
}

export function builtInputVarEntradaProcess(
  l_ClearingHouse: string,
  l_Cuenta: string,
  l_Proceso: string,
  l_SistemaOrigen: string
) {
  var retorno: EntradaProcess = {
    ClearingHouse: l_ClearingHouse,
    Cuenta: l_Cuenta,
    Proceso: l_Proceso,
    SistemaOrigen: l_SistemaOrigen,
  };

  return retorno;
}

//--SALIDA
export interface GenerarIdentificadorUnicoDePago_Salida {
  Salida_Process: SalidaProcess;
}

export interface SalidaProcess {
  IdPagoSKY: string;
}

export type GenerarIdentificadorUnicoDePago_Respuesta =
  EncabezadoRespuestaInterna & GenerarIdentificadorUnicoDePago_Salida;
