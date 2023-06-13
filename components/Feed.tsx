'use client'

import { For } from "million/react"
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard"
import SearchForm from './SearchForm';

import { getNewPrompts, getNewProfilePrompts } from "@/utils/filter";

interface Prompt {
  _id: string | null | undefined;
  body: string
  tag: string
}

interface Props {
  p: Prompt[]
}

const Feed = ({ p }: Props) => {
  const [prompts, setPrompts] = useState<Prompt[]>(p)
  const pathName = usePathname()
  const [search, setSearch] = useState({
    finding: false,
    filter: '',
    profile: pathName === '/profile',
    input: ''
  })


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


  return (
    <div className="flex flex-col md:w-[90%] w-full my-16 lg:grid lg:grid-cols-2 gap-y-8 md:gap-x-0 gap-x-8">
      <SearchForm
        setSearch={setSearch} search={search}
      />
      {prompts.length === 0 && <p>No results Found :(</p>}
      <For each={prompts}>
        {(prompt) => {
          return (
            <div key={prompt._id} className="flex justify-center">
              {/* @ts-expect-error */}
              <PromptCard prompt={prompt} setSearch={setSearch} search={search} />
            </div>
          )
        }}
      </For>
    </div>
  )
}

export default Feed