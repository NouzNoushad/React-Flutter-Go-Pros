import MainCourses from "./courses/courses";
import MainFooter from "./footer";
import MainHeader from "./header";

export default function AdminHome() {
    return (
        <div className="w-full flex-1 h-full overflow-x-hidden overflow-y-auto min-h-screen flex flex-col">
            <MainHeader />
            <div className="flex-1">
                <MainCourses />
            </div>
            <MainFooter />
        </div>
    )
}
