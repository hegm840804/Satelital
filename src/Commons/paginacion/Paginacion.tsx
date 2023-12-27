import React, { useState, useEffect } from "react";
import styles from "./Paginacion.module.css";
import next from "../../assets/img/Iconos/arrowNext.png";
import prev from "../../assets/img/Iconos/arrowPrev.png";

export const Paginacion = ({
  itemsPorPagina,
  pageActual,
  setPageActual,
  itemsTotal,
}: any) => {
  const numeroPaginas: number[] = [];

  const [maxPaginas, setMaxPaginas] = useState(
    Math.ceil(itemsTotal / itemsPorPagina)
  );

  for (
    let index: number = 1;
    index <= Math.ceil(itemsTotal / itemsPorPagina);
    index++
  ) {
    numeroPaginas.push(index);
  }

  const prevPagina = () => {
    if (pageActual > 1) {
      setPageActual(pageActual - 1);
    }
  };

  const nextPagina = () => {
    if (pageActual <= maxPaginas) {
      setPageActual(pageActual + 1);
    }
  };

  const paginaEspecifica = (n: number) => {
    setPageActual(n);
  };

  return (
    <div className={styles["pagination"]}>
      <a onClick={prevPagina} className={styles["flecha"]}>
        {" "}
        <img src={prev} style={{ width: "70%" }} />
      </a>
      {numeroPaginas.map((noPagina) => (
        <a
          key={noPagina}
          className={styles[noPagina === pageActual ? "active" : ""]}
          onClick={() => paginaEspecifica(noPagina)}
        >
          {noPagina}
        </a>
      ))}
      <a onClick={nextPagina} className={styles["flecha"]}>
        {" "}
        <img src={next} style={{ width: "70%" }} />
      </a>
    </div>
  );
};
