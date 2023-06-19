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
import { Prompt } from "./prompt/PromptCard"
import { Loader2 } from "lucide-react"

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

const PromptForm = ({ user, type, prompt }: { user: any, type: string, prompt?: Prompt }) => {
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: prompt ? prompt?.body : "",
      tag: prompt ? prompt?.tag : "",
    },
  })

  async function createPrompt(values: z.infer<typeof formSchema>) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          user
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })


      if (res?.ok) {
        toast({
          title: "Prompt created Successfully!",
        })
        router.prefetch('/')
        router.push('')
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

  async function updatePrompt(values: z.infer<typeof formSchema>) {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/prompt/${ prompt?.id }`, {
        method: 'PUT',
        body: JSON.stringify({
          ...values,
          user
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      toast({
        title: "Prompt Updated Successfully!",
      })

      setSubmitting(false)
      router.prefetch('/')
      router.push('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    prompt ? updatePrompt(values) : createPrompt(values)
  }


  return (
    <>
      <h1 className='w-full max-w-lg mt-12 text-3xl font-bold blue_gradient text-start'>{type} Prompt</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-lg mt-8 space-y-8">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea rows={10} disabled={submitting} placeholder="Write your AWSOME Proompt here!" {...field} />
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
          <div className="flex items-center justify-end w-full max-w-lg gap-4">
            <Button asChild variant='destructive'>
              <Link href="">Cancel</Link>
            </Button>
            <Button
              disabled={submitting}
              type="submit">
              {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {type} Prompt
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default PromptForm