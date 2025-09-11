import { create } from "zustand"

type TodoStore = {
    isOpenDeleteTodo: boolean
    selectedTodoId: string | null
    setIsOpenDeleteTodo: (value: boolean, id?: string | null) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
    isOpenDeleteTodo: false,
    selectedTodoId: null,
    setIsOpenDeleteTodo: (value, id = null) => set({ isOpenDeleteTodo: value, selectedTodoId: id }),
}))