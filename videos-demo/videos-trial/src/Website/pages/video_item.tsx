import Player from "../../Components/VideoPlayer";
import { BASE_URL } from "../../Lib/APINetwork/EndPoints";
import { VideoAction } from "../actions/video_action";

export default function VideoItem({ videoId }: { videoId: string | undefined }) {
    const { videoData, videoError, isVideoLoading } = VideoAction(videoId)

    if (isVideoLoading) {
        <div className="text-center py-10">
            <span className='text-gray-500 text-sm'>Loading...</span>
        </div>
    }
    if (videoError) {
        <div className="text-center py-10">
            <p>Failed to load video</p>
        </div>
    }
    if (!videoData) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>Video not found</p>
            </div>
        )
    }
    return (
        <div className="flex-1">
            <div className="my-[4rem] container-md w-full px-5">
                <div className=" px-2 flex flex-col items-center">
                    <div className="">
                        <Player src={`${BASE_URL}/${videoData.video.hls_path}`} />
                    </div>
                    <h1 className="mt-2 font-medium capitalize">{videoData.video.title}</h1>
                </div>
            </div>
        </div>
    )
}
