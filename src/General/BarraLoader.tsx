import styles from "./BarraLoader.module.css";


const BarraLoader = () => {

    return (

            <div className={ styles.progressInfinite}>
                <div className={styles.progressbar}>
                </div>                       
            </div> 

    );
};

export default BarraLoader;

