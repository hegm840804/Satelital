export type EncabezadoRespuestaInterna = {
  EBMHeaderResponse: {
    ErrorTecnico: {
      code: string;
      summary: string;
      detail: string;
      Sistema: string;
    };
    ErrorNegocio: {
      Estado: string;
      CodigoError: string;
      DescripcionError: string;
    };
  };
};
