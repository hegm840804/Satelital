import {Navigate } from "react-router-dom";

function Private({children}:any){
  if (sessionStorage.getItem("tipoCliente") === "POS" || sessionStorage.getItem("tipoCliente") === "PRE" ) {
    return <>{children}</>;
  }else{
      return  <Navigate to={"/login"}/>;
  }

}

  export default Private;