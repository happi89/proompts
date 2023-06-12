'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { block } from 'million/react';


import { Button } from '@/components/ui/button'

const NavBlock = block(
  function Nav() {
    const { data: session, status } = useSession()

    return (
      <header className="container flex items-center justify-between mt-2 h-14">
        <div className="mr-4">
          <Link href='/'>
            <h1 className='text-2xl font-medium'>
              Proompts
            </h1>
          </Link>
        </div>

        <div className="items-center justify-between flex-1 hidden space-x-2 sm:flex sm:space-x-4 md:justify-end">
          {
            session?.user ? (
              <nav className='hidden space-x-6 sm:flex'>
                <Link href='/create-prompt'><Button>Create Prompt</Button></Link>
                <Button onClick={signOut} variant="outline">Sign Out</Button>
                <Link href='/profile'>
                  <Avatar>
                    <AvatarImage src={session?.user?.image ? session?.user?.image : `https://ui-avatars.com/api/?name=${ session?.user?.name }`} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </nav>
            ) : (
              <Button className='hidden sm:flex' onClick={signIn}>Sign In</Button>
            )
          }
        </div>

        {/* Mobile Navigation */}

        {
          session?.user ? (
            <nav className='flex w-16 sm:hidden'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={session?.user?.image ? session?.user?.image : "https://github.com/shadcn.png"} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href='/create-prompt'>Create Prompt</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/profile'>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => signOut()} >Sign Out</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

          ) : (
            <Button className='flex sm:hidden' onClick={signIn}>Sign In</Button>
          )
        }
      </header>
    )
  }
)

export default NavBlock