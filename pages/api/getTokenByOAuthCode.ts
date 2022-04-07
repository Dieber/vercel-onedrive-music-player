import axios, { AxiosResponse } from "axios";
import { NextApiResponse } from "next";
import { apiConfig } from "../../config";
import { decryptToken, encryptToken } from "../../utils/oauth";

// // function isString(test: any): test is string{
// function isError (result: any): result is Error {
//   return "error" in result
// }

export default async function handler(req, res: NextApiResponse) {
  const { clientId, redirectUri, authApi } = apiConfig;
  const clientSecret = decryptToken(
    "OGFjMTViY2U5ZWU3MjkwZWUxZGQ0MWFkMjNlYmM0ZDY3MDQ0ODg3ZDlmZWU2YjU2NGQ3YjkyODk0NjFlNzJlZjliZjFmMzRlZjQ0M2ZlNjQyNjM3ZDhjMzk4NDZjMWEy"
  );
  console.log(clientSecret);
  res.status(200).json({
    clientSecret,
  });

  return;
  // Construct URL parameters for OAuth2
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("redirect_uri", redirectUri);
  params.append("client_secret", clientSecret);
  params.append("code", req.code);
  params.append("grant_type", "authorization_code");

  // Request access token
  let result = await axios
    .post(authApi, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((resp) => {
      const { expires_in, access_token, refresh_token } = resp.data;
      return {
        expiryTime: expires_in,
        accessToken: access_token,
        refreshToken: refresh_token,
      };
    })
    .catch((err) => {
      const { error, error_description, error_uri } = err.response.data;
      return {
        error,
        errorDescription: error_description,
        errorUri: error_uri,
      };
    });

  if ("error" in result) {
    res.status(403).json({
      ...result,
    });
  } else {
    res.status(200).json({
      ...result,
    });
  }
}
