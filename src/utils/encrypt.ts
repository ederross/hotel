import { AES } from 'crypto-js';
import crypto from 'crypto';

const ENC_KEY = 'bf3c199c2470cb477d907b1e0917c17b'; // set random encryption key
const IV = '5183666c72eec9e4';
const publicKey = `
  -----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC65FzNvUWXwJPUvyadJwqVEztz
  zOpnMIRZh5raCS+Ou64kunV67z5U4kQS3NyYjsaQ6m5auew+rx7FxeQ6nVAoIsJn
  50OEmuPzp8CAJTQ0uW+QQKms1+03gw5Lgmlj7F8go+Rt3ieXyNHOK8O43BZ5OjjV
  irV9jgW+/H1KoVtKmQIDAQAB
  -----END PUBLIC KEY-----
  `;

export const encrypt = (val: string) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

export const OpenSSL_encrypt_hospeda = (data: string) => {
  try {
    // var encrypt = new JSEncrypt();
    const str = data.split(' ').join('');

    // ------------------------------------------------------
    const ciphertext = AES.encrypt(str, publicKey).toString();
    return `${ciphertext}`;

    // encrypt.setPublicKey(publicKey);

    // var encrypted: string = encrypt.encrypt(data);
    // var emBase64 = Buffer.from(encrypted, 'base64');

    // return `${emBase64}`;
  } catch (error) {
    console.log('FALHA NA CRIPTOGRAFIA DO CARTÃO');
    return data;
  }
};

// 5278 4702 9097 6066
// validade: 06/2024
// CVV: 232
