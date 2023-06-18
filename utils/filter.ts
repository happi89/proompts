export const getNewPrompts = async (filter: string) => {
  const newPrompts = await fetch(`/api/prompt/filter?filter=${ filter }`, {
    cache: 'no-store'
  }).then(res => res.json())
  console.log("🚀 ~ file: filter.ts:4 ~ getNewPrompts ~ newPrompts:", newPrompts)

  return newPrompts
}

export const getNewProfilePrompts = async (filter: string) => {
  const newPrompts = await fetch(`/api/users/filter?filter=${ filter }`, {
    cache: 'no-store'
  }).then(res => res.json())
  console.log("🚀 ~ file: filter.ts:13 ~ getNewProfilePrompts ~ newPrompts:", newPrompts)

  return newPrompts
}


export const getNewUserPrompts = async (filter: string, id: string | null | undefined) => {
  const newPrompts = await fetch(`/api/profile/filter?filter=${ filter }&id=${ id }`, {
    cache: 'no-store'
  }).then(res => res.json())
  console.log("🚀 ~ file: filter.ts:13 ~ getNewUserPrompts ~ newPrompts:", newPrompts)

  return newPrompts
}