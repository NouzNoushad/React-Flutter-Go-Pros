import { create } from "zustand"
import type { Course } from "../../Lib/APINetwork/APIResponse"

type AddModuleStore = {
    selectedCourse: Course | null
    videoFile: File | null
    setVideoFile: (value: File | null) => void
    setSelectedCourse: (course: Course | null) => void
}

export const useAddModuleStore = create<AddModuleStore>((set) => ({
    selectedCourse: null,
    videoFile: null,
    setVideoFile: (value) => set({ videoFile: value }),
    setSelectedCourse: (course) => set({
        selectedCourse: course
    })
}))