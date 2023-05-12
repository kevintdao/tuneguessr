import CryptoJS from "crypto-js";
import { env } from "~/env.mjs";

export function encrypt(text: string) {
  const encrypted = CryptoJS.AES.encrypt(text, env.CIPHER_KEY);
  return { content: encrypted.toString() };
}

export default function decrypt(content: string): Song {
  const bytes = CryptoJS.AES.decrypt(content, env.NEXT_PUBLIC_CIPHER_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as Song;

  return decryptedData;
}
