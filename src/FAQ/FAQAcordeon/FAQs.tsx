import React, { useState } from 'react';
import styles from './FAQs.module.css';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import flecha from '../../assets/img/Iconos/flechaAbajo.svg';

const FAQs = () => {

    const [acordeon, setAcordeon] = useState(-1);

  const datos = [
    {pregunta:"¿Cómo me registro en SKY Servicios en Línea? (Aplica para México)?", texto:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"},
    {pregunta:"¿Cómo capturo mis datos fiscales en la página Servicios en Línea SKY? (Aplica para México)?", texto:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"},
    {pregunta:"Solución a fallas en el equipo (Aplica para México)?", texto:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"},
    {pregunta:"¿Cómo puedo ponerme en contacto con ustedes? (Aplica para México)?", texto:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
  ];

  function toggleAcordeon (index:number){
    if (index !== acordeon) {
      setAcordeon(index);
    } else {
      setAcordeon(-1);
    }
    
  };


  return (
    <>
            <Container className={styles.contenedor} fluid>
                 <h1 className={styles["spectrum"]}>
                        <span className="textoSpectrum">Preguntas frecuentes</span>
                 </h1>
                <p className={styles.subtitulo}>Revisa algunas de las preguntas más comunes de nuestros 
                usuarios y sus respuestas, que seguro pueden ayudarte.</p>
            </Container>


            <div style={{marginBottom:'3vw'}}>
              {datos.map((item, index)=>
                  <Container className={styles["containerCollapse"]} fluid>
                      <div className={styles["containerInterno"]}>
                        <div className={acordeon === index?styles["botonCollapseFocus"]:styles["botonCollapse"]} >
                          <span><b>{item.pregunta}</b></span>
                          <span key={index} className={styles["flecha"]} onClick={() => toggleAcordeon(index)}><img src={flecha}   
                            aria-controls="example-collapse-text"
                            aria-expanded={acordeon === index? true: false}
                            className={acordeon === index?styles["rota"]:styles["noRota"]}
                            /></span>
                        </div>
                        <Collapse in={acordeon === index? true: false}>
                          <div id="example-collapse-text">
                          <hr style={{marginTop:'-0.4vw'}}/>
                          <p className={styles["info"]}>{item.texto}</p>
                          </div>
                        </Collapse>

                      </div>
                  </Container>

              )}


            </div>
 

        </>
  )
}

export default FAQs