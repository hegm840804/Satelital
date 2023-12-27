import styles from "./CarouselPPEDestacado.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import imagenCard from '../../../assets/img/CarouselTemporadasPPE/cardPPE.png';


export const CarouselPPEDestacado = () => {


  return (
    <>
    <div className={styles.contenedor}>
      <Card className={styles.card}>
        <Card.Img variant="top" src={imagenCard}/>
        <Card.Body>
          <h3 className={styles.titulo}>Pago por evento</h3>
          <Card.Text className={styles.info}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
            enim ad minim veniam.
          </Card.Text>
          <Button className={styles.boton}><strong>Contratar</strong></Button>
        </Card.Body>
      </Card>
      <Card className={styles.card}>
        <Card.Img variant="top" src={imagenCard}/>
        <Card.Body>
          <h3 className={styles.titulo}>Pago por evento</h3>
          <Card.Text className={styles.info}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
            enim ad minim veniam.
          </Card.Text>
          <Button className={styles.boton}><strong>Contratar</strong></Button>
        </Card.Body>
      </Card>
      <Card className={styles.card}>
        <Card.Img variant="top" src={imagenCard}/>
        <Card.Body>
          <h3 className={styles.titulo}>Pago por evento</h3>
          <Card.Text className={styles.info}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
            enim ad minim veniam.
          </Card.Text>
          <Button className={styles.boton}><strong>Contratar</strong></Button>
        </Card.Body>
      </Card>
    </div>
    </>
  )
}


