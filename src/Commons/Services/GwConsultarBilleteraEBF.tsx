import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function consultarBilletera_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarBilletera",
    rutaEndPoint: "/GwConsultarBilleteraEBF ",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Backend,
    parametros: { ...datos },
  };

  return par;
}

export type ConsultarBilletera_Input = {
  NumeroCuenta: string;
  //PaymentInstrument: string;
  //IdProspecto: string;
  //NumeroContrato: string;
  //Email: string;
};

type ConsultarBilletera_Output = {
  ConsultarBilleteraListInput: [ConsultarBilletera_Info];
};

export type ConsultarBilletera_Info = {
  Id: string;
  PaymentInstrument: string;
  IdProspecto: string;
  NumeroCuenta: string;
  NumeroContrato: string;
  Email: string;
  NombreTarjeta: string;
  FechaExp: string;
  CVV: string;
  TipoTarjeta: string;
  DescripcionTipoTarjeta: string;
  InstrumentId: string;
  MaskedPan: string;
  Recurrente: string;
  EstatusDm: string;
  FechaDm: string;
  Estatus3Ds: string;
  Fecha3Ds: string;
  Referencia3Ds: string;
  Nombre: string;
  APaterno: string;
  AMaterno: string;
  NumTelefono: string;
  Calle: string;
  NumExt: string;
  NumInt: string;
  Estado: string;
  Municipio: string;
  Ciudad: string;
  Colonia: string;
  CodigoPostal: string;
  CodPais: string;
  Monto: string;
  TipoBin: string;
};

export type ConsultarBilletera_Respuesta = EncabezadoRespuestaInterna &
  ConsultarBilletera_Output;
