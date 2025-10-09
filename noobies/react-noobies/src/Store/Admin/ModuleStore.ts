import { create } from "zustand"
import type { Module } from "../../Lib/APINetwork/APIResponse"

type ModulesStore = {
    currentPage: number,
    searchQuery: string
    limit: number
    modules: Module[]
    isOpenDeleteModule: boolean
    setCurrentPage: (page: number) => void
    setSearchQuery: (query: string) => void
    setLimit: (limit: number) => void
    setModules: (courses: Module[]) => void
    setIsOpenDeleteModule: (isOpenModule: boolean) => void
    resetForm: () => void
}

export const useModulesStore = create<ModulesStore>((set) => ({
    currentPage: 1,
    searchQuery: '',
    limit: 10,
    modules: [],
    isOpenDeleteModule: false,
    setCurrentPage: (page) => set({ currentPage: page }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setModules: (modules) => set({ modules: modules }),
    setLimit: (limit) => set({ limit: limit }),
    setIsOpenDeleteModule: (isOpenModule) => set({
        isOpenDeleteModule: isOpenModule
    }),
    resetForm: () => set({
        currentPage: 1,
    })
}))