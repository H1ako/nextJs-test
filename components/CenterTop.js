import { ChevronDownIcon } from "@heroicons/react/outline"

function CenterTop() {
    return (
        <div className="p-10 h-[300px] flex bg-gradient-to-b items-end from-yellow-600 to-black">
            <div className="basis-40 shrink overflow-hidden aspect-square">
                <img src="/PlaylistImg.jpg" className="object-cover w-full h-full"/>
            </div>
            <div className="pl-10 flex flex-col text-white">
                <div className="uppercase">Playlist</div>
                <div className="text-3xl font-bold">Music For Coding/Focus</div>
            </div>
            <div className="shrink-0 p-1 ml-auto text-white items-center bg-black rounded-3xl self-start flex">
                <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
                    <img src="/PlaylistImg.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="whitespace-nowrap p-2">Sonny Sangha</div>
                <ChevronDownIcon className="w-5 h-5"/>
            </div>
        </div>
    )
}

export default CenterTop
