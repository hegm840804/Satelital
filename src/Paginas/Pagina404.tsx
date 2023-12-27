import { useContext, useEffect, useState } from "react";
import CuentaAjustes from '../Ajustes/CuentaAjustes/CuentaAjustes'
import ContextFlujos from "../Context/ContextFlujos";

const Pagina404 = () => {
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
      <h2 style={{color:"#6E6E6E"}}>Página no encontrada</h2>
    </>
  );
};

export default Pagina404;