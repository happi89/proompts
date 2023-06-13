import { authOptions } from './../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/db"
import { Session } from '@/app/create-prompt/page';

export async function GET(request: Request) {
  await connectToDB()
  const session: Session | null = await getServerSession(authOptions)

  const prompts = await Prompt.find({}).populate({
    path: 'creator',
    match: {
      id: session?.user?.id
    }
  })

  return NextResponse.json(prompts, { status: 200 })
}