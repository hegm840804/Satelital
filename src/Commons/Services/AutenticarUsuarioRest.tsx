import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function AutenticarUsuarioRest_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "AutenticarUsuarioRest",
    rutaEndPoint: "/EnterpriseFlows/Sel/AutenticarUsuarioRest",
    sistemaOrigen: "EspacioSky",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Interno,
    parametros: { ...datos },
  };

  return par;
}

export type AutenticarUsuarioRest_Datos = {
  AutenticarUsuarioInputMessage: {
    Correo: string;
    Password: string;
  };
};

export function builtAutenticarUsuarioRest_Datos(
  l_Correo: string,
  l_Password: string
) {
  var retorno: AutenticarUsuarioRest_Datos = {
    AutenticarUsuarioInputMessage: {
      Correo: l_Correo,
      Password: l_Password,
    },
  };

  return retorno;
}

type AutenticarUsuarioRest_Modelo = {
  ListUsuariosSel: {
    UsuarioSelEBO: [AutenticarUsuarioRest_Info];
  };
};

export type AutenticarUsuarioRest_Info = {
  NumeroCuenta: string;
  NombreSuscriptor: string;
  Producto: string;
  Nombre: string;
  APaterno: string;
  AMaterno: string;
  EmailNotif: string;
  TipoCuenta: string;
  NombreCorp: string;
  PrimerSesion: string;
  TelCasaLada: string;
  TelCasa: string;
  TelTrabLada: string;
  TelTrab: string;
  TelTrabExt: string;
  TelMovilLada: string;
  TelMovil: string;
};

export type AutenticarUsuarioRest_Respuesta = EncabezadoRespuestaInterna &
  AutenticarUsuarioRest_Modelo;
