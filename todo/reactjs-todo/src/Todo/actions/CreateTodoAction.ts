import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_ENDPOINTS, getEndPoints } from "../../Lib/APINetwork/EndPoints"
import { postData, updateData } from "../../Lib/APINetwork/BaseClients"
import { APIResponse } from "../../Lib/APINetwork/APIResponse"
import { toast } from "sonner"
import { useCreateTodoStore } from "../../Store/CreateTodoStore"
import { useTodoStore } from "../../Store/TodoStore"
import { useEditTodoStore } from "../../Store/EditTodoStore"

export const CreateTodoAction = () => {
    const { isComplete, setIsComplete } = useCreateTodoStore()
    const { isCompleteEdit, setIsCompleteEdit } = useEditTodoStore()
    const { selectedTodoId, setIsOpenEditTodo } = useTodoStore()
    const queryClient = useQueryClient()

    const createTodoMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const url = selectedTodoId ? `${API_ENDPOINTS.TODO}/${selectedTodoId}` : API_ENDPOINTS.TODO
            const urlEnpoint = getEndPoints(url)
            const data = selectedTodoId ? await updateData<APIResponse>(urlEnpoint, formData) : await postData<APIResponse>(urlEnpoint, formData)
            return data
        },
        onSuccess: (result: APIResponse) => {
            console.log(`message: ${result.message}`)

            queryClient.invalidateQueries({ queryKey: ['todo'] })

            toast.success("Success")

            if (selectedTodoId) {
                setIsOpenEditTodo(false)
                setIsCompleteEdit(result.todo.is_complete)
            } else {
                setIsComplete(false)
            }
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

        if (selectedTodoId) {
            formData.set("is_complete", JSON.stringify(isCompleteEdit))
        } else {
            formData.set("is_complete", JSON.stringify(isComplete))
        }

        if (!title.trim()) {
            toast.error("Title is required")
            return
        } else {
            console.log(`///////////// title: ${title}, des: ${description}, iscomplete: ${formData.get('is_complete')}`);

            createTodoMutation.mutate(formData)
        }
    }

    const updateTodoCheckboxMutation = useMutation({
        mutationFn: async ({ todoId, formData }: { todoId: string, formData: FormData }) => {
            const url = `${API_ENDPOINTS.TODO}/${todoId}`
            const urlEnpoint = getEndPoints(url)
            const data = await updateData<APIResponse>(urlEnpoint, formData)
            return data
        },
        onSuccess: (result: APIResponse) => {
            console.log(`message: ${result.message}`)

            queryClient.invalidateQueries({ queryKey: ['todo'] })
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
            toast.error(`${error.message}`)
        }
    })

    const handleCheckboxSubmit = (isComplete: boolean, id: string) => {
        const formData = new FormData()
        formData.set("is_complete", JSON.stringify(isComplete))

        updateTodoCheckboxMutation.mutate({ todoId: id, formData })
    }

    return {
        handleFormSubmit,
        handleCheckboxSubmit,
    }
}