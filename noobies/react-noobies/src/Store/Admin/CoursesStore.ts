import { create } from "zustand"
import type { Course } from "../../Lib/APINetwork/APIResponse"

type CoursesStore = {
    currentPage: number,
    searchQuery: string
    limit: number
    courses: Course[]
    setCurrentPage: (page: number) => void
    setSearchQuery: (query: string) => void
    setLimit: (limit: number) => void
    setCourses: (courses: Course[]) => void
    resetForm: () => void
}

export const useCoursesStore = create<CoursesStore>((set) => ({
    currentPage: 1,
    searchQuery: '',
    limit: 10,
    courses: [],
    setCurrentPage: (page) => set({ currentPage: page }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setCourses: (courses) => set({ courses: courses }),
    setLimit: (limit) => set({ limit: limit }),
    resetForm: () => set({
        currentPage: 1,
    })
}))