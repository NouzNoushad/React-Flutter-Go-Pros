import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINTS, getEndPoints } from "../../Lib/APINetwork/EndPoints"
import { fetchData } from "../../Lib/APINetwork/BaseClient"
import type { APIResponse } from "../../Lib/APINetwork/APIResponse"

export const VideoAction = (videoId: string | undefined) => {

    // get video by id
    const url = getEndPoints(`${API_ENDPOINTS.VIDEOS}/${videoId}`)
    const { data: videoData, error: videoError, isLoading: isVideoLoading } = useQuery({
        queryKey: ['video'],
        queryFn: () => fetchData<APIResponse>(url).then((response) => response),
    })

    return {
        videoData,
        videoError,
        isVideoLoading,
    }
}