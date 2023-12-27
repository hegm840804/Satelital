import {Navigate } from "react-router-dom";
import { InicioPrepago } from "../Paginas/InicioPrepago";

function PrivateInicioPOS({children}:any){
    if (sessionStorage.getItem("tipoCliente") === "POS" ) {
      return <>{children}</>;
    } else if (sessionStorage.getItem("tipoCliente") === "PRE" ){
      return <InicioPrepago />;
    }else{
        return  <Navigate to={"/login"}/>;
    }

  }

  export default PrivateInicioPOS;