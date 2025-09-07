import React from 'react'

export default function Reservation() {
    return (
        <section className='bg-[#FFFBF2] pb-[4rem] pt-[3rem]'>
            <div className="max-w-[1100px] mx-auto bg-[url('/public/images/bg.jpg')] bg-cover bg-center relative after:absolute after:inset-0 after:bg-primary/90">
                <div className="h-full relative z-10 grid md:grid-cols-2 grid-cols-1">
                    <div className="h-full text-white py-8 px-8 flex flex-col justify-center gap-5">
                        <h1 className='lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold text-secondary'>30% OFF</h1>
                        <h1 className='lg:text-4xl text-3xl font-semibold'>For Online Reservation</h1>
                        <p>Lorem justo clita erat lorem labore ea, justo dolor lorem ipsum ut sed eos,
                            ipsum et dolor kasd sit ea justo. Erat justo sed sed diam. Ea et erat ut sed diam sea</p>
                        <ul>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                    </div>
                    <div className="bg-primary/80 h-full px-8 flex flex-col justify-center text-white py-[5rem]">
                        <h1 className='lg:text-4xl text-3xl font-semibold text-center'>Book Your Table</h1>
                        <form action="" className='mt-5 space-y-5'>
                            <input type="text" className='border border-secondary w-full px-4 py-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-secondary' placeholder='Name' />
                            <input type="email" className='border border-secondary w-full px-4 py-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-secondary' placeholder='Email' />
                            <input type="text" className='border border-secondary w-full px-4 py-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-secondary' placeholder='Date' />
                            <input type="text" className='border border-secondary w-full px-4 py-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-secondary' placeholder='Time' />
                            <select name="" id="" className='border border-secondary w-full px-4 py-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-secondary'>
                                <option className='text-black' selected hidden>Person</option>
                                <option className='text-black' value="1">Person 1</option>
                                <option className='text-black' value="2">Person 2</option>
                                <option className='text-black' value="3">Person 3</option>
                                <option className='text-black' value="3">Person 4</option>
                            </select>
                            <button className='w-full bg-secondary py-3 px-3 text-primary font-semibold'>Book Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
