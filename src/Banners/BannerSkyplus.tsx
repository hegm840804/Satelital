import styles from "./BannerSkyplus.module.css";
import banner from "../assets/img/Banners/contrata_skymas.jpg";
import bannerSmall from "../assets/img/Banners/contrata_skymas-mobile.jpg";
import { Container } from "react-bootstrap";

export const BannerSkyPlus = () => {
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
          <img src={bannerSmall} className={styles.imagen} />
        </div>
      </Container>
    </>
  );
};
