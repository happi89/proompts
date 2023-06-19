"use client"

import Link from 'next/link'
import { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from "../ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Username must be atleast 4 character'
  }).max(20, {
    message: 'Username must not be longer then 20 characters'
  }),
})

const UsernameForm = ({ user }: any) => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user ? user?.username : '',
    },
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/users/${ user?.id }`, {
        method: 'PUT',
        body: JSON.stringify({
          ...values,
          oldUsername: user?.username
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })


      if (res?.ok) {
        toast({
          title: "Username updated Successfully!",
        })
        router.refresh()
      } else {
        toast({
          title: `ERROR: ${ res.statusText }`,
          variant: 'destructive'
        })
      }
      setSubmitting(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-lg mt-8 space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input disabled={submitting} placeholder="Write your Username Proompt here!" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display Username.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end w-full max-w-lg gap-4">
          <Button asChild variant='destructive'>
            <Link href="">Cancel</Link>
          </Button>
          <Button
            disabled={submitting || form.getValues('username') === user?.username}
            type="submit">
            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Update Username
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UsernameForm