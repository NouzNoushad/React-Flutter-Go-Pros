import { create } from "zustand"

type UploadStore = {
    videoFile: File | null
    setVideoFile: (value: File | null) => void
}

export const useUploadStore = create<UploadStore>((set) => ({
    videoFile: null,
    setVideoFile: (value) => set({ videoFile: value })
}))