import { useContext, useEffect, useState } from "react";
import ContextFlujos from "../Context/ContextFlujos";
import styles from "../Satelital/GuiaDeProgramacion.module.css";
import { Container } from "react-bootstrap";


const Satelital = () => {

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

export default Satelital;