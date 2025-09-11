import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteData, fetchData } from "../../Lib/APINetwork/BaseClients"
import { APIResponse } from "../../Lib/APINetwork/APIResponse"
import { API_ENDPOINTS, getEndPoints } from "../../Lib/APINetwork/EndPoints"
import { toast } from "sonner"

export const TodoAction = () => {
    const queryClient = useQueryClient()

    // get todos
    const todoUrl = getEndPoints(API_ENDPOINTS.TODO)
    const { data: todoData, error: todoError, isLoading: isTodoLoading } = useQuery({
        queryKey: ['todo'],
        queryFn: () => fetchData<APIResponse>(todoUrl).then((response) => response),
    })

    // delete todo
    const deleteTodoMutation = useMutation({
        mutationFn: async (todoId: string) => {
            const url = getEndPoints(`${API_ENDPOINTS.TODO}/${todoId}`)
            const data = await deleteData<APIResponse>(url)
            return { ...data }
        },
        onSuccess: (result: APIResponse) => {
            console.log(`message: ${result.message}`)

            queryClient.invalidateQueries({ queryKey: ['todo'] })

            toast.success("Todo deleted")
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)

            toast.error(`${error.message}`)
        }
    })

    const handleDeleteTodo = async (todoId: string) => {
        console.log('//////////////// delete id: ' + todoId)
        deleteTodoMutation.mutate(todoId)
    }

    return {
        todoData,
        todoError,
        isTodoLoading,
        handleDeleteTodo,
    }
}