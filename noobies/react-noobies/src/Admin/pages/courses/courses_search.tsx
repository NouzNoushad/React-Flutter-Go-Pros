import type { Course } from "../../../Lib/APINetwork/APIResponse";
import { CoursesSearchAction } from "../../actions/CoursesSearchAction";

export default function MainCoursesSearch({courses}: {courses: Course[]}) {
    const { setSearchQuery } = CoursesSearchAction(courses)

    return (
        <span className='flex-1'>
            <input type="text" placeholder='Search by title' className='w-full text-sm p-1 bg-transparent focus:outline-none focus:ring-0 placeholder:text-gray-400' onChange={(e) => setSearchQuery(e.target.value)} />
        </span>
    )
}
