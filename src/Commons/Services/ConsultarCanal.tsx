import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarCanal_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "consultarCanal",
    rutaEndPoint: "/consultarCanal",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    //DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface ConsultarCanal_Entrada {
  Paquete: string;
  TipoCuenta: string;
  HD: string;
  Categoria: string;
}

export function builtConsultarCanalEntrada(
  p_Paquete: string,
  p_TipoCuenta: string,
  p_HD: string,
  p_Categoria: string
) {
  var retorno: ConsultarCanal_Entrada = {
    Paquete: p_Paquete,
    TipoCuenta: p_TipoCuenta,
    HD: p_HD,
    Categoria: p_Categoria,
  };

  return retorno;
}

//SALIDA

export interface ConsultarCanal_Salida {
    resultado:          string;
    resultadodesc:      string;
    ListaCanalALaCarta: ListaCanalALaCarta;
}

export interface ListaCanalALaCarta {
    CanalALaCarta: CanalALaCarta[];
}

export interface CanalALaCarta {
    Nombre:        string;
    NombreDisplay: string;
    Imagen:        string;
    Canal:         string;
    Sinopsis:      string;
    CanalDisplay:  string;
    Definicion:    string;
    Categoria:     string;
}



export type ConsultarCanal_Respuesta = EncabezadoRespuestaInterna &
ConsultarCanal_Salida;

