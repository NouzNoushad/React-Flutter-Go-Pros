import { useUploadStore } from "../../Store/UploadStore"
import { UploadVideoAction } from "../actions/upload_action"

export default function VideoUploadForm() {
    const { setVideoFile, videoFile } = useUploadStore()
    const { handleFormSubmit } = UploadVideoAction()

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0])
        }

        e.target.value = ""
    }

    return (
        <div className="w-full max-w-[500px] mx-auto">
            <form onSubmit={handleFormSubmit} className="flex flex-col items-center gap-5" >
                {/* Title */}
                < input type="text" name="title" className="w-full bg-amber-200 border border-black px-2 py-2 rounded-md text-sm cursor-pointer" placeholder="Enter Title" />
                {/* Video */}
                < input type="file" id="video-upload" accept="video/mp4,video/x-m4v,video/*" onChange={handleUploadFile} hidden />
                <label htmlFor="video-upload" className={`w-full bg-amber-200 border border-black px-2 py-2 rounded-md text-sm cursor-pointer ${(videoFile && videoFile.name) ? 'text-black' : 'text-black/50'}`}>{(videoFile && videoFile.name) ? videoFile.name : 'Select Video'}</label>
                {/* Description */}
                <textarea name="description" id="" rows={4} className="w-full bg-amber-200 border border-black px-2 py-2 rounded-md text-sm cursor-pointer" placeholder="Enter Description"></textarea>
                {/* Button */}
                <button type="submit" className="text-sm font-medium bg-amber-600 text-white rounded-md px-2 py-2 border border-black min-w-[200px] cursor-pointer">Upload</button>
            </form >
        </div>
    )
}
