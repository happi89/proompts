
'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "../ui/dropdown-menu"
import {
  Avatar, AvatarImage, AvatarFallback
} from '../ui/avatar'
import { signOut, signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Link from 'next/link'

export default function MobileNav({ user }: any) {
  return <div>

    {user ? <nav className='flex w-16 sm:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image ? user?.image : "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href='create-prompt'>Create Prompt</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='profile'>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={() => signOut()}>Sign Out</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav> : <Button className='flex sm:hidden' onClick={signIn}>Sign In</Button>}
  </div>;
}
