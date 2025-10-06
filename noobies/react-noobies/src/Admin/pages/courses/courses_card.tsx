import MainCoursesHeader from "./courses_header";
import MainCoursesTable from "./courses_table";

export default function MainCoursesCard() {

    return (
        <div className="px-8 py-9 w-full rounded-md ring-1 ring-gray-300 space-y-5 shadow-md relative">
            {/* Main Courses Header */}
            <MainCoursesHeader />
            {/* Main Courses Table */}
            <div className="w-full overflow-x-auto overflow-y-hidden">
                <MainCoursesTable />
            </div>
            {/* Page & Pagination */}
            {/* <PagePagination /> */}
        </div>
    )
}
