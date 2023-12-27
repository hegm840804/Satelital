import * as aesjs from "aes-js";
import { Buffer } from "buffer";

const { REACT_APP_ENCRYPT_KEY, REACT_APP_INIT_VALUE } = process.env;

const keyV = REACT_APP_ENCRYPT_KEY;
const initv = REACT_APP_INIT_VALUE;

const encryptText = (code: string) => {
  const keyBytes = aesjs.utils.utf8.toBytes(keyV!);
  const ivBytes = aesjs.utils.utf8.toBytes(initv!);

  const aesCbc = new aesjs.ModeOfOperation.cbc(keyBytes, ivBytes);
  let textBytes = aesjs.utils.utf8.toBytes(code);

  if (textBytes.length % 8 !== 0) {
    const padded = new Uint8Array(
      textBytes.length + 8 - (textBytes.length % 8)
    );
    padded.set(textBytes);
    textBytes = padded;
  }

  const padded = aesjs.padding.pkcs7.pad(textBytes);
  const encryptedBytes = aesCbc.encrypt(padded);

  let respuesta = Buffer.from(encryptedBytes).toString('base64');
  /**
   * Se deshabilita el remplado del símbolo + puesto que está generando errores
   * al momento de cambiar la contraseña.
   * 
   * 
   * código deshabilitado:
   * respuesta = respuesta.replace('+', '');
   */

  respuesta = respuesta.replace('/', '~');
  respuesta = respuesta.replace('=', '*');
  return respuesta;
};

/**
 * Descripta base64 a arreglo de bytes
 *
 * @param base64 Base64.
 * @returns arreglo de bytes
 */
export const base64ToArrayBuffer = (base64: string) => {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);

  return bytes.map((byte, i) => binaryString.charCodeAt(i));
};

/**
 * Decripta el base64 a string.
 *
 * @param code código a decodificar.
 * @returns Resultado
 */
export const decryptBase64ArrayByteToString = (code: any) => {
  const keyBytes = aesjs.utils.utf8.toBytes(keyV!);
  const ivBytes = aesjs.utils.utf8.toBytes(initv!);

  //Sustituye los caracteres
  code = code.replace(/[_]/g, "+");
  code = code.replace(/~/g, "/");
  code = code.replace("*", "=");

  //Convierte a byte
  let respuesta = Buffer.from(code, "base64").toString("binary");
  let textBytes = new Uint8Array(new ArrayBuffer(respuesta.length)); //aesjs.utils.utf8.toBytes(code);
  textBytes = textBytes.map((byte, i) => respuesta.charCodeAt(i));
  //Decodifica con clave
  const aesCbc = new aesjs.ModeOfOperation.cbc(keyBytes, ivBytes);
  const encryptedBytes = aesCbc.decrypt(textBytes);
  const newencryptedBytes = cleanValue(encryptedBytes);
  const result: string = new TextDecoder().decode(newencryptedBytes);
  return result;
};

const countValue = (param: Uint8Array) => {
  var contador: number = 0;

  for (let i = 0; i < param.length; i++) {
    if (param[i] !== 0 && param[i] !== 16) {
      contador++;
    }
  }

  return contador;
};

const cleanValue = (param: Uint8Array) => {
  var tmp = new Uint8Array(countValue(param));
  for (let i = 0; i < param.length; i++) {
    if (param[i] != 0 && param[i] != 16) {
      tmp[i] = param[i];
    }
  }

  return tmp;
};

export default encryptText;
