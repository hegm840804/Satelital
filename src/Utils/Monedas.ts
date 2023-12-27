export const monedas = {costaRica:"CRC",guatemala:"GTQ",republicaDominicana:"DOP",mexico:"MXN",eeuu:"USD"};

export function determinaMoneda (pais:string,flujo:string){
    if (flujo == "Sky+") {

        return monedas.mexico
    }
     else {

        switch (pais) {
            case "CRICA":
                return monedas.costaRica;
                break;
            case "DOM":
                return monedas.republicaDominicana;
                break;
            case "GT":
                return monedas.guatemala;
                break;
            case "MEX":
                return monedas.mexico;
                break;
        
            default:
                return "USD"
                break;
        }
    
     }

}