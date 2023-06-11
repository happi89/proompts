import { NextResponse } from "next/server"
import { connectToDB } from "@/utils/db"
import Prompt from "@/models/prompt"
import User from "@/models/user"

export async function POST(req: Request) {
  const { body, tag, user } = await req.json()

  try {
    await connectToDB()

    const newPrompt = new Prompt({
      body,
      tag,
      creator: user?.id
    })

    const savedPrompt = await newPrompt.save()

    const updatedUser = await User.findById(user.id)
    updatedUser.prompts.push(savedPrompt.id)
    const savedUser = await updatedUser.save()


    return NextResponse.json({ newPrompt, savedUser }, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}