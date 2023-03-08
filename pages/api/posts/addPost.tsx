import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please login to start creating lists" });
    }

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    console.log(req.body);
    const title = req.body.title;

    if (title.length > 300) {
      return res
        .status(403)
        .json({ message: "Your list is too long. Please remove some items!" });
    }
    if (!title.length) {
      return res
        .status(403)
        .json({ message: "Your list is empty. Please some items!" });
    }

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "Error has occured" });
    }
  }
}
