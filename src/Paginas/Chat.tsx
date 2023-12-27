import { useContext, useEffect, useState } from "react";
import {ChatSky}  from "../Chat/Chat";
import ContextFlujos from "../Context/ContextFlujos";

export const Chat=()=>{

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
        <ChatSky/>
        </>
    )
}