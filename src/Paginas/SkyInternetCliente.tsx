import { useContext, useEffect, useState } from "react";
import PlanActualSkyInternet from "../SkyInternet/PlanActualSkyInternet"
import PaquetesSkyInternet from "../SkyInternet/PaquetesSkyInternet"
import MejoraPlanSkyInternet from "../SkyInternet/MejoraPlanSkyInternet"
import ContextFlujos from "../Context/ContextFlujos";

const SkyInternetCliente = () => {

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
      {" "}
      <br />
      <PlanActualSkyInternet />
      <br />
      <br />
      <PaquetesSkyInternet />
      <br />
      <br />
      <MejoraPlanSkyInternet />
      <br />
    </>
  );
};

export default SkyInternetCliente;
