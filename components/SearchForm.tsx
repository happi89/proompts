'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useToast } from "./ui/use-toast";

interface Props {
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

export default function SearchForm({ setSearch, search: s }: Props) {
  const search = () => {
    setSearch({ ...s, finding: true, filter: s.input.replace(/#/g, "") })
  }

  return <>
    <div className='flex flex-col justify-center w-full col-span-2 gap-4 mb-10 sm:flex-row'>
      <Input
        onChange={({ target }) => setSearch({ ...s, input: target.value })}
        value={s.input}
        className='max-w-xl shadow-md'
        placeholder="search for tag or username"
        onKeyDown={({ key }) => key === 'Enter' && search()}
        disabled={s.finding}
      />
      <Button disabled={s.finding} className="shadow-xl" onClick={search}>Search</Button>
    </div>
  </>
}
