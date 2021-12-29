import { ChevronDownIcon } from "@heroicons/react/outline"
import {signOut, useSession} from 'next-auth/react'
import {useState, useEffect} from 'react'
import {shuffle} from 'lodash'
import { useRecoilValue,  useRecoilState} from "recoil"
import { playlistState, playlistIdState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify"
import Songs from "./Songs"

const colors = [
    'from-red-600',
    'from-yellow-600',
    'from-green-600',
    'from-purple-600',
    'from-blue-600',
    'from-gray-400',
    'from-pink-600',
    'from-lime-600'
]

function Center() {
    const {data: session, status} = useSession()
    const spotifyApi = useSpotify()
    const [color, setColor] = useState(null)
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then(data => {
            setPlaylist(data.body)
        })
        .catch(error => console.log(error))
    }, [spotifyApi, playlistId])

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId])

    return (
        <section role='main-content' className="h-screen scrollbar-hide flex-grow overflow-y-auto pb-36">
            <header className={`relative p-10 h-80 bg flex bg-gradient-to-b items-end ${color} to-black`}>
                <div className="basis-40 min-w-[5rem] overflow-hidden aspect-square">
                    <img src={playlist?.images?.[0]?.url} className="object-cover w-full h-full"/>
                </div>
                <div className="pl-10 flex w-full flex-col text-white">
                    <div className="uppercase">{playlist?.type}</div>
                    <div className="text-3xl w-full font-bold break-all">{playlist?.name}</div>
                </div>
                <button onClick={signOut} className="shrink-0 absolute top-5 right-8 p-1 text-white items-center bg-black rounded-full self-start flex">
                    <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
                        <img src={session?.user.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="whitespace-nowrap p-2">{session?.user.name}</div>
                    <ChevronDownIcon className="w-5 h-5"/>
                </button>
            </header>
            <Songs />
        </section>
    )
}

export default Center
