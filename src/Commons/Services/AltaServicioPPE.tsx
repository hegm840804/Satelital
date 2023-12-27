import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function AltaServicioPPE_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "AltaServicioPPE",
    rutaEndPoint: "/altaservicioppe",
    sistemaOrigen: "Web",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}

//ENTRADA

export interface AltaServicioPPE_Entrada {
  noCuenta: string;
  area: string;
  subarea: string;
  descripcion: string;
  tarjetaInteligente: string;
  contactoRowId: string;
  mailConfirmacion: string;
  pais: string;
  tipoCuenta: string;
  nombreSuscriptor: string;
  paqueteActual: string;
  penalizacionVETVCA: string;
  nombreEvento: string;
  tipoEvento: string;
  costo: string;
  mailFechaInicio: string;
  mailFechaTermino: string;
  canalDisplay: string;
  canal: string;
  idEvento: string;
  fechaInicio: string;
  fechaExpiracion: string;
  duracion: string;
  zonaHoraria: string;
  tokenOverride: string;
  tokenValue: string;
  ppvGenreId: string;
  providerEventId: string;
  orderType: string;
  skyTrackingId: string;
  sistema: string;
  idSesion: string;
  user: string;
  password: string;
}

export function builtRecargaConsultaPrecioRecargaInput(
  l_noCuenta: string,
  l_area: string,
  l_subarea: string,
  l_descripcion: string,
  l_tarjetaInteligente: string,
  l_contactoRowId: string,
  l_mailConfirmacion: string,
  l_pais: string,
  l_tipoCuenta: string,
  l_nombreSuscriptor: string,
  l_paqueteActual: string,
  l_penalizacionVETVCA: string,
  l_nombreEvento: string,
  l_tipoEvento: string,
  l_costo: string,
  l_mailFechaInicio: string,
  l_mailFechaTermino: string,
  l_canalDisplay: string,
  l_canal: string,
  l_idEvento: string,
  l_fechaInicio: string,
  l_fechaExpiracion: string,
  l_duracion: string,
  l_zonaHoraria: string,
  l_tokenOverride: string,
  l_tokenValue: string,
  l_ppvGenreId: string,
  l_providerEventId: string,
  l_orderType: string,
  l_skyTrackingId: string,
  l_sistema: string,
  l_idSesion: string,
  l_user: string,
  l_password: string
) {
  var retorno: AltaServicioPPE_Entrada = {
    noCuenta: l_noCuenta,
    area: l_area,
    subarea: l_subarea,
    descripcion: l_descripcion,
    tarjetaInteligente: l_tarjetaInteligente,
    contactoRowId: l_contactoRowId,
    mailConfirmacion: l_mailConfirmacion,
    pais: l_pais,
    tipoCuenta: l_tipoCuenta,
    nombreSuscriptor: l_nombreSuscriptor,
    paqueteActual: l_paqueteActual,
    penalizacionVETVCA: l_penalizacionVETVCA,
    nombreEvento: l_nombreEvento,
    tipoEvento: l_tipoEvento,
    costo: l_costo,
    mailFechaInicio: l_mailFechaInicio,
    mailFechaTermino: l_mailFechaTermino,
    canalDisplay: l_canalDisplay,
    canal: l_canal,
    idEvento: l_idEvento,
    fechaInicio: l_fechaInicio,
    fechaExpiracion: l_fechaExpiracion,
    duracion: l_duracion,
    zonaHoraria: l_zonaHoraria,
    tokenOverride: l_tokenOverride,
    tokenValue: l_tokenValue,
    ppvGenreId: l_ppvGenreId,
    providerEventId: l_providerEventId,
    orderType: l_orderType,
    skyTrackingId: l_skyTrackingId,
    sistema: l_sistema,
    idSesion: l_idSesion,
    user: l_user,
    password: l_password,
  };

  return retorno;
}

//SALODA

export interface AltaServicioPPE_Salida {
    resultado:       string;
    resultadodesc:   string;
    numeroSolicitud: string;
}


export type AltaServicioPPE_Respuesta = EncabezadoRespuestaInterna &
AltaServicioPPE_Salida;