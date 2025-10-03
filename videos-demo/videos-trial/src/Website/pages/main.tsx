import { VideosAction } from "../actions/videos_action"
import VideoThumbnail from "../../Components/video_thumbnail"

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
                        <a href={`/video-item/${video.id}`} className="border-2 border-amber-800 rounded-lg shadow bg-amber-50 px-3 py-3 cursor-pointer" key={video.id}>
                            <VideoThumbnail video={video} />
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
