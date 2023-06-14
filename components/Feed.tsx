'use client'

import { For } from "million/react"
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard"
import SearchForm from './SearchForm';

import { getNewPrompts, getNewProfilePrompts } from "@/utils/filter";
import { useToast } from "./ui/use-toast";

interface Prompt {
  _id: string | null | undefined;
  body: string
  tag: string
}

interface Props {
  p: Prompt[],
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | undefined
}

const Feed = ({ p, user }: Props) => {
  const router = useRouter()
  const [prompts, setPrompts] = useState<Prompt[]>(p)
  const pathName = usePathname()
  const [search, setSearch] = useState({
    finding: false,
    filter: '',
    profile: pathName === '/profile',
    input: ''
  })

  const { toast } = useToast()


  useEffect(() => {
    const fetchData = async () => {
      if (search.finding) {
        let newPrompts;
        if (search.profile) {
          newPrompts = await getNewProfilePrompts(search.filter);
        } else {
          newPrompts = await getNewPrompts(search.filter);
        }
        setPrompts(newPrompts);
        setSearch({ ...search, finding: false, filter: '' });
      }
    };

    fetchData();
  }, [search.finding, search.profile, search.filter]);

  const deletePrompt = async (id: string) => {
    try {
      const prompt = await fetch(`/api/prompt/${ id }`, {
        method: 'DELETE',
        cache: 'no-store'
      })

      const updatedPrompts = prompts.filter((p: any) => id !== p?.id)
      console.log("🚀 ~ file: Feed.tsx:68 ~ deletePrompt ~ updatedPrompts:", updatedPrompts)
      setPrompts(updatedPrompts)

      toast({
        title: 'Prompt Deleted Successfully!'
      })
    } catch (error) {
      console.log(error);
      toast({
        title: 'Prompt could not be Deleted',
        variant: 'destructive'
      })
    }
  }

  const updatePrompt = async (id: string, prompt: { body: string, tag: string }) => {
    try {
      const promptUpdated = await fetch(`/api/prompt/${ id }`, {
        method: 'PUT',
        cache: 'no-store',
        body: JSON.stringify(prompt)
      })

      const updatedPrompts = prompts.map((p: any) => id === p?.id ? promptUpdated : p)
      setPrompts(updatedPrompts)

      toast({
        title: 'Prompt Updated Successfully!'
      })
    } catch (error) {
      console.log(error);
      toast({
        title: 'Prompt could not be Updated',
        variant: 'destructive'
      })
    }
  }



  return (
    <div className="flex flex-col md:w-[90%] w-full my-16 lg:grid lg:grid-cols-2 gap-y-8 gap-x-6 sm:space-x-0">
      <SearchForm
        setSearch={setSearch} search={search}
      />
      {prompts.length === 0 && <p>No results Found :(</p>}

      <For each={prompts}>
        {(prompt) => {
          return (
            <div key={prompt._id} className="flex justify-center">
              {/* @ts-expect-error */}
              <PromptCard userId={user?.id} prompt={prompt}
                deletePrompt={deletePrompt}
                setSearch={setSearch}
                search={search} />
            </div>
          )
        }}
      </For>
    </div>
  )
}

export default Feed