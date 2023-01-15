import CryptoJS from 'crypto-js';

export function encrypt(text: string) {
  const encrypted = CryptoJS.AES.encrypt(text, process.env.CIPHER_KEY as string);
  return { content: encrypted.toString() };
}
