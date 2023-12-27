import styles from "../../Cartelera/CarteleraCarta/foxPlus.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card1 from '../../assets/img/Carta/Fox.png';



const Fox = () => {
    
    return (
      <>
       <Container className={styles.contenedor} fluid>
       <Row className={styles["headerRow"]}>
        <Col>
          <span className={styles["spectrum"]}>A la carta</span>
          <p className={styles["title"]}>
          Complementa tu entretenimiento con el mejor contenido
          </p>
        </Col>

        <Row>
        <div className={styles["centrar"]}>
        <img src={Card1} className={styles.imagen}/>
        </div>
        </Row>
      </Row>
       </Container>

       <Container className={styles.contenedor} fluid>
      <span className={styles["tituloazul"]}>Fox Sports</span> <span className={styles.tituloazul2}>$119 </span><span className={styles.tituloazul3}>/mes</span>
      <Row className={styles["texto"]}>
      ·Noticias, debates, eventos deportivos y mucho más.
      </Row>

      <div className={styles["centrar"]}>
      <Button variant="primary"  className={styles["botonazul"]}>Contratar</Button>{' '}
        </div>
       </Container>
      </>
    );
  };
  
export default Fox;
  