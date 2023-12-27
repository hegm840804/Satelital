import styles from "../../Cartelera/CarteleraCarta/universalPlus.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card1 from '../../assets/img/Carta/Universal.png';



const Universal = () => {
    
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
      <span className={styles["tituloazul"]}>Universal+</span> <span className={styles.tituloazul2}>$149 </span><span className={styles.tituloazul3}>/mes</span>
      <Row className={styles["texto"]}>
      ·Series y películas originales y exclusivas.<br/>
      ·5 canales Premium con la mejor programación internacional y local para toda la familia. <br/>
      ·Podrás disfrutar de Universal+.
      </Row>

      <div className={styles["centrar"]}>
      <Button variant="primary"  className={styles["botonazul"]}>Contratar</Button>{' '}
        </div>
       </Container>
      </>
    );
  };
  
export default Universal;
  