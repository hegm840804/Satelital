export enum Ambiente {
  Produccion,
  PreProduccion,
  QA,
  Desarrollo,
}

export class ConfigRed {
  // _rutaSalesForce! : String
  public static get idAmbiente() {
    return Ambiente.QA;
  }

  public static rutaSalesForce: string = "";


  public static get rutaLocalhost() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "http://localhost:8080";
      case Ambiente.Desarrollo:
        return "http://localhost:8080";
      case Ambiente.QA:
        return "http://localhost:8080";
      case Ambiente.PreProduccion:
        return "http://localhost:8080";
      default:
        return "";
    }
  }

  public static get usuarioLocalhost() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "appsky_osbext_lh";
      case Ambiente.Desarrollo:
        return "appsky_osbext_lh";
      case Ambiente.QA:
        return "appsky_osbext_lh";
      case Ambiente.PreProduccion:
        return "appsky_osbext_lh";
      default:
        return "appsky_osbext_lh";
    }
  }

  public static get contraLocalhost() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "m1sk7";
      case Ambiente.Desarrollo:
        return "m1sk7";
      case Ambiente.QA:
        return "m1sk7";
      case Ambiente.PreProduccion:
        return "m1sk7";
      default:
        return "m1sk7";
    }
  }

  public static get rutaInterno() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://selosbext.sky.com.mx";
      case Ambiente.Desarrollo:
        return "https://desselosbext.sky.com.mx:443";
      case Ambiente.QA:
        return "https://qaappskyext.sky.com.mx";
      case Ambiente.PreProduccion:
        return "https://preappskyext.sky.com.mx";
      default:
        return "";
    }
  }

  public static get usuarioInterno() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "appsky_osbext_prod";
      case Ambiente.Desarrollo:
        return "";
      case Ambiente.QA:
        return "appsky_osbext_qa";
      case Ambiente.PreProduccion:
        return "appsky_osbext_pre";
      default:
        return "";
    }
  }

  public static get contraInterno() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "Masy3nb20#$1prW9";
      case Ambiente.Desarrollo:
        return "";
      case Ambiente.QA:
        return "PY35IG$qw8$20#19";
      case Ambiente.PreProduccion:
        return "Pln2$125#hjnb12";
      default:
        return "";
    }
  }

  public static get rutaServicioTokenSF() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://skymex.my.salesforce.com";
      case Ambiente.Desarrollo:
        return "https://test.salesforce.com";
      case Ambiente.QA:
        //return "https://test.salesforce.com"
        return "https://skymex--uat.sandbox.my.salesforce.com";
      case Ambiente.PreProduccion:
        return "https://skymex--uat.sandbox.my.salesforce.com";
      default:
        return "";
    }
  }

  public static get rutaCybersource() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://apigwcs.sky.com.mx";
      case Ambiente.Desarrollo:
        return "https://apigwcsdev.sky.com.mx";
      case Ambiente.QA:
        return "https://apigwcsqua.sky.com.mx";
      case Ambiente.PreProduccion:
        return "https://apigwcspre.sky.com.mx";
      default:
        return "";
    }
  }

  public static get usuarioCybersource() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "appbt_apigateway";
      case Ambiente.Desarrollo:
        return "appbt_apigateway_des";
      case Ambiente.QA:
        return "appbt_apigateway_qa";
      case Ambiente.PreProduccion:
        return "appbt_apigateway_pre";
      default:
        return "";
    }
  }

  public static get contraCybersource() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "LwNLwy0Hr619FUJRc7iY";
      case Ambiente.Desarrollo:
        return "dXXvUVaAWE4s72b95FXB";
      case Ambiente.QA:
        return "uercMVxQD658JtzLU3TA";
      case Ambiente.PreProduccion:
        return "gY3A24sc80rJX5OyfUdw";
      default:
        return "";
    }
  }

  public static get rutaCel() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://apigw.sky.com.mx";
      case Ambiente.Desarrollo:
        return "https://apigwdev.sky.com.mx";
      case Ambiente.QA:
        return "https://apigwqa.sky.com.mx";
      case Ambiente.PreProduccion:
        return "https://apigwpre.sky.com.mx";
    }
  }

  public static get usuarioCel() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "appblue_apigatewaysf";
      case Ambiente.Desarrollo:
        return "appblue_apigatewaysf_des";
      case Ambiente.QA:
        return "appblue_apigatewaysf_qa";
      case Ambiente.PreProduccion:
        return "appblue_apigatewaysf_pre";
    }
  }

  public static get contraCel() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "h98FR8R7QnUMP256oL7t";
      case Ambiente.Desarrollo:
        return "QasboqhU2DKmu0pU3NH7";
      case Ambiente.QA:
        return "y14Q7P98TicOAUMRVseq";
      case Ambiente.PreProduccion:
        return "";
    }
  }

  public static get usuarioSoap() {
    return "appmobile";
  }

  public static get contraSoap() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "eyG66V=QFxk!TJ";
      default:
        return "prueba$16";
    }
  }

  //PENDIENTE
  public static get rutaAvatars() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://miespaciosky.sky.com.mx:8443/avatars/api/v1/";
      case Ambiente.Desarrollo:
        return "https://desmisky.sky.com.mx:8443/avatars/api/v1/";
      case Ambiente.QA:
        return "https://qamisky.sky.com.mx:8443/avatars/api/v1/";
      case Ambiente.PreProduccion:
        return "https://premisky.sky.com.mx:8443/avatars/api/v1/";
      default:
        return "";
    }
  }

  //PENDIENTE
  public static get rutaBackend() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://miespaciosky.sky.com.mx:8443/proxies/v1";
      case Ambiente.Desarrollo:
        return "https://desmisky.sky.com.mx:8443/proxies/v1";
      case Ambiente.QA:
        return "https://qamisky.sky.com.mx:8443/proxies/v1";
      case Ambiente.PreProduccion:
        return "https://premisky.sky.com.mx:8443/proxies/v1";
      default:
        return "";
    }
  }

  public static get usuarioBackend() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "sel_apigateway";
      case Ambiente.Desarrollo:
        return "sel_apigateway_des";
      case Ambiente.QA:
        return "sel_apigateway_qa";
      case Ambiente.PreProduccion:
        return "sel_apigateway_preprod";
      default:
        return "";
    }
  }

  public static get contraBackend() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "bwtcU5OMQ893qix828PC";
      case Ambiente.Desarrollo:
        return "aercVbkdw3E6znXtL7sG";
      case Ambiente.QA:
        return "aercVbkdw3E6znXtL7sG";
      case Ambiente.PreProduccion:
        return "aercVbkdw3E6znXtL7sG";
      default:
        return "";
    }
  }

  //PENDIENTE
  public static get rutaBackendSelfService() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://miespaciosky.sky.com.mx:8443/self-service";
      case Ambiente.Desarrollo:
        return "https://desmisky.sky.com.mx:8443/self-service";
      case Ambiente.QA:
        return "https://qamisky.sky.com.mx:8443/self-service";
      case Ambiente.PreProduccion:
        return "https://premisky.sky.com.mx:8443/self-service";
      default:
        return "";
    }
  }

  public static get usuarioBackendSelfService() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "sel_apigateway";
      case Ambiente.Desarrollo:
        return "sel_apigateway_des";
      case Ambiente.QA:
        return "sel_apigateway_qa";
      case Ambiente.PreProduccion:
        return "sel_apigateway_preprod";
      default:
        return "";
    }
  }

  public static get contraBackendSelfService() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "bwtcU5OMQ893qix828PC";
      case Ambiente.Desarrollo:
        return "aercVbkdw3E6znXtL7sG";
      case Ambiente.QA:
        return "aercVbkdw3E6znXtL7sG";
      case Ambiente.PreProduccion:
        return "aercVbkdw3E6znXtL7sG";
      default:
        return "";
    }
  }

  public static get returnUrlPayments() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://misky.sky.com.mx/realizapagos";
      case Ambiente.Desarrollo:
        return "https://desmiespaciosky.sky.com.mx/realizapagos";
      case Ambiente.QA:
        return "https://qamiespaciosky.sky.com.mx/realizapagos";
      case Ambiente.PreProduccion:
        return "https://premiespaciosky.sky.com.mx/realizapagos";
      default:
        return "";
    }
  }
  //PENDIENTE
  public static get rutaBackendSF() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://miespaciosky.sky.com.mx:8443/sf/proxies/v1";
      case Ambiente.Desarrollo:
        return "https://desmisky.sky.com.mx:8443/sf/proxies/v1";
      case Ambiente.QA:
        return "https://qamisky.sky.com.mx:8443/sf/proxies/v1";
      case Ambiente.PreProduccion:
        return "https://premisky.sky.com.mx:8443/sf/proxies/v1";
      default:
        return "";
    }
  }

  public static get usuarioBackendSF() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "sel_apigateway";
      case Ambiente.Desarrollo:
        return "sel_apigateway_des";
      case Ambiente.QA:
        return "sel_apigateway_qa";
      case Ambiente.PreProduccion:
        return "sel_apigateway_pre";
      default:
        return "";
    }
  }

  public static get contraBackendSF() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "bwtcU5OMQ893qix828PC";
      case Ambiente.Desarrollo:
        return "EYVX2Gy27p2cRD6PgFFK";
      case Ambiente.QA:
        return "aercVbkdw3E6znXtL7sG";
      case Ambiente.PreProduccion:
        return "2WxBe0194s7fJyYlpZMl";
      default:
        return "";
    }
  }

  public static get rutaSiebel() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://selosbext.sky.com.mx";
      case Ambiente.Desarrollo:
        return "https://desselosbext.sky.com.mx:443";
      case Ambiente.QA:
        return "https://qaappskyext.sky.com.mx";
      case Ambiente.PreProduccion:
        return "https://preappskyext.sky.com.mx";
      default:
        return "";
    }
  }

  public static get usuarioSiebel() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "appsky_osbext_prod";
      case Ambiente.Desarrollo:
        return "";
      case Ambiente.QA:
        return "appsky_osbext_qa";
      case Ambiente.PreProduccion:
        return "appsky_osbext_pre";
      default:
        return "";
    }
  }

  public static get contraSiebel() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "Masy3nb20#$1prW9";
      case Ambiente.Desarrollo:
        return "";
      case Ambiente.QA:
        return "PY35IG$qw8$20#19";
      case Ambiente.PreProduccion:
        return "Pln2$125#hjnb12";
      default:
        return "";
    }
  }

  public static get DominioParaImagenes() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "https://serviciosenlinea.sky.com.mx";
      case Ambiente.Desarrollo:
        return "https://serviciosenlinea.sky.com.mx";
      case Ambiente.QA:
        return "https://serviciosenlinea.sky.com.mx";
      case Ambiente.PreProduccion:
        return "https://serviciosenlinea.sky.com.mx";
      default:
        return "https://serviciosenlinea.sky.com.mx";
    }
  }

  public static get RutaParaImagenes() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "/sky/imagenes/CAC/80X120/";
      case Ambiente.Desarrollo:
        return "/sky/imagenes/CAC/80X120/";
      case Ambiente.QA:
        return "/sky/imagenes/CAC/80X120/";
      case Ambiente.PreProduccion:
        return "/sky/imagenes/CAC/80X120/";
      default:
        return "/sky/imagenes/CAC/80X120/";
    }
  }
}

export class tokenSalesForceParametros {
  public static token: String = "";
  public static vigenciaToken: Date | undefined = undefined;
  static readonly grant_type = "password";

  static get client_id() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "3MVG9ZF4bs_.MKuilXLim0P0zHTrmcUqB_6R2ALFUL2JSihn_XNtilxlKkUZjcxuPhaTgdeReN2Lv3BQ3WR_E";
      case Ambiente.PreProduccion:
        return "3MVG9MU2nFE8vlsgMCnWd91XVT7MVfTV3W3SpJsD33ID0RLy9rAFf8hTHatcqCAxd9Xe.31pyVJYVfno2tEWn";
      case Ambiente.QA:
        //return "3MVG98dostKihXN4Yr2Zgx_aesCKTAXlM8V1xrGpQqDss7naNuZtNh6KyvXxNra8nkT_ZORQb84k212yH4Znc"
        return "3MVG9MU2nFE8vlsgMCnWd91XVT7MVfTV3W3SpJsD33ID0RLy9rAFf8hTHatcqCAxd9Xe.31pyVJYVfno2tEWn";
      case Ambiente.Desarrollo:
        return "3MVG98dostKihXN4Yr2Zgx_aesCKTAXlM8V1xrGpQqDss7naNuZtNh6KyvXxNra8nkT_ZORQb84k212yH4Znc";
    }
  }

  static get client_secret() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "2E7B6E8D3ED2BB7515B88F1D270816ED9DD02D482BA7D84C937EFBA5C9FC3A89";
      case Ambiente.PreProduccion:
        return "F712CF9C9101336E87EBDEF4D419343A5194D7E601F01E6895C6B76E56904CF5";
      case Ambiente.QA:
        //return "DEED7AC5988271F06E033FA0BC1221B5B19C8073EC4A081E5B669BB5DD595C4E"
        return "F712CF9C9101336E87EBDEF4D419343A5194D7E601F01E6895C6B76E56904CF5";
      case Ambiente.Desarrollo:
        return "DEED7AC5988271F06E033FA0BC1221B5B19C8073EC4A081E5B669BB5DD595C4E";
    }
  }

  public static get username() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "o-agalindoh@sky.com.mx.integrador";
      case Ambiente.PreProduccion:
      //return "integradorapp@sky.com.mx.uat"
      case Ambiente.QA:
        //return "o-egomezg@sky.com.mx.devmain"
        return "integradorapp@sky.com.mx.uat";
      case Ambiente.Desarrollo:
        return "o-egomezg@sky.com.mx.devmain";
    }
  }

  public static get password() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "AppBlueMobile.1810$XzBCCPXv5i0YJomUIf21LkGXf";
      case Ambiente.PreProduccion:
        return "1nt3gr4d0r2023uFKgk4Z7iaNGUQfp5eFY3CIy";
      case Ambiente.QA:
        //return "Superman_2022*2V7s4fdLJ4qmJnxnkOmVxCOlL"
        return "1nt3gr4d0r2023uFKgk4Z7iaNGUQfp5eFY3CIy";
      case Ambiente.Desarrollo:
        return "Superman_2022*2V7s4fdLJ4qmJnxnkOmVxCOlL";
    }
  }

  public static get ValoresAut() {
    const dataEntrada = {
      grant_type: this.grant_type,
      client_id: this.client_id,
      client_secret: this.client_secret,
      username: this.username,
      password: this.password,
    };

    return dataEntrada;
  }
}

export class EstafetaParametros {
  static get api_key() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "l7844e414797144bc4ae3ec8a1c9d8d4e4";
      default:
        return "l7e87dd0d538814e958f4e44676b1faf7f";
    }
  }

  static get suscriber_id() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "500";
      default:
        return "55";
    }
  }

  static get login() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "WSCTrakingUser_pro";
      default:
        return "WSCTrakingUser";
    }
  }
  static get password() {
    switch (ConfigRed.idAmbiente) {
      case Ambiente.Produccion:
        return "y6xoXlLjl8BeizUIRBFHm";
      default:
        return "dh8>>S_PBj(a+MtQ";
    }
  }
}
