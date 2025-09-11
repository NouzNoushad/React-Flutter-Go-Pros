import { create } from "zustand"

type TodoStore = {
    isOpenDeleteTodo: boolean
    isOpenEditTodo: boolean
    selectedTodoId: string | null
    setIsOpenDeleteTodo: (value: boolean, id?: string | null) => void
    setIsOpenEditTodo: (value: boolean, id?: string | null) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
    isOpenDeleteTodo: false,
    isOpenEditTodo: false,
    selectedTodoId: null,
    setIsOpenDeleteTodo: (value, id = null) => set({ isOpenDeleteTodo: value, selectedTodoId: id }),
    setIsOpenEditTodo: (value, id = null) => set({ isOpenEditTodo: value, selectedTodoId: id }),
}))