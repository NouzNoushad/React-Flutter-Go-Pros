import LoginInputFields from './login_input_fields'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthFormButton from '../../../../../components/auth_form_button'
import { LoginFormValidation, type LoginSchemaType } from '../actions/Validation'
import { LoginFormAction } from '../actions/loginFormAction'
import GoogleButton from './google_button'

export default function LoginForm() {
    const { handleLoginForm } = LoginFormAction()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginFormValidation)
    })

    const onSubmit = (data: LoginSchemaType) => {
        handleLoginForm(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full md:max-w-137.5 mx-auto py-8 px-5 xl:px-0 min-h-screen flex items-center">
            <div className="flex flex-col items-center justify-center bg-primary-dark shadow-lg rounded-2xl px-6 py-5 w-full min-h-137.5">
                <LoginInputFields register={register} errors={errors} />
                <AuthFormButton label='Login' type='submit' />
                <GoogleButton />
            </div>
        </form>
    )
}
