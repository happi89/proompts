import { getCurrentUser } from '@/utils/session';
import { connectToDB } from '@/utils/db';
import { NextResponse } from "next/server"
import Prompt from '@/models/prompt';
import User from '@/models/user';

export async function GET(req: Request, { params }: any) {
  console.log("🚀 ~ file: route.ts:7 ~ GET ~ params:", params)
  try {
    const id = params?.id
    await connectToDB()

    const prompts = await Prompt.find({
      $or: [
        { creator: id },                      // Prompts with the same creator id
        { saved: { $in: [id] } }              // Prompts where current user id is in the saved array
      ]
    }).sort({ createdAt: 'desc' }).populate('creator')
    console.log("🚀 ~ file: route.ts:21 ~ GET ~ prompts:", prompts)

    return NextResponse.json(prompts, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    connectToDB()
    const { username, oldUsername } = await req.json()

    const exists = await User.findOne({ username });

    if (exists) {
      return NextResponse.json('Error', { status: 409, statusText: 'Username already is in use' })
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: oldUsername }, // Filter to find the user with the existing username
      { $set: { username: username } }, // Set the new username value
      { new: true } // Return the updated document
    );

    return NextResponse.json('Updated Username', { status: 200 })
  } catch (error) {
    console.log("🚀 ~ file: route.ts:31 ~ PUT ~ error:", error)
    return NextResponse.json(error, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: any) {
  try {
    await connectToDB()

    const userSession = await getCurrentUser()

    const user = await User.findByIdAndRemove({ _id: params?.id })

    if (userSession?.id !== user?.id) {
      return NextResponse.json("Unauthorized", { status: 403 })
    }

    await Prompt.deleteMany({ creator: params?.id });

    await Prompt.updateMany({ saved: { $in: [params?.id] } }, { $pull: { saved: { $in: [params?.id] } } });

    return NextResponse.json(user, { status: 200, statusText: "user deleted succesfully!" })
  } catch (error) {
    console.log("🚀 ~ file: route.ts:55 ~ Delete ~ error:", error)
    return NextResponse.json(error, { status: 500 })
  }
}