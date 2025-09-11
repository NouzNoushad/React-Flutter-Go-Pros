import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../../../Lib/APINetwork/BaseClients"
import { APIResponse } from "../../../Lib/APINetwork/APIResponse"
import { API_ENDPOINTS, getEndPoints } from "../../../Lib/APINetwork/EndPoints"

export const GetTodoAction = () => {

    const todoUrl = getEndPoints(API_ENDPOINTS.TODO)
    const { data: todoData, error: todoError, isLoading: isTodoLoading } = useQuery({
        queryKey: ['todo'],
        queryFn: () => fetchData<APIResponse>(todoUrl).then((response) => response),
    })

    return {
        todoData,
        todoError,
        isTodoLoading,
    }
}