import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../../../Lib/APINetwork/BaseClients"
import { API_ENDPOINTS, getEndPoints } from "../../../Lib/APINetwork/EndPoints"
import type { APIResponse } from "../../../Lib/APINetwork/APIResponse"

export const CoursesAction = () => {

    // get courses
    const url = getEndPoints(API_ENDPOINTS.COURSE)
    const { data: coursesData, error: coursesError, isLoading: isCoursesLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: () => fetchData<APIResponse>(url).then((response) => response),
    })

    return {
        coursesData,
        coursesError,
        isCoursesLoading,
    }
}