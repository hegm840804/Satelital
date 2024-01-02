import React, { useContext, useState, useEffect } from "react";
import * as Sidebar from "react-pro-sidebar";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import call from "../assets/img/BarraMenu/call.png";
import inicioIcono from "../assets/img/BarraMenu/inicioIcono.png";
import mobile from "../assets/img/BarraMenu/mobile.png";
import {
  FaWifi,
  FaRegStar,
  FaRegUser,
  FaRegHdd,
  FaRegQuestionCircle,
  FaRegFileVideo,
} from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import logoOut from "../assets/img/BarraMenu/sign-out.svg";
import styles from "./barraMenu.module.css";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import ContextFlujos from "../Context/ContextFlujos";

export const BarraMenu = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentPage, setPage] = useState(window.location.pathname);
  const [miCuentaActive, setMiCuentaActive] = useState(false);
  const [pagosActive, setPagosActive] = useState(false);
  const [celularActive, setCelularActive] = useState(false);

  const { skyPlus, skyCelular, pais } = useContext(ContextFlujos) as any;

  function setNewPage(newPath: string) {
    setPage(newPath);
    handleOpen();
  }

  const handleOpen = () => {
    const menuLateral = document.getElementById("menuLateral");
    if (menuLateral !== null) {
      menuLateral.style.display = "none";
    }

    const pageContent = document.getElementById("pageContent");
    if (pageContent !== null) {
      pageContent.style.display = "block";
    }

    const menuIcon = document.getElementById("menuIcon");
    if (menuIcon !== null) {
      menuIcon.style.display = "flex";
    }

    const closeIcon = document.getElementById("closeIcon");
    if (closeIcon !== null) {
      closeIcon.style.display = "none";
    }
  };

  function doLogout() {
    //CODIGO PARA BORRAR DATOS DEL LOCAL STORAGE
    sessionStorage.setItem("authenticated", "false");
    //REDIRECT

    sessionStorage.clear();
    // dispatch("logout");
    redirect("/");
  }

  function redirect(url: string) {
    var ua = navigator.userAgent.toLowerCase(),
      isIE = ua.indexOf("msie") !== -1,
      version = parseInt(ua.substr(4, 2), 10);

    // Internet Explorer 8 and lower
    if (isIE && version < 9) {
      var link = document.createElement("a");
      link.href = url;
      document.body.appendChild(link);
      link.click();
    }

    // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
    else {
      window.location.href = url;
    }
  }

  function isActiveSubmenu(submenu: string) {
    if (submenu === "miCuenta") {
      setMiCuentaActive(!miCuentaActive);
      setPagosActive(false);
      setCelularActive(false);
    } else if (submenu === "pagos") {
      setMiCuentaActive(false);
      setPagosActive(!pagosActive);
      setCelularActive(false);
    } else if (submenu === "celular") {
      setMiCuentaActive(false);
      setPagosActive(false);
      setCelularActive(!celularActive);
    }
  }

  return (
    <>
      <div id="MyMenuLateral" className={styles["container"]}>
        <Sidebar.Sidebar
          id="menuLateral"
          className={styles["menuContainer"]}
          style={{ minWidth: "100%" }}
        >
          <Sidebar.Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: "#6E6E6E",
                    fontSize: "18px",
                    fontFamily: "skyFont",
                    paddingBottom: "0px",
                    backgroundColor: disabled ? "#F0F0F0" : "#FBFBFB",
                  };
                if (level === 1)
                  return {
                    color: "#6E6E6E",
                    fontSize: "16px",
                    fontFamily: "skyFont",
                    paddingBottom: "0px",
                    height: "30px",
                    fontWeight: active ? 700 : 400,
                    backgroundColor: "#F0F0F0",
                  };
              },
            }}
          >
            <Sidebar.MenuItem
              className={styles["menu"]}
              href="/inicio"
              icon={<Image src={inicioIcono} />}
            >
              {" "}
              Inicio
            </Sidebar.MenuItem>
            <Sidebar.SubMenu
              open={miCuentaActive}
              className={styles["submenu"]}
              icon={<FaRegUser />}
              onClick={() => isActiveSubmenu("miCuenta")}
              label="Mi cuenta"
            >
              <Sidebar.MenuItem
                style={{ display: miCuentaActive ? "block" : "none" }}
                active={currentPage === "/micuenta/mipaquete"}
                component={<Link to="/micuenta/mipaquete" />}
                onClick={() => setNewPage("/micuenta/mipaquete")}
              >
                {" "}
                Mi paquete
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                style={{ display: miCuentaActive ? "block" : "none" }}
                active={currentPage === "/micuenta/ajustes"}
                component={<Link to="/micuenta/ajustes" />}
                onClick={() => setNewPage("/micuenta/ajustes")}
              >
                {" "}
                Ajustes de cuenta
              </Sidebar.MenuItem>
              {skyPlus.estado === true ? (
                <Sidebar.MenuItem
                  style={{ display: miCuentaActive ? "block" : "none" }}
                  active={currentPage === "/aclaraciones"}
                  component={<Link to="/aclaraciones" />}
                  onClick={() => setNewPage("/aclaraciones")}
                >
                  {" "}
                  Aclaraciones
                </Sidebar.MenuItem>
              ) : (
                <></>
              )}

              <Sidebar.MenuItem
                style={{ display: miCuentaActive ? "block" : "none" }}
                active={currentPage === "/reportes"}
                component={<Link to="/reportes" />}
                onClick={() => setNewPage("/reportes")}
              >
                {" "}
                Reportes y fallas
              </Sidebar.MenuItem>
            </Sidebar.SubMenu>

            <Sidebar.SubMenu
              open={pagosActive}
              className={styles["submenu"]}
              icon={<MdOutlinePayments className={styles["mirror"]} />}
              onClick={() => isActiveSubmenu("pagos")}
              label={
                sessionStorage.getItem("tipoCliente") === "POS"
                  ? "Pagos"
                  : "Recargas"
              }
            >
              <Sidebar.MenuItem
                style={{ display: pagosActive ? "block" : "none" }}
                active={currentPage === "/realizapagos"}
                component={<Link to="/realizapagos" />}
                onClick={() => setNewPage("/realizapagos")}
              >
                {sessionStorage.getItem("tipoCliente") === "POS"
                  ? "Realizar pagos"
                  : "Realizar recarga"}{" "}
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                style={{ display: pagosActive ? "block" : "none" }}
                active={currentPage === "/pagos/metodospago"}
                component={<Link to="/pagos/metodospago" />}
                onClick={() => setNewPage("/pagos/metodospago")}
              >
                {sessionStorage.getItem("tipoCliente") === "POS"
                  ? "Métodos de pago"
                  : "Métodos de recarga"}{" "}
              </Sidebar.MenuItem>


              {skyPlus.estado === true && pais === "MEX"? (
              <Sidebar.MenuItem
                style={{ display: pagosActive ? "block" : "none" }}
                active={currentPage === "/pagos/estadodecuenta"}
                component={<Link to="/pagos/estadodecuenta" />}
                onClick={() => setNewPage("/pagos/estadodecuenta")}
              >
                {" "}
                Estados de cuenta
              </Sidebar.MenuItem>): <></>}
             

              {skyPlus.estado === true && pais === "MEX"? (
              <Sidebar.MenuItem
                style={{ display: pagosActive ? "block" : "none" }}
                active={currentPage === "/pagos/factura"}
                component={<Link to="/pagos/factura" />}
                onClick={() => setNewPage("/pagos/factura")}
              >
                {" "}
                Solicitar factura
              </Sidebar.MenuItem>):<></>}


            </Sidebar.SubMenu>


            {skyPlus.estado === true && pais === "MEX"? (
              <Sidebar.MenuItem
                className={styles["menu"]}
                href="/pagoporevento"
                icon={<FaRegStar />}
              >
                {" "}
                Pago por evento
              </Sidebar.MenuItem>
            ) : (
              <></>
            )}
            {skyPlus.estado === true ? (
              <Sidebar.MenuItem
                className={styles["menu"]}
                href="/cartelera"
                icon={<FaRegFileVideo />}
              >
                {" "}
                Más contenido
              </Sidebar.MenuItem>
            ) : (
              <></>
            )}

            {
            pais === "MEX" &&
            (skyCelular.estado === true ? (
              <Sidebar.SubMenu
                open={celularActive}
                className={styles["submenu"]}
                icon={<Image src={mobile} />}
                onClick={() => isActiveSubmenu("celular")}
                label="Celular"
              >
                <Sidebar.MenuItem
                  style={{ display: celularActive ? "block" : "none" }}
                  active={currentPage === "/celular/consumos"}
                  component={<Link to="/celular/consumos" />}
                  onClick={() => setNewPage("/celular/consumos")}
                >
                  {" "}
                  Consumos
                </Sidebar.MenuItem>
              </Sidebar.SubMenu>
            ) : (
              <Sidebar.MenuItem
                className={styles["menu"]}
                href="/celular"
                icon={<Image src={mobile} />}
              >
                Celular
              </Sidebar.MenuItem>
            ) 
            )}

            {
            pais === "MEX" &&
            (skyPlus.estado === false ? (
              <Sidebar.MenuItem
                active={currentPage === "/skyplus/cliente"}
                className={styles["menu"]}
                component={<Link to="/skyplus/cliente" />}
                icon={<FaRegHdd />}
                onClick={() => setNewPage("/skyplus/cliente")}
              >
                Sky +
              </Sidebar.MenuItem>
            ) : (
              <Sidebar.MenuItem
                active={currentPage === "/skyplus/cliente"}
                className={styles["menu"]}
                component={<Link to="/skyplus/conocesky" />}
                icon={<FaRegHdd />}
                onClick={() => setNewPage("/skyplus/conocesky")}
              >
                Sky +
              </Sidebar.MenuItem>
            ))}
            <Sidebar.MenuItem
              active={currentPage === "/faq"}
              className={styles["menu"]}
              component={<Link to="" />}
              icon={<FaRegQuestionCircle />}
              onClick={handleShow}
            >
              {" "}
              Preguntas frecuentes
            </Sidebar.MenuItem>
            
             
              <Sidebar.MenuItem
                className={styles["menu"]}
                href="/guiapro"
                icon={<Image src={mobile} />}
              >
                {" "}
                Guia
              </Sidebar.MenuItem>
            
          </Sidebar.Menu>
          <div className={styles["comunicateContainer"]}>
            <div className={styles.dudasText}>¿Tienes dudas?</div>
            <div className={styles.comunicateText}>
              Comunícate con un asesor
            </div>

            <div id="big" className="d-none d-xl-block d-lg-block "></div>

            <div className={styles.buttonDiv}>
              <Button
                href="https://api.whatsapp.com/message/SQVAGHVTZVLGE1?autoload=1&app_absent=0"
                variant="primary"
                type="submit"
                className={styles.whatsappButton}
              >
                <BsWhatsapp className={styles["iconMarginWhatsapp"]} />
                <b>WhatsApp</b>
              </Button>
            </div>
            <div className={styles.buttonDiv}>
              {skyPlus.estado === true ? (
                <Button
                  variant="primary"
                  type="submit"
                  className={styles.chatButton}
                  href="/chat"
                >
                  <Image
                    src={call}
                    rounded
                    className={styles["iconMarginCall"]}
                  />
                  <b style={{ fontWeight: "600" }}>Chat en línea</b>
                </Button>
              ) : (
                <></>
              )}
            </div>
            <div id="small" className="d-lg-none d-xl-none">
              <div className={styles.buttonDiv}>
                <Button onClick={doLogout} className={styles.botonOut}>
                  <Image src={logoOut} className={styles.logoOut} />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </Sidebar.Sidebar>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        className={styles.contenedorModal}
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body>
          <div className={styles.info}>
            <h2 className={styles.tituloModal}>
              ¿Estas seguro que quieres abandonar esta página?
            </h2>
            <p className={styles.descripcion}>
              Se abrirá una nueva ventana de preguntas frecuentes Sky. Podrás
              continuar tu navegación aquí más tarde.
            </p>
            <Stack>
              <Button
                href="https://skynedagwwebint.sky.com.mx/ayuda/ayuda-soporte"
                target="_blank"
                className={styles.botonModal}
              >
                <strong>Continuar a Preguntas Frecuentes</strong>
              </Button>
              <Button
                className={styles.botonCancelarModal}
                onClick={handleClose}
              >
                <strong>Cancelar</strong>
              </Button>
            </Stack>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
