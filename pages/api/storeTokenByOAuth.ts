import axios, { AxiosResponse } from "axios";
import { url } from "inspector";
import { NextApiRequest, NextApiResponse } from "next";
import { apiConfig } from "../../config";
import { decryptToken, encryptToken } from "../../utils/oauth";

import Redis from "ioredis";
import { storeOdAuthTokens } from "../../utils/oauth/storeTokenToRedis";

// const kv = new Redis(process.env.REDIS_URL);

// function isString(test: any): test is string{
// function isError (result: any): result is Error {
//   return "error" in result
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { clientId, redirectUri, authApi, encryptedClientSecret } = apiConfig;
  const clientSecret = decryptToken(encryptedClientSecret);

  // Construct URL parameters for OAuth2
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("redirect_uri", redirectUri);
  params.append("client_secret", clientSecret);
  params.append("code", req.body.code);
  params.append("grant_type", "authorization_code");

  // Request access token
  let accessToken = await axios
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

  if ("error" in accessToken) {
    res.status(403).json({
      ...accessToken,
    });
    return;
  }

  await storeOdAuthTokens(accessToken);
  res.status(200).json({
    ok: "ok",
  });
}
