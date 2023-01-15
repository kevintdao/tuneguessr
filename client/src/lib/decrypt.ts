import CryptoJS from 'crypto-js';

export default function decrypt(content: string): Song {
  const bytes = CryptoJS.AES.decrypt(content, import.meta.env.VITE_CIPHER_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
}
