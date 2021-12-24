import {
    HomeIcon,
    LibraryIcon,
    SearchIcon,
    HeartIcon,
    RssIcon,
    PlusCircleIcon
} from '@heroicons/react/outline'

function Sidebar() {
    return (
        <div className="flex scroll-smooth overflow-y-auto text-gray-400 flex-col w-[220px] h-screen fixed top-0 left-0 bg-black p-5">
            <div>
                <button className="pb-4 flex items-center hover:text-white hover:font-medium">
                    <HomeIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Home</span>
                </button>
                <button className="pb-4 flex items-center hover:text-white hover:font-medium">
                    <SearchIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Search</span>
                </button>
                <button className="pb-4 flex items-center hover:text-white hover:font-medium">
                    <LibraryIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Your Library</span>
                </button>
                <hr className='w-full border-t-[0.1px] border-gray-900 pb-2 pt-2'/>
            </div>
            <div>
                <button className="pb-4 flex items-center hover:text-white hover:font-medium">
                    <PlusCircleIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Create Playlist</span>
                </button>
                <button className="pb-4 flex items-center hover:text-white hover:font-medium">
                    <HeartIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Liked Songs</span>
                </button>
                <button className="pb-4 flex items-center hover:text-white hover:font-medium">
                    <RssIcon className='h-5 w-5'/>
                    <span className="ml-1 whitespace-nowrap">Your Episodes</span>
                </button>
                <hr className='w-full border-t-[0.1px] border-gray-900 pb-2 pt-2'/>
            </div>
            <div>
                <button className="w-full pb-4 flex items-center hover:text-white hover:font-medium">
                    <span className="ml-1 text-left">Tropical Feelz</span>
                </button>
                <button className="w-full pb-4 flex items-center hover:text-white hover:font-medium">
                    <span className="ml-1 text-left">Music For Coding/Focus</span>
                </button>
                <button className="w-full pb-4 flex items-center hover:text-white hover:font-medium">
                    <span className="ml-1 text-left">Chillout 2021</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar