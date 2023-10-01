import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prismadb";

// Result in json
export type InitResponseData = {
  hook: string | null;
  id: string;
};

// Input in json
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string,
    theme: string
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<InitResponseData | string>
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

  // Check if user has any credits left
  if ((user?.credits as number) <= 0) {
    return res.status(400).json(`You have no generations left`);
  }

  // If they have credits, decrease their credits by one and continue
  await prisma.user.update({
    where: {
      email: session.user.email!,
    },
    data: {
      credits: {
        decrement: 1,
      },
    },
  });

  try {
    const { imageUrl, theme } = req.body;
    const apiVer = process.env.REPLICATE_API_VERSION;
    let startResponse;
    // POST request to Replicate to start the image restoration generation process
    startResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
        body: JSON.stringify({
          version: apiVer,
          input: {
            image: imageUrl,
          },
        }),
      }
    );

    let jsonStartResponse = await startResponse.json();

    let endpointUrl = jsonStartResponse.urls.get;
    // console.log("Replicate EndpointURL: " + endpointUrl)
    const roomId = jsonStartResponse.id
    console.log("/generate")
    console.log(endpointUrl)
    console.log(roomId)
    // Return hook and id
    res.status(201).json(
      {
        hook: endpointUrl,
        id: roomId,
      }
    );

  } catch (error) {
    // Increment their credit if something went wrong
    await prisma.user.update({
      where: {
        email: session.user.email!,
      },
      data: {
        credits: {
          increment: 1,
        },
      },
    });
    console.error(error);
    res.status(500).json("Failed to restore image");
  }
}
