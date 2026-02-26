interface FormButtonProps {
    onClick?: () => void
    label: string
    type?: 'button' | 'submit' | 'reset'
}

export default function AuthFormButton({
    label,
    onClick,
    type = 'button'
}: FormButtonProps) {
    return (
        <button onClick={onClick} type={type} className='block my-3 w-full bg-header rounded-md px-3 py-2 text-center focus:outline-none focus:ring-0 text-[13px] tracking-wide text-white font-medium transition-colors duration-200  hover:bg-[#0c92cc] cursor-pointer'>{label}</button>
    )
}
