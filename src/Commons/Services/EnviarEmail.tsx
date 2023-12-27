import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function EnviarEmail_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "enviarEmail",
    rutaEndPoint: "/EnterpriseServices/Sel/Solicitud/enviarEmail",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export interface EnviarEmail_Entrada {
  sistema: string;
  codigo: string;
  correo_destino: string;
  pais: string;
  parametros: Parametro[];
  ATTACHMENTS: Attachment[];
}

export function builtEnviarEmail_Entrada(
  l_sistema: string,
  l_codigo: string,
  l_correo_destino: string,
  l_pais: string,
  l_parametros: Parametro[],
  l_ATTACHMENTS: Attachment[]
) {
  var retorno: EnviarEmail_Entrada = {
    sistema: l_sistema,
    codigo: l_codigo,
    correo_destino: l_correo_destino,
    pais: l_pais,
    parametros: l_parametros,
    ATTACHMENTS: l_ATTACHMENTS,
  };

  return retorno;
}

export interface Attachment {
  fileName: string;
  extension: string;
  fileBase64: string;
}

export function builtAttachment(
  l_fileName: string,
  l_extension: string,
  l_fileBase64: string
) {
  var retorno: Attachment = {
    fileName: l_fileName,
    extension: l_extension,
    fileBase64: l_fileBase64,
  };

  return retorno;
}

export interface Parametro {
  nombre: string;
  valor: string;
}

export function builtParametro(l_nombre: string, l_valor: string) {
  var retorno: Parametro = {
    nombre: l_nombre,
    valor: l_valor,
  };

  return retorno;
}
