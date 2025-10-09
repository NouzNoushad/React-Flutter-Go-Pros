import { CoursesAction } from "../actions/CoursesAction";
import MainCoursesHeader from "./courses_header";
import MainCoursesTable from "./courses_table";

export default function MainCoursesCard() {
    const { coursesData, coursesError, isCoursesLoading } = CoursesAction()

    if (isCoursesLoading) {
        return (
            <div className="text-center py-10">
                <span className='text-gray-500 text-sm'>Loading...</span>
            </div>
        )
    }
    if (coursesError) {
        return (
            <div className="text-center py-10">
                <p>Failed to load courses</p>
            </div>
        )
    }

    const courses = Array.isArray(coursesData?.courses) ? coursesData.courses : []
    if (courses.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>Courses not found</p>
            </div>
        )
    }

    return (
        <div className="px-8 py-9 w-full rounded-md ring-1 ring-gray-300 space-y-5 shadow-md relative">
            {/* Main Courses Header */}
            <MainCoursesHeader courses={courses} />
            {/* Main Courses Table */}
            <div className="w-full overflow-x-auto overflow-y-hidden">
                <MainCoursesTable />
            </div>
            {/* Page & Pagination */}
            {/* <PagePagination /> */}
        </div>
    )
}
