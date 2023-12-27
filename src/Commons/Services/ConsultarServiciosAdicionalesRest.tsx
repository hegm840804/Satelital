import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarServiciosAdicionalesRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarServiciosAdicionalesRest",
    rutaEndPoint: "/EnterpriseServices/Sel/ConsultarServiciosAdicionalesRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface ConsultarServiciosAdicionalesRest_Entrada {
  ConsultarServiciosAdicionalesRequest: ConsultarServiciosAdicionalesRequest;
}

export function builtConsultarServiciosAdicionalesRest_Entrada(
  p_ConsultarServiciosAdicionalesRequest: ConsultarServiciosAdicionalesRequest
) {
  var retorno: ConsultarServiciosAdicionalesRest_Entrada = {
    ConsultarServiciosAdicionalesRequest:
      p_ConsultarServiciosAdicionalesRequest,
  };

  return retorno;
}

export interface ConsultarServiciosAdicionalesRequest {
  Proceso: string;
  Categoria: string;
  Cuenta: string;
  AssetNumber: string;
  SecondAssetNumber: string;
  Pais: string;
}

export function builtConsultarServiciosAdicionalesRequest(
  p_Proceso: string,
  p_Categoria: string,
  p_Cuenta: string,
  p_AssetNumber: string,
  p_SecondAssetNumber: string,
  p_Pais: string
) {
  var retorno: ConsultarServiciosAdicionalesRequest = {
    Proceso: p_Proceso,
    Categoria: p_Categoria,
    Cuenta: p_Cuenta,
    AssetNumber: p_AssetNumber,
    SecondAssetNumber: p_SecondAssetNumber,
    Pais: p_Pais,
  };

  return retorno;
}

//SALIDA
export interface ConsultarServiciosAdicionalesRest_Salida {
  ConsultarServiciosAdicionales: ConsultarServiciosAdicionales;
}

export interface ConsultarServiciosAdicionales {
  ConsultarServiciosAdicionales: ConsultarServiciosAdicionale[];
}

export interface ConsultarServiciosAdicionale {
  NombreProductoCRM: string;
  NombreProductoSEL: string;
  PartNum: string;
  BolsaDatosCantidad: null;
  BolsaDatosUnidad: null;
  TiempoPaquete: null;
  UOMTiempoPaquete: null;
  SMSPaquete: null;
  Imagen: string;
  Descripcion: string;
  Costo: string;
  CostoDiferencia: string;
  ListProductFacturacion: ListProductFacturacion;
}

export interface ListProductFacturacion {
  ProductFacturacion: ProductFacturacion[];
}

export interface ProductFacturacion {
  NombreProductoFactura: string;
  PartNumberFactura: string;
}

export type ConsultarServiciosAdicionalesRest_Respuesta = EncabezadoRespuestaInterna &
ConsultarServiciosAdicionalesRest_Salida;