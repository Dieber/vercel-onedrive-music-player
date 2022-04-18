import axios from "axios";
import Redis from "ioredis";
import { apiConfig } from "../config";
import { decryptToken, encryptToken } from "./crypto";

// Persistent key-value store is provided by Redis, hosted on Upstash
// https://vercel.com/integrations/upstash
const kv = new Redis(process.env.REDIS_URL!);
const clientSecret = decryptToken(apiConfig.encryptedClientSecret);

interface GetOAuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

interface SetOAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiryTime: number;
}

export async function getOdAuthTokens(): Promise<GetOAuthTokens> {
  const accessToken = await kv.get("access_token");
  const refreshToken = await kv.get("refresh_token");

  // if (accessToken)

  return {
    accessToken: accessToken && decryptToken(accessToken),
    refreshToken: refreshToken && decryptToken(refreshToken),
  };
}

export async function storeOdAuthTokens({
  accessToken,
  expiryTime,
  refreshToken,
}: SetOAuthTokens): Promise<void> {
  await kv.set("access_token", encryptToken(accessToken), "EX", expiryTime);
  await kv.set("refresh_token", encryptToken(refreshToken));
}

export async function getAccessToken(): Promise<string> {
  const { accessToken, refreshToken } = await getOdAuthTokens();
  // Return in storage access token if it is still valid
  if (typeof accessToken === "string") {
    console.log("Fetch access token from storage.");
    return accessToken;
  }

  // Return empty string if no refresh token is stored, which requires the application to be re-authenticated
  if (typeof refreshToken !== "string") {
    console.log("No refresh token, return empty access token.");
    return "";
  }

  // Fetch new access token with in storage refresh token
  const body = new URLSearchParams();
  body.append("client_id", apiConfig.clientId);
  body.append("redirect_uri", apiConfig.redirectUri);
  body.append("client_secret", clientSecret);
  body.append("refresh_token", refreshToken);
  body.append("grant_type", "refresh_token");

  const resp = await axios.post(apiConfig.authApi, body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if ("access_token" in resp.data && "refresh_token" in resp.data) {
    const { expires_in, access_token, refresh_token } = resp.data;

    await storeOdAuthTokens({
      accessToken: access_token,
      expiryTime: parseInt(expires_in),
      refreshToken: refresh_token,
    });
    console.log("Fetch new access token with stored refresh token.");
    return access_token;
  }

  return "";
}
