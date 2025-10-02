import { useParams } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import VideoItem from "./video_item";

export default function VideoMain() {
    const { id } = useParams<{ id: string }>()

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <VideoItem videoId={id} />
            <Footer />
        </div>
    )
}
