import { useContext, useEffect, useState } from "react";
import ConoceEquipo from "../SkyPlus/ConoceEquipo"
import EquipoAdicional from "../SkyPlus/EquipoAdicional"
import ContextFlujos from "../Context/ContextFlujos";

const SkyPlusCliente = () => {
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

  return (
    <>
            <br/>
            <ConoceEquipo/>
            <br/><br/>
            <EquipoAdicional/>
            <br/>

            
        </>
  )
}

export default SkyPlusCliente