export const BASE_URL = "http://localhost:8030"

export const API_ENDPOINTS = {
    LOGIN: "/login",
    SIGNUP: "/signup",
    CHECK_AUTH: "/check_auth",
    SEND_EMAIL: "/send_email",
    VERIFY_EMAIL: "verify_email",
    RESET_PASSWORD: "reset_password",
    LOGOUT: "/logout",
    USER: "/user",
    USERS: "/users",
}

export const getEndPoints = (path: string) => `${BASE_URL}${path}`