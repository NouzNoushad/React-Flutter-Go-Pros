import Footer from "./footer";
import Header from "./header";
import VideoItem from "./video_item";

export default function VideoMain() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <VideoItem />
            <Footer />
        </div>
    )
}
