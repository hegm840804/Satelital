import {
  builtGetToken4SkyCelularEntrada,
  GetToken4SkyCelular_Entrada,
  GetToken4SkyCelular_Parametros,
  GetToken4SkyCelular_Respuesta,
} from "../Commons/Services/GetToken4SkyCelular";
import { ConsultaWS } from "../Commons/ServiciosBase";
import { tokenSalesForceParametros } from "../Commons/ConfigRed";
import {
  builtGetPrimaryData4SkyCelularEntrada,
  GetPrimaryData4SkyCelular_Entrada,
  GetPrimaryData4SkyCelular_Parametros,
  GetPrimaryData4SkyCelular_Respuesta,
} from "../Commons/Services/GetPrimaryData4SkyCelular";
import {
  builtGetAssets4SkyCelularEntrada,
  GetAssets4SkyCelular_Entrada,
  GetAssets4SkyCelular_Parametros,
  GetAssets4SkyCelular_Respuesta,
  Asset,
} from "../Commons/Services/GetAssets4SkyCelular";

export function getAssetsFromSalesfoce(p_usuario: string, p_cuenta: string) {
  return new Promise((resolve) => {
    getSalesforceToken().then((token) => {
      getAccountId(p_usuario, p_cuenta, token).then((r_accountid) => {
        doGetAssets(token, r_accountid).then((res) => {
          resolve(res);
        });
      });
    });
  });
}

export function getPrimaryData(p_usuario: string, p_cuenta: string) {
  return new Promise((resolve) => {
    getSalesforceToken().then((token) => {
      getDataPrimary(p_usuario, p_cuenta, token).then((res) => {
         resolve(res);
      });
    });
  });
}

async function getSalesforceToken() {
  let retorno: string = "";
  const GetToken4SkyCelularDO: GetToken4SkyCelular_Entrada =
    builtGetToken4SkyCelularEntrada(
      tokenSalesForceParametros.client_id,
      tokenSalesForceParametros.client_secret,
      tokenSalesForceParametros.username,
      tokenSalesForceParametros.password
    );
  let GetToken4SkyCelularParametros = GetToken4SkyCelular_Parametros(
    GetToken4SkyCelularDO
  );
  let GetToken4SkyCelularRespuesta: GetToken4SkyCelular_Respuesta =
    await ConsultaWS(GetToken4SkyCelularParametros);

  if (
    GetToken4SkyCelularRespuesta.access_token &&
    GetToken4SkyCelularRespuesta.access_token != "" &&
    GetToken4SkyCelularRespuesta.access_token != null
  ) {
    retorno = GetToken4SkyCelularRespuesta.access_token;
  }
  return retorno;
}

async function getAccountId(
  p_usuario: string,
  p_cuenta: string,
  p_token: string
) {
  let retorno: string = "";
  const GetPrimaryData4SkyCelularDO: GetPrimaryData4SkyCelular_Entrada =
    builtGetPrimaryData4SkyCelularEntrada(p_usuario, p_cuenta, p_token);
  let GetPrimaryData4SkyCelularParametros =
    GetPrimaryData4SkyCelular_Parametros(GetPrimaryData4SkyCelularDO);
  let GetPrimaryData4SkyCelularRespuesta: GetPrimaryData4SkyCelular_Respuesta =
    await ConsultaWS(GetPrimaryData4SkyCelularParametros);

  if (
    GetPrimaryData4SkyCelularRespuesta.result &&
    GetPrimaryData4SkyCelularRespuesta.result != null
  ) {
    retorno = GetPrimaryData4SkyCelularRespuesta.result.accountId;
  }
  return retorno;
}

async function getDataPrimary(
  p_usuario: string,
  p_cuenta: string,
  p_token: string
) {
  let retorno: any;
  const GetPrimaryData4SkyCelularDO: GetPrimaryData4SkyCelular_Entrada =
    builtGetPrimaryData4SkyCelularEntrada(p_usuario, p_cuenta, p_token);
  let GetPrimaryData4SkyCelularParametros =
    GetPrimaryData4SkyCelular_Parametros(GetPrimaryData4SkyCelularDO);
  let GetPrimaryData4SkyCelularRespuesta: GetPrimaryData4SkyCelular_Respuesta =
    await ConsultaWS(GetPrimaryData4SkyCelularParametros);

  if (
    GetPrimaryData4SkyCelularRespuesta.result &&
    GetPrimaryData4SkyCelularRespuesta.result != null
  ) {
    retorno = GetPrimaryData4SkyCelularRespuesta.result;
  }
  return retorno;
}

async function doGetAssets(p_token: string, p_accountid: string) {
  let retorno: Asset[] = [];
  const GetAssets4SkyCelularDo: GetAssets4SkyCelular_Entrada =
    builtGetAssets4SkyCelularEntrada(p_accountid, p_token);
  let GetAssets4SkyCelularParametros = GetAssets4SkyCelular_Parametros(
    GetAssets4SkyCelularDo
  );
  let GetAssets4SkyCelularRespuesta: GetAssets4SkyCelular_Respuesta =
    await ConsultaWS(GetAssets4SkyCelularParametros);

  if (
    GetAssets4SkyCelularRespuesta.Assets &&
    GetAssets4SkyCelularRespuesta.Assets.length > 0
  ) {
    retorno = GetAssets4SkyCelularRespuesta.Assets;
  }

  return retorno;
}

