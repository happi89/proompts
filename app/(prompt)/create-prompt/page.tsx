import PromptForm from "@/components/PromptForm"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/utils/session"



const createPrompt = async () => {
  const user = await getCurrentUser()

  if (!user) {
    throw redirect('/api/auth/signin')
  }

  return (
    <PromptForm user={user!} type='Create' />
  )
}


export default createPrompt