import { NextApiRequest, NextApiResponse } from "next";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  const user_fingerprint = req.headers["user_fingerprint"];

  if (!user_fingerprint) {
    return res.status(500).json({ message: "Error fetching likes data" });
  }

  if (req.method === "GET") {
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }
    try {
      const totalLikes = await sql`
        SELECT COUNT(*) AS likes FROM likes WHERE post_slug = ${slug};
      `;

      const likedByUser = await sql`
      SELECT 1 FROM likes WHERE post_slug = ${slug} AND user_fingerprint = ${user_fingerprint} LIMIT 1;
    `;

      return res.status(200).json({
        totalLikes: totalLikes[0]?.likes || 0,
        userLiked: likedByUser.length > 0,
      });
    } catch (e) {
      if (e instanceof Error)
        res.status(500).json({ message: "Error fetching likes data" });
      return;
    }
  }
}
