export interface APIResponse {
    status: string
    success: boolean
    message: string
    user: User
    users: User[]
}

export interface Image {
    filename: string
    file_path: string
}

export interface User {
    id: string
    username: string
    email: string
    image?: Image
    role: string
    created_at: string
}