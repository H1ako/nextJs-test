import {
    HomeIcon,
    LibraryIcon,
    SearchIcon,
    HeartIcon,
    RssIcon,
    PlusCircleIcon
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import {useEffect, useState} from 'react'
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
    const spotifyApi = useSpotify()
    const {data: session, status} =  useSession()
    const [playlists, setPlaylists] = useState([])
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
            }) 
        }
    }, [session, spotifyApi])
    return (
        <section role='sidebar' className="lg:max-w-[15rem] pb-36 sm:max-w-[12rem] sm:text-sm lg:text-lg md:inline-flex flex-none scrollbar-hide scroll-smooth overflow-y-auto text-gray-400 flex-col h-screen bg-black p-5 hidden">
            <div>
                <button className="pb-4 flex items-center hover:text-white">
                    <HomeIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Home</span>
                </button>
                <button className="pb-4 flex items-center hover:text-white">
                    <SearchIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Search</span>
                </button>
                <button className="pb-4 flex items-center hover:text-white">
                    <LibraryIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Your Library</span>
                </button>
                <hr className='w-full border-t-[0.1px] border-gray-900 pb-2 pt-2'/>
            </div>
            <div>
                <button className="pb-4 flex items-center hover:text-white">
                    <PlusCircleIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Create Playlist</span>
                </button>
                <button className="pb-4 flex items-center hover:text-white">
                    <HeartIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Liked Songs</span>
                </button>
                <button className="pb-4 flex items-center hover:text-white">
                    <RssIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Your Episodes</span>
                </button>
                <hr className='w-full border-t-[0.1px] border-gray-900 pb-2 pt-2'/>
            </div>
            <div>
                {playlists.map(playlist => 
                    <button onClick={() => setPlaylistId(playlist.id)} key={playlist.id} className="ml-1 break-all text-left w-full pb-4 flex items-center hover:text-white">
                       {playlist.name}
                    </button>
                )}
            </div>
        </section>
    )
}

export default Sidebar