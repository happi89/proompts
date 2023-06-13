import { PromptForm } from "@/components/PromptForm"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import type { Session as T } from "next-auth/core/types"
import { redirect, useRouter } from "next/navigation"

export interface Session extends T {
  user: {
    id: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };

}

const createPrompt = async () => {
  const session: Session | null = await getServerSession(authOptions)

  if (!session?.user) {
    throw redirect('/api/auth/signin')
  }

  return (
    <PromptForm session={session!} type='Create' />
  )
}


export default createPrompt