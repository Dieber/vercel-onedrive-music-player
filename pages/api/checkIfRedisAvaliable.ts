import { NextApiResponse } from "next";

export default function handler(_req, res: NextApiResponse) {
  res.status(200).json({ redis: !!process.env.REDIS_URL });
}
