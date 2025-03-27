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
      const totalComments = await sql`
        SELECT COUNT(*) AS comments FROM comments WHERE post_slug = ${slug};
      `;

      return res
        .status(200)
        .json({ totalComments: totalComments[0]?.comments || 0 });
    } catch (e) {
      if (e instanceof Error)
        res.status(500).json({ message: "Error loading post comments" });
      return;
    }
  }
}
