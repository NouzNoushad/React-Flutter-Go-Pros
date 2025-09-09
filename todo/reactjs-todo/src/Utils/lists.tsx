export type TodoItem = {
    title: string;
    description: string;
    isComplete: boolean;
}

export type TodoGroup = {
    id: number;
    date: string;
    todos: TodoItem[];
}

export const todos: TodoGroup[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    date: 'May, 25 2025',
    todos: [
        {
            title: 'Cleaning',
            description: 'shirt, pants',
            isComplete: false,
        },
        {
            title: 'Shopping',
            description: 'veges',
            isComplete: true,
        },
        {
            title: 'Movie',
            description: 'action',
            isComplete: false,
        }
    ]
}))