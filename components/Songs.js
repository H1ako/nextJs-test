import {useRecoilValue} from 'recoil'
import { millisToMinutesAndSeconds } from '../lib/time'
import { playlistState } from '../atoms/playlistAtom'

function Songs() {
    const playlist = useRecoilValue(playlistState)

    return (
        <div className="flex pb-5 flex-col px-10 text-gray-400">
            {playlist?.tracks.items.map((track, num) => 
                <button key={track.track?.id} className="grid grid-cols-2 items-center px-5 py-4 rounded-lg hover:bg-slate-900">
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
