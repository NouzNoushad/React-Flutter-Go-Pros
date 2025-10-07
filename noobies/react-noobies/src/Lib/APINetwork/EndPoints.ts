export const BASE_URL = "http://localhost:8000"

export const API_ENDPOINTS = {
    COURSE: "/course",
}

export const getEndPoints = (path: string) => `${BASE_URL}${path}`