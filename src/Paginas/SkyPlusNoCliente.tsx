import { useContext, useEffect, useState } from "react";
import ConoceSkyPlus from "../SkyPlus/ConoceSkyPlus";
import EquipoAdicional from "../SkyPlus/EquipoAdicional";
import ContextFlujos from "../Context/ContextFlujos";
import ConoceSkyPlusDTH from "../SkyPlus/ConoceSkyPlusDTH";

const SkyPlusNoCliente = () => {
  const[flujo, setFlujo] =useState(sessionStorage.getItem("flujos"));

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
      {flujo === "DTH"?
      <ConoceSkyPlusDTH/>
      :
      <ConoceSkyPlus />      
      }
    </>
  );
};

export default SkyPlusNoCliente;
