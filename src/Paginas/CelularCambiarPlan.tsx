import  {SkyCelularCambiarPlan}  from '../SkyCelular/SkyCelularMejoraPlan/SkyCelularCambiarPlan';
import ContextFlujos from "../Context/ContextFlujos";
import { useContext, useEffect } from 'react';



export const CelularCambiarPlan=()=>{
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
            <SkyCelularCambiarPlan/>
            <br/>

        </>
    )
}