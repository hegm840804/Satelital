import { useContext, useEffect, useState } from "react";
import TabsAdultosCarta from "../Cartelera/TabsAdultosCarta/TabsAdultosCarta";
import Loading from "../General/Loading";
import CanalCmpnt from "../Cartelera/Canal";
import {
  builtConsultarCartelera_Entrada,
  ConsultarCartelera_Entrada,
  ConsultarCartelera_Parametros,
  ConsultarCartelera_Respuesta,
  Canal,
  builtCanal,
} from "../Commons/Services/ConsultarCartelera";
import { ConsultaWS } from "../Commons/ServiciosBase";
import ContextFlujos from "../Context/ContextFlujos";
import {
  ConsultarServiciosAdicionalesRest_Respuesta,
  ConsultarServiciosAdicionalesRest_Parametros,
  ConsultarServiciosAdicionalesRequest,
  builtConsultarServiciosAdicionalesRequest,
  ConsultarServiciosAdicionalesRest_Entrada,
  builtConsultarServiciosAdicionalesRest_Entrada,
  ConsultarServiciosAdicionale,
} from "../Commons/Services/ConsultarServiciosAdicionalesRest";

import { Tarjeta } from "../Commons/Services/ConsultarIRD";
import { ConfigRed } from "../Commons/ConfigRed";
import {
  CanalALaCarta,
  ConsultarCanal_Entrada,
  builtConsultarCanalEntrada,
  ConsultarCanal_Parametros,
  ConsultarCanal_Respuesta,
} from "../Commons/Services/ConsultarCanal";
import {
  ConsultarPrecio_Entrada,
  builtConsultarPrecioEntrada,
  ConsultarPrecio_Parametros,
  ConsultarPrecio_Respuesta,
} from "../Commons/Services/ConsultarPrecio";
const Cartelera = () => {
  const [muestraTabsAdultosCarta, setMuestraTabsAdultosCarta] = useState(true);
  const [indice, setIndice] = useState(0);
  const [origen, setOrigen] = useState("");
  const [loading, isLoading] = useState(false);

  const [arrayPeliculas, setArrayPeliculas] = useState<Canal[]>([]);
  const [arrayDeportes, setArrayDeportes] = useState<Canal[]>([]);
  const [arrayAdultos, setArrayAdultos] = useState<Canal[]>([]);
  const [arrayStreaming, setArrayStreaming] = useState<Canal[]>([]);

  const { setSkyPlus, setSkyCelular, pais, setPais } = useContext(
    ContextFlujos
  ) as any;

  useEffect(() => {
    isLoading(true);
    if (sessionStorage.getItem("flujos") === "Sky+") {
      setSkyPlus({ estado: false });
    }

    if (
      sessionStorage.getItem("flujos") === "DTH/SkyCelular" ||
      sessionStorage.getItem("flujos") === "DTH/DTH/SkyCelular/Sky+"
    ) {
      setSkyCelular({ estado: true });
    }
    getCanales();

    /*getTarjetasInteligentesSession().then(
      (res_tarjetasinteligentes: Tarjeta) => {
        doConsultarServiciosAdicionales(res_tarjetasinteligentes).then(
          (res: ConsultarServiciosAdicionale[]) => {
            
          }
        );
      }
    );*/


  }, []);

  const getPaisIso = (param: string) => {
    if (param === "Mexico") {
      return "MX";
    } else if (param === "Costa Rica") {
      return "CR";
    } else if (param === "Guatemala") {
      return "GT";
    } else if (param === "Honduras") {
      return "HN";
    } else if (param === "Nicaragua") {
      return "NI";
    } else if (param === "Panama") {
      return "PA";
    } else if (param === "Republica Dominicana") {
      return "DO";
    } else if (param === "El Salvador") {
      return "SV";
    } else {
      return "MX";
    }
  };

  const getCanales = async () => {
    isLoading(true);
    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultarCarteleraDO: ConsultarCartelera_Entrada =
      builtConsultarCartelera_Entrada(
        `${sessionStorage.getItem("Paquete")}`,
        `${sessionStorage.getItem("accountType")}`,
        `${sessionStorage.getItem("cuenta")}`,
        `${sessionStorage.getItem("assetNumber")}`,
        `${sessionStorage.getItem("SecondAssetNumber")}`,
        getPaisIso(sessionStorage.getItem("PrimaryAccountCountry")!)
      );
    let ConsultarCarteleraParametros =
      ConsultarCartelera_Parametros(ConsultarCarteleraDO);
    let ConsultarCarteleraRespuesta: ConsultarCartelera_Respuesta =
      await ConsultaWS(ConsultarCarteleraParametros);
    if (
      ConsultarCarteleraRespuesta.dataArea.canales &&
      ConsultarCarteleraRespuesta.dataArea.canales != null &&
      ConsultarCarteleraRespuesta.dataArea.canales.length > 0
    ) {
      let canales = ConsultarCarteleraRespuesta.dataArea.canales;
      console.log("LOS CALES SON ESTOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
      console.log(canales);
      for (let i = 0; i < canales.length; i++) {
        if (canales[i].tipo === "PELICULAS") {
          if (!validateDUplicades(arrayPeliculas, canales[i].nombre)) {
            arrayPeliculas.push(canales[i]);
          }
        } else if (canales[i].tipo === "DEPORTES") {
          if (!validateDUplicades(arrayDeportes, canales[i].nombre)) {
            arrayDeportes.push(canales[i]);
          }
        } else if (canales[i].tipo === "ADULTOS") {
          if (!validateDUplicades(arrayAdultos, canales[i].nombre)) {
            arrayAdultos.push(canales[i]);
          }
        } else if (canales[i].tipo === "STREAMING") {
          if (
            !validateDUplicades(arrayStreaming, canales[i].nombre) &&
            canales[i].nombre === "Disney+"
          ) {
            arrayStreaming.push(canales[i]);
          }
        }
      }
      isLoading(false);
    } else {
      console.error(ConsultarCarteleraRespuesta);
      isLoading(false);
    }
    //----------------------------------------------------------------------------------------------------------------------------
  };

  const doConsultarPrecio = async (p_canalnumero: string) => {
    try {
      //----------------------------------------------------------------------------------------------------------------------------
      const ConsultarPrecioEntrada: ConsultarPrecio_Entrada =
        builtConsultarPrecioEntrada(
          p_canalnumero,
          getPaisIso(sessionStorage.getItem("PrimaryAccountCountry")!),
          "HIJUMP",
          `${sessionStorage.getItem("cuenta")}`,
          `${sessionStorage.getItem("accountType")}`
        );
      let ConsultarPrecioParametros = ConsultarPrecio_Parametros(
        ConsultarPrecioEntrada
      );
      let ConsultarPrecioRespuesta: ConsultarPrecio_Respuesta =
        await ConsultaWS(ConsultarPrecioParametros);

      if (
        ConsultarPrecioRespuesta.costo &&
        ConsultarPrecioRespuesta.costo != null
      ) {
      } else {
        console.error("Error al obtener el valor de costo");
        console.error(ConsultarPrecioRespuesta);
        return "NE";
      }

      //----------------------------------------------------------------------------------------------------------------------------
    } catch (error) {
      console.error("Error al ejecutar el servicio");
      console.error(error);
      return "NE";
      // Expected output: ReferenceError: nonExistentFunction is not defined
      // (Note: the exact output may be browser-dependent)
    }
  };

  const getFlagIsHD = (p_paquete: string | null) => {
    let isHD = "F";
    if (
      p_paquete!.includes("HD") ||
      p_paquete!.includes("GOLD") ||
      p_paquete!.includes("BLACK") ||
      p_paquete!.includes("PLATINUM") ||
      p_paquete!.includes("SILVER")
    ) {
      isHD = "Y";
    }
    return isHD;
  };

  const doConsultarCanal = async (p_categoria: string) => {
    try {
      //----------------------------------------------------------------------------------------------------------------------------
      const ConsultarCanalEntrada: ConsultarCanal_Entrada =
        builtConsultarCanalEntrada(
          `${sessionStorage.getItem("Paquete")}`,
          `${sessionStorage.getItem("accountType")}`,
          getFlagIsHD(sessionStorage.getItem("Paquete")!),
          p_categoria
        );
      let ConsultarCanalParametros = ConsultarCanal_Parametros(
        ConsultarCanalEntrada
      );
      let ConsultarCanalRespuesta: ConsultarCanal_Respuesta = await ConsultaWS(
        ConsultarCanalParametros
      );

      if (
        ConsultarCanalRespuesta &&
        ConsultarCanalRespuesta.resultado == "0" &&
        ConsultarCanalRespuesta.resultadodesc === "0" &&
        ConsultarCanalRespuesta.ListaCanalALaCarta.CanalALaCarta.length > 0
      ) {
        return ConsultarCanalRespuesta.ListaCanalALaCarta.CanalALaCarta;
      } else {
        console.error("Error al obtener el el arreglo de canales");
        console.error(ConsultarCanalRespuesta);
        return [];
      }
      //----------------------------------------------------------------------------------------------------------------------------
    } catch (error) {
      console.error("Error al ejejcutar el servicio");
      console.error(error);
      return [];
    }
  };

  const validateDUplicades = (p_completearray: Canal[], p_newvalue: string) => {
    var retorno = false;
    for (let u = 0; u < p_completearray.length; u++) {
      if (p_newvalue === p_completearray[u].nombre) {
        retorno = true;
        break;
      }
    }
    return retorno;
  };

  const getTarjetasInteligentesSession = async () => {
    if (sessionStorage.getItem("tarjetaMaster") !== null) {
      return JSON.parse(sessionStorage.getItem("tarjetaMaster")!);
    } else {
      console.error("No hay tarjeta inteligente maestra");
      return null;
    }
  };

  const doConsultarServiciosAdicionales = async (
    p_tarjetasinteligentesres: Tarjeta
  ) => {
    //----------------------------------------------------------------------------------------------------------------------------
    let consultarServiciosAdicionalesRequest: ConsultarServiciosAdicionalesRequest =
      builtConsultarServiciosAdicionalesRequest("", "", "", "", "", "");
    if (p_tarjetasinteligentesres != null) {
      consultarServiciosAdicionalesRequest =
        builtConsultarServiciosAdicionalesRequest(
          "Servicio Adicional",
          "Service OTT",
          sessionStorage.getItem("cuenta")!,
          p_tarjetasinteligentesres.TarjetaInteligente,
          p_tarjetasinteligentesres.IRD!,
          "Sky Mexico"
        );
    } else {
      consultarServiciosAdicionalesRequest =
        builtConsultarServiciosAdicionalesRequest(
          "Servicio Adicional",
          "Service OTT",
          sessionStorage.getItem("cuenta")!,
          sessionStorage.getItem("assetNumber")!,
          sessionStorage.getItem("SecondAssetNumber")!,
          "Sky Mexico"
        );
    }

    const consultarServiciosAdicionalesRestEntrada: ConsultarServiciosAdicionalesRest_Entrada =
      builtConsultarServiciosAdicionalesRest_Entrada(
        consultarServiciosAdicionalesRequest
      );
    let consultarServiciosAdicionalesParametros =
      ConsultarServiciosAdicionalesRest_Parametros(
        consultarServiciosAdicionalesRestEntrada
      );

    let ConsultarServiciosAdicionalesRestRespuesta: ConsultarServiciosAdicionalesRest_Respuesta =
      await ConsultaWS(consultarServiciosAdicionalesParametros);

    if (
      ConsultarServiciosAdicionalesRestRespuesta.ConsultarServiciosAdicionales &&
      ConsultarServiciosAdicionalesRestRespuesta.ConsultarServiciosAdicionales !==
        null &&
      typeof ConsultarServiciosAdicionalesRestRespuesta.ConsultarServiciosAdicionales !=
        "undefined"
    ) {
      return ConsultarServiciosAdicionalesRestRespuesta
        .ConsultarServiciosAdicionales.ConsultarServiciosAdicionales;
    } else {
      return [];
    }

    //----------------------------------------------------------------------------------------------------------------------------
  };

  const builtObjects = (p_categoria: string) => {
    doConsultarCanal(p_categoria).then((ConsultarCanalRet) => {
      var promises = ConsultarCanalRet.map((CanalALaCarta: CanalALaCarta) => {
        return new Promise((resolve, reject) => {
          resolve(builtChannelsAmenities(CanalALaCarta));
        });
      });

      Promise.all(promises).then(function (values) {
        if (values !== undefined) {
          values.forEach((value) => {
            console.log(value);
          });
        }

        isLoading(false);
      });
    });
  };

  const builtChannelsAmenities = async (CanalALaCarta: CanalALaCarta) => {
    return doConsultarPrecio(CanalALaCarta.Canal).then((ConsultarPrecioRet) => {
      const CanalTemp: Canal = builtCanal(
        CanalALaCarta.Categoria,
        CanalALaCarta.Nombre,
        ConsultarPrecioRet!,
        CanalALaCarta.Sinopsis.substring(0, CanalALaCarta.Sinopsis.length - 1),
        `${ConfigRed.DominioParaImagenes}${ConfigRed.RutaParaImagenes}${CanalALaCarta.Imagen}`,
        CanalALaCarta.Canal,
        CanalALaCarta.Categoria
      );
      return CanalTemp;
    });
  };

  const builtStreamingAmenities = (
    p_serviciosadicionales: ConsultarServiciosAdicionale[]
  ) => {
    p_serviciosadicionales.map(
      (
        consultarServiciosAdicional: ConsultarServiciosAdicionale,
        index: number
      ) => {
        let nombre =
          consultarServiciosAdicional.ListProductFacturacion
            .ProductFacturacion[0].NombreProductoFactura;
        const CanalTemp: Canal = builtCanal(
          "STREAMING",
          nombre,
          consultarServiciosAdicional.Costo,
          consultarServiciosAdicional.Descripcion.substring(
            0,
            consultarServiciosAdicional.Descripcion.length - 1
          ),
          `${ConfigRed.DominioParaImagenes}${ConfigRed.RutaParaImagenes}${consultarServiciosAdicional.Imagen}`,
          "",
          "STREAMING"
        );

        if (
          !validateDUplicades(arrayStreaming, nombre) &&
          nombre === "Disney+"
        ) {
          arrayStreaming.push(CanalTemp);
        }
        //isLoading(false);
      }
    );
  };

  return (
    <>
      <Loading isLoading={loading} />

      {muestraTabsAdultosCarta ? (
        <TabsAdultosCarta
          muestra1={setMuestraTabsAdultosCarta}
          indice1={setIndice}
          arrayPeliculas1={arrayPeliculas}
          arrayDeportes1={arrayDeportes}
          arrayAdultos1={arrayAdultos}
          arrayStreaming1={arrayStreaming}
          origen1={setOrigen}
        />
      ) : origen === "peliculas" ? (
        <CanalCmpnt
          titulo1={arrayPeliculas[indice].nombre}
          imagen1={arrayPeliculas[indice].imagen}
          imagenSmall1={arrayPeliculas[indice].imagen}
          precio1={arrayPeliculas[indice].precio}
          descripcion1={arrayPeliculas[indice].descripcion.split(".")}
          canal1={arrayPeliculas[indice].canal}
          categoria1={arrayPeliculas[indice].categoria}
          muestra1={setMuestraTabsAdultosCarta}
        />
      ) : origen === "deportes" ? (
        <CanalCmpnt
          titulo1={arrayDeportes[indice].nombre}
          imagen1={arrayDeportes[indice].imagen}
          imagenSmall1={arrayDeportes[indice].imagen}
          precio1={arrayDeportes[indice].precio}
          descripcion1={arrayDeportes[indice].descripcion.split(".")}
          canal1={arrayDeportes[indice].canal}
          categoria1={arrayDeportes[indice].categoria}
          muestra1={setMuestraTabsAdultosCarta}
        />
      ) : origen === "adultos" ? (
        <CanalCmpnt
          titulo1={arrayAdultos[indice].nombre}
          imagen1={arrayAdultos[indice].imagen}
          imagenSmall1={arrayAdultos[indice].imagen}
          precio1={arrayAdultos[indice].precio}
          descripcion1={arrayAdultos[indice].descripcion.split(".")}
          canal1={arrayAdultos[indice].canal}
          categoria1={arrayAdultos[indice].categoria}
          muestra1={setMuestraTabsAdultosCarta}
        />
      ) : origen === "streaming" && pais === "MEX" ? (
        <CanalCmpnt
          titulo1={arrayStreaming[indice].nombre}
          imagen1={arrayStreaming[indice].imagen}
          imagenSmall1={arrayStreaming[indice].imagen}
          precio1={arrayStreaming[indice].precio}
          descripcion1={arrayStreaming[indice].descripcion.split(".")}
          canal1={arrayStreaming[indice].canal}
          categoria1={arrayStreaming[indice].categoria}
          muestra1={setMuestraTabsAdultosCarta}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Cartelera;
