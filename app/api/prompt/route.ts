import { NextResponse } from 'next/server';
import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/db"

export async function GET() {
  await connectToDB()

  const prompts = await Prompt.find({}).populate('creator')

  return NextResponse.json(prompts, { status: 200 })
}