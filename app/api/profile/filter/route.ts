import { connectToDB } from "@/utils/db";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const filter = req.nextUrl.searchParams.get('filter')
  const id = req.nextUrl.searchParams.get('id')

  try {
    await connectToDB()

    const prompts = await Prompt.find({
      creator: id,
      $or: [
        {
          tag: {
            $regex: filter, $options: 'i'
          },
        },
        {
          body: {
            $regex: filter, $options: 'i'
          },
        }
      ]

    }).sort({ createdAt: 'desc' }).populate('creator');

    return NextResponse.json(prompts, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 404 })
  }
}