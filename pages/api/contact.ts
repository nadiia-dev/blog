import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const contactSchema = z.object({
  name: z.string().min(2, { message: "Must be 2 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(2, { message: "Must be 2 or more characters long" }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    const result = contactSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.format();
      return res.status(422).json({
        message: "Invalid input",
        errors,
      });
    }
    try {
      await sql`
        INSERT INTO contacts (name, email, message)
        VALUES (${name}, ${email}, ${message})
      `;
      res.status(201).json({ message: "Successfully sent message" });
    } catch (e) {
      if (e instanceof Error)
        res.status(500).json({ message: "Failed to store message" });
      return;
    }
  }
}
