import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_ENDPOINTS, getEndPoints } from "../../../Lib/APINetwork/EndPoints"
import { postData } from "../../../Lib/APINetwork/BaseClients"
import { APIResponse } from "../../../Lib/APINetwork/APIResponse"
import { toast } from "sonner"
import { useCreateTodoStore } from "../../../Store/CreateTodo"

export const CreateTodoAction = () => {
    const { isComplete, setIsComplete } = useCreateTodoStore()
    const queryClient = useQueryClient()

    const createTodoMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const url = getEndPoints(API_ENDPOINTS.TODO)
            const data = await postData<APIResponse>(url, formData)
            return data
        },
        onSuccess: (result: APIResponse) => {
            console.log(`message: ${result.message}`)
            queryClient.invalidateQueries({ queryKey: ['todo'] })
            toast.success("Todo created")

            setIsComplete(false)
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
            toast.error(`${error.message}`)
        }
    })

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const title = formData.get("title") as string
        const description = formData.get("description") as string
        formData.append("is_complete", isComplete.toString())

        if (!title.trim()) {
            toast.error("Title is required")
            return
        } else {
            console.log(`///////////// title: ${title}, des: ${description}, iscomplete: ${formData.get('is_complete')}`);

            createTodoMutation.mutate(formData)
        }
    }

    return {
        handleFormSubmit,
    }
}