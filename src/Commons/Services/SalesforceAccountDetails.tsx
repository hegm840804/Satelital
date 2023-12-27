import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function AccountDetails_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "",
    rutaEndPoint:
      "/services/apexrest/vlocity_cmt/v1/integrationprocedure/mvnoapp_AccountDetails",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: false,
    DESTINO_SERVICIO: DestinoConexion.Token,
    parametros: { ...datos },
  };

  return par;
}

export interface AccountDetails_Entrada {
  userId: string;
}

export interface AccountDetails_Salida {
  errormessage: string;
  errorno: string;
  name: string;
  account: Account;
}

export interface Account {
  Name: string;
  AccountId: string;
  AccountNumber: string;
  Billing: Billing;
  Contact: Contact;
  Shipping: Shipping;
}

export interface Billing {
  PrimaryBillToRFC: string;
  PrimaryBillToUseCFDI: string;
  PrimaryBillToTaxRegime: string;
  Type: string;
  InteriorNumber: string;
  District: string;
  StateCode: string;
  PrimaryBillToPersonType: string;
  Name: string;
  StreetNumber: string;
  PostalCode: string;
  Delegation: string;
  Street: string;
  Country: string;
  State: string;
  City: string;
  CountryCode: string;
}

export interface Contact {
  MobilePhone: string;
  LastName: string;
  Middlename: string;
  FirstName: string;
  Email: string;
  ContactId: string;
}
export interface Shipping {
  InteriorNumber: string;
  Reference: string;
  Street: string;
  StreetNumber: string;
  ShippingId: string;
  BetweenStreet1: string;
  StateCode: string;
  PostalCode: string;
  Delegation: string;
  City: string;
  District: string;
  State: string;
  CountryCode: string;
  BetweenStreet2: string;
  Country: string;
}


export type AccountDetails_Respuesta = AccountDetails_Salida;