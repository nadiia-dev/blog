import { NextApiRequest, NextApiResponse } from "next";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { post_slug, text, name } = req.body;
    const user_fingerprint = req.headers["user_fingerprint"];

    if (!user_fingerprint) {
      return res.status(500).json({ message: "Error adding comment" });
    }

    try {
      const data = await sql`
                INSERT INTO comments (post_slug, user_fingerprint, text, name) VALUES (${post_slug}, ${user_fingerprint}, ${text}, ${name})  
                ON CONFLICT (id) DO NOTHING;
            `;

      res.status(201).json(data);
    } catch (e) {
      if (e instanceof Error)
        res.status(500).json({ message: "Error adding comment" });
      return;
    }
  }
}
