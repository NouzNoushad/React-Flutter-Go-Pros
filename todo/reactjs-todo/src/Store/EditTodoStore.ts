import { create } from "zustand"

type EditTodoStore = {
    isCompleteEdit: boolean
    setIsCompleteEdit: (value: boolean) => void
}

export const useEditTodoStore = create<EditTodoStore>((set) => ({
    isCompleteEdit: false,
    setIsCompleteEdit: (value) => set({ isCompleteEdit: value }),
}))