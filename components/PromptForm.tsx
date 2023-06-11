"use client"

import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "./ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "./ui/use-toast"
import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import { Session } from "next-auth"

const formSchema = z.object({
  body: z.string().min(6, {
    message: 'Prompt must be atleast 6 character'
  }).max(1000, {
    message: 'Prompt must not be longer then 1000 characters'
  }),
  tag: z.string().min(2, {
    message: 'Tag must be atleast 2 character'
  }).max(60, {
    message: 'Tag must not be longer then 60 characters'
  })
})

export const PromptForm = ({ session, type }: { session: Session, type: string }) => {
  console.log("🚀 ~ file: PromptForm.tsx:40 ~ PromptForm ~ session:", session)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      tag: "",
    },
  })

  async function createPrompt(values: z.infer<typeof formSchema>,) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          user: session?.user
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log("🚀 ~ file: PromptForm.tsx:64 ~ createPrompt ~ res:", res)


      toast({
        title: "Prompt created Successfully!",
      })

      setSubmitting(false)
      router.push('/')

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <h1 className='w-full max-w-lg mt-12 text-3xl font-bold blue_gradient text-start'>{type} Prompt</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createPrompt)} className="w-full max-w-lg mt-8 space-y-8">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea disabled={submitting} placeholder="Write your AWSOME Proompt here!" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display Prompt.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Input disabled={submitting} placeholder="Tag goes here..." {...field} />
                </FormControl>
                <FormDescription>
                  Example: #webdev
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between w-full max-w-lg">
            <Link href='/'>
              <Button
                variant='destructive'
              >

                Cancel
              </Button>
            </Link>
            <Button
              disabled={submitting}
              type="submit">
              {type} Prompt
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
