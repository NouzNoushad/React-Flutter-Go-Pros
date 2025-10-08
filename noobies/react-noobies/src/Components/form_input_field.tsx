import React from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps {
    placeholder: string
    prefixIcon?: React.ReactNode
    suffixIcon?: React.ReactNode
    type?: string
    register?: UseFormRegisterReturn
    error?: string | undefined
    onClickIcon?: () => void
}

export default function FormInputField({
    placeholder,
    prefixIcon,
    suffixIcon,
    type = 'text',
    register,
    error,
    onClickIcon,
}: FormInputProps) {
    return (
        <div className="w-full">
            <div className={`border w-full rounded-md flex flex-row items-center ${error ? 'border-red-500' : 'border-black'}`}>
                {prefixIcon ? <span className='flex-shrink-0 px-2 py-2'>
                    {
                        prefixIcon
                    }
                </span> : <span className='px-1'></span>}
                <input
                    type={type}
                    autoComplete='off'
                    {...register}
                    className='flex-1 w-full h-full ps-1 pe-1 py-3 focus:outline-none focus:ring-0 text-sm'
                    placeholder={placeholder} />
                {
                    suffixIcon ? (<button type='button' onClick={onClickIcon} className='flex-shrink-0 px-2 py-2'>
                        {
                            suffixIcon
                        }
                    </button>) : <span className='px-1'></span>
                }
            </div>
            {error && <p className='text-xs text-red-500 mt-2'>{error}</p>}
        </div>
    )
}