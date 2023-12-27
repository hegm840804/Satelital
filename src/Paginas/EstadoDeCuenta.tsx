import { useContext, useEffect, useState } from "react";
import { EstadoDeCuentaInformacion } from "../Pagos/EstadoCuenta/EstadoDeCuentaInformacion"
import { EstadoDeCuentaSwitch } from "../Pagos/EstadoCuenta/EstadoDeCuentaSwitch"
import { EstadosCuentaPasados } from "../Pagos/EstadoCuenta/EstadosCuentaPasados"
import ContextFlujos from "../Context/ContextFlujos";
import ConfirmMessage from "../General/ConfirmMessage";


export const EstadoDeCuenta = () => {

    const { setSkyPlus, setSkyCelular, setPais } = useContext(ContextFlujos) as any;
    const [status1, setStatus1] = useState("OK");
    const [message1, setMessage1] = useState("");
    const [showAlert1, setShowAlert1] = useState(false);

    const manejaToast = (status:string, mensaje:string) => {
        setStatus1(status);
        setMessage1(mensaje);
        setShowAlert1(true);
        setTimeout(() => {
          setShowAlert1(false);
        }, 3000);
      }

    useEffect(() => {
        if (sessionStorage.getItem("flujos") === "Sky+") {
            setSkyPlus({ estado: false });
            setPais("MEX");
        }else{
            setPais(sessionStorage.getItem("pais"));
        }

        if (sessionStorage.getItem("flujos") === "DTH/SkyCelular" || sessionStorage.getItem("flujos") === "DTH/DTH/SkyCelular/Sky+") {
            setSkyCelular({ estado: true });
        }


    }, []);

    return (
        <>
            <ConfirmMessage status={status1} message={message1} showAlert={showAlert1}/>
            <EstadoDeCuentaInformacion />
            <EstadosCuentaPasados funcionManejaToast = {manejaToast}/>
        </>
    )
}