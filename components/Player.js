import { SwitchHorizontalIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline"
import { ReplyIcon, PauseIcon, PlayIcon, FastForwardIcon, RewindIcon, VolumeUpIcon, VolumeOffIcon } from "@heroicons/react/solid"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { errorsState } from "../atoms/errorAtom"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import useSpotify from "../hooks/useSpotify"
import useSongInfo from "../hooks/useSongInfo"
import { debounce } from "lodash"

function Player() {
    const {data: session, status} = useSession()
    const spotifyApi = useSpotify()
    const [errors, setErrors] = useRecoilState(errorsState)
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo()

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log(`Now Playing: ${data.body?.item}`)
                setCurrentTrackId(data.body?.item?.id)

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing)
                })
            })

        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if (data.body?.is_playing) {
                spotifyApi.pause().catch(err => setErrors([err.toString(), ...errors]))
                setIsPlaying(false)
            } else {
                spotifyApi.play().catch(err => setErrors([err.toString(), ...errors]))
                setIsPlaying(true)
            }
        })
    }

    const debouncedAdjustVolume = useCallback(
        debounce(volume => {
            spotifyApi.setVolume(volume).catch(err => setErrors([err.toString(), ...errors]))

        }, 500),
        []
    )

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong()
            setVolume(50)
        }
    }, [currentTrackIdState, spotifyApi, session])

    useEffect(() =>{
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume])

    return (
        <div role='player' className="bg-gradient-to-b grid grid-cols-3 text-xs md:text-base px-2 md:px-8 from-black to-gray-900 h-24 text-white">
            <div className="flex items-center space-x-4">
                <img src={songInfo?.album?.images?.[0]?.url} alt="" className="hidden md:inline w-10 h-10"/>
                <div className="">
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button"/>
                <RewindIcon className="button" />
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                )}
                <FastForwardIcon className="button" />
                <ReplyIcon className='button' />
            </div>
            <div className="flex items-center space-x-3 lg:space-x-4 justify-end pr-5">
                {volume == 0 ? (
                    <VolumeOffIcon class='button'/>
                ) : (
                    <VolumeDownIcon className="button" onClick={() => volume > 0 && setVolume(volume-10)}/>
                )}
                <input onChange={e => setVolume(Number(e.target.value))} className="w-14 md:w-28 rounded-lg overflow-hidden appearance-none bg-gray-400" value={volume} type="range"  min={0} max={100}/>
                <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume+10)} className="button" />
            </div>
        </div>
    )
}

export default Player
