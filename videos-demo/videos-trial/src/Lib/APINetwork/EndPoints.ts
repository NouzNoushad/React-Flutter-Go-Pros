export const BASE_URL = "http://localhost:8080"

export const API_ENDPOINTS = {
    UPLOAD: "/upload-video",
    VIDEOS: "/videos",
}

export const getEndPoints = (path: string) => `${BASE_URL}${path}`