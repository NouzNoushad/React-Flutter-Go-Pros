import Banner from "./banner";
import CreateShort from "./create";
import Features from "./features";
import Footer from "./footer";
import GetStart from "./get_start";
import MainHeader from "./header";
import Home from "./home";
import SpeedEditing from "./speed_editing";
import Story from "./story";
import VideoType from "./video_type";

export default function MainPage() {
    return (
        <>
            <MainHeader />
            <Home />
            <Banner />
            <CreateShort />
            <Story />
            <SpeedEditing />
            <VideoType />
            <Features />
            <GetStart />
            <Footer />
        </>
    )
}
