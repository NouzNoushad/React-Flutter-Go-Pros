import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { API_ENDPOINTS, getEndPoints } from "../../../Lib/APINetwork/EndPoints"
import { deleteData } from "../../../Lib/APINetwork/BaseClients"
import type { APIResponse } from "../../../Lib/APINetwork/APIResponse"

export const CourseAction = () => {

    const queryClient = useQueryClient()

    // delete course
    const deleteCourseMutation = useMutation({
        mutationFn: async (courseID: string) => {
            const url = getEndPoints(`${API_ENDPOINTS.COURSE}/${courseID}`)
            const data = await deleteData<APIResponse>(url)
            return { ...data, courseID }
        },
        onSuccess: (result: APIResponse & { courseID: string }) => {
            console.log(`message: ${result.message}, id: ${result.courseID}`)

            queryClient.invalidateQueries({ queryKey: ['courses'] })

            toast.success("Course deleted")
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)

            toast.error(`${error.message}`)
        }
    })

    const handleDeleteCourse = async (courseID: string) => {
        deleteCourseMutation.mutate(courseID)
    }

    return {
        handleDeleteCourse,
    }
}