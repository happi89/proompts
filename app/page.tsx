import Feed from '@/components/Feed';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proompts',
  description: 'share & save your AI Prompts'
}

const Home = async () => {
  const prompts = await fetch(`${ process.env.URL }/api/prompt`, {
    cache: 'no-store',
  }).then(res => res.json())

  return (
    <section className="flex-col w-full mt-12 flex-center">
      <h1 className='text-6xl font-bold text-center'>
        Discover & Share
      </h1>
      <br className="max-md:hidden" />
      <span className='text-6xl font-bold text-center blue_gradient'>Ai Powered Prompts</span>
      <p className="text-center desc">Proompts is an open source AI Proompting tool for the AI world to discorver, create & share creative PROOMPTS</p>
      <Feed p={prompts} />
    </section>
  )
}

export default Home;