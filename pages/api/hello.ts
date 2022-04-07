// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import forge from "node-forge";

var key = forge.random.getBytesSync(16);

console.log(key);
var iv = forge.random.getBytesSync(16);

/* alternatively, generate a password-based 16-byte key
var salt = forge.random.getBytesSync(128);
var key = forge.pkcs5.pbkdf2('password', salt, numIterations, 16);
*/

// encrypt some bytes using CBC mode
// (other modes include: ECB, CFB, OFB, CTR, and GCM)
// Note: CBC and ECB modes use PKCS#7 padding as default
var cipher = forge.cipher.createCipher("AES-CBC", key);
cipher.start({ iv: iv });
cipher.update(forge.util.createBuffer("shit"));
cipher.finish();
var encrypted = cipher.output;
// outputs encrypted hex
console.log(encrypted.toHex());

// decrypt some bytes using CBC mode
// (other modes include: CFB, OFB, CTR, and GCM)
var decipher = forge.cipher.createDecipher("AES-CBC", key);
decipher.start({ iv: iv });
decipher.update(encrypted);
var result = decipher.finish(); // check 'result' for true/false
// outputs decrypted hex
console.log(decipher.output.toHex());

//

// const AES_SECRET_KEY = 'onedrive-vercel-index'

// var decipher = forge.cipher.createDecipher('AES-CBC', AES_SECRET_KEY);

// decipher.start({
//   iv:  forge.random.getBytesSync(16)
// })
// decipher.update()

// return decrypted.toString(CryptoJS.enc.Utf8)

("U2FsdGVkX1830zo3/pFDqaBCVBb37iLw3WnBDWGF9GIB2f4apzv0roemp8Y+iIxI3Ih5ecyukqELQEGzZlYiWg==");
export default function handler(req, res) {
  console.log();

  res.status(200).json({ name: "John Doe" });
}
