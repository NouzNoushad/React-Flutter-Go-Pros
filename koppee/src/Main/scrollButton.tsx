import React, { useEffect, useState } from 'react'

export default function ScrollUpButton() {
    const [scrollBtn, setScrollBtn] = useState("hidden")

    const handleScroll = () => {
        const windowHeight = window.scrollY
        setScrollBtn(
            windowHeight > 500 ? "fixed bottom-[20px] right-[20px] h-[40px] w-[40px] bg-secondary rounded-sm transition-all duration-200 z-40" : 'hidden'
        )
    }

    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.addEventListener('scroll', handleScroll)
    })
    return (
        <a href="#home" className={scrollBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="size-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
            </svg>
        </a>
    )
}
