import {Navigate } from "react-router-dom";

function PublicElement({children}:any){
  if (sessionStorage.getItem("cuenta") !== null ) {
    return <Navigate to={"/inicio"}/>;
  }else{
    return  <>{children}</>;
  }
  
}

export default PublicElement;