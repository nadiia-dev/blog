import { NextApiRequest, NextApiResponse } from "next";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { post_slug } = req.body;
    const user_fingerprint = req.headers["user_fingerprint"];

    if (!user_fingerprint) {
      return res.status(500).json({ message: "Error processing like" });
    }
    try {
      const likes = await sql`
    SELECT * FROM likes WHERE user_fingerprint = ${user_fingerprint} AND post_slug = ${post_slug};
  `;
      if (likes.length > 0) {
        await sql`
        DELETE FROM likes WHERE user_fingerprint = ${user_fingerprint} AND post_slug = ${post_slug} ;
      `;
        return res.json({ message: "Like removed" });
      } else {
        await sql`
        INSERT INTO likes (post_slug, user_fingerprint) VALUES (${post_slug}, ${user_fingerprint});
      `;
        return res.json({ message: "Like added" });
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        res.status(500).json({ message: "Error processing like" });
      }
    }
  }
}
