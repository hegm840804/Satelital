import styles from "./ContrataAhora.module.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';





export const ContrataAhora = () => {



  return (
    <>

    <Row>
    <Col md={11}>

    <Card className={styles["cuadro"]}>
      <Card.Body className={styles["cardBody"]}>
        <h1 className={styles["texto1"]}>Contrata ahora</h1>
        <p className={styles["texto2"]}>Comunícate a nuestro Whatsapp y habla con nuestros asesores para conseguir tu combo de Sky internet</p>
        <Button className={styles["botonblanco"]}><b>Abrir Whatsapp</b></Button>{' '}
    
      </Card.Body>
    </Card>

    </Col>

    
    
    </Row>
    
    </>
  )
}