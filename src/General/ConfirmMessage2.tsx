import styles from "./ConfirmMessage2.module.css";
import { Alert, Row, Col} from "react-bootstrap";
import success from '../../src/assets/img/General/success.png';
import error from '../../src/assets/img/General/error.png';

const ConfirmMessage2 = ({ status, message, showAlert,paddingLeft }:any) => {

    return (
        <Alert show={showAlert} key={"confirm"} variant={"success"} className={(status==="OK" ? styles["alertSuccess"] : styles["alertError"]) +" "+ styles[paddingLeft]}>
            <Row>
                <Col className={styles["alertContent"]}>
                    <img src={status==="OK" ? success : error} className={styles["icon"]}/><span>{message}</span>
                </Col>
            </Row>
        </Alert>
    );
};

export default ConfirmMessage2;