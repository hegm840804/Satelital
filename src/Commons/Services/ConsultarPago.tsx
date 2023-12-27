import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarPago_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarPago",
    rutaEndPoint: "/EnterpriseServices/Siebel/Pago/consultarPago",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}


//ENTRADA
export interface ConsultarPago_Entrada {
    RowId: string;
}


export interface ConsultarPago_Saida {
    resultado:     string;
    resultadodesc: string;
    ListaPagos:    ListaPagos;
}

export interface ListaPagos {
    Pago: Pago[];
}

export interface Pago {
    NoTarjeta:    string;
    TipoPago:     string;
    Importe:      string;
    NoReferencia: string;
    FechaPago:    string;
    Estatus:      string;
    EstatusSBL:   string;
}


export type ConsultarPago_Respuesta = ConsultarPago_Saida;