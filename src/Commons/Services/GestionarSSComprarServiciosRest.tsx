import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GestionarSSComprarServicios_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GestionarSSComprarServiciosRest",
    rutaEndPoint: "/EnterpriseServices/Sel/GestionarSSComprarServiciosRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface GestionarSSComprarServicios_Entrada {
  GestionarSSComprarServiciosRequestEBM: GestionarSSComprarServiciosRequestEBM;
}

export function builtGestionarSSComprarServicios_Entrada(
  p_GestionarSSComprarServiciosRequestEBM: GestionarSSComprarServiciosRequestEBM
) {
  var retorno: GestionarSSComprarServicios_Entrada = {
    GestionarSSComprarServiciosRequestEBM:
      p_GestionarSSComprarServiciosRequestEBM,
  };

  return retorno;
}

export interface GestionarSSComprarServiciosRequestEBM {
  ServiceInfoRequest: ServiceInfoRequest;
}

export function builtGestionarSSComprarServiciosRequestEBM(
  p_ServiceInfoRequest: ServiceInfoRequest
) {
  var retorno: GestionarSSComprarServiciosRequestEBM = {
    ServiceInfoRequest: p_ServiceInfoRequest,
  };

  return retorno;
}

export interface ServiceInfoRequest {
  Proceso: string;
  Cuenta: string;
  Categoria: string;
  Grupo: string;
  Tipo: string;
  Origen: string;
  ListOfInstances: ListOfInstances;
}

export function builtServiceInfoRequest(
  p_Proceso: string,
  p_Cuenta: string,
  p_Categoria: string,
  p_Grupo: string,
  p_Tipo: string,
  p_Origen: string,
  p_ListOfInstances: ListOfInstances
) {
  var retorno: ServiceInfoRequest = {
    Proceso: p_Proceso,
    Cuenta: p_Cuenta,
    Categoria: p_Categoria,
    Grupo: p_Grupo,
    Tipo: p_Tipo,
    Origen: p_Origen,
    ListOfInstances: p_ListOfInstances,
  };

  return retorno;
}

export interface ListOfInstances {
  Instance: Instance[];
}

export function builtListOfInstances(p_Instance: Instance[]) {
  var retorno: ListOfInstances = {
    Instance: p_Instance,
  };

  return retorno;
}

export interface Instance {
  AssetNumber: string;
  SecondAssetNumber: string;
  ListOfProducts: ListOfProducts;
}

export function builtInstance(
  p_AssetNumber: string,
  p_SecondAssetNumber: string,
  p_ListOfProducts: ListOfProducts
) {
  var retorno: Instance = {
    AssetNumber: p_AssetNumber,
    SecondAssetNumber: p_SecondAssetNumber,
    ListOfProducts: p_ListOfProducts,
  };

  return retorno;
}

export interface ListOfProducts {
  Product: Product[];
}

export function builtListOfProducts(p_Product: Product[]) {
  var retorno: ListOfProducts = {
    Product: p_Product,
  };

  return retorno;
}

export interface Product {
  Name: string;
  Action: string;
}

export function builtProduct(p_Name: string, p_Action: string) {
  var retorno: Product = {
    Name: p_Name,
    Action: p_Action,
  };

  return retorno;
}

//SALIDA

export interface GestionarSSComprarServicios_Salida {
  GestionarSSComprarServiciosResponseEBM: GestionarSSComprarServiciosResponseEBM;
}

export interface GestionarSSComprarServiciosResponseEBM {
  ServiceInfoResponse: ServiceInfoResponse;
}

export interface ServiceInfoResponse {
  NumeroSS: string;
  Subestado: string;
  Estado: string;
}

export type GestionarSSComprarServicios_Respuesta =
  EncabezadoRespuestaInterna & GestionarSSComprarServicios_Salida;
