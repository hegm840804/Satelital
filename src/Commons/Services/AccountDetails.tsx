import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function AccountDetails_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "accountDetails",
    rutaEndPoint: "/getAccountDetails",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: false,
    DESTINO_SERVICIO: DestinoConexion.BackendSelfService,
    parametros: { ...datos },
  };

  return par;
}


export interface AccountDetails_Entrada {
    userId: string;
  }


export interface AccountDetails_Salida {
  Account:      Account;
  errormessage: string;
  errorno:      number;
  name:         string;
}

export interface Account {
  Contact: Contact;
  Account: AccountAccount;
}

export interface AccountAccount {
  Shipping:            Shipping;
  Billing:             Billing;
  AccountNumberMobile: string;
  Name:                string;
  AccountNumber:       string;
  AccountId:           string;
}

export interface Billing {
  PrimaryBillToUseCFDI:    string;
  PrimaryBillToTaxRegime:  string;
  PrimaryBillToRFC:        string;
  InteriorNumber:          string;
  District:                string;
  Type:                    string;
  StreetNumber:            string;
  Street:                  string;
  StateCode:               string;
  State:                   string;
  PrimaryBillToPersonType: string;
  PostalCode:              string;
  Name:                    string;
  Delegation:              string;
  CountryCode:             string;
  Country:                 string;
  City:                    string;
  BillingId:               string;
}

export interface Shipping {
  StreetNumber:   string;
  Street:         string;
  StateCode:      string;
  State:          string;
  ShippingId:     string;
  Reference:      string;
  InteriorNumber: string;
  District:       string;
  Delegation:     string;
  PostalCode:     string;
  CountryCode:    string;
  Country:        string;
  City:           string;
  BetweenStreet2: string;
  BetweenStreet1: string;
}

export interface Contact {
  Phone:       string;
  MobilePhone: string;
  MiddleName:  string;
  LastName:    string;
  FirstName:   string;
  Email:       string;
  ContactId:   string;
}



export type AccountDetails_Respuesta = AccountDetails_Salida;
