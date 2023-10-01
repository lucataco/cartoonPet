import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

// Input in json
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    hookUrl: string;
    originalImg: string;
    roomId: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<string>
) {
  // Check if user is logged in
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(500).json("Login to upload.");
  }
  // Get user from DB
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
    select: {
      credits: true,
    },
  });

  try {
    const { hookUrl, originalImg, roomId } = req.body;
    // POST request to Replicate to start the image restoration generation process
    let startResponse = await fetch(hookUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      }
    });

    let jsonResponse = await startResponse.json();
    
    // Status of Replicate request
    if (jsonResponse.status === "succeeded") {
      let generatedImage = jsonResponse.output;
      await prisma.room.create({
        data: {
          replicateId: roomId,
          user: {
            connect: {
              email: session.user.email!,
            },
          },
          inputImage: originalImg,
          outputImage: generatedImage[0],
          prompt: "cartoon",
        },
      });
      res.status(200).json(generatedImage);
    } else if (jsonResponse.status === "failed") {
      throw new Error("Failed to restore image");
    } else {
      return res.status(200).json("processing");
    }

  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to restore image");
  }
}
