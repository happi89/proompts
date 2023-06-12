'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface Props {
  setSearch: Dispatch<SetStateAction<{
    finding: boolean;
    filter: string;
  }>>
  finding: boolean
}

export default function SearchForm({ setSearch, finding }: Props) {
  const [input, setInput] = useState('')

  const search = async () => {
    setSearch({ finding: true, filter: input })
    setInput('')
  }

  return <div className='flex justify-center w-full gap-4 mb-10'>
    <Input
      onChange={({ target }) => setInput(target.value)}
      value={input}
      className='max-w-xl shadow-md'
      placeholder="search for tag or username"
      onKeyDown={({ key }) => key === 'Enter' && search()}
      disabled={finding}
    />
    <Button disabled={finding} className="shadow-xl" onClick={search}>Search</Button>
  </div>;
}
