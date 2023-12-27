import React, { useState, useEffect } from "react";
import styles from "./barraSuperior.module.css";
import { Col, Container, Row, Button, Image } from "react-bootstrap";
import skyLogo from "../assets/img/BarraSuperior/skyLogo.png";
import { BarraMenu } from "../BarraMenu/BarraMenu";
import { ProSidebarProvider } from "react-pro-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";



export const BarraSuperior = () => {
  const [menu, setMenu] = useState(null); const handleShow = () => {
    let menuLateral = document.getElementById("menuLateral");
    if (menuLateral !== null) {
      menuLateral.style.display = "flex";
    }


    const pageContent = document.getElementById("pageContent");
    if (pageContent !== null) {
      pageContent.style.display = "none";
    }


    const menuIcon = document.getElementById("menuIcon");
    if (menuIcon !== null) {
      menuIcon.style.display = "none";
    }


    const closeIcon = document.getElementById("closeIcon");
    if (closeIcon !== null) {
      closeIcon.style.display = "flex";
    }
  };

  const handleClose = () => {
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



  useEffect(() => { }, []);


  return (
    <Container fluid className={styles.container + " "}>
      <Row>
        <Col>
          <Image src={skyLogo} rounded className={styles.logo} />
        </Col>
        <Col className={styles.buttonCol}>
          <div
            id="bigSuperiorBar"
            className={"d-none d-sm-block d-md-block d-lg-block d-xl-block"}
          >
            <Button onClick={doLogout} className={styles.button}>Cerrar Sesión</Button>
          </div>
          <div
            id="smallSuperiorBarButton"
            className={"d-sm-none d-md-none d-lg-none d-xl-none"}
          >
            <GiHamburgerMenu
              id="menuIcon"
              size={30}
              className={styles["menuButton"]}
              onClick={handleShow}
            />
            <CgClose
              id="closeIcon"
              size={30}
              className={styles["closeButton"]}
              onClick={handleClose}
            />
          </div>
        </Col>
      </Row>
      <Row className={styles.spectrumLine}>
        <Col>
          <div
            id="smallSuperiorBarMenu"
            className={
              "d-sm-none d-md-none d-lg-none d-xl-none " +
              styles["smallSuperiorBarMenu"]
            }
          >
            <ProSidebarProvider>
              <BarraMenu />
            </ProSidebarProvider>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
