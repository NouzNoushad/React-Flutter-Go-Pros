import { useUploadStore } from "../../Store/UploadStore"

export default function PreviewVideo() {
    const { videoFile, setVideoFile } = useUploadStore()
    return (
        <div>
            {
                videoFile && (
                    <div className="">
                        <h1 className="text-sm mb-1 font-normal">Preview:</h1>
                        <div className="relative">
                            <button onClick={() => setVideoFile(null)} className="absolute top-[-16px] right-[-16px] h-8 w-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer">X</button>
                            <video width={300} controls src={URL.createObjectURL(videoFile)}></video>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
