import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../PlanActual.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProgressBar from "react-bootstrap/ProgressBar";

const PlanActualContenedorInternet = (props: any) => {
  const { banderaInternetInfo, arregloLocalInternetService }: any = {
    ...props,
  };

  const builtTabTitles = (param: any[]) => {
    var retorno: any[] = [];
    for (let i = 0; i < param.length; i++) {
      retorno.push(<Tab>{param[i].Name}</Tab>);
    }

    return retorno;
  };

  const builtTabDEtails = (param: any[]) => {
    var retorno: any[] = [];
    for (let i = 0; i < param.length; i++) {
      retorno.push(
        <TabPanel>
          <Card className={styles["cuadro"]}>
            <Card.Body style={{ padding: "0px" }}>
              <p className={styles["textodatos"]}>{param[i].Family}</p>
              <p className={styles["textodatosgb"]}>{param[i].Name}</p>
              <p className={styles["textodatosconsumidos"]}>
                ${param[i].Price}
              </p>
              <p className={styles["textodatosconsumidos"]}>
                {param[i].Status}
              </p>
              <ProgressBar className={styles["barra"]} now={0} />
            </Card.Body>
          </Card>
        </TabPanel>
      );
    }

    return retorno;
  };

  if (banderaInternetInfo) {
    return (
      <>
        <Container className={styles["contenedorCard"]} fluid>
          <Card id={styles["lineaadicional"]} className={styles.contenedor}>
            <Card.Body>
              <Card.Title>
                <div id="big" className="d-none d-xl-block d-lg-block ">
                  <p>Internet</p>
                </div>
                <div id="small" className="d-lg-none d-xl-none">
                  <p>Internet</p>
                </div>
              </Card.Title>

              <Card.Text>
                <div id="big" className="d-none d-xl-block d-lg-block ">
                  <Tabs>
                    <TabList>
                      {builtTabTitles(arregloLocalInternetService)}
                    </TabList>
                    {builtTabDEtails(arregloLocalInternetService)}
                  </Tabs>
                </div>

                <div id="small" className="d-lg-none d-xl-none">
                  <Tabs>
                    <TabList>
                      {builtTabTitles(arregloLocalInternetService)}
                    </TabList>
                    {builtTabDEtails(arregloLocalInternetService)}
                  </Tabs>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  } else {
    return (
      <Container className={styles["contenedorCard"]} fluid>
        <Card id={styles["lineaadicional"]} className={styles.contenedor}>
          <Card.Body>


            <Card.Text>
              <div id="big" className="d-none d-xl-block d-lg-block ">
                <p>No Hay planes de internet Contratados</p>
              </div>

              <div id="small" className="d-lg-none d-xl-none">
                <p>No Hay planes de internet Contratados</p>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>







    );
  }
};

export default PlanActualContenedorInternet;
