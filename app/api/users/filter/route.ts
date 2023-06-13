import { authOptions } from './../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { connectToDB } from "@/utils/db";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";
import { Session } from '@/app/create-prompt/page';

export async function GET(req: Request) {
  const filter = req.url?.split('=')[1]
  const session: Session | null = await getServerSession(authOptions)

  try {
    await connectToDB()

    const prompts = await Prompt.find({
      tag: {
        $regex: filter, $options: 'i'
      },
      id: session?.user?.id
    }).populate('creator');

    return NextResponse.json(prompts, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 404 })
  }
}