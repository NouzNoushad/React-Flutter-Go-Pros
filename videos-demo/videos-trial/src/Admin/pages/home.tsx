import VideoUploadForm from "./form"
import PreviewVideo from "./video"

export default function AdminHome() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-8 px-5">
            <h1 className="text-lg font-semibold">Upload Video</h1>
            {/* Video */}
            <PreviewVideo />
            {/* Form */}
            <VideoUploadForm />
        </div>
    )
}
