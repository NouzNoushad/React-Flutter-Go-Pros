export const BASE_URL = "http://localhost:8080"

export const API_ENDPOINTS = {
    TODO: "/todo",
}

export const getEndPoints = (path: string) => `${BASE_URL}${path}`