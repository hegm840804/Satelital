import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarAvatarCuenta_Parametros(datos: any, account: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "getAccountAvatar",
    rutaEndPoint: account+"/avatars",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: false,
    DESTINO_SERVICIO: DestinoConexion.Avatars,
    parametros: { ...datos }
  };

  return par;
}


//SALIDA

export interface ConsultarAvatarCuenta_Salida {
    content:          Content[];
    pageable:         Pageable;
    last:             string;
    totalElements:    string;
    totalPages:       string;
    size:             string;
    number:           string;
    sort:             Sort;
    first:            string;
    numberOfElements: string;
    empty:            string;


}

export interface Pageable {
    sort:       Sort;
    offSet:     string;
    pageNumber: string;
    pageSize:   string;
    paged:      string;
    unpaged:    string;
}

export interface Sort {
  empty:    string;
  sorted:   string;
  unsorted: string;
}

export interface Content {
  id:               string;
  catalogoAvatarId: string;
  catalogoAvatar:   CatalogoAvatar;
}

export interface CatalogoAvatar {
  id:           string;
  nombre:       string;
  avatarBase64: string;
}

export type ConsultarAvatarCuenta_Respuesta = EncabezadoRespuestaInterna &
ConsultarAvatarCuenta_Salida;