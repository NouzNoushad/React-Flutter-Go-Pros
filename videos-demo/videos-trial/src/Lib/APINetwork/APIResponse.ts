export interface APIResponse {
    message: string
    video: Video
}

export interface Video {
    id: string
    title: string
    file_path: string
    hls_path: string
    thumbnail: string
    description: string
    duration: number
    size: number
    status: string
    created_at: string
    updated_at: string
}