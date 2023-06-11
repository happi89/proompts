'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { block } from "million/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CopyButton from './Copy';

interface Props {
  prompt: {
    body: string;
    tag: string
    creator: {
      email: string;
      username: string;
      image: string
      id: string
    }
  }
}

const PromptCardBlock = block(
  // @ts-expect-error
  function PrompCard({ prompt }: Props) {
    const { username, image, email } = prompt.creator

    return (
      <Card className="w-full md:w-[520px] h-fit">
        <CardHeader className="flex flex-row items-center w-full gap-4">
          <Avatar>
            <AvatarImage src={image ? image : `https://ui-avatars.com/api/?name=${ username }`} alt={username} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="w-full space-y-1">
            <CardTitle>{username}</CardTitle>
            <CardDescription>{email}</CardDescription>
          </div>
          <CopyButton text={prompt.body} />
        </CardHeader>
        <CardContent>
          <p>{prompt?.body}</p>
        </CardContent>
        <CardFooter className="">
          <p className='text-blue-500'>{prompt?.tag}</p>
        </CardFooter>
      </Card>
    )
  }
)

export default PromptCardBlock