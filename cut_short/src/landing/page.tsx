import Banner from "./banner";
import CreateShort from "./create";
import MainHeader from "./header";
import Home from "./home";
import Story from "./story";

export default function MainPage() {
    return (
        <>
            <MainHeader />
            <Home />
            <Banner />
            <CreateShort />
            <Story />
        </>
    )
}
