'use client'

import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

const PromptDialog = dynamic(() => import('./PromptDialog'))
const PromptCarderHeader = dynamic(() => import('./PromptCarderHeader'))

// import PromptDialog from "./PromptDialog";
// import PromptCarderHeader from "./PromptCarderHeader";


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
  saved: string[]
}

interface Props {
  prompt: Prompt,
  userId: string;
  deletePrompt: (id: string) => Promise<void>

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

function PromptCard({ prompt, search, setSearch, userId, deletePrompt }: Props) {
  const searchTag = () => {
    if (search && setSearch) {
      const input = prompt.tag.replace(/#/g, "")
      setSearch({ ...search, finding: true, filter: input, input })
    }
  }

  return (
    <Card className="w-full md:w-[480px] h-full flex flex-col">
      <CardHeader className="flex flex-row items-center w-full gap-6">
        <PromptCarderHeader userId={userId} prompt={prompt} />
      </CardHeader>
      <CardContent className='h-full'>
        <PromptDialog
          deletePrompt={deletePrompt}
          userId={userId}
          prompt={prompt}
          searchTag={searchTag} />
      </CardContent>
      <CardFooter className="">
        <p onClick={searchTag} className='text-blue-500 hover:cursor-pointer hover:underline'>{prompt?.tag[0] !== '#' ? `#${ prompt?.tag }` : prompt?.tag}</p>
      </CardFooter>
    </Card>
  )
}

export default PromptCard