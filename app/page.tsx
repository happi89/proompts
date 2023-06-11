import Feed from '@/components/Feed';

export const metatdata = {
  title: 'Proompts'
}

export const Home = async () => {
  const prompts = await fetch('http://localhost:3000/api/prompt', {
    method: 'GET',
    cache: 'no-store'
  }).then(res => res.json())
  console.log("🚀 ~ file: page.tsx:19 ~ Home ~ prompts:", prompts)

  return (
    <section className="flex-col w-full mt-12 flex-center">
      <h1 className='text-6xl font-bold text-center'>
        Discover & Share
      </h1>
      <br className="max-md:hidden" />
      <span className='text-6xl font-bold text-center blue_gradient'>Ai Powered Prompts</span>
      <p className="text-center desc">Proompts is an open source AI Proompting tool for the AI world to discorver, create & share creative PROOMPTS</p>
      <Feed prompts={prompts} />
    </section>
  )
}

export default Home;