import styles from "../../Cartelera/CarteleraCarta/starPlus.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card1 from '../../assets/img/Carta/Star.png';



const Star = () => {
    
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
      <span className={styles["tituloazul"]}>Combo+</span> <span className={styles.tituloazul2}>$269 </span><span className={styles.tituloazul3}>/mes</span>
      <Row className={styles["texto"]}>
      ·Disfruta entretenimiento para todos con Disney+ y Star+.<br/>
      ·Disney+: Disfruta de las mejores historias del mundo de Disney, Pixar, Marvel, Star Wars, National Geographic y más. Todo en un mismo lugar. <br/>
      ·Star+: Todas las temporadas de tus series favoritas, estrenos de cine, clásicos y sagas, comedias animadas, productos originales y los deportes en vivo de ESPN. Encuentra más de lo que te gusta.

      </Row>

      <div className={styles["centrar"]}>
      <Button variant="primary"  className={styles["botonazul"]}>Contratar</Button>{' '}
        </div>
       </Container>
      </>
    );
  };
  
export default Star;
  