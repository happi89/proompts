'use client'

import { For } from "million/react"
import { useEffect } from "react"
import PromptCardBlock from "./PromptCard"

interface Props {
  prompts: {
    body: string
    tag: string
  }[]
}

const Feed = ({ prompts }: Props) => {
  return (
    <div className="flex flex-wrap justify-center w-full gap-8 px-2 my-16 sm:px-8">
      <For each={prompts}>
        {(prompt, i) => {
          // @ts-expect-error
          return <PromptCardBlock key={prompt._id} prompt={prompt} />
        }}
      </For>
    </div>
  )
}

export default Feed