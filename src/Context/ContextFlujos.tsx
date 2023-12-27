import {createContext, useState} from 'react';
import { FaRegClosedCaptioning } from 'react-icons/fa';

 const ContextFlujos = createContext({}); 

export function ContextFlujosProvider({children}:any){
    const[skyPlus, setSkyPlus] = useState({estado:true});
    const[reportesHist, setReportesHist] = useState(false);
    const[skyCelular, setSkyCelular] = useState({estado:false});
    const[tipoClienteContext, setTipoClienteContext] = useState("");
    const[saldoPre, setSaldoPre] = useState("");
    const[pais, setPais] = useState("");


    return(
        <ContextFlujos.Provider value={{skyPlus, setSkyPlus, reportesHist, setReportesHist, skyCelular, 
                                        setSkyCelular,tipoClienteContext, setTipoClienteContext, saldoPre, 
                                        setSaldoPre, pais, setPais}}>
            {children}
        </ContextFlujos.Provider>
    );
}

export default ContextFlujos;