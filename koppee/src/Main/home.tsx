import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const slides = [
    {
        id: 1,
        image: '/images/carousel-1.jpg',
        caption: (
            <>
                <h2 className='text-2xl md:text-3xl text-secondary font-semibold'>We Have Been Serving</h2>
                <h1 className='text-[88px] leading-none sm:text-8xl md:text-[100px] lg:text-[150px] text-white font-bold md:my-3 my-2'>COFFEE</h1>
                <h2 className='text-2xl md:text-3xl text-white font-semibold'>* SINCE 1950 *</h2>
            </>
        )
    },
    {
        id: 2,
        image: '/images/carousel-2.jpg',
        caption: (
            <>
                <h2 className='text-2xl md:text-3xl text-secondary font-semibold'>We Have Been Serving</h2>
                <h1 className='text-[88px] leading-none sm:text-8xl md:text-[100px] lg:text-[150px] text-white font-bold md:my-3 my-2'>COFFEE</h1>
                <h2 className='text-2xl md:text-3xl text-white font-semibold'>* SINCE 1950 *</h2>
            </>
        )
    },
]

export default function MainHome() {
    const [swiperInstance, setSwiperInstance] = useState<any>(null)
    return (
        <div className="relative w-full">
            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 4000 }}
                loop
                onSwiper={setSwiperInstance}
                className="w-full">
                {
                    slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative h-[100vh]">
                                <img src={slide.image} alt="" className='w-full h-full object-cover' />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/50 text-center">
                                    {slide.caption}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <button onClick={() => swiperInstance?.slidePrev()} className="absolute left-4 top-1/2 -translate-y-1/2 
    bg-white/30 text-black size-10 rounded-full shadow-md 
    hover:bg-white/70 z-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button onClick={() => swiperInstance?.slideNext()} className="absolute right-4 top-1/2 -translate-y-1/2 
    bg-white/30 text-black size-10 rounded-full shadow-md 
    hover:bg-white/70 z-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <div className="absolute left-0 bottom-0 z-10 w-full h-[15px] bg-[url('/public/images/overlay-bottom.png')]"></div>
        </div>
    )
}
