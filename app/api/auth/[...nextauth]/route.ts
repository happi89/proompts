import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { connectToDB } from "@/utils/db"
import User from "@/models/user"


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({
        email: session?.user?.email
      })

      if (!sessionUser) {
        console.log('NO active session user')
        return session
      }

      session!.user!.id = sessionUser.id.toString()
      session!.user!.username = sessionUser.username.toString()

      return Promise.resolve(session)
    },
    async signIn({ profile }: any) {
      try {

        await connectToDB()

        const query = User.where({ email: profile.email })

        const userExists = await query.findOne()

        if (!userExists) {
          const res = await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, '').length > 20 ? profile.name.replace(/\s/g, '').replace(/-/g, "").substring(0, 19).toLowerCase() : profile.name.replace(/\s/g, '').replace(/-/g, "").toLowerCase(),
            image: profile?.image || profile.picture
          })
        }
        return true
      } catch (err) {
        console.log("🚀 ~ file: route.ts:59 ~ signIn ~ err:", err)
        return false
      }
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }