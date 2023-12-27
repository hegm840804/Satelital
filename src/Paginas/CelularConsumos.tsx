import { useContext, useEffect } from 'react';
import { PlanActual } from "../SkyCelular/PlanActual/PlanActual"
import ContextFlujos from "../Context/ContextFlujos";
import { LineaAdicional } from '../SkyCelular/PlanActual/LineaAdicional';


export const CelularConsumos=()=>{
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
        <>
        <LineaAdicional/>
            <br/>
        </>
    )
}