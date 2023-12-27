import { useContext, useEffect, useState } from "react";
import { CrearAclaracion } from "../Aclaraciones/CrearAclaracion/CrearAclaracion";
import { HistorialAclaraciones } from "../Aclaraciones/HistorialAclaraciones/HistorialAclaraciones";
import ContextFlujos from "../Context/ContextFlujos";


import AclaracionesBis from '../Aclaraciones/AclaracionesBis'

const Aclaraciones = () => {
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
      <AclaracionesBis/>
    </>
  );
};

export default Aclaraciones;
