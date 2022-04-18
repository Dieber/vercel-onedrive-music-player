import { apiConfig } from "../config";
import forge from "node-forge";

const key = forge.pkcs5.pbkdf2("onedrive", "vercel-salt", 8, 16);
var iv = "13df13df13df13df";

export function decryptToken(encryptClientSecret64: string) {
  const data = forge.util.hexToBytes(encryptClientSecret64);

  var decipher = forge.cipher.createDecipher("AES-CBC", key);
  decipher.start({ iv: iv });
  decipher.update(forge.util.createBuffer(data));
  decipher.finish();
  // outputs decrypted hex
  const bytes = decipher.output.toString();
  return bytes;
  // return forge.util.decodeUtf8(bytes);
}

export function encryptToken(token: string) {
  var cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(token));
  cipher.finish();
  var encrypted = cipher.output;

  return encrypted.toHex();
}

export function generateAuthorisationUrl() {
  const { clientId, redirectUri, authApi, scope } = apiConfig;

  const authUrl = authApi.replace("/token", "/authorize");

  // Construct URL parameters for OAuth2
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("redirect_uri", redirectUri);
  params.append("response_type", "code");
  params.append("scope", scope);
  params.append("response_mode", "query");

  return `${authUrl}?${params.toString()}`;
}
