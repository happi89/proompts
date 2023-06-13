import { connectToDB } from '@/utils/db';
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";


interface Prop {
  params: {
    prompt: string
  }
}

export async function GET(req: NextRequest, { params }: Prop) {
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.prompt).populate('creator')
    console.log("🚀 ~ file: route.ts:16 ~ GET ~ prompt:", prompt)

    return NextResponse.json(prompt, { status: 200 })
  } catch (error) {
    console.log("🚀 ~ file: route.ts:15 ~ GET ~ error:", error)
    return NextResponse.json(error, { status: 500 })
  }
}