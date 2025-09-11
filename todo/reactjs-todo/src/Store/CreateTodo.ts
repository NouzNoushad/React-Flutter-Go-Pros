import { create } from "zustand"

type CreateTodoStore = {
    isComplete: boolean
    setIsComplete: (value: boolean) => void
}

export const useCreateTodoStore = create<CreateTodoStore>((set) => ({
    isComplete: false,
    setIsComplete: (value) => set({ isComplete: value }),
}))