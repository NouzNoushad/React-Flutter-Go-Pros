import { useRef, useState } from "react";
import { BASE_URL } from "../Lib/APINetwork/EndPoints";
import { formatDuration } from "../Lib/Constants";

type VideoType = {
    id: string;
    title: string;
    thumbnail: string;
    duration: number;
}

export default function VideoThumbnail({ video }: { video: VideoType }) {
    const [currentFrame, setCurrentFrame] = useState(1)
    const intervalRef = useRef<number | null>(null)

    const startPreview = () => {
        let frame = 1
        const previewCount = 12
        intervalRef.current = window.setInterval(() => {
            frame = frame >= previewCount ? 1 : frame + 1
            setCurrentFrame(frame)
        }, 300)
    }

    const stopPreview = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        setCurrentFrame(1)
    }

    return (
        <div onMouseEnter={startPreview} onMouseLeave={stopPreview} className="h-[150px]  border-2 border-amber-300 bg-amber-100 rounded-lg relative">
            <img src={`${BASE_URL}/uploads/videos/processed/${video.id}/thumb${String(currentFrame).padStart(3, "0")}.jpg`} className="rounded-lg w-full h-full" />
            <div className="absolute right-0 bottom-0 text-xs bg-amber-300 rounded-tl-md px-2 py-1">
                {formatDuration(video.duration) + ' h'}
            </div>
        </div>
    )
}
