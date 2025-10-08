import React from 'react'
import { CoursesAction } from '../../actions/Courses/CoursesAction';
import { useAddModuleStore } from '../../../Store/Admin/AddModuleStore';
import { ChevronDownIcon } from 'lucide-react'

export default function SelectCourse() {
    const { coursesData } = CoursesAction()
    const { selectedCourse, setSelectedCourse } = useAddModuleStore()

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const course = coursesData?.courses.find((course) => course.id === selectedId) || null
        setSelectedCourse(course)
    }

    if (!coursesData || coursesData.courses.length <= 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>No main courses found. please add course to proceed</p>
            </div>
        )
    }

    return (
        <div className="">
            <h6 className='text-[13.5px] font-medium'>Course<span className='text-red-500'>*</span></h6>
            <div className="relative mt-2">
                <select value={selectedCourse?.id} onChange={handleCourseChange} name='course' aria-label="course" className={`w-full border px-3 py-3 bg-input-color rounded-md appearance-none border-black text-sm focus:outline-none focus:ring-0 cursor-pointer`}>
                    <option value="" className='hidden'>Select course</option>
                    {
                        coursesData?.courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                        ))
                    }
                </select>
                <ChevronDownIcon className='pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 size-4 text-gray-500' />
            </div>
        </div>
    )
}
