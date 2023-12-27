import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarPPV_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarPPV",
    rutaEndPoint: "/EnterpriseServices/Sel/PagoEvento/consultarPPV",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA
export interface ConsultarPPV_Entrada {
    TarjetaInteligente: string;
    CuentaSKY:          string;
    Sistema:            string;
}


export function builtConsultarPPVEntrada(
  l_TarjetaInteligente: string,
  l_CuentaSKY:          string,
  l_Sistema:            string
) {
  var retorno: ConsultarPPV_Entrada ={
    TarjetaInteligente: l_TarjetaInteligente,
    CuentaSKY:          l_CuentaSKY,
    Sistema:            l_Sistema
};

  return retorno;
}


//SALIDA
export interface ConsultarPPV_Salida {
    respuesta:      string;
    respuestadesc:  string;
    PPEContratados: PPEContratado[];
}

export interface PPEContratado {
    PPEOrderID:        string;
    CtaSKY:            string;
    SMARTCARD_ID:      string;
    Canal:             number;
    EVENTO:            string;
    TIPO_PPV:          string;
    PRECIO:            string;
    HoraEvento:        string;
    HoraPedido:        string;
    ESTATUS_EVENTO:    string;
    FECHA_TRANSMISION: string;
    FECHA_ORDEN:       string;
    ESTATUS_ORDEN:     string;
    id:number;
    isOpen:boolean;
}

export type ConsultarPPV_Respuesta = EncabezadoRespuestaInterna &
ConsultarPPV_Salida;