import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarDatosFiscales_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultaDatosFiscales",
    rutaEndPoint: "/EnterpriseServices/Sel/ConsultarDatosFiscalesRest",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export interface ConsultaDatosFiscales_Entrada {
  numeroCuenta: string;
}

export interface ConsultaDatosFiscales_Salida {
  InformacionFiscal: InformacionFiscal;
}

export interface InformacionFiscal {
  TipoFactura: string;
  RazonSocial: string;
  Calle: string;
  Colonia: string;
  Municipio: string;
  Ciudad: string;
  CodigoPostal: string;
  Estado: string;
  NumeroExterior: string;
  NumeroInterior: string;
  RFC: string;
  tipopersona: string;
  regimenfiscal: string;
  usocfdi: string;
}

export type ConsultaDatosFiscales_Respuesta = EncabezadoRespuestaInterna &
  ConsultaDatosFiscales_Salida;
