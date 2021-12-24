import Head from 'next/head'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=' bg-black flex w-screen'>
        <Sidebar/>
        <Center/>
      </main>

      <div className="">
        {/* Player */}
      </div>
    </div>
  )
}
