import Footer from "../footer";
import Header from "../header";
import Courses from "./pages/courses";

export default function HomePage() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-1">
                <Courses />
            </div>
            <Footer />
        </div>
    )
}
