import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { API_ENDPOINTS, getEndPoints } from "../../../../Lib/APINetwork/EndPoints"
import { deleteData } from "../../../../Lib/APINetwork/BaseClients"
import type { APIResponse } from "../../../../Lib/APINetwork/APIResponse"

export const ModuleAction = () => {

    const queryClient = useQueryClient()

    // delete module
    const deleteModuleMutation = useMutation({
        mutationFn: async (moduleID: string) => {
            const url = getEndPoints(`${API_ENDPOINTS.MODULE}/${moduleID}`)
            const data = await deleteData<APIResponse>(url)
            return { ...data, moduleID }
        },
        onSuccess: (result: APIResponse & { moduleID: string }) => {
            console.log(`message: ${result.message}, id: ${result.moduleID}`)

            queryClient.invalidateQueries({ queryKey: ['modules'] })

            toast.success("Module deleted")
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)

            toast.error(`${error.message}`)
        }
    })

    const handleDeleteModule = async (moduleID: string) => {
        deleteModuleMutation.mutate(moduleID)
    }

    return {
        handleDeleteModule,
    }
}