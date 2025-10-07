import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../../../Lib/APINetwork/BaseClients"
import { API_ENDPOINTS, getEndPoints } from "../../../Lib/APINetwork/EndPoints"
import type { APIResponse } from "../../../Lib/APINetwork/APIResponse"

export const ModulesAction = () => {

    // get modules
    const url = getEndPoints(API_ENDPOINTS.MODULE)
    const { data: modulesData, error: modulesError, isLoading: isModulesLoading } = useQuery({
        queryKey: ['modules'],
        queryFn: () => fetchData<APIResponse>(url).then((response) => response),
    })

    return {
        modulesData,
        modulesError,
        isModulesLoading,
    }
}