import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarIRD_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "consultarIRD",
    rutaEndPoint: "/EnterpriseServices/Siebel/Equipo/consultarIRD",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Siebel,
    parametros: { ...datos },
  };

  return par;
}


export interface ConsultarIRD_Entrada {
    RowID: string;
  }


  export interface ConsultarIRD_Salida {
    respuesta:     string;
    respuestadesc: string;
    Tarjeta:       Tarjeta[];
}

export interface Tarjeta {
    TarjetaInteligente: string;
    IRD:                null | string;
    Ubicacion:          null | string;
    Status:             string;
    Jerarquia:          string;
    Categoria:          null | string;
    Flg_funcionalidad:  string;
}

export type ConsultarIRD_Respuesta = ConsultarIRD_Salida;
