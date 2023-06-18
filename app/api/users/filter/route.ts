import { getCurrentUser } from '@/utils/session';
import { connectToDB } from "@/utils/db";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/user';

export async function GET(req: NextRequest) {
  const filter = req.nextUrl.searchParams.get('filter')!
  const user = await getCurrentUser();

  try {
    await connectToDB();

    const regex = new RegExp(filter, 'i');
    const userId = user?.id;

    const prompts = await Prompt.find({
      $and: [
        {
          $or: [
            { tag: regex },
            { creator: { $in: await getUserIdsByUsername(filter) } },
            { body: regex }
          ]
        },
        {
          $or: [
            { creator: userId },
            { saved: userId },
          ],
        }
      ]
    }).sort({ createdAt: 'desc' }).populate('creator');

    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 404 });
  }
}


async function getUserIdsByUsername(username: string) {
  const users = await User.find({ username: { $regex: username, $options: "i" } });
  return users.map(user => user.id);
}