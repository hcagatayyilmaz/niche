import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../prisma/client";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await client.post.findMany({
        include: {
          user: true,
          comments: true,
          hearts: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(403).json(error);
    }
  }
}
