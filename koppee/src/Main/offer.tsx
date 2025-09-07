import React from 'react'

export default function Offer() {
    return (
        <div className="bg-[url('/public/images/bg.jpg')] bg-cover bg-center h-[60vh] flex items-center justify-center relative after:absolute after:inset-0 after:bg-primary/80">
            <div className="relative z-10 font-robot text-center space-y-3 text-white">
                <h1 className='lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold text-secondary'>50% OFF</h1>
                <h1 className='lge:text-4xl text-3xl font-semibold'>Sunday Special Offer</h1>
                <h4 className='lg:text-2xl md:text-xl text-lg font-normal pb-5'>Only for Sunday from 1st Jan to 30th Jan 2045</h4>
                <form action="" className='h-12 max-w-[350px] mx-auto bg-white flex flex-row items-center text-black overflow-hidden'>
                    <input type="text" className='flex-1 px-4 focus:ring-0 focus:outline-none' placeholder='Your Email' />
                    <button className='bg-secondary font-semibold h-full px-4'>Sign up</button>
                </form>
            </div>
        </div>
    )
}
