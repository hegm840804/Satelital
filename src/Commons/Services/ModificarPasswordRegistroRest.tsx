import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ModificarPasswordRegistro_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ModificarPasswordRegistro",
    rutaEndPoint: "/EnterpriseFlows/Sel/ModificarPasswordRegistroRest",
    sistemaOrigen: "AppSky",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export function builtModificarPasswordRegistroInput(
  l_Email: string,
  l_Password: string, 

) {
  var retorno: ModificarPasswordRegistro_Entrada =
    builtModificarPasswordRegistro_Entrada(
      builtModificarPasswordRegistroInputMessage(l_Email,l_Password)
    );

  return retorno;
}

//ENTRADA
export interface ModificarPasswordRegistro_Entrada {
  ModificarPasswordRegistroInputMessage: ModificarPasswordRegistroInputMessage;
}

export function builtModificarPasswordRegistro_Entrada(
  l_ModificarPasswordRegistroInputMessage: ModificarPasswordRegistroInputMessage
) {
  var retorno: ModificarPasswordRegistro_Entrada = {
    ModificarPasswordRegistroInputMessage:
      l_ModificarPasswordRegistroInputMessage,
  };

  return retorno;
}

export interface ModificarPasswordRegistroInputMessage {
  Email: string;
  Password: string;

}

export function builtModificarPasswordRegistroInputMessage(
  l_Email: string,
  l_Password: string,
  
  
) {
  var retorno: ModificarPasswordRegistroInputMessage = {
    Email: l_Email,
    Password: l_Password,
  

  };

  return retorno;
}



export type ModificarPasswordRegistro_Respuesta = EncabezadoRespuestaInterna ;