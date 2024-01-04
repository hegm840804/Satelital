import { useContext, useEffect, useState } from "react";
import ContextFlujos from "../Context/ContextFlujos";
import styles from "../Satelital/GuiaDeProgramacion.module.css";
import { Container } from "react-bootstrap";
import { ConsultaParrillaGuiaSkyRequestEBM, ConsultaParrillaGuiaSkyRest_Entrada, ConsultaParrillaGuiaSkyRest_Parametros, ConsultaParrillaGuiaSkyRest_Respuesta, EBMHeaderRequest, ParametroList, SeguridadItem, SeguridadList, builtConsultaParrillaGuiaSkyRestEntrada } from "../Commons/Services/Parrilla";
import { ConsultaWS } from "../Commons/ServiciosBase";

  const Guia = () => {

    const [canales, setCanales] = useState <any> ([]);
  
    const obtieneParrilla = async() => {
  
  
      let seguridadItem: SeguridadItem = {
        Password:           "",
        SistemaAAutenticar: "SEL_SKY",
        Username:           ""
    };
    
    
    let seguridadList: SeguridadList = {
        SeguridadItem: [seguridadItem]
    };
    
    let parametroList: ParametroList = {
       ParametroItem: []
    };
     
    
    let ebmHeaderRequest: EBMHeaderRequest = {
        Operacion:     "ConsultaParrillaGuiaSky",
        ParametroList: parametroList,
        SeguridadList: seguridadList,
        SistemaOrigen: "Web"
    }
    
    let consultaParrillaGuiaSkyRequestEBM: ConsultaParrillaGuiaSkyRequestEBM = {
      FECHA_FIN:    "03/01/2024 12:15:00",
      FECHA_INICIO: "03/01/2024 12:30:00",
      PAQUETE_ID:   "8"
    }
  
  
  
    
    //let objetofinal : Consulta_Entrada = {ConsultaParrillaGuiaSkyRequestEBM, ebmHeaderRequest};
  
  
      const obtieneParrillaDO: ConsultaParrillaGuiaSkyRest_Entrada =
      builtConsultaParrillaGuiaSkyRestEntrada(consultaParrillaGuiaSkyRequestEBM, ebmHeaderRequest);
      let ConsultaParrillaGuiaSkyRestParametros = ConsultaParrillaGuiaSkyRest_Parametros(
        obtieneParrillaDO
      );
      let obtieneParrillaRespuesta: ConsultaParrillaGuiaSkyRest_Respuesta =
        await ConsultaWS(ConsultaParrillaGuiaSkyRestParametros);
       
        setCanales(obtieneParrillaRespuesta.ConsultaParrillaGuiaSkyResponseEBM.Programaciones[0].Programacion);
  
      
    }
  
    useEffect(() => {
      obtieneParrilla();
    },[]);

  

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
        <Container className = {styles.container}>
          <h3 className ={styles.spectrum}>Guía de Programación</h3>
          <p>Revisa desde aquí toda tu programación disponible, ¡Puedes grabarlos desde aquí!</p>
          </Container>


        </>
    )
}

export default Guia;