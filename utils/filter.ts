export const getNewPrompts = async (filter: string) => {
  const newPrompts = await fetch(`/api/prompt/filter?filter=${ filter }`, {
    cache: 'no-store'
  }).then(res => res.json())

  return newPrompts
}

export const getNewProfilePrompts = async (filter: string) => {
  const newPrompts = await fetch(`/api/users/filter?filter=${ filter }`, {
    cache: 'no-store'
  }).then(res => res.json())

  return newPrompts
}