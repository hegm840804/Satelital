import styles from "../Satelital/GuiaDeProgramacion.module.css";
import { Container } from "react-bootstrap";
import { ConsultaParrillaGuiaSkyRequestEBM, ConsultaParrillaGuiaSkyRest_Entrada, ConsultaParrillaGuiaSkyRest_Parametros, ConsultaParrillaGuiaSkyRest_Respuesta, EBMHeaderRequest, ParametroList, SeguridadItem, SeguridadList, builtConsultaParrillaGuiaSkyRestEntrada } from "../Commons/Services/Parrilla";
import { ConsultaWS } from "../Commons/ServiciosBase";
import { useContext, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import React from "react";
import { Epg, Layout } from "planby";
import { useApp } from "./useApp";

import { Timeline, ChannelItem, Program } from "./components";

const GuiaDeProgramacion = () => {
    
    const [canales, setCanales] = useState <any> ([]);
    
    const { isLoading, getEpgProps, getLayoutProps } = useApp();

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
      FECHA_FIN:    "03/01/2024 23:50:00",
      FECHA_INICIO: "03/01/2024 17:23:00",
      PAQUETE_ID:   "15"
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



    return (
        <>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Canal</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {canales.map((item: any, index: number) => (
            <tr>
            <td>{item.Canal.IdMostrado}</td>
            <td>{item.Canal.CanalNombre}</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        ))}
        
      </tbody>
    </Table>
    <div style={{ height: "80vh", width: "100%" }}>
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => (
            <Program key={program.data.id} program={program} {...rest} />
          )}
          renderChannel={({ channel }) => (
            <ChannelItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>
    </div>
        </>
    )
}

export default GuiaDeProgramacion;
