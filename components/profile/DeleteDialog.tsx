'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

export default function DeleteDialog({ userId }: { userId: string }) {
  const router = useRouter()
  const { toast } = useToast()

  const deleteAccount = async () => {
    try {
      const res = await fetch(`/api/users/${ userId }`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast({
          title: res.statusText
        })
        router.push('')
        signOut({ redirect: false })
      }

    } catch (error) {
      console.log("🚀 ~ file: DeleteDialog.tsx:38 ~ deleteAccount ~ error:", error)
      toast({
        title: `ERROR: ${ error }`
      })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteAccount} className={buttonVariants({ variant: "destructive" })}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
