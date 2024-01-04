import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultaParrillaGuiaSkyRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultaParrillaGuiaSkyRest",
    rutaEndPoint: "/EnterpriseServices/Sel/ConsultaParrillaGuiaSkyRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: false,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export function builtConsultaParrillaGuiaSkyRestEntrada(l_ConsultaParrillaGuiaSkyRequestEBM: ConsultaParrillaGuiaSkyRequestEBM, l_EBMHeaderRequest: EBMHeaderRequest){
    var retorno: ConsultaParrillaGuiaSkyRest_Entrada = {
        ConsultaParrillaGuiaSkyRequestEBM:    l_ConsultaParrillaGuiaSkyRequestEBM,
        EBMHeaderRequest: l_EBMHeaderRequest,
    }

    return retorno; 
}

// 
export interface ConsultaParrillaGuiaSkyRest_Entrada {
  ConsultaParrillaGuiaSkyRequestEBM: ConsultaParrillaGuiaSkyRequestEBM;
  EBMHeaderRequest:                  EBMHeaderRequest;
}

export interface ConsultaParrillaGuiaSkyRequestEBM {
  FECHA_FIN:    string;
  FECHA_INICIO: string;
  PAQUETE_ID:   string;
}

export interface EBMHeaderRequest {
  Operacion:     string;
  ParametroList: ParametroList;
  SeguridadList: SeguridadList;
  SistemaOrigen: string;
}

export interface ParametroList {
  ParametroItem: any[];
}

export interface SeguridadList {
  SeguridadItem: SeguridadItem[];
}

export interface SeguridadItem {
  Password:           string;
  SistemaAAutenticar: string;
  Username:           string;
}

export interface ConsultaParrillaGuiaSkyRest_Salida {
  ConsultaParrillaGuiaSkyResponseEBM: ConsultaParrillaGuiaSkyResponseEBM;
}

export interface ConsultaParrillaGuiaSkyResponseEBM {
  Programaciones: Programacione[];
}

export interface Programacione {
  Programacion: Programacion[];
}

export interface Programacion {
  Canal:  Canal;
  Evento: Evento;
}

export interface Canal {
  Identificador: string;
  IdMostrado:    string;
  CanalNombre:   string;
  Nombre:        string;
  Descripcion:   string;
}

export interface Evento {
  Tipo:              string;
  Titulo:            string;
  Duracion:          number;
  Fechainicio:       Date;
  FechaFinal:        Date;
  Sinopsis:          string;
  ContentId:         string;
  TransportStreamId: string;
  EventId:           null;
  SeriesId:          null;
  ProgramId:         string;
  ContentProviderId: string;
  NetworkId:         string;
}

export type ConsultaParrillaGuiaSkyRest_Respuesta = EncabezadoRespuestaInterna &
ConsultaParrillaGuiaSkyRest_Salida;