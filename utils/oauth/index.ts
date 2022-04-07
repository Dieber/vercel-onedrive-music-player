import { apiConfig } from "../../config";
import forge from "node-forge";
// import

const clientSecret = "Aob_2-q12my-8_HmP8OA04r8.A1h4978Q~";

const encryptClientSecret64 =
  "OGFjMTViY2U5ZWU3MjkwZWUxZGQ0MWFkMjNlYmM0ZDY3MDQ0ODg3ZDlmZWU2YjU2NGQ3YjkyODk0NjFlNzJlZjliZjFmMzRlZjQ0M2ZlNjQyNjM3ZDhjMzk4NDZjMWEy";

const keyBase64 = "cF64rsBcceW+bXAFkhDYLg==";

export function decryptToken(encryptClientSecret64: string) {
  const key = forge.util.decode64(keyBase64);
  const iv = forge.random.getBytesSync(16);

  // decrypt some bytes using CBC mode
  // (other modes include: CFB, OFB, CTR, and GCM)
  var decipher = forge.cipher.createDecipher("AES-CBC", key);

  decipher.start({ iv: iv });
  // encryptClientSecret64
  //encryptClientSecret64

  const encryptClientSecret = forge.util.decode64(encryptClientSecret64);
  console.log(encryptClientSecret);
  decipher.update(forge.util.createBuffer(encryptClientSecret));

  var result = decipher.finish(); // check 'result' for true/false
  // outputs decrypted hex
  let str = decipher.output.toString();
  return str;
}

export function encryptToken(token: string) {
  const key = forge.util.decode64(keyBase64);
  const iv = forge.random.getBytesSync(16);

  var cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(token));
  cipher.finish();
  var encrypted = cipher.output;
  //   // outputs encrypted hex
  //   console.log(encrypted.toString());

  //   var encrypted = cipher.output;
  // // outputs encrypted hex
  // console.log(encrypted.toHex());

  return forge.util.encode64(encrypted.toHex());
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
