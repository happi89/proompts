import Feed from "@/components/home/Feed"

interface Props {
  params: {
    id: string
  }
}

const UserPage = async ({ params }: Props) => {
  const data = await fetch(`${ process.env.URL }/api/profile/${ params?.id }`).then(res => res.json())
  const { prompts, user } = data

  return (
    <div className="w-full mt-12">
      <div className='w-full text-4xl font-bold text-center'>{user?.username.toUpperCase()}'s </div>
      <div className="text-4xl font-bold text-center blue_gradient">Prompts</div>
      <Feed user={user} p={prompts} />
    </div>
  )
}

export default UserPage