import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { API_ENDPOINTS, getEndPoints } from "../../../Lib/APINetwork/EndPoints"
import type { APIResponse } from "../../../Lib/APINetwork/APIResponse"
import { postData } from "../../../Lib/APINetwork/BaseClients"
import type { CourseSchemaType } from "./Validations"

export const AddCourseAction = () => {
    const queryClient = useQueryClient()

    const addCourseMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const url = API_ENDPOINTS.COURSE
            const urlEnpoint = getEndPoints(url)
            const data = postData<APIResponse>(urlEnpoint, formData)
            return data
        },
        onSuccess: (result: APIResponse) => {
            console.log(`message: ${result.message}`)
            queryClient.invalidateQueries({ queryKey: ['course'] })

            toast.success("Success")
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
            toast.error(`${error.message}`)
        }
    })

    const handleFormSubmit = (data: CourseSchemaType) => {
        const formData = new FormData()
        const title = data.title
        const description = data.description

        console.log(`///////////// title: ${title}, desc: ${description}`)

        addCourseMutation.mutate(formData)
    }

    return {
        handleFormSubmit,
    }
}