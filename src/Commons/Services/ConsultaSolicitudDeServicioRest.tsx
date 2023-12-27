import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultaSolicitudDeServicio_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultaSolicitudDeServicio",
    rutaEndPoint: "/EnterpriseServices/Sel/ConsultaSolicitudDeServicioRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export function builtRecargaConsultaPrecioRecargaInput(
  l_RowId: string,
  l_AreaSS: string,
  l_SubAreaSS: string
) {
  var retorno: ConsultaSolicitudDeServicio_Entrada =
    builtConsultaSolicitudDeServicio_Entrada(
      builtConsultaSolicitudDeServicioProcessRequest(
        l_RowId,
        l_AreaSS,
        l_SubAreaSS
      )
    );

  return retorno;
}

export interface ConsultaSolicitudDeServicio_Entrada {
  ConsultaSolicitudDeServicioProcessRequest: ConsultaSolicitudDeServicioProcessRequest;
}

export function builtConsultaSolicitudDeServicio_Entrada(
  l_ConsultaSolicitudDeServicioProcessRequest: ConsultaSolicitudDeServicioProcessRequest
) {
  var retorno: ConsultaSolicitudDeServicio_Entrada = {
    ConsultaSolicitudDeServicioProcessRequest:
      l_ConsultaSolicitudDeServicioProcessRequest,
  };

  return retorno;
}

export interface ConsultaSolicitudDeServicioProcessRequest {
  RowId: string;
  AreaSS: string;
  SubAreaSS: string;
}

export function builtConsultaSolicitudDeServicioProcessRequest(
  l_RowId: string,
  l_AreaSS: string,
  l_SubAreaSS: string
) {
  var retorno: ConsultaSolicitudDeServicioProcessRequest = {
    RowId: l_RowId,
    AreaSS: l_AreaSS,
    SubAreaSS: l_SubAreaSS,
  };

  return retorno;
}

//SALIDA

export interface ConsultaSolicitudDeServicio_Salida {
  ConsultaSolicitudDeServicioProcessResponse: ConsultaSolicitudDeServicioProcessResponse;
}

export interface ConsultaSolicitudDeServicioProcessResponse {
  resultado: string;
  resultadodesc: string;
  DetalleSolicitudDeServicio: DetalleSolicitudDeServicio[];
}

export interface DetalleSolicitudDeServicio {
  NumeroDeSolicitud: string;
  Area: string;
  SubAarea: string;
  Comentario: null;
  TarjetaInteligente: null;
  FechaCreacion: string;
  Estatus: string;
}

export type ConsultaSolicitudDeServicio_Respuesta =
  ConsultaSolicitudDeServicio_Salida;
