import styles from "./PaquetesSkyPlus.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import check from "../../src/assets/img/Iconos/Check.png";

const PaquetesSkyPlus = () => {
  return (
    <>

    <div id="big" className="d-none d-xl-block d-lg-block ">
    <div className={styles["centrar"]}>

    <Row>
    <Col md={4}>

    <Card className={styles["cuadro"]}>
      <Card.Body>
        <p className={styles["paquetegb"]}>Sky + básico</p>
        <span className={styles["paqueteprecio"]}>$599</span> <span className={styles["paquetemes"]}>/ mes</span>
        <hr/>
        <p><span  className={styles["textos2"]}>¿Cuántos equipos necesitas?</span> 
        <span className={styles["boton1"]}><Button className={styles["boton1azul"]}>1</Button>{' '}</span>
        <span className={styles["boton2"]}><Button className={styles["boton1gris"]}>2</Button>{' '}</span>
        
        
        
        
        </p>
        <span className={styles["subtitlemorado"]}>Qué incluye</span>

        
        <p><img src={check}/><span  className={styles["textosbold"]}> Sky sports </span></p>
        <p><img src={check}/><span  className={styles["textos"]}> 1 dispositivo en app móvil</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> 1 equipo</span></p>

      </Card.Body>
    </Card>

    </Col>


    

    <Col md={4} className={styles["left"]}>

    <Card className={styles["cuadro"]}>
      <Card.Body>
        <p className={styles["paquetegb"]}>Sky + premium</p>
        <span className={styles["paqueteprecio"]}>$649</span> <span className={styles["paquetemes"]}>/ mes</span>
        <hr/>
        <p><span  className={styles["textos2"]}>¿Cuántos equipos necesitas?</span> 
        <span className={styles["boton1"]}><Button className={styles["boton1azul"]}>1</Button>{' '}</span>
        <span className={styles["boton2"]}><Button className={styles["boton1gris"]}>2</Button>{' '}</span>
        
        
        
        
        </p>
        <span className={styles["subtitlemorado"]}>Qué incluye</span>

        
        <p><img src={check}/><span  className={styles["textosbold"]}> Sky sports </span></p>
        <p><img src={check}/><span  className={styles["textos"]}> 1 dispositivo en app móvil</span></p>
        <p><img src={check}/><span  className={styles["textos"]}> 1 equipo</span></p>

      </Card.Body>
    </Card>

    </Col>
  
    
    </Row>
    </div>


      </div>

      {/***************************
      Inicia seccion para celulares
      *****************************/}

      <div id="small" className="d-lg-none d-xl-none">
        <Container className={styles["contenedorSmall"]}>
          <Card className={styles["cardSmall"]}>
            <Card.Body>
              <p className={styles["paquetegb"]}>Sky + básico</p>
              <p><span  className={styles["textos2"]}><b>¿Cuántos equipos necesitas?</b></span> 
                <span className={styles["boton1"]}><Button className={styles["boton1azul"]}>1</Button></span>
                <span className={styles["boton2"]}><Button className={styles["boton1gris"]}>2</Button></span>
              </p>
              <span className={styles["paqueteprecio"]}>$599</span> <span className={styles["paquetemes"]}>/ mes</span>
              <hr/>

              <span className={styles["subtitlemorado"]}>Qué incluye</span>
    
              <p style={{marginBottom:'0px'}}><img src={check}/><span  className={styles["textosbold"]}><b> Sky sports </b></span></p>
              <p style={{marginBottom:'0px'}}><img src={check}/><span  className={styles["textos"]}> 1 dispositivo en app móvil</span></p>
              <p style={{marginBottom:'0px'}}><img src={check}/><span  className={styles["textos"]}> 1 equipo</span></p>
            </Card.Body>
          </Card>

          <Card className={styles["cardSmall"]}>
            <Card.Body>
              <p className={styles["paquetegb"]}>Sky + básico</p>
              <p><span  className={styles["textos2"]}><b>¿Cuántos equipos necesitas?</b></span> 
                <span className={styles["boton1"]}><Button className={styles["boton1azul"]}>1</Button></span>
                <span className={styles["boton2"]}><Button className={styles["boton1gris"]}>2</Button></span>
              </p>
              <span className={styles["paqueteprecio"]}>$599</span> <span className={styles["paquetemes"]}>/ mes</span>
              <hr/>

              <span className={styles["subtitlemorado"]}>Qué incluye</span>
    
              <p style={{marginBottom:'0px'}}><img src={check}/><span  className={styles["textosbold"]}><b> Sky sports </b></span></p>
              <p style={{marginBottom:'0px'}}><img src={check}/><span  className={styles["textos"]}> 1 dispositivo en app móvil</span></p>
              <p style={{marginBottom:'0px'}}><img src={check}/><span  className={styles["textos"]}> 1 equipo</span></p>
            </Card.Body>
          </Card>

        </Container>     
      </div>

    </>
  )
}

export default PaquetesSkyPlus