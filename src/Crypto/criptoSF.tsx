import CryptoES from 'crypto-es'

const strLlaveSF = 'remRUEur8cPkWGCoHv9a3DAS27Kur8xP'
const strVectorSF = 'aesEncryptionKey'
const strLlaveSky = 'Pr0c3s0R3g1str0S'
const strVectorSky = 'R3g1str0Pr0c3s0S'


export function Empaquetar(texto: string, destino: boolean) {
    try {
        const key = CryptoES.enc.Utf8.parse(strLlaveSky)
        const iv = CryptoES.enc.Utf8.parse(strVectorSky)

        var strCifrado = CryptoES.AES.encrypt(texto, key, { iv: iv }).toString()

        
            strCifrado = strCifrado.replaceAll('+', '_')
            strCifrado = strCifrado.replaceAll('/', '~')
            strCifrado = strCifrado.replaceAll('=', '*')
    

        return strCifrado

    } catch (e) {
        console.error(e)
        return ''
    }
}

export function Desempaquetar(texto: string, destino: boolean) {
    try {
        const key = CryptoES.enc.Utf8.parse(strLlaveSky)
        const iv = CryptoES.enc.Utf8.parse(strVectorSky)

        var strCifrado = texto
        
            strCifrado = strCifrado.replaceAll('_', '+')
            strCifrado = strCifrado.replaceAll('~', '/')
            strCifrado = strCifrado.replaceAll('*', '=')
        

        let descifrado = CryptoES.AES.decrypt(strCifrado, key, { iv: iv }).toString(CryptoES.enc.Utf8)
        return descifrado
    } catch (e) {
        console.error(e)
        return ''
    }
}
