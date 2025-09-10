export interface APIResponse {
    message: string
    todo: Todo
    todos: Todo[]
}

export interface Todo {
    id: string
    title: string
    description: string
    is_complete: boolean
    created_at: string
}