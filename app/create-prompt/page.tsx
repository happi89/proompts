import { PromptForm } from "@/components/PromptForm"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import type { Session as T } from "next-auth"
import { redirect, useRouter } from "next/navigation"

interface Session extends T {
  id: string
}

const createPrompt = async () => {
  const session: Session | null = await getServerSession(authOptions)
  console.log("🚀 ~ file: page.tsx:13 ~ createPrompt ~ session:", session)

  if (!session?.user) {
    throw redirect('/api/auth/signin')
  }

  return (
    <PromptForm session={session!} type='Create' />
  )
}


export default createPrompt