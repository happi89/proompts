import Feed from '@/components/home/Feed';
import { getCurrentUser } from '@/utils/session';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proompts',
  description: 'share & save your AI Prompts'
}

const Home = async () => {
  const prompts = await fetch(`${ process.env.SITE_URL }/api/prompt`, {
    cache: 'no-store',
  }).then(res => res.json())

  const user = await getCurrentUser()

  return (
    <section className="flex-col w-full mt-12 flex-center">
      <h1 className='text-6xl font-bold text-center'>
        Discover & Share
      </h1>
      <br className="max-md:hidden" />
      <span className='text-6xl font-bold text-center blue_gradient'>AI Prompts</span>
      <Feed p={prompts} user={user} />
    </section>
  )
}

export default Home;