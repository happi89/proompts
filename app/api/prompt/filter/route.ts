import { NextApiRequest } from 'next';
import { connectToDB } from "@/utils/db";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const filter = req.url?.split('=')[1]

  try {
    await connectToDB()

    const tagPrompts = await Prompt.find({ tag: { $regex: filter, $options: 'i' } }).populate('creator');

    const userPrompts = await Prompt.find()
      .populate({
        path: 'creator',
        match: { username: { $regex: filter, $options: 'i' } },
      })
      .exec();

    const userPromptsSorted = userPrompts.filter((prompt) => prompt.creator !== null);

    const prompts = [...tagPrompts, ...userPromptsSorted];

    // Remove duplicates by filtering based on prompt _id
    const uniquePrompts = prompts.filter((prompt, index, self) =>
      index === self.findIndex((p) => p._id === prompt._id)
    );

    return NextResponse.json(uniquePrompts, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 404 })
  }
}