import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function ConsultarTipoCambio_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "ConsultarTipoCambio",
    rutaEndPoint: "/GwConsultarTipoCambioEBS",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.BackendBilletera,
    parametros: { ...datos },
  };

  return par;
}

export function ConsultarTipoCambioInput(
    l_pEstatus: string,
    l_pPais:    string
  ) {
    var retorno: ConsultarTipoCambio_Entrada =builtConsultarTipoCambio_Entrada(
        builtConsultarTipoCambio_Param(
            l_pEstatus,
            l_pPais,
          )
      );
  
    return retorno;
  }

//ENTRADA
export interface ConsultarTipoCambio_Entrada {
    DbConsultarTipoCambioPciABCSSelect_pId_pPais_pEstatusInputParameters: DBConsultarTipoCambioPCIABCSSelectPIDPPaisPEstatusInputParameters;
}

export function builtConsultarTipoCambio_Entrada(
    l_DBConsultarTipoCambioPCIABCSSelectPIDPPaisPEstatusInputParameters:DBConsultarTipoCambioPCIABCSSelectPIDPPaisPEstatusInputParameters
  ) {
    var retorno: ConsultarTipoCambio_Entrada ={
        DbConsultarTipoCambioPciABCSSelect_pId_pPais_pEstatusInputParameters: l_DBConsultarTipoCambioPCIABCSSelectPIDPPaisPEstatusInputParameters
    };
  
    return retorno;
  }

export interface DBConsultarTipoCambioPCIABCSSelectPIDPPaisPEstatusInputParameters {
    pEstatus: string;
    pPais:    string;
}

export function builtConsultarTipoCambio_Param(
    l_pEstatus: string,
    l_pPais:    string,
  ) {
    var retorno: DBConsultarTipoCambioPCIABCSSelectPIDPPaisPEstatusInputParameters ={
        pEstatus: l_pEstatus,
        pPais:    l_pPais
    };
  
    return retorno;
  }

  //SALIDA

  export interface ConsultarTipoCambio_Salida {
    BilleteraTipoCambioCollection: BilleteraTipoCambioCollection;
}

export interface BilleteraTipoCambioCollection {
    BilleteraTipoCambio: BilleteraTipoCambio[];
}

export interface BilleteraTipoCambio {
    id:                  number;
    estatus:             string;
    pais:                string;
    origen:              string;
    destino:             string;
    tasa:                number;
    fechaVigenciaInicio: Date;
    fechaVigenciaFin:    Date;
    fechaCreacion:       Date;
    fechaActualizacion:  Date;
}






  export type ConsultarTipoCambio_Respuesta = EncabezadoRespuestaInterna &
  ConsultarTipoCambio_Salida;

