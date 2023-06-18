import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Session } from "next-auth"

export async function getCurrentUser() {
  const session: Session | null = await getServerSession(authOptions)
  console.log("🚀 ~ file: session.ts:8 ~ getCurrentUser ~ session:", session)

  return session?.user
}