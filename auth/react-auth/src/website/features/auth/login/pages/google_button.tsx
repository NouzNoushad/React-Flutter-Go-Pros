export default function GoogleButton() {
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8030/auth/google"
    }

    return (
        <button type='button' onClick={handleGoogleLogin} className='my-3 w-full bg-black border border-white/20 rounded-md px-3 py-2 text-center focus:outline-none focus:ring-0 text-[13px] tracking-wide text-white font-medium transition-colors duration-200 cursor-pointer flex flex-row items-center justify-center gap-3'>
            <img src="/google.png" alt="google" className='object-contain w-4 h-4' />
            Sign in with Google
        </button>
    )
}
