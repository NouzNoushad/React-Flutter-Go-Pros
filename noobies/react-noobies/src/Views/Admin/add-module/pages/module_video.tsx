import { useAddModuleStore } from "../../../../Store/Admin/AddModuleStore"

export default function ModuleVideo() {
    const { videoFile, setVideoFile } = useAddModuleStore()

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0])
        }

        e.target.value = ""
    }

    return (
        <div className="space-y-2">
            <h6 className='text-[13.5px] font-medium'>Video</h6>
            <div className="w-full">
                <input type="file" id="video-upload" accept="video/mp4,video/x-m4v,video/*" onChange={handleUploadFile} hidden />
                <label htmlFor="video-upload" className={`w-full border inline-block border-black px-3 py-3 rounded-md text-sm cursor-pointer text-black`}>{(videoFile && videoFile.name) ? videoFile.name : 'Upload Video'}</label>
            </div>
        </div>
    )
}
