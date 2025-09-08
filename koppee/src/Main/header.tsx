import React, { useEffect, useState } from 'react'

export default function Header() {

    const [stickyHeader, setStickyHeader] = useState("bg-transparent")
    const [toggle, setToggle] = useState(false)

    const handleScroll = () => {
        const windowHeight = window.scrollY
        setStickyHeader(
            windowHeight > 500 ? "bg-primary/95 lg:py-4 py-3 " : "bg-transparent lg:py-6 md:py-5 py-4"
        )
    }

    useEffect(() => {
        handleScroll()

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${stickyHeader}`}>
            <div className="container-lg text-white font-montserrat flex items-center justify-between">
                <a href="#home">
                    <h1 className='lg:text-4xl sm:text-3xl text-2xl  font-bold uppercase font-roboto'>koppee</h1>
                </a>
                <nav className=''>
                    <ul className='hidden lg:flex flex-row items-center gap-6 font-bold'>
                        <li><a href="#home" className='nav-link'>Home</a></li>
                        <li><a href="#about" className='nav-link'>About</a></li>
                        <li><a href="#services" className='nav-link'>Services</a></li>
                        <li><a href="#menu" className='nav-link'>Menu</a></li>
                        <li><a href="#pages" className='nav-link'>Pages</a></li>
                        <li><a href="#contact" className='nav-link'>Contact</a></li>
                    </ul>
                </nav>
                <nav className='lg:hidden'>
                    {/* Mobile view */}
                    <div className={`min-w-[300px] fixed top-0 bottom-0 overflow-y-auto lg:right-[-100%] transition-all duration-300 bg-primary px-4 py-4 ${toggle ? 'right-0' : 'right-[-100%]'}`}>
                        <button onClick={() => setToggle(false)} className="w-full flex items-center justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <ul className='mt-10 space-y-3 w-full'>
                            <li><a href="#home" className='nav-link-sm'>Home</a></li>
                            <li><a href="#about" className='nav-link-sm'>About</a></li>
                            <li><a href="#services" className='nav-link-sm'>Services</a></li>
                            <li><a href="#menu" className='nav-link-sm'>Menu</a></li>
                            <li><a href="#pages" className='nav-link-sm'>Pages</a></li>
                            <li><a href="#contact" className='nav-link-sm'>Contact</a></li>
                        </ul>
                    </div>
                    <button onClick={() => setToggle(!toggle)} className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block lg:hidden">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </nav>
            </div>
        </header>
    )
}
