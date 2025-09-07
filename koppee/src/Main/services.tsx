import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Services() {
    return (
        <section id='services' className='bg-[#FFFBF2]'>
            <div className="container-md pt-[5rem] pb-[4rem]">
                <div className="main-container">
                    <h4 className='main-text'>Our Services</h4>
                    <h1 className='main-subtext'>Fresh & Organic Beans</h1>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                    {/* Service 1 */}
                    <div className="grid grid-cols-12 items-center max-w-[800px] mx-auto gap-4">
                        <div className="sm:col-span-5 col-span-12">
                            <img src="/images/service-1.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div className="sm:col-span-7 col-span-12">
                            <div className='flex flex-row items-center gap-2'>
                                <div className='h-12 w-12 bg-secondary rounded-full flex items-center justify-center'>
                                    <FontAwesomeIcon icon={faTruck} className='text-2xl' />
                                </div>
                                <h4 className='md:text-2xl text-xl'>Fastest Door Delivery</h4>
                            </div>
                            <p className='mt-3 text-gray-700 font-roboto'>Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea et et lorem dolor sed est sit
                                invidunt, dolore tempor diam ipsum takima erat tempor</p>
                        </div>
                    </div>
                    {/* Service 2 */}
                    <div className="grid grid-cols-12 items-center max-w-[800px] mx-auto gap-4">
                        <div className="sm:col-span-5 col-span-12">
                            <img src="/images/service-2.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div className="sm:col-span-7 col-span-12">
                            <div className='flex flex-row items-center gap-2'>
                                <div className='h-12 w-12 bg-secondary rounded-full flex items-center justify-center'>
                                    <FontAwesomeIcon icon={faTruck} className='text-2xl' />
                                </div>
                                <h4 className='md:text-2xl text-xl'>Fresh Coffee Beans</h4>
                            </div>
                            <p className='mt-3 text-gray-700 font-roboto'>Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea et et lorem dolor sed est sit
                                invidunt, dolore tempor diam ipsum takima erat tempor</p>
                        </div>
                    </div>
                    {/* Service 3 */}
                    <div className="grid grid-cols-12 items-center max-w-[800px] mx-auto gap-4">
                        <div className="sm:col-span-5 col-span-12">
                            <img src="/images/service-3.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div className="sm:col-span-7 col-span-12">
                            <div className='flex flex-row items-center gap-2'>
                                <div className='h-12 w-12 bg-secondary rounded-full flex items-center justify-center'>
                                    <FontAwesomeIcon icon={faTruck} className='text-2xl' />
                                </div>
                                <h4 className='md:text-2xl text-xl'>Best Quality Coffee</h4>
                            </div>
                            <p className='mt-3 text-gray-700 font-roboto'>Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea et et lorem dolor sed est sit
                                invidunt, dolore tempor diam ipsum takima erat tempor</p>
                        </div>
                    </div>
                    {/* Service 4 */}
                    <div className="grid grid-cols-12 items-center max-w-[800px] mx-auto gap-4">
                        <div className="sm:col-span-5 col-span-12">
                            <img src="/images/service-4.jpg" alt="" className='w-full h-full object-cover' />
                        </div>
                        <div className="sm:col-span-7 col-span-12">
                            <div className='flex flex-row items-center gap-2'>
                                <div className='h-12 w-12 bg-secondary rounded-full flex items-center justify-center'>
                                    <FontAwesomeIcon icon={faTruck} className='text-2xl' />
                                </div>
                                <h4 className='md:text-2xl text-xl'>Online Table Booking</h4>
                            </div>
                            <p className='mt-3 text-gray-700 font-roboto'>Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea et et lorem dolor sed est sit
                                invidunt, dolore tempor diam ipsum takima erat tempor</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
