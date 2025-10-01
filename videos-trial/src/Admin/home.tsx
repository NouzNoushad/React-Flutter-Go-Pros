import { useState } from "react"

export default function AdminHome() {
    const [videoFile, setVideoFile] = useState<File | null>(null)

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0])
        }

        e.target.value = ""
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-8 px-5">
            <h1 className="text-lg font-semibold">Upload Video</h1>
            {/* Video */}
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
            {/* Form */}
            <form className="flex flex-col items-center gap-5 w-full max-w-[500px]">
                {/* Title */}
                <input type="text" name="title" className="w-full bg-amber-200 border border-black px-2 py-2 rounded-md text-sm cursor-pointer" placeholder="Enter Title" />
                {/* Video */}
                <input type="file" id="video-upload" accept="video/mp4,video/x-m4v,video/*" onChange={handleUploadFile} hidden />
                <label htmlFor="video-upload" className={`w-full bg-amber-200 border border-black px-2 py-2 rounded-md text-sm cursor-pointer ${(videoFile && videoFile.name) ? 'text-black' : 'text-black/50'}`}>{(videoFile && videoFile.name) ? videoFile.name : 'Select Video'}</label>
                {/* Button */}
                <button className="text-sm font-medium bg-amber-600 text-white rounded-md px-2 py-2 border border-black min-w-[200px] cursor-pointer">Upload</button>
            </form>
        </div>
    )
}
