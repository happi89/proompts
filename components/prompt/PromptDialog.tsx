'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Trash2, X } from "lucide-react"
import Link from "next/link"

import { Prompt } from './PromptCard'
import PromptCarderHeader from "./PromptCarderHeader"

interface Props {
  prompt: Prompt
  searchTag: () => void,
  userId: string;
  deletePrompt: (id: string) => Promise<void>
}

const PromptDialog = ({ prompt, searchTag, userId, deletePrompt }: Props) => {

  return (
    <div>
      <Dialog>
        <DialogTrigger className="h-full text-start">
          <p className='leading-7 line-clamp-5'>{prompt?.body}</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row items-center w-full gap-4 mb-6">
              <PromptCarderHeader userId={userId} prompt={prompt} />
            </DialogTitle>
            <DialogDescription className="leading-loose text-black text-md">
              {prompt?.body}
            </DialogDescription>
            <DialogClose className="flex flex-col w-full text-start">
              {userId === prompt?.creator?.id && <div className="flex gap-8 mt-8">
                <span className="flex items-center gap-2 text-red-500" onClick={() => deletePrompt(prompt?.id)}><Trash2 className="w-4 h-4" />Delete</span>
                <Link className="flex items-center gap-3 text-yellow-500" href={`/update-prompt/${ prompt?.id }`}><Edit className="w-4 h-4" /> Edit</Link>
              </div>}
              <div className="flex justify-between w-full mt-4">
                <p onClick={searchTag} className='text-blue-500 hover:cursor-pointer hover:underline'>{prompt?.tag}</p>
                <p><X /></p>
              </div>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PromptDialog