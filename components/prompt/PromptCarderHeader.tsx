'use client'

import Link from 'next/link'
import React from 'react'
import Bookmark from './Bookmark'
import CopyButton from './Copy'
import { Prompt } from './PromptCard'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CardTitle, CardDescription } from '../ui/card'

interface Props {
  prompt: Prompt
  userId: string
}

const PromptCarderHeader = ({ prompt, userId }: Props) => {
  const show = userId !== undefined && userId !== prompt?.creator?.id
  const { username, id, email, image } = prompt?.creator || ''

  return (
    <>
      <Avatar>
        <Link href={`/users/${ id }`}>
          <AvatarImage src={image} alt={username} />
        </Link>
        <AvatarFallback>{username && (username[0] + username[1]).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <Link href={`/users/${ id }`} className='space-y-1'>
          <CardTitle className="hover:underline">{username}</CardTitle>
          <CardDescription className="hover:underline">{email}</CardDescription>
        </Link>
      </div>
      <div className='flex gap-3'>
        <CopyButton text={prompt?.body} />
        {show && <Bookmark id={prompt?.id} saved={prompt?.saved} userId={userId} />}
      </div>
    </>
  )
}

export default PromptCarderHeader