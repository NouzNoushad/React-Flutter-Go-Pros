export interface APIResponse {
    courses: Course[]
    total: string
}

export interface Course {
    id: string
    title: string
    description: string
    modules: Module[]
    created_at: string
    updated_at: string
}

export interface Module {
    id: string
    course_id: string
    module_title: string
    module_description: string
    video: Video
    created_at: string
    updated_at: string
}

export interface Video {
    id: string
    module_id: string
    file_path: string
    hls_path: string
    thumbnail: string
    duration: number
    size: number
    status: string
    created_at: string
    updated_at: string
}