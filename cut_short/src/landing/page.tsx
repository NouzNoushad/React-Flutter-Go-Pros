import Banner from "./banner";
import CreateShort from "./create";
import MainHeader from "./header";
import Home from "./home";

export default function MainPage() {
    return (
        <>
            <MainHeader />
            <Home />
            <Banner />
            <CreateShort />
        </>
    )
}
