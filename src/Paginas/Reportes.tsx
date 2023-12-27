import { useContext, useEffect, useState } from "react";
import CrearReporte from "../Reportes/CrearReporte/CrearReporte";
import HistorialReportes from "../Reportes/HistorialReportes/HistorialReportes";
import SolucionFallas from "../Reportes/SolucionFallas/SolucionFallas";
import styles from "../Reportes/HistorialReportes/HistorialReportes.module.css"
import ContextFlujos from "../Context/ContextFlujos";

const Reportes = () => {

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
      <CrearReporte />
      <HistorialReportes /> 

      
    </>
  );
};

export default Reportes;
