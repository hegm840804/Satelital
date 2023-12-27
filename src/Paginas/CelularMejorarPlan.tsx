import { useContext, useEffect } from 'react';
import DatosStreaming from "../SkyCelular/SkyCelularMejoraPlan/DatosStreaming";
import NochesFinesSemana from "../SkyCelular/SkyCelularMejoraPlan/NochesFinesSemana";
import PaquetesDatosAdicionales from "../SkyCelular/SkyCelularMejoraPlan/PaquetesDatosAdicionales";
import Lineas from "../SkyCelular/SkyCelularMejoraPlan/Lineas";
import ContextFlujos from "../Context/ContextFlujos";

const CelularMejorarPlan = () => {

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
      <PaquetesDatosAdicionales />
      <br />
      <DatosStreaming />
      <br />
      <NochesFinesSemana />
      <br />
      <Lineas />
      <br />

    </>
  );
};

export default CelularMejorarPlan;
