import MainFooter from "../footer";
import MainHeader from "../header";
import AddCourse from "./pages/add_course";

export default function AddCourseHome() {
    return (
        <div className="w-full flex-1 h-full overflow-x-hidden overflow-y-auto min-h-screen flex flex-col">
            <MainHeader />
            <div className="flex-1">
                <AddCourse />
            </div>
            <MainFooter />
        </div>
    )
}
