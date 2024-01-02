import { useContext, useEffect, useState } from "react";
import ContextFlujos from "../Context/ContextFlujos";


const SkySatelital = () => {

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
        <h3>Guía de Programación</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam tempora dolor aspernatur quia eius ex aut harum explicabo dolorem at!</p>
        </>
    )
}

export default SkySatelital;