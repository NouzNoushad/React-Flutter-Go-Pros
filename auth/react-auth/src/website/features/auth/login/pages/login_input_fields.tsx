import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { EyeIcon, EyeOffIcon, LockKeyholeIcon, MailIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import FormInputField from "../../../../../components/form_input_field"
import type { LoginSchemaType } from "../actions/Validation"
import { useLoginStore } from "../../../../store/loginStore"


type ErrorProps = {
    register: UseFormRegister<LoginSchemaType>
    errors: FieldErrors<LoginSchemaType>
}

export default function LoginInputFields({ register, errors }: ErrorProps) {
    const { showPassword, setShowPassword } = useLoginStore()
    const navigate = useNavigate()

    const handleNavigation = () => {
        navigate('/admin/auth/forget_password')
    }
    return (
        <div className="md:space-y-4 space-y-3 w-full">
            {/* Email */}
            <FormInputField
                placeholder='Email'
                register={register('email')}
                error={errors.email?.message}
                prefixIcon={<MailIcon className='size-5' />} />
            {/* Password */}
            <FormInputField
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                register={register('password')}
                error={errors.password?.message}
                prefixIcon={<LockKeyholeIcon className='size-5' />}
                suffixIcon={
                    showPassword ? <EyeIcon className='size-5' /> : <EyeOffIcon className='size-5' />
                }
                onClickIcon={() => setShowPassword(!showPassword)} />
            {/* Forget Password */}
            <div className="mt-2 mb-8 flex justify-end">
                <p className='text-[13px] font-medium inline-block'><button onClick={handleNavigation} className='underline-hover cursor-pointer'>Forget Password?</button></p>
            </div>
        </div>
    )
}
