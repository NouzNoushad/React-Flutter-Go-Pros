import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAddModuleStore } from "../../../Store/Admin/AddModuleStore"
import { API_ENDPOINTS, getEndPoints } from "../../../Lib/APINetwork/EndPoints"
import type { APIResponse } from "../../../Lib/APINetwork/APIResponse"
import { postData } from "../../../Lib/APINetwork/BaseClients"
import type { ModuleSchemaType } from "./Validations"

export const AddModuleAction = () => {
    const { videoFile, selectedCourse, setVideoFile, setSelectedCourse } = useAddModuleStore()
    const queryClient = useQueryClient()

    const uploadVideoMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const url = API_ENDPOINTS.MODULE
            const urlEnpoint = getEndPoints(url)
            const data = postData<APIResponse>(urlEnpoint, formData)
            return data
        },
        onSuccess: (result: APIResponse) => {
            console.log(`message: ${result.message}`)
            queryClient.invalidateQueries({ queryKey: ['module'] })

            toast.success("Success")

            setSelectedCourse(null)
            setVideoFile(null)
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
            toast.error(`${error.message}`)
        }
    })

    const handleFormSubmit = (data: ModuleSchemaType) => {
        const formData = new FormData()
        const title = data.module_title
        const description = data.module_descripton
        const courseId = selectedCourse?.id ?? ''

        if (selectedCourse?.id === undefined) {
            toast.error("Please select a course")
        }
        else if (!videoFile) {
            toast.error("Please upload a video")
        }
        else {
            formData.append("video", videoFile)
            formData.append("course_id", courseId)

            console.log(`///////////// title: ${title}, desc: ${description}, video: ${formData.get("video")}, courseId : ${formData.get("course_id")}`)

            uploadVideoMutation.mutate(formData)
        }
    }

    return {
        handleFormSubmit,
    }
}