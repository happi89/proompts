import { PromptForm } from '@/components/PromptForm'
import Prompt from '@/models/prompt';
import { getCurrentUser } from '@/utils/session'
import React from 'react'

const UpdatePromptPage = async ({ params }: any) => {
  const user = await getCurrentUser();

  const prompt = await Prompt.findById(params?.id)

  return (
    <PromptForm type='Update' user={user} prompt={prompt} />
  )
}

export default UpdatePromptPage