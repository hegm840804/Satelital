import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';


import styles from './FAQCards.module.css';
import icono from '../../assets/img/Iconos/Vector.png';

const FAQCards = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <>
    <div className={styles.contenedor}>
        <Row>
            <Col sm={12} xxl={6} className={styles.separacionCard}>
                <Card>
                    <Card.Body >
                        <h2 className={styles.tituloIzq}>¿Tienes más preguntas?</h2>
                        <div className={styles.centrarBoton}>
                            <Button className={styles.boton} onClick={handleShow}>Ver más preguntas frecuentes
                                <img src={icono} className={styles.icono}/></Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        
            <Col sm={12} xxl={6}>
                <Card>
                    <Card.Body >
                        <h2 className={styles.titulo}>¿No encontraste lo que buscabas?</h2>
                        <p className={styles.info}>Habla con un asesor.</p>
                        <div className={styles.centrarBoton}>
                            <Button href="/chat" className={styles.boton}>Ir al chat en línea</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>                
        </Row>
    </div>


    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton style={{borderBottom: 'none'}}>
      </Modal.Header>
        <Modal.Body className={styles.contenedorModal}>
          <div className={styles.info}>
              <h2 className={styles.tituloModal}>¿Estas seguro que quieres abandonar esta página?</h2>
              <p className={styles.descripcion}>Se abrirá una nueva ventana de preguntas frecuentes Sky. Podrás continuar tu navegación aquí más tarde.</p>
            <Stack>
            <Button href="https://skyvideo.custhelp.com/app/answers/list/origen/4" className={styles.botonModal} >
              <strong>Continuar a Preguntas Frecuentes</strong>
            </Button>
            <Button className={styles.botonCancelarModal} onClick={handleClose}>
              <strong>Cancelar</strong>
            </Button>
            </Stack>
          </div>  
        </Modal.Body>
    </Modal>
</>
  )
}

export default FAQCards