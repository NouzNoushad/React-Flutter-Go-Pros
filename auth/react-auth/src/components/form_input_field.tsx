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
    as?: "input" | "textarea";
}

export default function FormInputField({
    placeholder,
    prefixIcon,
    suffixIcon,
    type = 'text',
    register,
    error,
    onClickIcon,
    as = "input",
}: FormInputProps) {
    return (
        <div className="w-full">
            <div className={`border w-full rounded-md flex flex-row items-center ${error ? 'text-red-500' : 'text-white'}`}>
                {prefixIcon ? <span className='shrink-0 px-2 py-2'>
                    {
                        prefixIcon
                    }
                </span> : <span className='px-1'></span>}
                {
                    as === "input" ? (
                        <input
                            type={type}
                            autoComplete='off'
                            {...register}
                            className='flex-1 w-full h-full ps-1 pe-1 py-2 focus:outline-none focus:ring-0 text-[13px]'
                            placeholder={placeholder} />) : (
                        <textarea
                            {...register}
                            autoComplete="off"
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = "auto";
                                target.style.height = target.scrollHeight + "px";
                            }}
                            className="flex-1 w-full ps-1 pe-1 py-2 focus:outline-none text-[13px] resize-none min-h-20 max-h-125 overflow-y-auto"
                            placeholder={placeholder}
                        />
                    )
                }
                {
                    suffixIcon ? (<button type='button' onClick={onClickIcon} className='shrink-0 px-2 py-2'>
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
