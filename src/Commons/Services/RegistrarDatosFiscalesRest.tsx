import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function RegistrarDatosFiscalesRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "RegistrarDatosFiscalesRest",
    rutaEndPoint: "/EnterpriseServices/Sel/RegistrarDatosFiscalesRest",
    sistemaOrigen: "Web",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export function builtRecargaConsultaPrecioRecargaInput(
  p_Cuenta: string,
  p_Descripcion: string,
  p_MetodoEnvio: string,
  p_TipoFactura: string,
  p_RazonSocial: string,
  p_Calle: string,
  p_Colonia: string,
  p_Municipio: string,
  p_Ciudad: string,
  p_CodigoPostal: string,
  p_Estado: string,
  p_Nombre: string,
  p_NumeroExterior: string,
  p_NumeroInterior: string,
  p_RFC: string,
  p_RegimenFiscal: string,
  p_TipoPersona: string,
  p_UsoCFDI: string
) {
  var retorno: RegistrarDatosFiscalesRest_Entrada =
    builtRegistrarDatosFiscalesRest_Entrada(
      builtRegistrarDatosFiscales(
        builtInformacionFiscal(
          p_Cuenta,
          p_Descripcion,
          p_MetodoEnvio,
          p_TipoFactura,
          p_RazonSocial,
          p_Calle,
          p_Colonia,
          p_Municipio,
          p_Ciudad,
          p_CodigoPostal,
          p_Estado,
          p_Nombre,
          p_NumeroExterior,
          p_NumeroInterior,
          p_RFC,
          p_RegimenFiscal,
          p_TipoPersona,
          p_UsoCFDI
        )
      )
    );

  return retorno;
}

export interface RegistrarDatosFiscalesRest_Entrada {
  RegistrarDatosFiscales: RegistrarDatosFiscales;
}
export function builtRegistrarDatosFiscalesRest_Entrada(
  l_RegistrarDatosFiscales: RegistrarDatosFiscales
) {
  var retorno: RegistrarDatosFiscalesRest_Entrada = {
    RegistrarDatosFiscales: l_RegistrarDatosFiscales,
  };

  return retorno;
}

export interface RegistrarDatosFiscales {
  InformacionFiscal: InformacionFiscal;
}

export function builtRegistrarDatosFiscales(
  l_InformacionFiscal: InformacionFiscal
) {
  var retorno: RegistrarDatosFiscales = {
    InformacionFiscal: l_InformacionFiscal,
  };

  return retorno;
}

export interface InformacionFiscal {
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
  RegimenFiscal: string;
  TipoPersona: string;
  UsoCFDI: string;
}

export function builtInformacionFiscal(
  p_Cuenta: string,
  p_Descripcion: string,
  p_MetodoEnvio: string,
  p_TipoFactura: string,
  p_RazonSocial: string,
  p_Calle: string,
  p_Colonia: string,
  p_Municipio: string,
  p_Ciudad: string,
  p_CodigoPostal: string,
  p_Estado: string,
  p_Nombre: string,
  p_NumeroExterior: string,
  p_NumeroInterior: string,
  p_RFC: string,
  p_RegimenFiscal: string,
  p_TipoPersona: string,
  p_UsoCFDI: string
) {
  var retorno: InformacionFiscal = {
    Cuenta: p_Cuenta,
    Descripcion: p_Descripcion,
    MetodoEnvio: p_MetodoEnvio,
    TipoFactura: p_TipoFactura,
    RazonSocial: p_RazonSocial,
    Calle: p_Calle,
    Colonia: p_Colonia,
    Municipio: p_Municipio,
    Ciudad: p_Ciudad,
    CodigoPostal: p_CodigoPostal,
    Estado: p_Estado,
    Nombre: p_Nombre,
    NumeroExterior: p_NumeroExterior,
    NumeroInterior: p_NumeroInterior,
    RFC: p_RFC,
    RegimenFiscal: p_RegimenFiscal,
    TipoPersona: p_TipoPersona,
    UsoCFDI: p_UsoCFDI,
  };

  return retorno;
}

//SALIDA

export interface RegistrarDatosFiscalesRest_Salida {
  RegistroInformacionFiscalSalida: RegistroInformacionFiscalSalida;
}

export interface RegistroInformacionFiscalSalida {
  Proceso: string;
  ErrorCode: string;
  ErrorMessage: string;
  SRId: string;
  SRNumber: string;
  SREstatus: string;
}

export type RegistrarDatosFiscalesRest_Respuesta = EncabezadoRespuestaInterna &
  RegistrarDatosFiscalesRest_Salida;
