import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultaCuentaRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultaCuentaRest",
    rutaEndPoint: "/EnterpriseServices/Sel/ConsultaCuentaRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export function builtConsultaCuentaRestInput(l_AccountNumber: string) {
  var retorno: ConsultaCuentaRest_Entrada = builtConsultaCuentaRest_Entrada(
    builtConsultaCuentaEntrada(
      builtListOfAccount([builtMessage(l_AccountNumber)])
    )
  );

  return retorno;
}

export interface ConsultaCuentaRest_Entrada {
  ConsultaCuenta_Entrada: ConsultaCuentaEntrada;
}

export function builtConsultaCuentaRest_Entrada(
  l_ConsultaCuenta_Entrada: ConsultaCuentaEntrada
) {
  var retorno: ConsultaCuentaRest_Entrada = {
    ConsultaCuenta_Entrada: l_ConsultaCuenta_Entrada,
  };

  return retorno;
}

export interface ConsultaCuentaEntrada {
  ListOfAccount: ListOfAccountInput;
}

export function builtConsultaCuentaEntrada(
  l_ListOfAccount: ListOfAccountInput
) {
  var retorno: ConsultaCuentaEntrada = {
    ListOfAccount: l_ListOfAccount,
  };

  return retorno;
}

export interface ListOfAccountInput {
  Message: Message[];
}

export function builtListOfAccount(l_Message: Message[]) {
  var retorno: ListOfAccountInput = {
    Message: l_Message,
  };

  return retorno;
}

export interface Message {
  AccountNumber: string;
}

export function builtMessage(l_AccountNumber: string) {
  var retorno: Message = {
    AccountNumber: l_AccountNumber,
  };

  return retorno;
}

//SALIDA

export interface ConsultaCuentaRest_Salida {
  ConsultaCuenta_Salida: ConsultaCuentaSalida;
}

export interface ConsultaCuentaSalida {
  CABECERA: Cabecera;
  ListOfAccount: ListOfAccount;
}

export interface Cabecera {
  COD_ERROR: string;
  MSG_ERROR: string;
}

export interface ListOfAccount {
  Account: Account[];
}

export interface Account {
  AccountNumber: string;
  AccountStatus: string;
  ServicesNumber: string;
  PreActivateFlag: string;
  Location: string;
  SKYNEWERA: null;
  Type: string;
  MarketType: string;
  MarketClass: string;
  ComInvoiceBillCycle: string;
  CustomerSince: string;
  SKYPromocion: string;
  EstatusVeTV: null;
  AgreementName: string;
  SKYIdDistributor: string;
  SKYIdMaster: string;
  ParentAccountName: null;
  LegalStatus: null;
  ComInvoicePaymentMethod: string;
  AccountTechnology: string;
  AccountSatellite: null;
  BillPaymentSystem: string;
  SKYHJFlag: string;
  PrimaryAccountCountry: string;
  ComInvoiceBillPaymentSystem: string;
  AccountTypeService: string;
  AccountService: string;
  AccountServiceType: string;
  AccountServiceTypeWeighting: string;
  AccountDeviceNumbersWeighting: string;
  AccountServiceTypeWeightingDetail: null;
  AccountServicesUser: null;
  AccountServicesSystem: null;
  AccountServiceWeighting: string;
  ServicesPackage: string;
  AccountTypeRecharge: null;
  PrimaryAccountAddressCodigoEspecial: null;
  ErrorCode: null;
  ErrorMessage: null;
  OTTUser: null;
  AccountCountryCode: string;
  FechaEntrada: null;
  NombreSegmento: null;
  PrimaryContactBirthDate: string;
  ListOfProperty: null;
  ListOfServiceInstance: ListOfServiceInstance;
  ListOfServiceInstanceType: ListOfServiceInstanceType;
  ListOfServiceAgreement: ListOfServiceAgreement;
  ListOfAddress: ListOfAddress;
}

export interface ListOfAddress {
  AccountAddress: AccountAddress[];
}

export interface AccountAddress {
  Primary: string;
  AddrType: string;
  StreetAddrCalle: string;
  NumInt: null;
  ProvinceColonia: string;
  AddrNumNumExt: string;
  CityPoblacion: string;
  CountyDelMun: string;
  StateEstado: string;
  CountryPais: string;
  PostalCodeCP: string;
  EntreCalle1: string;
  EntreCalle2: string;
  Latitude: string;
  Longitude: string;
  MDUFlag: string;
  AddrId: string;
}

export interface ListOfServiceAgreement {
  ServiceAgreement: { [key: string]: null | string }[];
}

export interface ListOfServiceInstance {
  ServiceInstance: ServiceInstance[];
}

export interface ServiceInstance {
  SlaveHierarchy: string;
  StatusCode: StatusCode;
  AssetNumber: string;
  SecondAssetNumber: null | string;
  IntegrationId: string;
  ServiceProductType: ServiceProductType;
  AgreementName: string;
  ServiceSupplier: null | string;
  EventTypeExtern: null;
  MSISDN: number | null;
  HouseHoldId: string;
  AgreementPromotionalCode: null;
  ListOfInstanceComponent: ListOfInstanceComponent | null;
}

export interface ListOfInstanceComponent {
  InstanceComponent: { [key: string]: null | string }[];
}

export enum ServiceProductType {
  Celular = "CELULAR",
  Datos = "DATOS",
  Video = "VIDEO",
}

export enum StatusCode {
  Activo = "Activo",
  Desconectado = "Desconectado",
  Pendiente = "Pendiente",
}

export interface ListOfServiceInstanceType {
  ServiceInstanceType: ServiceInstanceType[];
}

export interface ServiceInstanceType {
  ServiceProductType: string;
  TotalInstancias: string;
  Activo: string;
  Pendiente: string;
  Suspendido: string;
  Desconectado: string;
  FutureAddition: string;
  FutureDisconnection: string;
  Error: string;
}

export type ConsultaCuenta_Respuesta = EncabezadoRespuestaInterna &
  ConsultaCuentaRest_Salida;
