import Redis from "ioredis";
import { decryptToken, encryptToken } from ".";

// Persistent key-value store is provided by Redis, hosted on Upstash
// https://vercel.com/integrations/upstash
const kv = new Redis(process.env.REDIS_URL);

interface GetOAuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface SetOAuthTokens extends GetOAuthTokens {
  expiryTime: number;
}

export async function getOdAuthTokens(): Promise<GetOAuthTokens> {
  const accessToken = await kv.get("access_token");
  const refreshToken = await kv.get("refresh_token");

  return {
    accessToken: decryptToken(accessToken),
    refreshToken: decryptToken(refreshToken),
  };
}

export async function storeOdAuthTokens({
  accessToken,
  expiryTime,
  refreshToken,
}: SetOAuthTokens): Promise<void> {
  encryptToken(accessToken);

  await kv.set("access_token", encryptToken(accessToken), "EX", expiryTime);
  await kv.set("refresh_token", encryptToken(refreshToken));
}
