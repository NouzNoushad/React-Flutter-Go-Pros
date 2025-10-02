import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINTS, getEndPoints } from "../../Lib/APINetwork/EndPoints"
import { fetchData } from "../../Lib/APINetwork/BaseClient"
import type { APIResponse } from "../../Lib/APINetwork/APIResponse"

export const VideosAction = () => {

    // get videos
    const url = getEndPoints(API_ENDPOINTS.VIDEOS)
    const { data: videosData, error: videosError, isLoading: isVideosLoading } = useQuery({
        queryKey: ['videos'],
        queryFn: () => fetchData<APIResponse>(url).then((response) => response),
    })

    return {
        videosData,
        videosError,
        isVideosLoading,
    }
}