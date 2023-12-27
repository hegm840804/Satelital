import React, { useState } from 'react';
import styles from "./SkyCelularCambiarPlan.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import check from "../../../src/assets/img/Iconos/Check.png";
import flecha from '../../../src/assets/img/Iconos/flechaAbajo.svg';
import icono from '../../../src/assets/img/Iconos/whats.png';
import whats from '../../../src/assets/img/Iconos/whats.png';
import uber from '../../../src/assets/img/Iconos/uber.png';
import twit from '../../../src/assets/img/Iconos/twit.png';
import insta from '../../../src/assets/img/Iconos/insta.png';
import face from '../../../src/assets/img/Iconos/face.png';
import waze from '../../../src/assets/img/Iconos/waze.svg';
import pint from '../../../src/assets/img/Iconos/pint.svg';
import go from '../../../src/assets/img/Iconos/go.png';
import youtube from '../../../src/assets/img/Iconos/youtube.svg';
import tik from '../../../src/assets/img/Iconos/tik.svg';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';





export const SkyCelularCambiarPlan = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);


  return (
    <>
      <div id="big" className="d-none d-xl-block d-lg-block ">

        <span className={styles["spectrum"]}>Conoce los planes Sky Celular que tenemos para ti</span>
        <p className={styles["title"]}>Selecciona el plan que mejor se ajuste a tus necesidades.</p>


   
    <Row className={styles["ancho"]}>
    <Col  md={4}>

    <Card className={styles["cuadro"]}>
      <Card.Body>
        <p className={styles["paquetegb"]}>Navega con <span className={styles["paquetegbbold"]}>16 GB</span></p>
        <span className={styles["paqueteprecio"]}>$569</span> <span className={styles["paquetemes"]}>/ mes</span>
        <hr/>
        <p className={styles["subtitlegris"]}>Qué incluye</p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos incluidos 4 GB</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos promocionales 4 GB</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos adicionales 5 GB</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos para streaming 3 GB</span></p>
        <p className={styles["reduceTexto"]}><img src={check}/><span  className={styles["textos"]}> Redes Sociales</span>
                    <img src={flecha} className={styles["flecha"]} onClick={() => setOpen3(!open3)} aria-controls="example-collapse-text" aria-expanded={open3}/>
                  </p>
                  <Collapse in={open3}>
                    <div id="example-collapse-text">
                      <span><img src={whats} className={styles["icono"]}/></span><img src={uber} className={styles["icono"]}/>
                      <span><img src={twit} className={styles["icono"]}/></span><span><img src={insta} className={styles["icono"]}/></span>
                      <span><img src={face} className={styles["icono"]}/></span><span><img src={waze} className={styles["icono"]}/></span>
                      <span><img src={pint} className={styles["icono"]}/></span>
                    </div>
                  </Collapse>  
                  <p className={styles["reduceTexto"]}><img src={check}/><span  className={styles["textos"]}> Aplicaciones para streaming</span>
                    <img src={flecha} className={styles["flecha"]} onClick={() => setOpen4(!open4)} aria-controls="example-collapse-text" aria-expanded={open4}/>
                  </p>
                  <Collapse in={open4}>
                    <div id="example-collapse-text">
                    <span><img src={go} className={styles["icono"]}/></span><span><img src={youtube} className={styles["icono"]}/>
                      </span><span><img src={tik} className={styles["icono"]}/></span>
                    </div>
                  </Collapse>  

        <p className={styles["subtitlegris"]}>
          <br/>
        <Form>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Quiero domiciliar mi pago"
        />

        </Form>
        </p>

        <p><span  className={styles["textos2"]}>Recibe tu beneficio al domiciliar el pago a tu
Tarjeta de Crédito o Débito.</span></p>


        <Button className={styles["botonazul"]}>Cambiar mi plan</Button>{' '}
      </Card.Body>
    </Card>

    </Col>


    <Col  md={4}>

    <Card className={styles["cuadro"]}>
      <Card.Body>
        <p className={styles["paquetegb"]}>Navega con <span className={styles["paquetegbbold"]}>16 GB</span></p>
        <span className={styles["paqueteprecio"]}>$599</span> <span className={styles["paquetemes"]}>/ mes</span>
        <hr/>
        <p className={styles["subtitlegris"]}>Qué incluye</p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos incluidos 4 GB</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos promocionales 4 GB</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos adicionales 5 GB</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos para streaming 3 GB</span></p>
        <p className={styles["reduceTexto"]}><img src={check}/><span  className={styles["textos"]}> Redes Sociales</span>
                    <img src={flecha} className={styles["flecha"]} onClick={() => setOpen3(!open3)} aria-controls="example-collapse-text" aria-expanded={open3}/>
                  </p>
                  <Collapse in={open3}>
                    <div id="example-collapse-text">
                      <span><img src={whats} className={styles["icono"]}/></span><span><img src={uber} className={styles["icono"]}/>
                      </span><span><img src={twit} className={styles["icono"]}/></span><span><img src={insta} className={styles["icono"]}/></span>
                      <span><img src={face} className={styles["icono"]}/></span><span><img src={waze} className={styles["icono"]}/></span>
                      <span><img src={pint} className={styles["icono"]}/></span>
                    </div>
                  </Collapse>  
                  <p className={styles["reduceTexto"]}><img src={check}/><span  className={styles["textos"]}> Aplicaciones para streaming</span>
                    <img src={flecha} className={styles["flecha"]} onClick={() => setOpen4(!open4)} aria-controls="example-collapse-text" aria-expanded={open4}/>
                  </p>
                  <Collapse in={open4}>
                    <div id="example-collapse-text">
                    <span><img src={go} className={styles["icono"]}/></span><span><img src={youtube} className={styles["icono"]}/>
                      </span><span><img src={tik} className={styles["icono"]}/></span>
                    </div>
                  </Collapse>  


        <p className={styles["subtitlegris"]}>
          <br/>
        <Form>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Quiero domiciliar mi pago"
        />

        </Form>
        </p>

        <p><span  className={styles["textos2"]}>Recibe tu beneficio al domiciliar el pago a tu
Tarjeta de Crédito o Débito.</span></p>


        <Button className={styles["botonazul"]}>Cambiar mi plan</Button>{' '}
      </Card.Body>
    </Card>

    </Col>


    <Col md={4}>

    <Card className={styles["cuadro"]}>
      <Card.Body>
        <p className={styles["paquetegb"]}>Navega con <span className={styles["paquetegbbold"]}>23 GB</span></p>
        <span className={styles["paqueteprecio"]}>$599</span> <span className={styles["paquetemes"]}>/ mes</span>
        <hr/>
        <p className={styles["subtitlegris"]}>Qué incluye</p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos incluidos 4 GB</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos promocionales 4 GB</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos adicionales 5 GB</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> Datos para streaming 3 GB</span></p>
        <p className={styles["reduceTexto"]}><img src={check}/><span  className={styles["textos"]}> Redes Sociales</span>
                    <img src={flecha} className={styles["flecha"]} onClick={() => setOpen3(!open3)} aria-controls="example-collapse-text" aria-expanded={open3}/>
                  </p>
                  <Collapse in={open3}>
                    <div id="example-collapse-text">
                      <span><img src={whats} className={styles["icono"]}/></span><span><img src={uber} className={styles["icono"]}/>
                      </span><span><img src={twit} className={styles["icono"]}/></span><span><img src={insta} className={styles["icono"]}/></span>
                      <span><img src={face} className={styles["icono"]}/></span><span><img src={waze} className={styles["icono"]}/></span>
                      <span><img src={pint} className={styles["icono"]}/></span>
                    </div>
                  </Collapse>  
                  <p className={styles["reduceTexto"]}><img src={check}/><span  className={styles["textos"]}> Aplicaciones para streaming</span>
                    <img src={flecha} className={styles["flecha"]} onClick={() => setOpen4(!open4)} aria-controls="example-collapse-text" aria-expanded={open4}/>
                  </p>
                  <Collapse in={open4}>
                    <div id="example-collapse-text">
                    <span><img src={go} className={styles["icono"]}/></span><span><img src={youtube} className={styles["icono"]}/>
                      </span><span><img src={tik} className={styles["icono"]}/></span>
                    </div>
                  </Collapse>  

        <p className={styles["subtitlegris"]}>
          <br/>
        <Form>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Quiero domiciliar mi pago"
        />

        </Form>
        </p>

        <p><span  className={styles["textos2"]}>Recibe tu beneficio al domiciliar el pago a tu
Tarjeta de Crédito o Débito.</span></p>


        <Button className={styles["botonazul"]}>Cambiar mi plan</Button>{' '}
      </Card.Body>
    </Card>

    </Col>

    


    

    
    </Row>


      </div>



      {/********************
      Seccion para celulares  
      **********************/}

      <div id="small" className="d-lg-none d-xl-none">
        <Container className={styles["contenedorCabeceraSmall"]} >
          <p className={styles["spectrumSmall"]}><span>Conoce los planes Sky</span></p>
          <p className={styles["spectrum2Small"]}><span>Celular que tenemos </span></p>
          <p className={styles["spectrum3Small"]}><span>para ti</span></p>
          <p className={styles["titleSmall"]}>Selecciona el plan que mejor se ajuste a tus necesidades.</p>
        </Container>

        <Container className={styles["contenedorSmall"]}>
          <Row >

          <Col  xs={12}>
              <Card className={styles["cuadroSmall"]}>
                <Card.Body>
                  <p className={styles["paquetegbSmall"]}>Navega con <span className={styles["paquetegbboldSmall"]}><b>16 GB</b></span></p>
                  <span className={styles["paqueteprecioSmall"]}>$569</span> <span className={styles["paquetemesSmall"]}>/ mes</span>
                  <hr/>
                  <p className={styles["subtitlegrisSmall"]}><b>Qué incluye</b></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos incluidos 4 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos promocionales 4 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos adicionales 5 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos para streaming 3 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Redes Sociales</span>
                    <img src={flecha} className={styles["flechaSmall"]} onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}/>
                  </p>
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                      <span><img src={whats} className={styles["iconoSmall"]}/></span><span><img src={uber} className={styles["iconoSmall"]}/>
                      </span><span><img src={twit} className={styles["iconoSmall"]}/></span><span><img src={insta} className={styles["iconoSmall"]}/></span>
                      <span><img src={face} className={styles["iconoSmall"]}/></span><span><img src={waze} className={styles["iconoSmall"]}/></span>
                      <span><img src={pint} className={styles["iconoSmall"]}/></span>
                    </div>
                  </Collapse>  
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Aplicaciones para streaming</span>
                    <img src={flecha} className={styles["flechaSmall"]} onClick={() => setOpen2(!open2)} aria-controls="example-collapse-text" aria-expanded={open2}/>
                  </p>
                  <Collapse in={open2}>
                    <div id="example-collapse-text">
                    <span><img src={go} className={styles["iconoSmall"]}/></span><span><img src={youtube} className={styles["iconoSmall"]}/>
                      </span><span><img src={tik} className={styles["iconoSmall"]}/></span>
                    </div>
                  </Collapse>  

                  <p className={styles["subtitlegrisSmall"]}>
                  <br/>
                  <Form>
                    <Form.Check 
                      type="switch"
                      id="custom-switch"
                      label="Quiero domiciliar mi pago"
                    />
                  </Form>
                  </p>
                  <p className={styles["textos2Small"]}><span >Recibe tu beneficio al domiciliar el pago a tu
                    Tarjeta de Crédito o Débito.</span></p>
                  <Button className={styles["botonazulSmall"]}>Cambiar mi plan</Button>
               </Card.Body>
              </Card>
            </Col>

            <Col  xs={12}>
              <Card className={styles["cuadroSmall"]}>
                <Card.Body>
                <p className={styles["paquetegbSmall"]}>Navega con <span className={styles["paquetegbboldSmall"]}><b>16 GB</b></span></p>
                  <span className={styles["paqueteprecioSmall"]}>$569</span> <span className={styles["paquetemesSmall"]}>/ mes</span>
                  <hr/>
                  <p className={styles["subtitlegrisSmall"]}><b>Qué incluye</b></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos incluidos 4 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos promocionales 4 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos adicionales 5 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos para streaming 3 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Redes Sociales</span>
                    <img src={flecha} className={styles["flechaSmall"]} onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}/>
                  </p>
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                      <span><img src={whats} className={styles["iconoSmall"]}/></span><span><img src={uber} className={styles["iconoSmall"]}/>
                      </span><span><img src={twit} className={styles["iconoSmall"]}/></span><span><img src={insta} className={styles["iconoSmall"]}/></span>
                      <span><img src={face} className={styles["iconoSmall"]}/></span><span><img src={waze} className={styles["iconoSmall"]}/></span>
                      <span><img src={pint} className={styles["iconoSmall"]}/></span>
                    </div>
                  </Collapse>  
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Aplicaciones para streaming</span>
                    <img src={flecha} className={styles["flechaSmall"]} onClick={() => setOpen2(!open2)} aria-controls="example-collapse-text" aria-expanded={open2}/>
                  </p>
                  <Collapse in={open2}>
                    <div id="example-collapse-text">
                    <span><img src={go} className={styles["iconoSmall"]}/></span><span><img src={youtube} className={styles["iconoSmall"]}/>
                      </span><span><img src={tik} className={styles["iconoSmall"]}/></span>
                    </div>
                  </Collapse>  

                  <p className={styles["subtitlegrisSmall"]}>
                  <br/>
                  <Form>
                    <Form.Check 
                      type="switch"
                      id="custom-switch"
                      label="Quiero domiciliar mi pago"
                    />
                  </Form>
                  </p>
                  <p className={styles["textos2Small"]}><span >Recibe tu beneficio al domiciliar el pago a tu
                    Tarjeta de Crédito o Débito.</span></p>
                    <Button className={styles["botonazulSmall"]}>Cambiar mi plan</Button>
               </Card.Body>
              </Card>
            </Col>

            <Col  xs={12}>
              <Card className={styles["cuadroSmall"]}>
                <Card.Body>
                <p className={styles["paquetegbSmall"]}>Navega con <span className={styles["paquetegbboldSmall"]}><b>16 GB</b></span></p>
                  <span className={styles["paqueteprecioSmall"]}>$569</span> <span className={styles["paquetemesSmall"]}>/ mes</span>
                  <hr/>
                  <p className={styles["subtitlegrisSmall"]}><b>Qué incluye</b></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos incluidos 4 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos promocionales 4 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos adicionales 5 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Datos para streaming 3 GB</span></p>
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Redes Sociales</span>
                    <img src={flecha} className={styles["flechaSmall"]} onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}/>
                  </p>
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                      <span><img src={whats} className={styles["iconoSmall"]}/></span><span><img src={uber} className={styles["iconoSmall"]}/>
                      </span><span><img src={twit} className={styles["iconoSmall"]}/></span><span><img src={insta} className={styles["iconoSmall"]}/></span>
                      <span><img src={face} className={styles["iconoSmall"]}/></span><span><img src={waze} className={styles["iconoSmall"]}/></span>
                      <span><img src={pint} className={styles["iconoSmall"]}/></span>
                    </div>
                  </Collapse>  
                  <p className={styles["reduceTextoSmall"]}><img src={check}/><span  className={styles["textosSmall"]}> Aplicaciones para streaming</span>
                    <img src={flecha} className={styles["flechaSmall"]} onClick={() => setOpen2(!open2)} aria-controls="example-collapse-text" aria-expanded={open2}/>
                  </p>
                  <Collapse in={open2}>
                    <div id="example-collapse-text">
                    <span><img src={go} className={styles["iconoSmall"]}/></span><span><img src={youtube} className={styles["iconoSmall"]}/>
                      </span><span><img src={tik} className={styles["iconoSmall"]}/></span>
                    </div>
                  </Collapse>  

                  <p className={styles["subtitlegrisSmall"]}>
                  <br/>
                  <Form>
                    <Form.Check 
                      type="switch"
                      id="custom-switch"
                      label="Quiero domiciliar mi pago"
                    />
                  </Form>
                  </p>
                  <p className={styles["textos2Small"]}><span >Recibe tu beneficio al domiciliar el pago a tu
                    Tarjeta de Crédito o Débito.</span></p>
                    <Button className={styles["botonazulSmall"]}>Cambiar mi plan</Button>
               </Card.Body>
              </Card>
            </Col>

          </Row>     
        </Container>
      </div>
    
    </>
  )
}