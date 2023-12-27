import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarAvatars_Parametros(datos: any, pageSize: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "getAvatars",
    rutaEndPoint: "avatars?size="+pageSize,
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: false,
    DESTINO_SERVICIO: DestinoConexion.Avatars,
    parametros: { ...datos },
  };

  return par;
}

//SALIDA

export interface ConsultarAvatars_Salida {
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
  id:           string;
  nombre:       string;
  avatarBase64: string;
  descripcion:  string;
  enabledflag:  string;
}

export type ConsultarAvatars_Respuesta = EncabezadoRespuestaInterna &
ConsultarAvatars_Salida;