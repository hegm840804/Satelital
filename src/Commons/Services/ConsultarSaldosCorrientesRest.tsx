import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarSaldosCorrientes_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarSaldosCorrientes",
    rutaEndPoint: "/EnterpriseServices/Sel/ConsultarSaldosCorrientesRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export function builtConsultarSaldosCorrientesInput(l_NumeroCuenta: string) {
  var retorno: ConsultarSaldosCorrientes_Entrada =
    builtConsultarSaldosCorrientesEntrada(
      builtConsultarSaldosCorrientesRequest(l_NumeroCuenta)
    );

  return retorno;
}

//ENTRADA
export interface ConsultarSaldosCorrientes_Entrada {
  ConsultarSaldosCorrientesRequest: ConsultarSaldosCorrientesRequest;
}

export function builtConsultarSaldosCorrientesEntrada(
  l_ConsultarSaldosCorrientesRequest: ConsultarSaldosCorrientesRequest
) {
  var retorno: ConsultarSaldosCorrientes_Entrada = {
    ConsultarSaldosCorrientesRequest: l_ConsultarSaldosCorrientesRequest,
  };

  return retorno;
}

export interface ConsultarSaldosCorrientesRequest {
  NumeroCuenta: string;
}

export function builtConsultarSaldosCorrientesRequest(l_NumeroCuenta: string) {
  var retorno: ConsultarSaldosCorrientesRequest = {
    NumeroCuenta: l_NumeroCuenta,
  };

  return retorno;
}

//SALIDA
export interface ConsultarSaldosCorrientes_Salida {
  SaldosCorrientesEBO: SaldosCorrientesEBO;
  SaldosPorFacturarEBO: SaldosPorFacturarEBO;
}

export interface SaldosCorrientesEBO {
  SaldoFacturadoMenosPagosYAjustes: string;
  CargosPorReactivacion: string;
  SaldoActualMinimo: string;
  ProrrateoReactivacion: string;
  SaldoTotal: string;
  DescuentoPagoOportuno: string;
  SaldoTotalPagoOportuno: string;
  FechaPagoOportuno: string;
  FechaBloqueoSuave: string;
}

export interface SaldosPorFacturarEBO {
  CargosAdmonPorFacturar: string;
  PPVPorCobrar: string;
  CargosRecurrentesPorFacturar: string;
  SaldoTotalMasCargosPorFacturar: string;
  SaldoTotalMasCargosPorFacturarConPO: string;
  FechaProximoCorte: string;
}

export type ConsultarSaldosCorrientes_Respuesta = EncabezadoRespuestaInterna &
  ConsultarSaldosCorrientes_Salida;
