import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { LoginSchemaType } from "./Validation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_ENDPOINTS, getEndPoints } from "../../../../../lib/APINetworks/Endpoints"
import { postData } from "../../../../../lib/APINetworks/BaseClient"
import type { APIResponse } from "../../../../../lib/APINetworks/APIResponse"
import { useLoginStore } from "../../../../store/loginStore"

export const LoginFormAction = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { setShowPassword } = useLoginStore()

    const loginFormMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const url = getEndPoints(API_ENDPOINTS.LOGIN)
            const data = await postData<APIResponse>(url, formData)
            return data
        },
        onSuccess: (result: APIResponse) => {
            console.log(`message: ${result.message}`)

            queryClient.invalidateQueries({ queryKey: ['login', result] })

            toast.success("Login success")

            setShowPassword(false)
            navigate('/admin')
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)

            toast.error(`${error.message}`)
        }
    })

    const handleLoginForm = async (data: LoginSchemaType) => {
        const formData = new FormData()

        const email = data.email
        const password = data.password

        formData.append("email", email)
        formData.append("password", password)

        console.log(`//////////////// form data: email: ${formData.get("email")}, password: ${formData.get("password")}`)

        loginFormMutation.mutate(formData)
    }

    return {
        handleLoginForm,
        isLoading: loginFormMutation.isPending,
    }
}
