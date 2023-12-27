import { ParametrosWSBase, DestinoConexion } from "../ParametrosWSBase";
import { EncabezadoRespuestaInterna } from "../EncabezadoRespuestaInterna";

export function GwGenerarURLBilleteraEBF_Parametros(datos: any) {
  var par: ParametrosWSBase = {
    nombreProceso: "GwGenerarURLBilleteraEBF",
    rutaEndPoint: "/GwGenerarURLBilleteraEBF",
    sistemaOrigen: "SEL",
    AGREGAR_ENCABEZADO: true,
    DESTINO_SERVICIO: DestinoConexion.Backend,
    parametros: { ...datos },
  };

  return par;
}

export interface GwGenerarURLBilleteraEBF_Entrada {
  Email: string;
  Estatus: string;
  Servicio: string;
  Operacion: string;
  Origen: string;
  Nombre: string;
  Paterno: string;
  Materno: string;
  Calle: string;
  NumExt: string;
  NumInt: string;
  Colonia: string;
  PaisISO: string;
  Telefono: string;
  Ciudad: string;
  Estado: string;
  Municipio: string;
  CodigoPostal: string;
  Vigencia: string;
  Moneda: string;
  Cuenta: string;
  IdProspecto: string;
  NumeroContrato: string;
  UrlBTGS: string;
  Monto: string;
  IdUnicoPago: string;
  Productos: Productos;
}

export function builtInputVarGwGenerarURLBilleteraEBFEntrada(
  l_Email: string,
  l_Estatus: string,
  l_Servicio: string,
  l_Operacion: string,
  l_Origen: string,
  l_Nombre: string,
  l_Paterno: string,
  l_Materno: string,
  l_Calle: string,
  l_NumExt: string,
  l_NumInt: string,
  l_Colonia: string,
  l_PaisISO: string,
  l_Telefono: string,
  l_Ciudad: string,
  l_Estado: string,
  l_Municipio: string,
  l_CodigoPostal: string,
  l_Vigencia: string,
  l_Moneda: string,
  l_Cuenta: string,
  l_IdProspecto: string,
  l_NumeroContrato: string,
  l_UrlBTGS: string,
  l_Monto: string,
  l_IdUnicoPago: string,
  l_Productos: Productos
) {
  var retorno: GwGenerarURLBilleteraEBF_Entrada = {
    Email: l_Email,
    Estatus: l_Estatus,
    Servicio: l_Servicio,
    Operacion: l_Operacion,
    Origen: l_Origen,
    Nombre: l_Nombre,
    Paterno: l_Paterno,
    Materno: l_Materno,
    Calle: l_Calle,
    NumExt: l_NumExt,
    NumInt: l_NumInt,
    Colonia: l_Colonia,
    PaisISO: l_PaisISO,
    Telefono: l_Telefono,
    Ciudad: l_Ciudad,
    Estado: l_Estado,
    Municipio: l_Municipio,
    CodigoPostal: l_CodigoPostal,
    Vigencia: l_Vigencia,
    Moneda: l_Moneda,
    Cuenta: l_Cuenta,
    IdProspecto: l_IdProspecto,
    NumeroContrato: l_NumeroContrato,
    UrlBTGS: l_UrlBTGS,
    Monto: l_Monto,
    IdUnicoPago: l_IdUnicoPago,
    Productos: l_Productos,
  };

  return retorno;
}

export interface Productos {
  Producto: Producto[];
}

export function builtInputVarProductos(l_Producto: Producto[]) {
  var retorno: Productos = {
    Producto: l_Producto,
  };

  return retorno;
}

export interface Producto {
  Descripcion: string;
  Precio: string;
  Cantidad: string;
  Promocion: string;
}

export function builtInputVarProducto(
  l_Descripcion: string,
  l_Precio: string,
  l_Cantidad: string,
  l_Promocion: string
) {
  var retorno: Producto = {
    Descripcion: l_Descripcion,
    Precio: l_Precio,
    Cantidad: l_Cantidad,
    Promocion: l_Promocion,
  };

  return retorno;
}

export interface GwGenerarURLBilleteraEBF_Salida {
  URLBilletera: string;
}

export type GwGenerarURLBilleteraEBF_Respuesta = EncabezadoRespuestaInterna &
  GwGenerarURLBilleteraEBF_Salida;
