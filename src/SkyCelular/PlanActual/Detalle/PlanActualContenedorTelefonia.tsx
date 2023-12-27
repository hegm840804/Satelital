import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../PlanActual.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import ProgressBar from "react-bootstrap/ProgressBar";
import PlanActualContenedorTelefoniaCard from "./PlanActualContenedorTelefoniaCard";

const PlanActualContenedorTelefonia = (props: any) => {
  const {
    banderaTelefoniaInfo,
    arregloLocalCelularService,
    bolsaPrincipal,
    telefono,
  }: any = {
    ...props,
  };

  const builtTabTitles = (param: any[]) => {
    var retorno: any[] = [];
    for (let i = 0; i < param.length; i++) {
      retorno.push(<Tab>{param[i].MSISDN}</Tab>);
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
              <PlanActualContenedorTelefoniaCard
                num_telefono={param[i].MSISDN}
              />
            </Card.Body>
          </Card>
        </TabPanel>
      );
    }

    return retorno;
  };

  if (banderaTelefoniaInfo) {
    return (
      <>
        <Container className={styles["contenedorCard"]} fluid>
          <Card id={styles["lineaadicional"]} className={styles.contenedor}>
            <Card.Body>
              <Card.Title>
                <div id="big" className="d-none d-xl-block d-lg-block ">
                  <p>Móvil</p>
                </div>
                <div id="small" className="d-lg-none d-xl-none">
                  <p>Móvil</p>
                </div>
              </Card.Title>

              <Card.Text>
                <div id="big" className="d-none d-xl-block d-lg-block ">
                  <Tabs>
                    <TabList>
                      {builtTabTitles(arregloLocalCelularService)}
                    </TabList>

                    {builtTabDEtails(arregloLocalCelularService)}
                  </Tabs>
                </div>

                <div id="small" className="d-lg-none d-xl-none">
                  <Tabs>
                    <TabList>
                      {builtTabTitles(arregloLocalCelularService)}
                    </TabList>

                    {builtTabDEtails(arregloLocalCelularService)}
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
                <p>No Hay planes de Telefonía Contratados</p>
              </div>

              <div id="small" className="d-lg-none d-xl-none">
                <p>No Hay planes de Telefonía Contratados</p>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};

export default PlanActualContenedorTelefonia;
