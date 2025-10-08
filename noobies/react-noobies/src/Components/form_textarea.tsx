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

export default function FormTextarea({
    placeholder,
    register,
    error,
}: FormInputProps) {
    return (
        <div className="w-full">
            <div className={`border w-full rounded-md flex flex-row items-center ${error ? 'border-red-500' : 'border-black'}`}>
                <textarea
                    rows={4}
                    autoComplete='off'
                    {...register}
                    className='flex-1 w-full h-full px-3 py-3 focus:outline-none focus:ring-0 text-sm'
                    placeholder={placeholder} ></textarea>
            </div>
            {error && <p className='text-xs text-red-500 mt-2'>{error}</p>}
        </div>
    )
}