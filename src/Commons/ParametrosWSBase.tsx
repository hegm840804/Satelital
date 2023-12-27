export enum DestinoConexion {
  Salesforce,
  Interno,
  Cybersource,
  Token,
  SkyCel,
  Backend,
  BackendSelfService,
  BackendSF,
  Siebel,
  Avatars,
  BackendBilletera,
  Localhost
}

export class ParametrosWSBase {
  /**Nombre identificador del proceso que se llama, no tiene un valor definido */
  nombreProceso: String = "";

  rutaEndPoint: String = "";

  /** Para procesos en CRM, algunas operaciones requieren un valor específico */
  sistemaOrigen: String = "";

  /** El servidor al que pertenece el endpoint */
  DESTINO_SERVICIO: DestinoConexion = DestinoConexion.Token;

  /** Para Salesforcee no se envían los encabezados estándar que usan Interno y Cybersource */
  AGREGAR_ENCABEZADO: boolean = true;

  parametros?: object;
}
