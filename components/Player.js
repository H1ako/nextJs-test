import { VolumeUpIcon } from "@heroicons/react/outline"
import { VolumeUpIcon as VolumeUpIconSolid } from "@heroicons/react/solid"

function Player() {
    return (
        <div role='player' className="bg-gradient-to-b from-black to-blue-900 flex justify-between p-3">
            <div className=""></div>
            <div className=""></div>
            <div className="">
                <VolumeUpIcon />
                <div className="" />
                <VolumeUpIconSolid />
            </div>
        </div>
    )
}

export default Player
