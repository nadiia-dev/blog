import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Must be 2 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(2, { message: "Must be 2 or more characters long" }),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    const result = contactSchema.safeParse(req.body);
    if (!result.success) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage = {
      name,
      email,
      message,
    };
    console.log(newMessage);
    res.status(201).json({ message: "Successfully sent message" });
  }
}
