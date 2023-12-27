import { BannerTemporadasPPE } from "../PagoPorEvento/Contratar/BannerTemporadasPPE/BannerTemporadasPPE";
import { CarouselTemporadasPPEInicio } from "../PagoPorEvento/Contratar/CarouselTemporadasPPE/CarouselTemporadasPPEInicio";
import { InicioInformacionUsuario } from "../Inicio/InicioInformacionUsuario";
import { useContext, useEffect, useState } from "react";
import { BannerSkyPlus } from "../Banners/BannerSkyplus";
import { BannerSkyPlusDescarga } from "../Banners/BannerSkyPlusDescarga";
import ContextFlujos from "../Context/ContextFlujos";

export const Inicio = () => {
  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));
  const { setSkyPlus, setSkyCelular, pais, setPais } = useContext(ContextFlujos) as any;

  const reload = () => {
    if (sessionStorage.getItem("isReload") === "0") {
      sessionStorage.setItem("isReload", "1");
      //window.location.reload();
    }
  };

  useEffect(() => {
    reload();
    if (sessionStorage.getItem("flujos") === "Sky+") {
      setSkyPlus({ estado: false });
      setPais("MEX");
    }else{
      setPais(sessionStorage.getItem("pais"));
    }

    if (
      sessionStorage.getItem("flujos") === "DTH/SkyCelular" ||
      sessionStorage.getItem("flujos") === "DTH/DTH/SkyCelular/Sky+"
    ) {
      setSkyCelular({ estado: true });
    }


  }, []);

  return (
    <>
      <InicioInformacionUsuario />
      <BannerTemporadasPPE />
      <div style={{ marginTop: "2vw", marginBottom: "4vw" }}>
        {
        pais === "MEX" &&
        (flujo === "DTH" || flujo === "DTH/SkyCelular" ? (
          <BannerSkyPlus />
        ) : (
          <BannerSkyPlusDescarga />
        ))}
      </div>
    </>
  );
};
