import Link from 'next/link'
import React from 'react'
import CopyButton from './Copy'
import { Prompt } from './PromptCard'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { CardTitle, CardDescription } from './ui/card'

interface Props {
  prompt: Prompt
}

const PromptCarderHeader = ({ prompt }: Props) => {
  const { username, id, email, image } = prompt.creator
  return (
    <>
      <Avatar>
        <Link href={`/users/${ id }`}>
          <AvatarImage src={image} alt={username} />
        </Link>
        <AvatarFallback>{(username[0] + username[1]).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <Link href={`/users/${ id }`} className='space-y-1'>
          <CardTitle className="hover:underline">{username}</CardTitle>
          <CardDescription className="hover:underline">{email}</CardDescription>
        </Link>
      </div>
      <CopyButton text={prompt?.body} />
    </>
  )
}

export default PromptCarderHeader