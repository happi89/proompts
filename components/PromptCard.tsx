'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Dispatch, SetStateAction } from "react";
import PromptDialog from "./PromptDialog";
import PromptCarderHeader from "./PromptCarderHeader";

export interface Prompt {
  id: string
  body: string;
  tag: string
  creator: {
    email: string;
    username: string;
    image: string
    id: string
  }
}

interface Props {
  prompt: Prompt,
  setSearch: Dispatch<SetStateAction<{
    finding: boolean;
    profile: boolean;
    filter: string;
    input: string
  }>>,
  search: {
    finding: boolean;
    filter: string;
    profile: boolean;
    input: string
  }
}

function PromptCard({ prompt, search, setSearch }: Props) {
  const searchTag = () => {
    if (search && setSearch) {
      const input = prompt.tag.replace(/#/g, "")
      setSearch({ ...search, finding: true, filter: input, input })
    }
  }

  return (
    <Card className="w-full md:w-[480px] h-full flex flex-col">
      <CardHeader className="flex flex-row items-center w-full gap-4">
        <PromptCarderHeader prompt={prompt} />
      </CardHeader>
      <CardContent>
        <PromptDialog prompt={prompt} searchTag={searchTag} />
      </CardContent>
      <CardFooter className="mt-auto">
        <p onClick={searchTag} className='text-blue-500 hover:cursor-pointer hover:underline'>{prompt?.tag}</p>
      </CardFooter>
    </Card>
  )
}

export default PromptCard