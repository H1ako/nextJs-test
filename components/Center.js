import CenterBottom from "./CenterBottom"
import CenterTop from "./CenterTop"

function Center() {
    return (
        <div className="ml-[220px] h-screen flex-grow overflow-y-auto">
            <CenterTop/>
            <CenterBottom/>
        </div>
    )
}

export default Center
