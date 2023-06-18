import { authOptions } from './../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getCurrentUser } from '@/utils/session';
import { connectToDB } from '@/utils/db';
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/user';


interface Prop {
  params: {
    id: string
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 403 })
    }
    await connectToDB();


    const promptToUpdate = await Prompt.findById(params.id)
      .populate('creator')
    const data = await req.json()

    if (promptToUpdate?.creator?.id !== user?.id) {
      return NextResponse.json("Users can only update their own prompts", { status: 403 })
    }

    const updatedPrompt = {
      ...promptToUpdate,
      body: data.body,
      tag: data.tag
    }

    await updatedPrompt.save()

    return NextResponse.json(updatedPrompt, { status: 201 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 403 })
    }
    await connectToDB();

    const promptToDelete = await Prompt.findById(params?.id).populate('creator')

    if (promptToDelete?.creator?.id !== user?.id) {
      return NextResponse.json("Users can only delete their own prompts", { status: 403 })
    }


    const updatedUser = await User.findById(promptToDelete.creator.id)
    updatedUser.prompts = updatedUser.prompts.filter((promptId: string) => promptId.toString() !== params.id);
    await promptToDelete.remove()
    await updatedUser.save()

    return NextResponse.json(promptToDelete, { status: 201 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export async function POST(req: Request, { params }: any) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 403 })
    }

    const { id } = params
    const user = await getCurrentUser()
    const prompt = await Prompt.findById(id).populate('creator')

    if (!prompt) {
      return NextResponse.json("Prompt not found", { status: 404 });
    }

    if (prompt.creator?.id === user?.id) {
      return NextResponse.json('User can not save their own prompts', {
        status: 400
      });
    }

    const savedIndex = prompt.saved.indexOf(user?.id);
    if (savedIndex === -1) {
      // User ID not found in saved array, add it
      prompt.saved.push(user?.id);
    } else {
      // User ID found in saved array, remove it
      prompt.saved.splice(savedIndex, 1);
    }

    const savedPrompt = await prompt.save()

    const updatedUser = await User.findById(user?.id)
    updatedUser.prompts.push(prompt.id)
    const savedUser = await updatedUser.save()


    return NextResponse.json({ savedPrompt, savedUser }, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}