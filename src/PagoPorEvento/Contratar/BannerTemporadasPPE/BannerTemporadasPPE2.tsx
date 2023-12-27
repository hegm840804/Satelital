import styles from "./BannerTemporadasPPE.module.css";
import banner from "../../../assets/img/BannerTemporadasPPE/BannerTemporadasPPE2.jpg";
import bannerSmall from "../../../assets/img/BannerTemporadasPPE/BannerSmallTemporadasPPE2.jpg";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


export const BannerTemporadasPPE2 = () => {
  return (
    <>
      <Container
        id="big"
        className={styles["contenedor"] + " d-none d-xl-block d-lg-block"}
        fluid
      >
        <img src={banner} className={styles.imagen} />

         
      </Container>

      <Container className={styles.contenedorSmall} style={{padding:"0"}}>
        <div
          id="small"
          className={styles["contenedor"] + " d-lg-none d-xl-none"}
        >
          <img src={bannerSmall} className={styles.imagen} />
        </div>
        <div id="small" className="d-lg-none d-xl-none">
          
        </div>
      </Container>
    </>
  );
};
