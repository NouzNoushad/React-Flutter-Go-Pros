import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_ENDPOINTS, getEndPoints } from "../../Lib/APINetwork/EndPoints"
import { postData } from "../../Lib/APINetwork/BaseClient"
import type { APIResponse } from "../../Lib/APINetwork/APIResponse"
import { toast } from "sonner"
import { useUploadStore } from "../../Store/UploadStore"

export const UploadVideoAction = () => {
    const { videoFile, setVideoFile } = useUploadStore()
    const queryClient = useQueryClient()

    const uploadVideoMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const url = API_ENDPOINTS.UPLOAD
            const urlEnpoint = getEndPoints(url)
            const data = postData<APIResponse>(urlEnpoint, formData)
            return data
        },
        onSuccess: (result: APIResponse) => {
            console.log(`message: ${result.message}`)
            queryClient.invalidateQueries({ queryKey: ['upload'] })

            toast.success("Success")
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
            toast.error(`${error.message}`)
        }
    })

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)

        if (videoFile) {
            formData.append("video", videoFile)
        }

        console.log(`///////////// title: ${formData.get("title")}, desc: ${formData.get("description")}, video: ${formData.get("video")}`)

        uploadVideoMutation.mutate(formData, {
            onSuccess: () => {
                setVideoFile(null)
                form.reset()
            }
        })
    }

    return {
        handleFormSubmit,
    }
}