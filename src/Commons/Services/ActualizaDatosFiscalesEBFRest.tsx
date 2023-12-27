import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ActualizaDatosFiscalesEBFRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ActualizaDatosFiscalesEBFRest",
    rutaEndPoint: "/EnterpriseServices/Sel/ActualizaDatosFiscalesEBFRest",
    sistemaOrigen: "Web",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export function builtActualizaDatosFiscalesEBFRestInput(
  l_Cuenta: string,
  l_Descripcion: string,
  l_MetodoEnvio: string,
  l_TipoFactura: string,
  l_RazonSocial: string,
  l_Calle: string,
  l_Colonia: string,
  l_Municipio: string,
  l_Ciudad: string,
  l_CodigoPostal: string,
  l_Estado: string,
  l_Nombre: string,
  l_NumeroExterior: string,
  l_NumeroInterior: string,
  l_RFC: string,
  l_Proceso: string,
  l_Origen: string,
  l_TipoPersona: string,
  l_RegimenFiscal: string,
  l_UsoCFDI: string,
  l_SistemaOrigen: string,
  l_SolicitudDeServicio: string
) {
  var retorno: ActualizaDatosFiscalesEBFRest_Entrada =
    builtActualizaDatosFiscalesEBFRest_Entrada(
      builtActualizarDatosFiscalesRequest(
        l_Cuenta,
        l_Descripcion,
        l_MetodoEnvio,
        l_TipoFactura,
        l_RazonSocial,
        l_Calle,
        l_Colonia,
        l_Municipio,
        l_Ciudad,
        l_CodigoPostal,
        l_Estado,
        l_Nombre,
        l_NumeroExterior,
        l_NumeroInterior,
        l_RFC,
        l_Proceso,
        l_Origen,
        l_TipoPersona,
        l_RegimenFiscal,
        l_UsoCFDI,
        l_SistemaOrigen,
        l_SolicitudDeServicio
      )
    );

  return retorno;
}

export interface ActualizaDatosFiscalesEBFRest_Entrada {
  ActualizarDatosFiscalesRequest: ActualizarDatosFiscalesRequest;
}

export function builtActualizaDatosFiscalesEBFRest_Entrada(
  l_ActualizarDatosFiscalesRequest: ActualizarDatosFiscalesRequest
) {
  var retorno: ActualizaDatosFiscalesEBFRest_Entrada = {
    ActualizarDatosFiscalesRequest: l_ActualizarDatosFiscalesRequest,
  };

  return retorno;
}

export interface ActualizarDatosFiscalesRequest {
  Cuenta: string;
  Descripcion: string;
  MetodoEnvio: string;
  TipoFactura: string;
  RazonSocial: string;
  Calle: string;
  Colonia: string;
  Municipio: string;
  Ciudad: string;
  CodigoPostal: string;
  Estado: string;
  Nombre: string;
  NumeroExterior: string;
  NumeroInterior: string;
  RFC: string;
  Proceso: string;
  Origen: string;
  TipoPersona: string;
  RegimenFiscal: string;
  UsoCFDI: string;
  SistemaOrigen: string;
  SolicitudDeServicio: string;
}

export function builtActualizarDatosFiscalesRequest(
  l_Cuenta: string,
  l_Descripcion: string,
  l_MetodoEnvio: string,
  l_TipoFactura: string,
  l_RazonSocial: string,
  l_Calle: string,
  l_Colonia: string,
  l_Municipio: string,
  l_Ciudad: string,
  l_CodigoPostal: string,
  l_Estado: string,
  l_Nombre: string,
  l_NumeroExterior: string,
  l_NumeroInterior: string,
  l_RFC: string,
  l_Proceso: string,
  l_Origen: string,
  l_TipoPersona: string,
  l_RegimenFiscal: string,
  l_UsoCFDI: string,
  l_SistemaOrigen: string,
  l_SolicitudDeServicio: string
) {
  var retorno: ActualizarDatosFiscalesRequest = {
    Cuenta: l_Cuenta,
    Descripcion: l_Descripcion,
    MetodoEnvio: l_MetodoEnvio,
    TipoFactura: l_TipoFactura,
    RazonSocial: l_RazonSocial,
    Calle: l_Calle,
    Colonia: l_Colonia,
    Municipio: l_Municipio,
    Ciudad: l_Ciudad,
    CodigoPostal: l_CodigoPostal,
    Estado: l_Estado,
    Nombre: l_Nombre,
    NumeroExterior: l_NumeroExterior,
    NumeroInterior: l_NumeroInterior,
    RFC: l_RFC,
    Proceso: l_Proceso,
    Origen: l_Origen,
    TipoPersona: l_TipoPersona,
    RegimenFiscal: l_RegimenFiscal,
    UsoCFDI: l_UsoCFDI,
    SistemaOrigen: l_SistemaOrigen,
    SolicitudDeServicio: l_SolicitudDeServicio,
  };

  return retorno;
}


//SALIDA

export interface ActualizaDatosFiscalesEBFRest_Salida {
    ActualizarDatosFiscalesResponse: ActualizarDatosFiscalesResponse;
}

export interface ActualizarDatosFiscalesResponse {
    Proceso:      string;
    ErrorCode:    string;
    ErrorMessage: string;
    SRId:         string;
    SRNumber:     string;
    SREstatus:    string;
}

export type ActualizaDatosFiscalesEBFRest_Respuesta = EncabezadoRespuestaInterna &
ActualizaDatosFiscalesEBFRest_Salida;


