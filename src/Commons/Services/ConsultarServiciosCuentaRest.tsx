import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarServiciosCuenta_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarDatosGeneralesCuenta",
    rutaEndPoint: "/EnterpriseServices/Sel/ConsultarServiciosCuentaRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export function builtInputVarConsultarServiciosCuentaInput(
  l_NumeroCuenta: string
) {
  var retorno: ConsultarServiciosCuenta_Entrada =
    builtInputVarConsultarServiciosCuentaEntrada(
      builtInputVarConsultarServiciosCuentaInputMessage(l_NumeroCuenta)
    );

  return retorno;
}

export interface ConsultarServiciosCuenta_Entrada {
  ConsultarServiciosCuentaInputMessage: ConsultarServiciosCuentaInputMessage;
}

export function builtInputVarConsultarServiciosCuentaEntrada(
  l_ConsultarServiciosCuentaInputMessage: ConsultarServiciosCuentaInputMessage
) {
  var retorno: ConsultarServiciosCuenta_Entrada = {
    ConsultarServiciosCuentaInputMessage:
      l_ConsultarServiciosCuentaInputMessage,
  };

  return retorno;
}

export interface ConsultarServiciosCuentaInputMessage {
  NumeroCuenta: string;
}

export function builtInputVarConsultarServiciosCuentaInputMessage(
  l_NumeroCuenta: string
) {
  var retorno: ConsultarServiciosCuentaInputMessage = {
    NumeroCuenta: l_NumeroCuenta,
  };

  return retorno;
}

export interface ConsultarServiciosCuenta_Salida {
  CuentaSelEBO: CuentaSelEBO;
  ListServicios: ListServicios;
}

export interface CuentaSelEBO {
  RowId: string;
  RowIdContacto: string;
  BillingCode: string;
  StatusCuenta: string;
  Organizacion: string;
  CurrencyCode: string;
  MarketClass: string;
  MarketType: string;
  OrganizationType: string;
  Pais: string;
  DiferenciaHoraria: string;
  BanderaNoOPPV: string;
  BanderaNoIPPV: string;
  NO_TC: string;
}

export interface ListServicios {
  ServicioEBO: ServicioEBO[];
}

export interface ServicioEBO {
  ServiceProductType: string;
  StatusCode: string;
  ServiceSupplier: string;
  AssetNumber: string;
  SecondAssetNumber: string;
  MSISDN: string;
  Paquete: string;
  ExternalOffer: string;
}

export type ConsultarServiciosCuenta_Respuesta =
  EncabezadoRespuestaInterna & ConsultarServiciosCuenta_Salida;
