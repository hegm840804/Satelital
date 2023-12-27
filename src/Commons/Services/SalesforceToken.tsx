import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

import { tokenSalesForceParametros } from "../ConfigRed";

export function SalesforceToken_Parametros() {
  var par: ParametrosWSBase = {
    nombreProceso: "SalesforceToken",
    rutaEndPoint:
      "/services/oauth2/token?grant_type=password" +
      "&client_id=" +
      tokenSalesForceParametros.client_id +
      "&client_secret=" +
      tokenSalesForceParametros.client_secret +
      "&username=" +
      tokenSalesForceParametros.username +
      "&password=" +
      tokenSalesForceParametros.password,
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: false,
    DESTINO_SERVICIO: DestinoConexion.Token,
    parametros: { },
  };

  return par;
}

export interface SalesforceToken_Salida  {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
};

export type SalesforceToken_Respuesta = SalesforceToken_Salida;
