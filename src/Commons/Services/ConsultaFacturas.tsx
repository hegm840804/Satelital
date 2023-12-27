import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultaFacturas_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultaFacturas",
    rutaEndPoint: "/consultaFacturas",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA
export interface ConsultaFacturas_Entrada {
    numeroCuenta: string;
    user:         string;
    password:     string;
}

export function builtRecargaConsultaPrecioRecargaInput(
    l_numeroCuenta: string,
    l_user:         string,
    l_password:     string
  ) {
    var retorno: ConsultaFacturas_Entrada = {
        numeroCuenta: l_numeroCuenta,
        user:         l_user,
        password:     l_password
    };
  
    return retorno;
  }

  //SALIDA

  export interface ConsultaFacturas_Salida {
    cabecera:   Cabecera;
    resultados: { [key: string]: Resultado  }[];
}

export interface Cabecera {
    coderror: string;
    msgerror: string;
}

export interface Resultado {
    name:            string;
    declaredType:    string;
    scope:           string;
    value:           string;
    nil:             boolean;
    typeSubstituted: boolean;
    globalScope:     boolean;
}

export type ConsultaFacturas_Respuesta = EncabezadoRespuestaInterna &
ConsultaFacturas_Salida;