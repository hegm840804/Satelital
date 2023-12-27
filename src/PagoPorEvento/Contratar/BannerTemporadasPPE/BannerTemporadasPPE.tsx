import styles from "./BannerTemporadasPPE.module.css";
import banner from "../../../assets/img/BannerTemporadasPPE/pago_evento_inicio_mobile.png";
import bannerSmall from "../../../assets/img/BannerTemporadasPPE/pago_evento_inicio.png";
import { Container } from "react-bootstrap";

export const BannerTemporadasPPE = () => {
  return (
    <>
      <Container
        id="big"
        className={styles["contenedor"] + " d-none d-xl-block d-lg-block"}
        fluid
      >
        <img src={banner} className={styles.imagen} />
      </Container>

      <Container className={styles.contenedorSmall}>
        <div
          id="small"
          className={styles["contenedor"] + " d-lg-none d-xl-none"}
        >
          <img src={banner} className={styles.imagen} />
        </div>
      </Container>
    </>
  );
};
