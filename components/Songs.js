import {useRecoilState, useRecoilValue} from 'recoil'
import { millisToMinutesAndSeconds } from '../lib/time'
import { playlistState } from '../atoms/playlistAtom'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import { useState } from 'react'
import useSpotify from '../hooks/useSpotify'
import { errorsState } from '../atoms/errorAtom'

function Songs() {
    const spotifyApi = useSpotify()
    const playlist = useRecoilValue(playlistState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [errors, setErrors] = useRecoilState(errorsState)

    const playSong = (track) => {
        setCurrentTrackId(track.track?.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.track?.uri],
        }).catch(err => setErrors([err.toString(), ...errors]))
    }

    return (
        <div className="flex flex-col px-10 text-gray-400">
            {playlist?.tracks.items.map((track, num) => 
                <button onClick={() => playSong(track)} key={track.track?.id} className="grid grid-cols-2 items-center px-5 py-4 rounded-lg hover:bg-slate-900">
                    <div className="flex space-x-4 items-center">
                        <div className="">{num+1}</div>
                        <div className="shrink-0 w-9 h-9 overflow-hidden">
                            <img src={track.track?.album?.images?.[0]?.url} className="w-full h-full object-cover"/>
                        </div>
                        <div className="text-left">
                            <div className="text-white w-36 lg:w-64 truncate">{track.track?.name}</div>
                            <div className="w-40 lg:w-64 truncate">{track.track?.artists?.[0]?.name}</div>
                        </div>
                    </div>
                    <div className="flex text-left ml-auto md:ml-0 items-center justify-between">
                        <div className="w-40 hidden md:inline">{track.track?.album?.name}</div>
                        <div className="">{millisToMinutesAndSeconds(track.track?.duration_ms)}</div>
                    </div>
                </button>)}
        </div>
    )
}

export default Songs
