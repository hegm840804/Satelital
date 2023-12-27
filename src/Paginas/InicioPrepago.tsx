import { BannerTemporadasPPE } from "../PagoPorEvento/Contratar/BannerTemporadasPPE/BannerTemporadasPPE";
import { CarouselTemporadasPPEInicio } from "../PagoPorEvento/Contratar/CarouselTemporadasPPE/CarouselTemporadasPPEInicio";
import { InicioInformacionUsuarioP } from "../Inicio/InicioInformacionUsuarioP";
import { BannerSkyPlus } from "../Banners/BannerSkyplus";
import { BannerSkyPlusDescarga } from "../Banners/BannerSkyPlusDescarga";
import { useContext, useEffect, useState } from "react";
import ContextFlujos from "../Context/ContextFlujos";

export const InicioPrepago=()=>{
    const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));
    const {setSkyPlus, setSkyCelular, setPais} = useContext(ContextFlujos) as any;

    useEffect(() => {
        if (sessionStorage.getItem("flujos") === "Sky+") {
            setSkyPlus({estado:false});
            setPais("MEX");
          }else{
            setPais(sessionStorage.getItem("pais"));
          }

          if (sessionStorage.getItem("flujos") ===  "DTH/SkyCelular" || sessionStorage.getItem("flujos") ===  "DTH/DTH/SkyCelular/Sky+") {
            setSkyCelular({estado:true});
          }


    }, []);

    return(
        <>  <br/>
            <InicioInformacionUsuarioP/>
            <BannerTemporadasPPE/>
            <div style={{marginTop:"2vw", marginBottom:"4vw"}}>
            {flujo === "DTH" || flujo === "DTH/SkyCelular"?<BannerSkyPlus/>:<BannerSkyPlusDescarga/>}
            </div>
            
        </>
    )
}