/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react"
import { debounce } from "lodash"
import type { Course } from "../../../../Lib/APINetwork/APIResponse"
import { useCoursesStore } from "../../../../Store/Admin/CoursesStore"
import { PaginationLimit } from "../../../../Lib/Constants"

export const CoursesSearchAction = (originalCourses: Course[]) => {

    const { searchQuery, setSearchQuery, setCourses, setLimit } = useCoursesStore()

    // search courses
    const searchCourses = useCallback(
        debounce((query: string, courses: Course[]) => {
            const searchList = courses.filter((category) => {
                const sQuery = query.trim().toLowerCase()

                const userName = category.title.trim().toLowerCase()

                return (
                    userName.includes(sQuery)
                )
            })

            setCourses(searchList)

        }, 300), [searchQuery]
    )

    useEffect(() => {
        searchCourses(searchQuery, originalCourses)
        return () => searchCourses.cancel()
    }, [searchQuery, originalCourses])

    useEffect(() => {
        setLimit(PaginationLimit)
        setSearchQuery('')
    }, [])

    return {
        setSearchQuery,
    }
}