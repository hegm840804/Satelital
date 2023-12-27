import React, { useContext, useEffect, useState } from "react";

import styles from "./ModalDetallesEventoTemporada.module.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ModalConfirmacionCompra } from "../ModalConfirmacionCompra/ModalConfirmacionCompra";
import { decryptBase64ArrayByteToString } from "../../../Commons/EncriptText";
import Form from "react-bootstrap/esm/Form";
import Loading from "../../../General/Loading";

import {
  builtConsultaHorarioPPEEntrada,
  ConsultaHorarioPPE_Entrada,
  ConsultaHorarioPPE_Parametros,
  ConsultaHorarioPPE_Respuesta,
} from "../../../Commons/Services/ConsultaHorarioPPE";
import { ConsultaWS } from "../../../Commons/ServiciosBase";

import {
  builtRecargaConsultaPrecioRecargaInput,
  AltaServicioPPE_Entrada,
  AltaServicioPPE_Parametros,
  AltaServicioPPE_Respuesta,
} from "../../../Commons/Services/AltaServicioPPE";
import ConfirmMessage from "../../../General/ConfirmMessage";


export const ModalDetallesEventoTemporada = ({
  show,
  handleClose,
  titulo,
  precio,
  canal,
  canalDisplay,
  idioma,
  subtitulos,
  img,
  sinopsis,
  area,
  subarea,
  aviso
}: any) => {
  const [muestraModal, setMuestraModal] = useState(false);
  const [tarjetas, setTarjetas] = useState<any>([]);
  const [dataHorarios, setDataHorarios] = useState<any>([]);
  const [horarios, setHorarios] = useState<any>([]);
  const [seleccionTarjeta, setSeleccionTarjeta] = useState("0");
  const [seleccionHorario, setSeleccionHorario] = useState("0");

  const [loading, isLoading] = useState(false);

  const [status1, setStatus1] = useState("OK");
  const [message1, setMessage1] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const [showModalAviso, setShowModalAviso] = useState(false);
  
  const handleCloseHijo = () => setMuestraModal(false);

  const handleShow = () => {
    if (seleccionTarjeta !== "0" && seleccionHorario !== "0") {
      setMuestraModal(true);
    } else {
      setStatus1("ERROR");
      setMessage1("Favor de elegir horario y equipo");
      setShowAlert1(true);
      setTimeout(() => {
        setShowAlert1(false);
      }, 3000);

    }
  };

  const obtieneTarjeta = (e: any) => {
    setSeleccionTarjeta(e.target.value);
  };

  const obtieneHorario = (e: any) => {
    setSeleccionHorario(e.target.value);
  };

  const contrata = async () => {

    let index: number = parseInt(seleccionHorario) - 1;
    let objetoHorario: any = dataHorarios[index];

    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );

    let cadenaInicio = objetoHorario.startdate;
    let cadenaFin = objetoHorario.enddate;

    let cadenaInicioArray = cadenaInicio.split("T");
    let cadenaInicioFechaArray = cadenaInicioArray[0].split("-");
    let horaInicio = cadenaInicioArray[1].slice(0, 5);
    let fechaInicio =
      cadenaInicioFechaArray[2] +
      "/" +
      cadenaInicioFechaArray[1] +
      "/" +
      cadenaInicioFechaArray[0];

    let cadenaFinArray = cadenaFin.split("T");
    let cadenaFinFechaArray = cadenaFinArray[0].split("-");
    let horaFin = cadenaFinArray[1].slice(0, 5);
    let fechaFin =
      cadenaFinFechaArray[2] +
      "/" +
      cadenaFinFechaArray[1] +
      "/" +
      cadenaFinFechaArray[0];

    let horaInicioArray = horaInicio.split(":");
    let horaFinArray = horaFin.split(":");

    let fechaHoraInicio =
      cadenaInicioFechaArray[0] +
      cadenaInicioFechaArray[1] +
      cadenaInicioFechaArray[2] +
      horaInicioArray[0] +
      horaInicioArray[1];

    let fechaHoraFin =
      cadenaFinFechaArray[0] +
      cadenaFinFechaArray[1] +
      cadenaFinFechaArray[2] +
      horaFinArray[0] +
      horaFinArray[1];

    isLoading(true);

    //----------------------------------------------------------------------------------------------------------------------------
    const AltaServicioPPEDO: AltaServicioPPE_Entrada =
      builtRecargaConsultaPrecioRecargaInput(
        `${sessionStorage.getItem("cuenta")}`,
        area,
        subarea,
        "APP SKY- " + titulo,
        seleccionTarjeta,
        sessionStorage.getItem("rowId")!,
        sessionStorage.getItem("Usuario")!,
        sessionStorage.getItem("pais")!,
        sessionStorage.getItem("accountType")!,
        sessionStorage.getItem("NombreSuscriptor")!,
        sessionStorage.getItem("Paquete")!,
        "N",
        titulo,
        "Sky Premiere",
        precio,
        fechaInicio + " a las " + horaInicio,
        fechaFin + " a las " + horaFin,
        canalDisplay,
        canal,
        objetoHorario.ppveventid.toString(),
        fechaHoraInicio,
        fechaHoraFin,
        objetoHorario.duration.toString()!,
        sessionStorage.getItem("diferenciaGMT")!,
        "0",
        objetoHorario.tokenvalue.toString(),
        objetoHorario.ppvgenreid.toString(),
        objetoHorario.providereventid,
        objetoHorario.ordertype,
        objetoHorario.skytrackingId,
        "HIJUMP",
        sessionStorage.getItem("idSesion")!,
        sessionStorage.getItem("Usuario")!,
        tmp
      );
    let AltaServicioPPEParametros =
      AltaServicioPPE_Parametros(AltaServicioPPEDO);

    let AltaServicioPPERespuesta: AltaServicioPPE_Respuesta = await ConsultaWS(
      AltaServicioPPEParametros
    );

    if (
      AltaServicioPPERespuesta.numeroSolicitud &&
      AltaServicioPPERespuesta.numeroSolicitud != "" &&
      AltaServicioPPERespuesta.numeroSolicitud != null
    ) {
      isLoading(false);

      //return response.data.resultado;
      aviso("OK", AltaServicioPPERespuesta.numeroSolicitud);
      
    } else {
      isLoading(false);
      console.error(AltaServicioPPERespuesta);
      //aviso("", AltaServicioPPERespuesta.resultadodesc);
      aviso("", "");
    }

  }; //fin de contrata

  useEffect(() => {
    doConsultaHorarioPPE();
  }, []);

  const doConsultaHorarioPPE = async () => {
    var tmp = decryptBase64ArrayByteToString(
      sessionStorage.getItem("kyriaVar")
    );

    //----------------------------------------------------------------------------------------------------------------------------
    const ConsultaHorarioPPEDO: ConsultaHorarioPPE_Entrada =
      builtConsultaHorarioPPEEntrada(
        `${sessionStorage.getItem("Usuario")}`,
        `${tmp}`,
        canal,
        titulo,
        "ALL DAY",
        sessionStorage.getItem("pais")!,
        sessionStorage.getItem("diferenciaGMT")!
      );
    let ConsultaHorarioPPEParametros =
      ConsultaHorarioPPE_Parametros(ConsultaHorarioPPEDO);

    let ConsultaHorarioPPERespuesta: ConsultaHorarioPPE_Respuesta =
      await ConsultaWS(ConsultaHorarioPPEParametros);

    if (
      ConsultaHorarioPPERespuesta.horarios &&
      ConsultaHorarioPPERespuesta.horarios != null &&
      ConsultaHorarioPPERespuesta.horarios.length > 0
    ) {
      setDataHorarios(ConsultaHorarioPPERespuesta.horarios);
      let arreglo: string[] = [];
      let data = ConsultaHorarioPPERespuesta.horarios;
      let anio: string = "";
      let mes: string = "";
      let dia: string = "";
      let hora: string = "";

      data.forEach((element: any) => {
        anio = element.startdate.substring(0, 4);
        mes = element.startdate.substring(5, 7);
        dia = element.startdate.substring(8, 10);
        hora = element.startdate.substring(11, 16);

        arreglo.push(dia + "-" + mes + "-" + anio + " | " + hora);
      });

      setHorarios(arreglo);
    } else {
      console.error(ConsultaHorarioPPERespuesta);
    }
    let tarjetas: any = "";
    if (sessionStorage.getItem("tarjetas") !== null) {
      tarjetas = sessionStorage.getItem("tarjetas");
    }
    if (tarjetas !== "") {
      let arTarjetas = JSON.parse(tarjetas);

      arTarjetas.forEach((element: any, index: number) => {
        if (
          element.Categoria === "SKY IPC UHD" ||
          element.Categoria === "SKY HMC EHD"
        ) {
          arTarjetas.splice(index, index);
        }
      });
      setTarjetas(arTarjetas);
    }
  };

  return (
    <>
      <Loading isLoading={loading} />
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body className={styles.contenedor}>
        <Row className={styles["alertContainer"]}>
            <Col>
              <ConfirmMessage
                status={status1}
                message={message1}
                showAlert={showAlert1}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div id="big" className="d-none d-xl-block d-lg-block ">
                <img src={img} className={styles.img} />
              </div>
              <div id="small" className="d-lg-none d-xl-none">
                <img src={img} className={styles.img} />
              </div>
            </Col>
            <Col md={8}>
              <div className={styles.info}>
                <h2 className={styles.titulo}>
                  {titulo.length > 28 ? titulo.slice(0, 28) : titulo}
                </h2>
                <span>Canal {canal}</span>
                <p>${precio} | All day</p>
                <p className={styles.descripcion}>{sinopsis}</p>
                <p className={styles.descripcion}>
                  <strong>
                    {" "}
                    Idioma {idioma} | Subtítulos {subtitulos}
                  </strong>
                </p>
                <Row>
                  <Col xs={12} lg={4} className={styles.colSelect}>
                    <Form.Select
                      aria-label="Default select example"
                      className={styles.select}
                      onChange={obtieneHorario}
                    >
                      <option value="0">Horario</option>
                      {horarios.map((hora: any, key: number) => {
                        return <option value={key + 1}>{hora}</option>;
                      })}
                    </Form.Select>
                  </Col>
                  <Col xs={12} lg={4}>
                    <Form.Select
                      aria-label="Default select example"
                      className={styles.selectTarjeta}
                      onChange={obtieneTarjeta}
                    >
                      <option value="0">Tarjeta inteligente</option>
                      {tarjetas.map((tarjeta: any) => {
                        return (
                          <option value={tarjeta.TarjetaInteligente}>
                            {tarjeta.TarjetaInteligente}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                  <Col xs={12} lg={4}>
                    <Button
                      className={styles.boton}
                      onClick={(event) => {
                        handleShow();
                        //handleClose();
                      }}
                    >
                      Contratar
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <ModalConfirmacionCompra
        show={muestraModal}
        handleClose={handleCloseHijo}
        handleCloseContratar={handleClose}
        contratar={contrata}
        titulo={titulo}
        precio={precio}
      />
    </>
  );
};
