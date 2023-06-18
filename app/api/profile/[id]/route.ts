import { connectToDB } from '@/utils/db';
import { NextResponse } from "next/server"
import Prompt from '@/models/prompt';
import User from '@/models/user';

export async function GET(req: Request, { params }: any) {
  try {
    const id = params?.id
    await connectToDB()
    const user = await User.findById(id)

    const prompts = await Prompt.find({
      $or: [
        { creator: user?.id },                      // Prompts with the same creator id
      ]
    }).sort({ createdAt: 'desc' }).populate('creator')

    return NextResponse.json({ prompts, user }, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

