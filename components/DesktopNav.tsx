'use client'

import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
import { Button } from "./ui/button";
import {
  Avatar, AvatarImage, AvatarFallback
} from './ui/avatar'

export default function DesktopNav({ user }: any) {
  return (
    <div className="items-center justify-between flex-1 hidden space-x-2 sm:flex sm:space-x-4 md:justify-end">
      {
        user ? (
          <nav className='hidden space-x-6 sm:flex'>
            <Link href='/create-prompt'><Button>Create Prompt</Button></Link>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
            <Link href='/profile'>
              <Avatar>
                <AvatarImage src={user?.image ? user?.image : `https://ui-avatars.com/api/?name=${ user?.name }`} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </nav>
        ) : (
          <Button className='hidden sm:flex' onClick={signIn}>Sign In</Button>
        )
      }
    </div>
  )
}


