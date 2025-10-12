import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { API_ENDPOINTS, getEndPoints } from "../../../Lib/APINetwork/EndPoints"
import type { APIResponse } from "../../../Lib/APINetwork/APIResponse"
import { postData } from "../../../Lib/APINetwork/BaseClients"
import type { CourseSchemaType } from "./Validations"
import { useNavigate } from "react-router-dom"

export const AddCourseAction = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const addCourseMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const url = API_ENDPOINTS.COURSE
            const urlEnpoint = getEndPoints(url)
            const data = postData<APIResponse>(urlEnpoint, formData)
            return data
        },
        onSuccess: (result: APIResponse) => {
            console.log(`message: ${result.message}`)
            queryClient.invalidateQueries({ queryKey: ['courses'] })

            toast.success("Success")
            navigate('/admin')
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
            toast.error(`${error.message}`)
        }
    })

    const handleFormSubmit = (data: CourseSchemaType) => {
        const title = data.title
        const description = data.description

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description ?? '')

        console.log(`///////////// title: ${formData.get("title")}, desc: ${formData.get("description")}`)

        addCourseMutation.mutate(formData)
    }

    return {
        handleFormSubmit,
    }
}