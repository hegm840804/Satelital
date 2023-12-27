import axios from "axios";
import { ConfigRed, tokenSalesForceParametros } from "./ConfigRed";
import { decode, encode } from "base-64";
import {
  SalesforceToken_Respuesta,
  SalesforceToken_Parametros,
} from "./Services/SalesforceToken";
import { ParametrosWSBase, DestinoConexion } from "./ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "./EncabezadoRespuestaInterna";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const RenovarToken = async () => {
  let par = SalesforceToken_Parametros();

  let SalesforceTokenRespuesta: SalesforceToken_Respuesta = await ConsultaWS(
    par
  );

  var horaActual = new Date();
  horaActual.setTime(horaActual.getTime() + 60 * 60 * 1000);

  tokenSalesForceParametros.vigenciaToken = horaActual;
  tokenSalesForceParametros.token = SalesforceTokenRespuesta.access_token;
  ConfigRed.rutaSalesForce = SalesforceTokenRespuesta.instance_url;
};

export const ConsultaWS = async (parametrosEntrada: ParametrosWSBase) => {
  var rutaDominio: string = "";
  const encabezadoInterno = EncabezadoRequestRest(parametrosEntrada);
  var parametros = { ...parametrosEntrada.parametros };
  var encabezadoContenido: string = "application/json; charset=UTF-8";
  var encabezadoAutorizacion: string = "";
  var basicAut = {};

  switch (parametrosEntrada.DESTINO_SERVICIO) {
    case DestinoConexion.Cybersource:
      rutaDominio = ConfigRed.rutaCybersource;
      parametros = { ...encabezadoInterno, ...parametrosEntrada.parametros! };
      basicAut = {
        auth: {
          username: ConfigRed.usuarioCybersource,
          password: ConfigRed.contraCybersource,
        },
      };
      break;

    case DestinoConexion.Interno:
      rutaDominio = ConfigRed.rutaInterno;
      parametros = { ...encabezadoInterno, ...parametrosEntrada.parametros! };
      basicAut = {
        auth: {
          username: ConfigRed.usuarioInterno,
          password: ConfigRed.contraInterno,
        },
      };
      break;

      case DestinoConexion.Localhost:
        rutaDominio = ConfigRed.rutaLocalhost;
        parametros = { ...encabezadoInterno, ...parametrosEntrada.parametros! };
        basicAut = {
          auth: {
            username: ConfigRed.usuarioLocalhost,
            password: ConfigRed.contraLocalhost,
          },
        };
        break;

    case DestinoConexion.SkyCel:
      rutaDominio = ConfigRed.rutaCel;
      parametros = { ...parametrosEntrada.parametros! };
      basicAut = {
        auth: {
          username: ConfigRed.usuarioCel,
          password: ConfigRed.contraCel,
        },
      };
      break;

    case DestinoConexion.Salesforce:
      let horaActual: Date = new Date();

      if (tokenSalesForceParametros.vigenciaToken) {
        if (
          tokenSalesForceParametros.vigenciaToken.getMilliseconds() <
          horaActual.getMilliseconds()
        ) {
          await RenovarToken();
        }
      } else {
        await RenovarToken();
      }

      rutaDominio = ConfigRed.rutaSalesForce;
      parametros = { ...encabezadoInterno, ...parametrosEntrada.parametros! };
      encabezadoAutorizacion = `Bearer ${tokenSalesForceParametros.token}`;
      break;

    case DestinoConexion.Token:
      rutaDominio = ConfigRed.rutaServicioTokenSF;
      encabezadoContenido = "application/x-www-form-urlencoded";
      parametros = tokenSalesForceParametros.ValoresAut;

      break;

    case DestinoConexion.Backend:
      rutaDominio = ConfigRed.rutaBackend;
      parametros = { ...encabezadoInterno, ...parametrosEntrada.parametros! };
      basicAut = {
        auth: {
          username: ConfigRed.usuarioBackend,
          password: ConfigRed.contraBackend,
        },
      };
      break;

    case DestinoConexion.BackendBilletera:
      rutaDominio = ConfigRed.rutaBackend;
      parametros = { ...encabezadoInterno, ...parametrosEntrada.parametros! };
      basicAut = {
        auth: {
          username: ConfigRed.usuarioBackend,
          password: ConfigRed.contraBackend,
        },
      };
      break;

    case DestinoConexion.Avatars:
      rutaDominio = ConfigRed.rutaAvatars;
      parametros = { ...parametrosEntrada.parametros! };
      basicAut = {
        auth: {
          username: ConfigRed.usuarioBackend,
          password: ConfigRed.contraBackend,
        },
      };
      break;

    case DestinoConexion.BackendSelfService:
      rutaDominio = ConfigRed.rutaBackendSelfService;
      parametros = { ...parametrosEntrada.parametros! };
      basicAut = {
        auth: {
          username: ConfigRed.usuarioBackendSelfService,
          password: ConfigRed.contraBackendSelfService,
        },
      };
      break;

    case DestinoConexion.BackendSF:
      rutaDominio = ConfigRed.rutaBackendSF;
      parametros = { ...encabezadoInterno, ...parametrosEntrada.parametros! };
      basicAut = {
        auth: {
          username: ConfigRed.usuarioBackendSF,
          password: ConfigRed.contraBackendSF,
        },
      };
      break;

    case DestinoConexion.Siebel:
      rutaDominio = ConfigRed.rutaSiebel;
      parametros = { ...encabezadoInterno, ...parametrosEntrada.parametros! };
      basicAut = {
        auth: {
          username: ConfigRed.usuarioSiebel,
          password: ConfigRed.contraSiebel,
        },
      };
      break;
  }

  console.info("Request armado\n\n");
  console.info(`${rutaDominio}${parametrosEntrada.rutaEndPoint}`);
  console.info("Contenido:", parametros);
  try {
    const { data, status } = await axios.post(
      `${rutaDominio}${parametrosEntrada.rutaEndPoint}`,
      parametros,
      {
        headers: {
          "Content-Type": encabezadoContenido,
          Authorization: `${encabezadoAutorizacion}`,
          Accept: "application/json",
        },
        ...basicAut,
      }
    );

    return JSON.parse(JSON.stringify(data, null, 4));
  } catch (error) {
    let resp: EncabezadoRespuestaInterna = {
      EBMHeaderResponse: {
        ErrorTecnico: {
          code: "",
          summary: "",
          detail: "",
          Sistema: "",
        },
        ErrorNegocio: {
          Estado: "",
          CodigoError: "-1",
          DescripcionError: "",
        },
      },
    };
    if (axios.isAxiosError(error)) {
      console.error("error: ", parametrosEntrada.nombreProceso, error.message);
      resp.EBMHeaderResponse.ErrorNegocio.DescripcionError = error.message;

      return resp;
    } else {
      console.error(
        "unexpected error: ",
        parametrosEntrada.nombreProceso,
        error
      );
      resp.EBMHeaderResponse.ErrorNegocio.DescripcionError =
        "unexpected error: " + error;
      return resp;
    }
  }
};

export const ConsultaWSGet = async (parametrosEntrada: ParametrosWSBase) => {
  var rutaDominio: string = "";
  var parametros = { ...parametrosEntrada.parametros };
  var encabezadoContenido: string = "application/json; charset=UTF-8";
  var encabezadoAutorizacion: string = "";
  var basicAut = {};

  switch (parametrosEntrada.DESTINO_SERVICIO) {
    case DestinoConexion.Avatars:
      rutaDominio = ConfigRed.rutaAvatars;
      parametros = { ...parametrosEntrada.parametros! };
      basicAut = {
        auth: {
          username: ConfigRed.usuarioBackend,
          password: ConfigRed.contraBackend,
        },
      };
      break;
  }

  try {
    const { data, status } = await axios.get(
      `${rutaDominio}${parametrosEntrada.rutaEndPoint}`,
      {
        headers: {
          "Content-Type": encabezadoContenido,
          Authorization: `${encabezadoAutorizacion}`,
          Accept: "application/json",
        },
        ...basicAut,
      }
    );

    return JSON.parse(JSON.stringify(data, null, 4));
  } catch (error) {
    let resp: EncabezadoRespuestaInterna = {
      EBMHeaderResponse: {
        ErrorTecnico: {
          code: "",
          summary: "",
          detail: "",
          Sistema: "",
        },
        ErrorNegocio: {
          Estado: "",
          CodigoError: "-1",
          DescripcionError: "",
        },
      },
    };
    if (axios.isAxiosError(error)) {
      console.error("error: ", parametrosEntrada.nombreProceso, error.message);
      resp.EBMHeaderResponse.ErrorNegocio.DescripcionError = error.message;

      return resp;
    } else {
      console.error(
        "unexpected error: ",
        parametrosEntrada.nombreProceso,
        error
      );
      resp.EBMHeaderResponse.ErrorNegocio.DescripcionError =
        "unexpected error: " + error;
      return resp;
    }
  }
};
function EncabezadoRequestRest(par: ParametrosWSBase) {
  if (
    par.DESTINO_SERVICIO == DestinoConexion.Interno ||
    par.DESTINO_SERVICIO == DestinoConexion.Cybersource ||
    par.DESTINO_SERVICIO == DestinoConexion.BackendBilletera
  ) {
    return {
      EBMHeaderRequest: {
        Operacion: par.nombreProceso,
        SistemaOrigen: par.sistemaOrigen,
      },
    };
  }

  return {};
}





//Servicio para pago por evento
export const ConsultaWSPPV = async (parametrosEntrada: ParametrosWSBase) => {
  var rutaDominio: string = "";
  const encabezadoInterno = EncabezadoRequestRest(parametrosEntrada);
  var parametros = { ...parametrosEntrada.parametros };
  var encabezadoContenido: string = "application/json; charset=UTF-8";
  var encabezadoAutorizacion: string = "";
  var basicAut = {};

  rutaDominio = ConfigRed.rutaInterno;
  parametros = { ...encabezadoInterno, ...parametrosEntrada.parametros! };
  basicAut = {
    auth: {
      username: ConfigRed.usuarioInterno,
      password: ConfigRed.contraInterno,
    },
  };

  try {

    const result = await axios.post(
      `${rutaDominio}${parametrosEntrada.rutaEndPoint}`,
      parametros,
      {
        headers: {
          "Content-Type": encabezadoContenido,
          Authorization: `${encabezadoAutorizacion}`,
          Accept: "application/json",
        },
        ...basicAut,
      }
    );

    return result;
  } catch (error) {
    let resp: EncabezadoRespuestaInterna = {
      EBMHeaderResponse: {
        ErrorTecnico: {
          code: "",
          summary: "",
          detail: "",
          Sistema: "",
        },
        ErrorNegocio: {
          Estado: "",
          CodigoError: "-1",
          DescripcionError: "",
        },
      },
    };

    if (axios.isAxiosError(error)) {
      console.error("error: ", parametrosEntrada.nombreProceso, error.message);
      resp.EBMHeaderResponse.ErrorNegocio.DescripcionError = error.message;

      return resp;
    } else {
      console.error(
        "unexpected error: ",
        parametrosEntrada.nombreProceso,
        error
      );
      resp.EBMHeaderResponse.ErrorNegocio.DescripcionError =
        "unexpected error: " + error;
      return resp;
    }
  }
};

