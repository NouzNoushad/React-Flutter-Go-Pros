import React from 'react'

export default function Menu() {
    return (
        <section id='menu' className='bg-[#FFFBF2]'>
            <div className="container-md pt-[5rem] pb-[4rem]">
                <div className="main-container">
                    <h4 className='main-text'>Menu & Pricing</h4>
                    <h1 className='main-subtext'>Competitive Pricing</h1>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-6">
                    {/* Hot Coffee */}
                    <div className="space-y-8">
                        <h1 className='md:text-4xl text-3xl font-bold'>Hot Coffee</h1>
                        <div className="flex flex-row items-center gap-4">
                            <div className="relative">
                                <img src="images/menu-1.jpg" alt="" className='h-28 w-28 rounded-full' />
                                <h5 className='h-10 w-10 bg-secondary rounded-full text-primary text-xl font-semibold flex items-center justify-center absolute top-0 right-0'>$5</h5>
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className='text-2xl font-normal'>Black Coffee</h4>
                                <p className='text-gray-600'>Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div className="relative">
                                <img src="images/menu-2.jpg" alt="" className='h-28 w-28 rounded-full' />
                                <h5 className='h-10 w-10 bg-secondary rounded-full text-primary text-xl font-semibold flex items-center justify-center absolute top-0 right-0'>$5</h5>
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className='text-2xl font-normal'>Black Coffee</h4>
                                <p className='text-gray-600'>Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div className="relative">
                                <img src="images/menu-3.jpg" alt="" className='h-28 w-28 rounded-full' />
                                <h5 className='h-10 w-10 bg-secondary rounded-full text-primary text-xl font-semibold flex items-center justify-center absolute top-0 right-0'>$5</h5>
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className='text-2xl font-normal'>Black Coffee</h4>
                                <p className='text-gray-600'>Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor</p>
                            </div>
                        </div>
                    </div>

                    {/* Cold Coffee */}
                    <div className="space-y-8">
                        <h1 className='md:text-4xl text-3xl font-bold'>Cold Coffee</h1>
                        <div className="flex flex-row items-center gap-4">
                            <div className="relative">
                                <img src="images/menu-1.jpg" alt="" className='h-28 w-28 rounded-full' />
                                <h5 className='h-10 w-10 bg-secondary rounded-full text-primary text-xl font-semibold flex items-center justify-center absolute top-0 right-0'>$5</h5>
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className='text-2xl font-normal'>Black Coffee</h4>
                                <p className='text-gray-600'>Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div className="relative">
                                <img src="images/menu-2.jpg" alt="" className='h-28 w-28 rounded-full' />
                                <h5 className='h-10 w-10 bg-secondary rounded-full text-primary text-xl font-semibold flex items-center justify-center absolute top-0 right-0'>$5</h5>
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className='text-2xl font-normal'>Black Coffee</h4>
                                <p className='text-gray-600'>Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div className="relative">
                                <img src="images/menu-3.jpg" alt="" className='h-28 w-28 rounded-full' />
                                <h5 className='h-10 w-10 bg-secondary rounded-full text-primary text-xl font-semibold flex items-center justify-center absolute top-0 right-0'>$5</h5>
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className='text-2xl font-normal'>Black Coffee</h4>
                                <p className='text-gray-600'>Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
