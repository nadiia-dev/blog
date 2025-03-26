import { NextApiRequest, NextApiResponse } from "next";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  if (req.method === "GET") {
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }
    try {
      const data = await sql`
        SELECT c.id AS comment_id, c.text, c.name, c.user_fingerprint, c.post_slug, c.created_at  FROM posts p
        INNER JOIN comments c ON p.slug = c.post_slug
        WHERE p.slug = ${slug}
        ORDER BY c.created_at DESC;
      `;

      return res.status(200).json(data);
    } catch (e) {
      if (e instanceof Error)
        res.status(500).json({ message: "Error loading post" });
      return;
    }
  }
}
