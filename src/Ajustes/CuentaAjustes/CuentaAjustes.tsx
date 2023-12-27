import styles from "./CuentaAjustes.module.css";
import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
  FormGroup,
  Alert,
} from "react-bootstrap";

import perfil from "../../../src/assets/img/Ajustes/profileImg_01.png";
import perfil1 from "../../../src/assets/img/Ajustes/avatares/1.png";
import perfil2 from "../../../src/assets/img/Ajustes/avatares/2.png";
import perfil3 from "../../../src/assets/img/Ajustes/avatares/3.png";
import perfil4 from "../../../src/assets/img/Ajustes/avatares/4.png";
import checked from "../../../src/assets/img/Ajustes/checked.png";
import ellipse from "../../../src/assets/img/Ajustes/ellipse.png";
import plus from "../../../src/assets/img/Ajustes/plus.png";
import { RxEyeClosed } from "react-icons/rx";
import { MdRemoveRedEye } from "react-icons/md";
import success from "../../../src/assets/img/Aclaraciones/success.png";

import { Desempaquetar, Empaquetar } from "../../Crypto/cripto";

import { ConsultaWS, ConsultaWSGet } from "../../Commons/ServiciosBase";

import {
  ModificarPasswordRegistro_Respuesta,
  ModificarPasswordRegistro_Parametros,
  ModificarPasswordRegistro_Entrada,
  builtModificarPasswordRegistroInput,
} from "../../Commons/Services/ModificarPasswordRegistroRest";

import encryptText from "../../Commons/EncriptText";
import Loading from "../../General/Loading";
import {
  ConsultarAvatars_Parametros,
  ConsultarAvatars_Respuesta,
} from "../../Commons/Services/ConsultarAvatars";

import {
  builtGuardarAvatar_Entrada,
  GuardarAvatar_Entrada,
  GuardarAvatar_Parametros,
  GuardarAvatar_Respuesta,
} from "../../Commons/Services/GuardarAvatar";

import {
  ConsultarAvatarCuenta_Parametros,
  ConsultarAvatarCuenta_Respuesta,
} from "../../Commons/Services/ConsultarAvatarCuenta";
import {
  AccountDetails_Entrada,
  AccountDetails_Parametros,
  AccountDetails_Respuesta,
} from "../../Commons/Services/AccountDetails";
import ConfirmMessage from "../../General/ConfirmMessage";
const CuentaAjustes = () => {
  const [user, setUser] = useState("");
  const [pwdActual, setPwdActual] = useState("");
  const [pwdNuevo, setPwdNuevo] = useState("");
  const [pwdConfirma, setPwdConfirma] = useState("");
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [datosModificarPassword, setdatosModificarPassword] =
    useState<ModificarPasswordRegistro_Respuesta>();
  const [datosSWActualizar, setDatosSWActualizar] =
    useState<ModificarPasswordRegistro_Respuesta>();
  const [status, setStatus] = useState("OK");
  const [message, setMessage] = useState("");
  const [errorCredenciales, setErrorCredenciales] = useState(false);
  const [direccion, setDireccion] = useState(
    sessionStorage.getItem("direccion")
  );
  const [direccionSkyPlus, setDireccionSkyPlus] = useState("");
  const [flujo, setFlujo] = useState(sessionStorage.getItem("flujos"));

  const [validaPwdActualVacio, setValidaPwdActual] = useState(false);
  const [validaPwdNuevoVacio, setValidaPwdNuevo] = useState(false);
  const [validaPwdConfirma, setValidaPwdConfirma] = useState(false);
  const [vPwdActualMessage, setVPwdActualMessage] = useState("");
  const [vPwdNuevoMessage, setVPwdNuevoMessage] = useState("");
  const [vPwdConfirmaMessage, setVPwdConfirmaMessage] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const stylos = {
    borderPwdActual: {
      border: validaPwdActualVacio ? "solid 1px red" : "transparent",
      borderRadius: "2px",
    },
    borderPwdNuevo: {
      border: validaPwdNuevoVacio ? "solid 1px red" : "transparent",
      borderRadius: "2px",
    },
    borderPwdConfirmar: {
      border: validaPwdConfirma ? "solid 1px red" : "transparent",
      borderRadius: "2px",
    },
  };

  const handleClose = () => {
    setPwdActual("");
    setPwdConfirma("");
    setPwdNuevo("");
    setShowAlert(false);
    setShow(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  const handleShow = () => {
    setShow(true);
    setPwdActual("");
    setPwdConfirma("");
    setPwdNuevo("");
    setValidaPwdActual(false);
    setValidaPwdConfirma(false);
    setValidaPwdNuevo(false);
    setVPwdActualMessage("");
    setVPwdConfirmaMessage("");
    setVPwdNuevoMessage("");
    //setDisableButton(true);
  };

  const esPwdSesion = (pwd: string) => {
    var kyriaVar = sessionStorage.getItem("kyriaVar");
    //console.error("kyriaVar -- " + kyriaVar);
    //console.error("encripted actual ---" + `${encryptText(`${pwdActual}`)}`)

    return `${encryptText(`${pwd}`)}` != kyriaVar;
  };

  const pwdValido = (pwd: string) => {
    let validExpPass: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#%*?&])[A-Za-z\d$@$!#%*?&]{8,15}/;

    return validExpPass.test(pwd);
  };

  const validarCampo = (e: any, campo: string) => {
    if (campo === "actual") {
      setPwdActual(e);
      if (e === "") {
        setValidaPwdActual(true);
        setVPwdActualMessage("La contraseña actual no debe estar vacía");
      } else {
        setValidaPwdActual(false);

        if (e.length > 7) {
          if (esPwdSesion(e)) {
            setValidaPwdActual(true);
            setVPwdActualMessage(
              "El campo de contraseña actual no coincide con tu contraseña de inicio de sesión realizado"
            );
          } else {
            setValidaPwdActual(false);
          }
        }
      }
      setPwdActual(e);
    }

    if (campo === "nueva") {
      setPwdNuevo(e);

      if (e === "") {
        setValidaPwdNuevo(true);
        setVPwdNuevoMessage("La contraseña nueva no debe estar vacía");
      } else {
        if (e.length < 8) {
          setValidaPwdNuevo(true);
          setVPwdNuevoMessage(
            "La contraseña nueva debe contener de 8 a 10 caracteres"
          );
        } else {
          if (!pwdValido(e)) {
            setValidaPwdNuevo(true);
            setVPwdNuevoMessage(
              "La contraseña no cumple con los requisitos establecidos"
            );
          } else {
            if (pwdNuevo != pwdConfirma) {
              setValidaPwdNuevo(true);
              setVPwdNuevoMessage(
                "La nueva contraseña y la confirmación de la nueva contraseña deben coincidir"
              );
            } else {
              setValidaPwdConfirma(false);
              setVPwdConfirmaMessage("");
              setValidaPwdNuevo(false);
              setVPwdNuevoMessage("");
              //setDisableButton(false);
            }
          }
        }
      }

      setPwdNuevo(e);
    }

    if (campo === "confirmar") {
      setPwdConfirma(e);

      if (e === "") {
        setValidaPwdConfirma(true);
        setVPwdConfirmaMessage("Confirmar contraseña no debe estar vacía");
      } else {
        if (e.length < 8) {
          setValidaPwdConfirma(true);
          setVPwdConfirmaMessage(
            "Confirmar contraseña debe contener de 8 a 10 caracteres"
          );
        } else {
          if (!pwdValido(e)) {
            setValidaPwdConfirma(true);
            setVPwdConfirmaMessage(
              "La contraseña no cumple con los requisitos establecidos"
            );
          } else {
            if (pwdNuevo != pwdConfirma) {
              setValidaPwdConfirma(true);
              setVPwdConfirmaMessage(
                "La confirmación y la nueva contraseña deben coincidir "
              );
            } else {
              setValidaPwdConfirma(false);
              setVPwdConfirmaMessage("");
              setValidaPwdNuevo(false);
              setVPwdNuevoMessage("");
              //setDisableButton(false);
            }
          }
        }
      }

      setPwdConfirma(e);
    }

    if (
      !validaPwdActualVacio &&
      !validaPwdNuevoVacio &&
      !validaPwdConfirma &&
      pwdActual != "" &&
      pwdNuevo != "" &&
      pwdConfirma != ""
    ) {
      //setDisableButton(false);
    } else {
      //setDisableButton(true);
    }
  };

  const doModificarPassword = async () => {
    /**************Modificacion de contraseña  ****/
    //----------------------------------------------------------------------------------------------------------------------------
    const ModificarPasswordRegistroDO: ModificarPasswordRegistro_Entrada =
      builtModificarPasswordRegistroInput(
        `${sessionStorage.getItem("EmailNotif")}`,
        `${encryptText(`${pwdNuevo}`)}`
      );
    let par = ModificarPasswordRegistro_Parametros(ModificarPasswordRegistroDO);
    let ModificarPasswordRegistroRespuesta: ModificarPasswordRegistro_Respuesta =
      await ConsultaWS(par);

    if (
      ModificarPasswordRegistroRespuesta.EBMHeaderResponse &&
      ModificarPasswordRegistroRespuesta.EBMHeaderResponse.ErrorNegocio
        .Estado == "ok" &&
      ModificarPasswordRegistroRespuesta.EBMHeaderResponse.ErrorTecnico.code ===
        "ok"
    ) {
      setDatosSWActualizar(ModificarPasswordRegistroRespuesta);

      sessionStorage.setItem("kyriaVar", encryptText(`${pwdNuevo}`));
    } else {
      setStatus("ERROR");

      console.error(
        "error actualizando contraseña",
        ModificarPasswordRegistroRespuesta.EBMHeaderResponse
      );
      setErrorCredenciales(true);

      setStatus("OK");
      setMessage(
        " Error : " +
          ModificarPasswordRegistroRespuesta.EBMHeaderResponse.ErrorNegocio
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    //----------------------------------------------------------------------------------------------------------------------------

    /**************Modificacion de contraseña  */

    setShow(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    setError(false);
    setErrorCredenciales(false);

    /* doModificarPassword();
     setStatus("OK");
     setMessage("Tu contraseña ha sido cambiada con éxito");
     setShowAlert(true);
     setTimeout(() => {
       setShowAlert(false);
     }, 3000);*/

    var kyriaVar = sessionStorage.getItem("kyriaVar");

    if (`${encryptText(`${pwdActual}`)}` != kyriaVar) {
      console.error(
        "El campo de contraseña actual no coincide con tu contraseña de inicio de sesión realizado"
      );

      setVPwdActualMessage(
        "El campo de contraseña actual no coincide con tu contraseña de inicio de sesión realizado"
      );
      setValidaPwdActual(true);

      /*setMessage(
        "El campo de contraseña actual no coincide con tu contraseña de inicio de sesión realizado"
      );
      setStatus("ERROR");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);*/
    } else {
      if (
        pwdActual == "" ||
        pwdNuevo == "" ||
        pwdConfirma == "" ||
        pwdActual == pwdNuevo ||
        pwdActual == pwdConfirma
      ) {
        setError(true);
        if (pwdActual == pwdNuevo || pwdActual == pwdConfirma) {
          console.error("El Contraseña Nuevo no puede ser igual al Anterior");
          setStatus("ERROR");
          setMessage("La Contraseña Nueva no puede ser igual al Anterior ");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }

        if (pwdActual == "") {
          console.error("La Contraseña Actual no debe estar vacia ");
          setVPwdActualMessage("La Contraseña Actual no debe estar vacia ");
          setValidaPwdActual(true);
          /*setMessage("La Contraseña Actual no debe estar vacia  ");
          setStatus("ERROR");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);*/
        }

        if (pwdNuevo == "") {
          console.error("La contraseña Nueva no debe estar vacia ");
          setVPwdNuevoMessage("La contraseña Nueva no debe estar vacia");
          setValidaPwdNuevo(true);
          /* setStatus("ERROR");
           setMessage("La contraseña Nueva no debe estar vacia ");
           setShowAlert(true);
           setTimeout(() => {
             setShowAlert(false);
           }, 3000);*/
        }

        if (pwdConfirma == "") {
          console.error("Confirmar contraseña no debe estar vacia");
          setVPwdConfirmaMessage("Confirmar contraseña no debe estar vacia");
          setValidaPwdConfirma(true);
          /* setStatus("ERROR");
           setMessage("Confirmar contraseña no debe estar vacia ");
           setShowAlert(true);
           setTimeout(() => {
             setShowAlert(false);
           }, 3000);*/
        }

        return;
      } else {
        if (pwdNuevo == pwdConfirma && !(pwdNuevo == "" && pwdConfirma == "")) {
          let validExpPass: RegExp =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#%*?&])[A-Za-z\d$@$!#%*?&]{8,15}/;

          if (validExpPass.test(pwdNuevo)) {
            doModificarPassword();
            setError(false);
            setStatus("OK");

            setMessage("Tu contraseña ha sido cambiada con éxito");
            setPwdActual("");
            setPwdNuevo("");
            setPwdConfirma("");
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
          } else {
            console.error(
              "La contraseña no cumple con los requisitos establecidos "
            );

            setVPwdNuevoMessage(
              "La contraseña no cumple con los requisitos establecidos"
            );
            setValidaPwdNuevo(true);

            /*setStatus("ERROR");
            setMessage(
              "La contraseña no cumple con los requisitos establecidos  "
            );
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);*/
          }
        } else {
          console.error(
            "La nueva contraseña y la confirmación de la nueva contraseña deben coincidir"
          );

          setVPwdNuevoMessage(
            "La nueva contraseña y la confirmación de la nueva contraseña deben coincidir"
          );
          setValidaPwdNuevo(true);

          /*
           setError(true);
           setStatus("ERROR");
           setMessage(
             "La nueva contraseña y la confirmación de la nueva contraseña deben coincidir"
           );
           setShowAlert(true);
           setTimeout(() => {
             setShowAlert(false);
           }, 3000);*/
        }
      }
    }
  };

  const [typeCurrent, setTypeCurrent] = useState("password");
  const handleShowCurrent = () =>
    setTypeCurrent(typeCurrent === "password" ? "text" : "password");

  const [typeNew, setTypeNew] = useState("password");
  const handleShowNew = () =>
    setTypeNew(typeNew === "password" ? "text" : "password");

  const [typeConfirm, settypeConfirm] = useState("password");
  const handleShowNumber = () =>
    settypeConfirm(typeConfirm === "password" ? "text" : "password");

  const [loading, isLoading] = useState(false);
  const [avatars, setAvatars] = useState<ConsultarAvatars_Respuesta>();
  const [accountAvatar, setAccountAvatar] = useState("");

  const getAvatars = async () => {
    isLoading(true);

    let ConsultarAvatarsParametros = ConsultarAvatars_Parametros(null, "6");

    let ConsultarAvatarsRespuesta: ConsultarAvatars_Respuesta =
      await ConsultaWSGet(ConsultarAvatarsParametros);
    setAvatars(ConsultarAvatarsRespuesta);

    let ConsultarAvatarCuentaParametros = ConsultarAvatarCuenta_Parametros(
      null,
      `${sessionStorage.getItem("cuenta")}`
    );

    let ConsultarAvatarCuentaRespuesta: ConsultarAvatarCuenta_Respuesta =
      await ConsultaWSGet(ConsultarAvatarCuentaParametros);
    setAccountAvatar(
      ConsultarAvatarCuentaRespuesta?.content[0]?.catalogoAvatar?.id
        ? ConsultarAvatarCuentaRespuesta?.content[0]?.catalogoAvatar?.id
        : ConsultarAvatarsRespuesta?.content[0]?.id
    );

    isLoading(false);
  };

  async function setAvatar(id: string) {
    const GuardarAvatarDO: GuardarAvatar_Entrada =
      builtGuardarAvatar_Entrada(id);
    let GuardarAvatarParametros = GuardarAvatar_Parametros(
      GuardarAvatarDO,
      `${sessionStorage.getItem("cuenta")}`
    );

    let GuardarAvatarRespuesta: GuardarAvatar_Respuesta = await ConsultaWS(
      GuardarAvatarParametros
    );
    setAccountAvatar(id);
  }

  const getAccountDetails = async (cuenta: string) => {
    isLoading(true);

    const accountDetailsDO: AccountDetails_Entrada = { userId: cuenta };
    let accountDetailsParametros = AccountDetails_Parametros(accountDetailsDO);

    let accountDetailsRespuesta: AccountDetails_Respuesta = await ConsultaWS(
      accountDetailsParametros
    );

    if (
      accountDetailsRespuesta.errormessage === "Ok" &&
      accountDetailsRespuesta.errorno == 0
    ) {
      sessionStorage.setItem(
        "acountDetails",
        JSON.stringify(accountDetailsRespuesta)
      );
      
      let calle = "";
      let numero = "";
      let numeroInterior = "";
      let colonia = "";
      let delegacion = "";
      let ciudad = "";
      let country = "";
      let cp= "";

      if (accountDetailsRespuesta.Account.Account.Billing.Street !== "") {
        calle = accountDetailsRespuesta.Account.Account.Billing.Street;
      }else{
        calle = accountDetailsRespuesta.Account.Account.Shipping.Street;
      }

      if (accountDetailsRespuesta.Account.Account.Billing.StreetNumber !== "") {
        numero = accountDetailsRespuesta.Account.Account.Billing.StreetNumber;
      }else{
        numero = accountDetailsRespuesta.Account.Account.Shipping.StreetNumber;
      }

      if (accountDetailsRespuesta.Account.Account.Billing.InteriorNumber !== "") {
        numeroInterior = accountDetailsRespuesta.Account.Account.Billing.InteriorNumber;
      } else {
        numeroInterior  = accountDetailsRespuesta.Account.Account.Shipping.InteriorNumber;
      }

      if (accountDetailsRespuesta.Account.Account.Billing.District !== "") {
        colonia = accountDetailsRespuesta.Account.Account.Billing.District;
      } else {
        colonia = accountDetailsRespuesta.Account.Account.Shipping.District;
      }

      if (accountDetailsRespuesta.Account.Account.Billing.Delegation !== "") {
        delegacion = accountDetailsRespuesta.Account.Account.Billing.Delegation;
      } else {
        delegacion = accountDetailsRespuesta.Account.Account.Shipping.Delegation;
      }

      if (accountDetailsRespuesta.Account.Account.Billing.City !== "") {
        ciudad = accountDetailsRespuesta.Account.Account.Billing.City;
      } else {
        ciudad = accountDetailsRespuesta.Account.Account.Shipping.City;
      }

      if (accountDetailsRespuesta.Account.Account.Billing.PostalCode !== "") {
        cp = accountDetailsRespuesta.Account.Account.Billing.PostalCode;
      } else {
        cp = accountDetailsRespuesta.Account.Account.Shipping.PostalCode;
      }

      setDireccionSkyPlus(calle +" " + numero + ", " + numeroInterior + ", " + colonia + ", " + ciudad + ", c.p." +  cp);
      isLoading(false);
    } else {
      isLoading(false);
    }
  };

  useEffect(() => {
    getAvatars();
    if (flujo !== "DTH") {
      let primary = JSON.parse(sessionStorage.getItem("dataPrimary")!);
      getAccountDetails(primary.userId);
    }
  }, []);
  return (
    <>
      <Loading isLoading={loading} />
      <Row className={styles["alertContainer"]}>
        <Col></Col>
      </Row>

      <Row className={styles["headerRow"]}>
        <Col>
          <span className={styles["spectrum"]}>Ajustes de cuenta</span>
        </Col>
      </Row>

      <Row className={styles["subheaderRow"]}>
        <Col>
          <p className={styles["title"]}>Actualizar contraseña</p>
          <p className={styles["subtitle"]}>
            Recuerda que tu nueva contraseña debe tener hasta 10 caracteres: una
            mayúscula, una minúscula, un número y un caracter especial.
          </p>
          <Button
            variant="primary"
            type="submit"
            className={styles.button}
            onClick={handleShow}
          >
            Cambiar contraseña
          </Button>
        </Col>
      </Row>

      <Row className={styles["subheaderRow"]}>
        <Col>
          <p className={styles["title"]}>Cambio de domicilio</p>
          <p className={styles["subtitle"]}>
            Escríbenos por WhatsApp al 55 5169 0025 para ayudarte a gestionar tu
            cambio de domicilio y agendar la visita técnica para trasladar tu
            equipo Sky
          </p>
          <div className="pt-3"></div>
          <Card className={styles["domicilioCard"]}>
            <Card.Body>
              <p className={styles["titleCard"]}>
                Tu domicilio actual es:{" "}
                <span className={styles["titleCardBold"]}>
                  {flujo === "Sky+" ? direccionSkyPlus : direccion}
                </span>
              </p>
            </Card.Body>
          </Card>
          <div className="pt-2"></div>
        </Col>
      </Row>

      <Row className={styles["subheaderRow"]}>
        <Col>
          <p className={styles["title"]}>Elige tu imagen de perfil</p>
          <p className={styles["subtitle"]}>
            Selecciona la imagen que más te guste y personaliza tu experiencia
          </p>
        </Col>
      </Row>

      <Row className={styles["imagesRow"]}>
        {avatars?.content?.map((item: any, i: number) => (
          <Col
            xs={{ span: 3 }}
            sm={{ span: 3 }}
            md={{ span: 3 }}
            lg={{ span: 3 }}
            xl={{ span: 3 }}
            key={i}
            className={styles["imagesCol"] + " pt-2"}
          >
            <img
              src={item.avatarBase64}
              id={item.id}
              className={styles["imagen"]}
              onClick={() => setAvatar(item.id)}
            />
            {accountAvatar == item.id ? (
              <img src={checked} className={styles["checked"]} />
            ) : (
              <></>
            )}
          </Col>
        ))}
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <p className={styles["modalTitle"]}>Cambiar contraseña</p>
          <p className={styles["modalSutitle"]}>
            Recuerda que tu nueva contraseña debe tener hasta 10 caracteres: una
            mayúscula, una minúscula, un número y un caracter especial.
          </p>

          <div className={styles["divForm"]}>
            <Form className={styles["form"]}>
              <FormGroup>
                <FormLabel>Contraseña actual</FormLabel>
                <InputGroup className={"mb-3"} style={stylos.borderPwdActual}>
                  <FormControl
                    type={typeCurrent}
                    value={pwdActual}
                    onBlur={(e) => validarCampo(e.target.value, "actual")}
                    onChange={(e) => validarCampo(e.target.value, "actual")}
                    placeholder="****************"
                    aria-describedby="basic-addon2"
                    className={styles["formPasswordText"]}
                  />

                  <Button
                    variant="outline-secondary"
                    id="button-addon1"
                    className={styles["formPasswordButton"]}
                    onClick={handleShowCurrent}
                  >
                    {typeCurrent === "password" ? (
                      <RxEyeClosed />
                    ) : (
                      <MdRemoveRedEye />
                    )}
                  </Button>
                </InputGroup>

                {validaPwdActualVacio ? (
                  <Form.Label>
                    {" "}
                    <span className={styles.mensaje}>
                      {" "}
                      {vPwdActualMessage}
                    </span>{" "}
                  </Form.Label>
                ) : (
                  <Form.Label>
                    <span></span>
                  </Form.Label>
                )}
              </FormGroup>
            </Form>
          </div>
          <div className={styles["divForm"]}>
            <Form className={styles["form"]}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Contraseña nueva</Form.Label>
                <InputGroup className="mb-3" style={stylos.borderPwdNuevo}>
                  <Form.Control
                    type={typeNew}
                    value={pwdNuevo}
                    onBlur={(e) => validarCampo(e.target.value, "nueva")}
                    onChange={(e) => validarCampo(e.target.value, "nueva")}
                    placeholder="****************"
                    className={styles["formPasswordText"]}
                    maxLength={10}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon1"
                    className={styles["formPasswordButton"]}
                    onClick={handleShowNew}
                  >
                    {typeNew === "password" ? (
                      <RxEyeClosed />
                    ) : (
                      <MdRemoveRedEye />
                    )}
                  </Button>
                </InputGroup>

                {validaPwdNuevoVacio ? (
                  <Form.Label>
                    <span className={styles.mensaje}> {vPwdNuevoMessage}</span>
                  </Form.Label>
                ) : (
                  <Form.Label>
                    <span></span>
                  </Form.Label>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Confirmar nueva contraseña</Form.Label>

                <InputGroup className="mb-3" style={stylos.borderPwdConfirmar}>
                  <Form.Control
                    type={typeConfirm}
                    value={pwdConfirma}
                    onBlur={(e) => validarCampo(e.target.value, "confirmar")}
                    onChange={(e) => validarCampo(e.target.value, "confirmar")}
                    placeholder="****************"
                    className={styles["formPasswordText"]}
                    maxLength={10}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon1"
                    className={styles["formPasswordButton"]}
                    onClick={handleShowNumber}
                  >
                    {typeConfirm === "password" ? (
                      <RxEyeClosed />
                    ) : (
                      <MdRemoveRedEye />
                    )}
                  </Button>
                </InputGroup>

                {validaPwdConfirma ? (
                  <Form.Label>
                    {" "}
                    <span className={styles.mensaje}>
                      {" "}
                      {vPwdConfirmaMessage}
                    </span>{" "}
                  </Form.Label>
                ) : (
                  <Form.Label>
                    {" "}
                    <span></span>{" "}
                  </Form.Label>
                )}
              </Form.Group>
            </Form>
          </div>
          <div className={styles["divButton"]}>
            <Button className={styles["passwordButton"]} onClick={handleSubmit}>
              Cambiar contraseña
            </Button>
          </div>
          <div className={styles["divButton"]}>
            <Button className={styles["cancelButton"]} onClick={handleClose}>
              <b>Cancelar</b>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CuentaAjustes;
