import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { errorsState } from '../atoms/errorAtom'
import Center from '../components/Center'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'

export default function Home() {
  const [errors, setErrors] = useRecoilState(errorsState)

  return (
    <div className="">
      {errors != false &&
        <div role='errors' className="left-0 right-0 mx-auto fixed scrollbar-hide overflow-y-auto max-w-[80%] max-h-[60vh] z-50 rounded-2xl px-5 py-3 text-red-400 bg-red-300 top-10">
            <button className='absolute right-2 top-2' onClick={() => setErrors([])}>Close</button>
            <h1>Errors Occured</h1>
            {errors.map((error, num) => (
                <div className='flex items-center'>
                  <div className='p-3'>{num+1}</div>
                  <h5 key={`error-${num}`} className='border-2 p-2 mt-1 rounded-2xl border-red-400'>{error}</h5>
                </div>
            ))}
        </div>
        }
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex-shrink bg-black flex'>
        <Sidebar/>
        <Center/>
      </main>

      <div className="fixed w-full bottom-0">
        <Player/>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    }
  }
}