import styles from "./BannerPPEDestacado.module.css";
import banner from '../../../assets/img/BannerTemporadasPPE/BannerTemporadasPPE.png';
import Button from 'react-bootstrap/Button';


export const BannerPPEDestacado = () => {



  return (
    <>
      <div id={styles["bannerDestacado"]} className={styles.contenedor}>
            <img src={banner} className={styles.imagen}/>
            <div  className={styles.titulo}><h1><strong>Pago por evento destacado</strong></h1></div>
            <div  className={styles.info}><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex </p></div>
            <div><Button className={styles.boton}><strong>Contratar</strong></Button></div>
        </div>
    </>
  )
}