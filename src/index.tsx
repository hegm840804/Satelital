import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { BarraSuperior } from "./BarraSuperior/BarraSuperior";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BarraMenu } from "./BarraMenu/BarraMenu";
import PublicElement from "./ComponentesRutas/Publico";
import PrivateInicioPOS from "./ComponentesRutas/ClientePOS";
import Private from "./ComponentesRutas/Cliente";
import { LoginPage } from "./Paginas/LoginPage";
import { Inicio } from "./Paginas/Inicio";
import MiPaquete from "./Paginas/MiPaquete";
import Ajustes from "./Paginas/Ajustes";
import Aclaraciones from "./Paginas/Aclaraciones";
import Cartelera from "./Paginas/Cartelera";
import Reportes from "./Paginas/Reportes";
import { Chat } from "./Paginas/Chat";
import StepSeguimiento from "./Cuentas/Seguimiento/CuentaSeguimientoMensajeria";
import RealizaPagos from "./Paginas/RealizaPagos";
import MetodosPago from "./Pagos/MetodosPago/MetodosPago";
import ListaBancos from "./Pagos/MetodosPago/ListaBancos";
import ListaTiendas from "./Pagos/MetodosPago/ListaTiendas";
import ListaTransferencias from "./Pagos/MetodosPago/ListaTransferencias";
import { EstadoDeCuenta } from "./Paginas/EstadoDeCuenta";
import { Factura } from "./Paginas/Factura";
import { CelularConsumos } from "./Paginas/CelularConsumos";
import { PagoPorEvento } from "./Paginas/PagoPorEvento";
import { CelularCambiarPlan } from "./Paginas/CelularCambiarPlan";
import CelularMejorarPlan from "./Paginas/CelularMejorarPlan";
import SkyPlusCliente from "./Paginas/SkyPlusCliente";
import SkyInternetCliente from "./Paginas/SkyInternetCliente";
import FAQ from "./Paginas/FAQ";
import SkyPlusNoCliente from "./Paginas/SkyPlusNoCliente";
import { Celular } from "./Paginas/Celular";
import Satelital from "./Paginas/Satelital";

import { ContextFlujosProvider } from "./Context/ContextFlujos";
import NochesFinesSemana from "./SkyCelular/SkyCelularMejoraPlan/NochesFinesSemana";
import ConoceSkyPlus from "./SkyPlus/ConoceSkyPlus";
import Pagina404 from "./Paginas/Pagina404";

export const contextFlujo = React.createContext({});

const Routing = () => {
  const [skyPlus, setSkyPlus] = useState(null);

  return (
    <Router>
      <BarraSuperior />
      <ProSidebarProvider>
        <Row>
          <Col className={"p-0"} xs={12} sm={5} md={4} lg={3} xl={2}>
            <div
              id="bigIndex"
              className={"d-none d-sm-block d-md-block d-lg-block d-xl-block"}
            >
              <BarraMenu />
            </div>
          </Col>
          <Col
            className={"p-0"}
            id="pageContent"
            xs={12}
            sm={7}
            md={8}
            lg={9}
            xl={10}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <PublicElement>
                    <LoginPage />
                  </PublicElement>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicElement>
                    <LoginPage />
                  </PublicElement>
                }
              />
              <Route
                path="/inicio"
                element={
                  <PrivateInicioPOS>
                    <Inicio />
                  </PrivateInicioPOS>
                }
              />

              <Route
                path="/celular/mejorar"
                element={
                  <Private>
                    <CelularMejorarPlan />
                  </Private>
                }
              />
              
              <Route
                path="/cartelera"
                element={
                  <Private>
                    <Cartelera />
                  </Private>
                }
              />

              <Route
                path="/Satelital"
                element={
                  <Private>
                    <Satelital />
                  </Private>
                }
              />

              <Route
                path="/pagoporevento"
                element={
                  <Private>
                    <PagoPorEvento />
                  </Private>
                }
              />
              <Route
                path="/celular/consumos"
                element={
                  <Private>
                    <CelularConsumos />
                  </Private>
                }
              />

              <Route
                path="/skyplus/cliente"
                element={
                  <Private>
                    <ConoceSkyPlus />
                  </Private>
                }
              />
              <Route
                path="/skyplus/conocesky"
                element={
                  <Private>
                    <SkyPlusNoCliente />
                  </Private>
                }
              />

              <Route
                path="/internet/cliente"
                element={
                  <Private>
                    <SkyInternetCliente />
                  </Private>
                }
              />
              <Route
                path="/celular/mejorar"
                element={
                  <Private>
                    <CelularMejorarPlan />
                  </Private>
                }
              />
              <Route
                path="/celular/cambiar"
                element={
                  <Private>
                    <NochesFinesSemana />
                  </Private>
                }
              />
              <Route
                path="/celular"
                element={
                  <Private>
                    <Celular />
                  </Private>
                }
              />
              
              <Route
                path="/chat"
                element={
                  <Private>
                    <Chat />
                  </Private>
                }
              />
              <Route
                path="/micuenta/mipaquete"
                element={
                  <Private>
                    <MiPaquete />
                  </Private>
                }
              />
              <Route
                path="/micuenta/ajustes"
                element={
                  <Private>
                    <Ajustes />
                  </Private>
                }
              />

              <Route
                path="/aclaraciones"
                element={
                  <Private>
                    <Aclaraciones />
                  </Private>
                }
              />
              <Route
                path="/reportes"
                element={
                  <Private>
                    <Reportes />
                  </Private>
                }
              />

              <Route
                path="/cuentas/seguimiento"
                element={
                  <Private>
                    <StepSeguimiento />
                  </Private>
                }
              />
              <Route
                path="/realizapagos"
                element={
                  <Private>
                    <RealizaPagos />
                  </Private>
                }
              />
              <Route
                path="/faq"
                element={
                  <Private>
                    <FAQ />
                  </Private>
                }
              />
              <Route
                path="/pagos/metodospago"
                element={
                  <Private>
                    <MetodosPago />
                  </Private>
                }
              />
              <Route
                path="/pagos/listabancos"
                element={
                  <Private>
                    <ListaBancos />
                  </Private>
                }
              />
              <Route
                path="/pagos/listatiendas"
                element={
                  <Private>
                    <ListaTiendas />
                  </Private>
                }
              />
              <Route
                path="/pagos/listatransferencias"
                element={
                  <Private>
                    <ListaTransferencias />
                  </Private>
                }
              />
              <Route
                path="/pagos/estadodecuenta"
                element={
                  <Private>
                    <EstadoDeCuenta />
                  </Private>
                }
              />
              <Route
                path="/pagos/factura"
                element={
                  <Private>
                    <Factura />
                  </Private>
                }
              />
              <Route path="*" element={<Private><Pagina404/></Private>} />
            </Routes>
          </Col>
        </Row>
      </ProSidebarProvider>
    </Router>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextFlujosProvider>
      <Routing />
    </ContextFlujosProvider>
  </React.StrictMode>
);
