import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarCartelera_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarCartelera",
    rutaEndPoint: "/consultarCartelera",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    //DESTINO_SERVICIO: DestinoConexion.Localhost,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface ConsultarCartelera_Entrada {
  skyPackage: string;
  accountType: string;
  account: string;
  assetNumber: string;
  secondAssetNumber: string;
  paisISO: string;
}

export function builtConsultarCartelera_Entrada(
  l_skyPackage: string,
  l_accountType: string,
  l_account: string,
  l_assetNumber: string,
  l_secondAssetNumber: string,
  p_paisISO: string
) {
  var retorno: ConsultarCartelera_Entrada = {
    skyPackage: l_skyPackage,
    accountType: l_accountType,
    account: l_account,
    assetNumber: l_assetNumber,
    secondAssetNumber: l_secondAssetNumber,
    paisISO: p_paisISO,
  };

  return retorno;
}

//SALIDA

export interface ConsultarCartelera_Salida {
  estado: string;
  descripcion: string;
  dataArea: DataArea;
}

export interface DataArea {
  canales: Canal[];
}

export interface Canal {
  tipo: string;
  nombre: string;
  precio: string;
  descripcion: string;
  imagen: string;
  canal: string;
  categoria: string;
}

export function builtCanal(
  p_tipo: string,
  p_nombre: string,
  p_precio: string,
  p_descripcion: string,
  p_imagen: string,
  p_canal: string,
  p_categoria: string
) {
  var retorno: Canal = {
    tipo: p_tipo,
    nombre: p_nombre,
    precio: p_precio,
    descripcion: p_descripcion,
    imagen: p_imagen,
    canal: p_canal,
    categoria: p_categoria,
  };

  return retorno;
}

export type ConsultarCartelera_Respuesta = EncabezadoRespuestaInterna &
  ConsultarCartelera_Salida;
