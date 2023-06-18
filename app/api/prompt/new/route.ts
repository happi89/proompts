import { NextResponse } from "next/server"
import { connectToDB } from "@/utils/db"
import Prompt from "@/models/prompt"
import User from "@/models/user"
import { authOptions } from "../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import Error from "next/error"

export async function POST(req: Request) {
  const { body, tag, user } = await req.json()

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 403 })
    }

    await connectToDB()

    const newPrompt = new Prompt({
      body,
      tag,
      creator: user?.id
    })

    const prompt = await Prompt.findOne({
      body
    })
    console.log("🚀 ~ file: route.ts:30 ~ POST ~ prompt:", prompt)

    if (prompt) {
      return NextResponse.json('ERROR', { status: 409, statusText: 'Prompt must be unique' })
    }

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