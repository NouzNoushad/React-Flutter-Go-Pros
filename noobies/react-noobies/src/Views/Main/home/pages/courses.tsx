import { CoursesAction } from "../actions/CoursesAction"

export default function Courses() {
    const { coursesData, coursesError, isCoursesLoading } = CoursesAction()

    if (isCoursesLoading) {
        <div className="text-center py-10">
            <span className='text-gray-500 text-sm'>Loading...</span>
        </div>
    }
    if (coursesError) {
        <div className="text-center py-10">
            <p>Failed to load courses</p>
        </div>
    }
    if (!coursesData || coursesData.courses.length <= 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>Courses not found</p>
            </div>
        )
    }

    return (
        <div className="flex-1 my-[4rem] container-md w-full">
            <div className="mt-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                {
                    coursesData.courses.map((course) => (
                        <a href={`/video-item/${course.id}`} className="border-2 border-black rounded-lg shadow bg-amber-50 px-3 py-3 cursor-pointer" key={course.id}>
                            <div className="h-[200px] bg-amber-200 rounded-lg"></div>
                            <div className="mt-2">
                                <h2 className="font-medium capitalize text-[15px]">{course.title}</h2>
                                <p className="font-normal text-sm">{course.description}</p>
                            </div>
                        </a>
                    ))
                }
            </div>
        </div>
    )
}
