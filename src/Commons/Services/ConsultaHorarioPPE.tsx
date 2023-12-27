import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultaHorarioPPE_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultaHorarioPPE",
    rutaEndPoint: "/consultahorarioppe",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRAD
export interface ConsultaHorarioPPE_Entrada {
  user: string;
  password: string;
  canal: string;
  nombrePelicula: string;
  tipoEvento: string;
  pais: string;
  diferenciaGmt: string;
}

export function builtConsultaHorarioPPEEntrada(
  l_user: string,
  l_password: string,
  l_canal: string,
  l_nombrePelicula: string,
  l_tipoEvento: string,
  l_pais: string,
  l_diferenciaGmt: string
) {
  var retorno: ConsultaHorarioPPE_Entrada = {
    user: l_user,
    password: l_password,
    canal: l_canal,
    nombrePelicula: l_nombrePelicula,
    tipoEvento: l_tipoEvento,
    pais: l_pais,
    diferenciaGmt: l_diferenciaGmt,
  };

  return retorno;
}
//SALIDA

export interface ConsultaHorarioPPE_Salida {
  result: string;
  resultCode: string;
  horarios: Horario[];
}

export interface Horario {
startdate: string;
  
}


export type ConsultaHorarioPPE_Respuesta = EncabezadoRespuestaInterna &
ConsultaHorarioPPE_Salida;