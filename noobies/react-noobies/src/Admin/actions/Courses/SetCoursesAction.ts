import { useCoursesStore } from "../../../Store/Admin/CoursesStore"

export const SetCoursesAction = () => {
    const { currentPage, limit, courses } = useCoursesStore()

    const sortCourses = [...courses].sort((a, b) => b.created_at.localeCompare(a.created_at))

    const paginatedItems = sortCourses.slice(
        (currentPage - 1) * limit,
        currentPage * limit
    )

    return {
        sortCourses,
        paginatedItems,
    }
}