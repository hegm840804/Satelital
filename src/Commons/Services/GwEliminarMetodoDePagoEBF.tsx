import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function EliminarMetodoDePago_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "EliminarMetodoDePago",
    rutaEndPoint: "/GwEliminarMetodoDePagoEBF",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Backend,
    parametros: { ...datos },
  };

  return par;
}

export function builtEliminarMetodoDePagoInput(
  l_IdentificadorDeInstrumento: string,
  l_NumeroCuenta: string,
  l_paymentInstrument: string,
  l_ComercioId: string
) {
  var retorno: EliminarMetodoDePago_Entrada = builtEliminarMetodoDePago_Entrada(
    [
      builtBilleteraDePagoListInput(
        l_IdentificadorDeInstrumento,
        l_NumeroCuenta,
        l_paymentInstrument,
        l_ComercioId
      ),
    ]
  );

  return retorno;
}

//ENTRADA

export interface EliminarMetodoDePago_Entrada {
  BilleteraDePagoListInput: BilleteraDePagoListInput[];
}

export function builtEliminarMetodoDePago_Entrada(
  l_BilleteraDePagoListInput: BilleteraDePagoListInput[]
) {
  var retorno: EliminarMetodoDePago_Entrada = {
    BilleteraDePagoListInput: l_BilleteraDePagoListInput,
  };

  return retorno;
}

export interface BilleteraDePagoListInput {
  IdentificadorDeInstrumento: string;
  NumeroCuenta: string;
  paymentInstrument: string;
  ComercioId: string;
}

export function builtBilleteraDePagoListInput(
  l_IdentificadorDeInstrumento: string,
  l_NumeroCuenta: string,
  l_paymentInstrument: string,
  l_ComercioId: string
) {
  var retorno: BilleteraDePagoListInput = {
    IdentificadorDeInstrumento: l_IdentificadorDeInstrumento,
    NumeroCuenta: l_NumeroCuenta,
    paymentInstrument: l_paymentInstrument,
    ComercioId: l_ComercioId,
  };

  return retorno;
}



export type EliminarMetodoDePago_Respuesta = EncabezadoRespuestaInterna;
