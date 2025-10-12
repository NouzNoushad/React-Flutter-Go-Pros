import type { Course } from "../../../../Lib/APINetwork/APIResponse";
import MainCoursesSearch from "./courses_search";

export default function MainCoursesHeader({ courses }: { courses: Course[] }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-10">
            <div className="flex w-full items-center space-x-2 bg-gray-100 border border-gray-300 rounded-md px-2 py-2">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </span>
                <MainCoursesSearch courses={courses} />
            </div>
            <div className="flex flex-col sm:flex-row w-full items-center justify-end gap-3">
                <a href='/admin/add-course' className='border border-reply-dark-color text-reply-color px-5 py-3 rounded-md text-sm font-normal focus:outline-none foucs:ring-0'>Add Course</a>
            </div>
        </div>
    )
}
