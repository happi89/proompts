'use client'

import { For } from "million/react"
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard"
import SearchForm from './SearchForm';

interface Prompt {
  body: string
  tag: string
}

interface Props {
  p: Prompt[]
}

const Feed = ({ p }: Props) => {
  const [prompts, setPrompts] = useState<Prompt[]>(p)
  const [search, setSearch] = useState({
    finding: false,
    filter: ''
  })

  useEffect(() => {
    const getNewPrompts = async () => {
      const newPrompts = await fetch(`/api/prompt/filter?filter=${ search.filter }`, {
        cache: 'no-cache'
      }).then(res => res.json())
      setPrompts(newPrompts)
    }

    if (search.finding) {
      getNewPrompts()
    }
  }, [search])


  return (
    <div className="flex flex-wrap justify-center w-full gap-8 px-2 my-16 sm:px-8">
      <SearchForm
        setSearch={setSearch}
      />
      <For each={prompts}>
        {(prompt, i) => {
          // @ts-expect-error
          return <PromptCard key={prompt._id} prompt={prompt} />
        }}
      </For>
    </div>
  )
}

export default Feed