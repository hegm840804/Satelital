import styles from "./Loading.module.css";
import MoonLoader from "react-spinners/MoonLoader";

const Loading = ({ isLoading }:any) => {


    return (
        <div className={isLoading ? styles["loader"] : styles["none"]}>
            <div  className={isLoading ? styles["loaderp"] : styles["none"]}></div>
        </div>
    );
};

export default Loading;