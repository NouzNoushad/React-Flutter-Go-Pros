import { BASE_URL } from "../../Lib/APINetwork/EndPoints"
import { formatDuration } from "../../Lib/Constants"
import { VideosAction } from "../actions/videos_action"

export default function VideosMain() {
    const { videosData, videosError, isVideosLoading } = VideosAction()

    if (isVideosLoading) {
        <div className="text-center py-10">
            <span className='text-gray-500 text-sm'>Loading...</span>
        </div>
    }
    if (videosError) {
        <div className="text-center py-10">
            <p>Failed to load videos</p>
        </div>
    }
    if (!videosData || videosData.videos.length <= 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>Videos not found</p>
            </div>
        )
    }

    return (
        <div className="flex-1 my-[4rem] container-md w-full">
            <div className="mt-2 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
                {
                    videosData.videos.map((video) => (
                        <a href="/video-item" className="border-2 border-amber-800 rounded-lg shadow bg-amber-50 px-3 py-3 cursor-pointer" key={video.id}>
                            <div className="h-[150px]  border-2 border-amber-300 bg-amber-100 rounded-lg relative">
                                <img src={`${BASE_URL}/${video.thumbnail}`} className="rounded-lg w-full h-full" />
                                <div className="absolute right-0 bottom-0 text-xs bg-amber-300 rounded-tl-md px-2 py-1">
                                    {formatDuration(video.duration) + ' h'}
                                </div>
                            </div>
                            <div className="mt-2">
                                <h2 className="font-medium capitalize text-[15px]">{video.title}</h2>
                            </div>
                        </a>
                    ))
                }
            </div>
        </div>
    )
}
