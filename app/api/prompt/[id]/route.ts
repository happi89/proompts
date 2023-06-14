import { connectToDB } from '@/utils/db';
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";


interface Prop {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: Prop) {
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate('creator')

    return NextResponse.json(prompt, { status: 200 })
  } catch (error) {
    console.log("🚀 ~ file: route.ts:15 ~ GET ~ error:", error)
    return NextResponse.json(error, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    await connectToDB();
    const data = await req.json()
    const promptToUpdate = await Prompt.findByIdAndUpdate(params.id, {
      body: data.body,
      tag: data.tag
    })
      .populate('creator')
    return NextResponse.json(promptToUpdate, { status: 201 })
  } catch (error) {
    console.log("🚀 ~ file: route.ts:30 ~ UPDATE ~ error:", error)
    return NextResponse.json(error, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    await connectToDB();
    const promptToDelete = await Prompt.findByIdAndDelete(params?.id).populate('creator')
    return NextResponse.json(promptToDelete, { status: 201 })
  } catch (error) {
    console.log("🚀 ~ file: route.ts:30 ~ DELETE ~ error:", error)
    return NextResponse.json(error, { status: 500 })
  }
}