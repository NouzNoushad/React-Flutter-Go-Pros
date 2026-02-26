import { create } from "zustand"

type LoginStore = {
    showPassword: boolean
    setShowPassword: (value: boolean) => void
}

export const useLoginStore = create<LoginStore>((set) => ({
    showPassword: false,
    setShowPassword: (value) => set({ showPassword: value }),
}))