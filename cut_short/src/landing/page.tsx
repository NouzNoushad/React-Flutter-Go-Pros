import Banner from "./banner";
import CreateShort from "./create";
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
        </>
    )
}
