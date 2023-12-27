import React, { useContext, useEffect, useState } from "react";
import PaqueteContratado from "../MiPaquete/PaqueteContratado/PaqueteContratado"
import Saldo from "../MiPaquete/Saldo/Saldo";
import { CarouselTemporadasPPE } from "../PagoPorEvento/Contratar/CarouselTemporadasPPE/CarouselTemporadasPPE";
import styles from '../PagoPorEvento/Contratar/BannerTemporadasPPE/BannerTemporadasPPE.module.css';
import ContextFlujos from "../Context/ContextFlujos";
import ConfirmMessage from "../General/ConfirmMessage";

const MiPaquete = () => {
  const {setSkyPlus, setSkyCelular, setPais} = useContext(ContextFlujos) as any;

  const [statusMensaje, setStatusMensaje] = useState("");
  const [mensajeToast, setMensajeToast] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const muestraAviso = (statusRegresado:string, mensaje:string) => {
    if (statusRegresado === "OK") {
      setStatusMensaje("OK");
      setMensajeToast("Evento contratado " + mensaje);

    }else{
      setStatusMensaje("");
      setMensajeToast("Error en la transacción, " + mensaje);
    }

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

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
      <ConfirmMessage status={statusMensaje} message={mensajeToast} showAlert={showAlert} />
      <PaqueteContratado />
      <Saldo/>
      {sessionStorage.getItem("flujos") !== "Sky+"?
        <>
        <div id="big" className="d-none d-xl-block d-lg-block ">
          <h3  className={styles.tituloPeliculas}>Películas</h3>
          <p  className={styles.subtituloPeliculas}>Contrata solo las películas que quieres ver, en la calidad que tu decidas.</p>
        </div>
        <CarouselTemporadasPPE aviso={muestraAviso}/>
        </>
        :
        <></>
      }
    </>
  );
};

export default MiPaquete;
