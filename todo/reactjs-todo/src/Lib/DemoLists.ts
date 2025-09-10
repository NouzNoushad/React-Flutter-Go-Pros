export type TodoItem = {
    title: string;
    description: string;
    isComplete: boolean;
}

export type TodoGroup = {
    id: number;
    date: string;
    time: string;
    todo: TodoItem;
}

export const todos: TodoGroup[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    date: 'May, 25 2025',
    time: '09:00 AM',
    todo: {
        title: 'Cleaning',
        description: 'shirt, pants',
        isComplete: false,
    },
}))