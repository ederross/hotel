import JSEncrypt from 'jsencrypt';

const publicKey = `
  -----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC65FzNvUWXwJPUvyadJwqVEztz
  zOpnMIRZh5raCS+Ou64kunV67z5U4kQS3NyYjsaQ6m5auew+rx7FxeQ6nVAoIsJn
  50OEmuPzp8CAJTQ0uW+QQKms1+03gw5Lgmlj7F8go+Rt3ieXyNHOK8O43BZ5OjjV
  irV9jgW+/H1KoVtKmQIDAQAB
  -----END PUBLIC KEY-----
  `;

export const OpenSSL_encrypt_hospeda = (data: string) => {
  try {
    const str = data.split(' ').join('');
    var crypt = new JSEncrypt();
    crypt.setKey(publicKey);
    var ciphertext = crypt.encrypt(str);
    return `${ciphertext}`;
  } catch (error) {
    console.log('FALHA NA CRIPTOGRAFIA DO CARTÃO', error);
    return data;
  }
};

// 5278470290976066
// validade: 06/2024
// CVV: 232