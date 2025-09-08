import React from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const slides = [
    {
        id: 1,
        image: '/images/testimonial-1.jpg',
        name: 'Client Name',
        profession: 'Profession',
        details: 'Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum sanct clita'
    },
    {
        id: 2,
        image: '/images/testimonial-2.jpg',
        name: 'Client Name',
        profession: 'Profession',
        details: 'Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum sanct clita'
    },
    {
        id: 3,
        image: '/images/testimonial-3.jpg',
        name: 'Client Name',
        profession: 'Profession',
        details: 'Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum sanct clita'
    },
    {
        id: 4,
        image: '/images/testimonial-4.jpg',
        name: 'Client Name',
        profession: 'Profession',
        details: 'Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum sanct clita'
    },
]

export default function Testimonial() {
    return (
        <section id='testimonial' className='bg-[#FFFBF2]'>
            <div className="container-md pt-[5rem] pb-[4rem]">
                <div className="main-container">
                    <h4 className='main-text'>Testimonial</h4>
                    <h1 className='main-subtext'>Our Clients Say</h1>
                </div>
                {/* Slider */}
                <Swiper
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 4000 }}
                    loop
                    className="w-full">
                    {
                        slides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className="flex flex-col items-center justify-center max-w-[500px] mx-auto">
                                    <img src={slide.image} alt="" className='w-30 h-30 object-cover rounded-full' />
                                    <div className="text-center mt-2">
                                        <h4 className='text-xl font-semibold'>{slide.name}</h4>
                                        <h5 className='text-gray-600'>{slide.profession}</h5>
                                    </div>
                                    <p className='text-center leading-tight'>{slide.details}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}
