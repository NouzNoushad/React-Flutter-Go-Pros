import React from 'react'

export default function About() {
    return (
        <section id='about' className='bg-[#FFFBF2]'>
            <div className="container-md py-[5rem]">
                <div className="main-container">
                    <h4 className='main-text'>About Us</h4>
                    <h1 className='main-subtext'>Serving Since 1950</h1>
                </div>
                <div className="mt-2 grid lg:grid-cols-3 grid-cols-1 lg:gap-2 gap-5">
                    <div className="font-roboto max-w-[700px] mx-auto">
                        <h1 className='lg:text-4xl md:text-3xl text-2xl font-bold md:mb-3 mb-2'>Our Story</h1>
                        <h5 className='lg:text-[20px] md:text-[18px] text-[16px] leading-tight md:mb-3 mb-2'>Eos kasd eos dolor vero vero, lorem stet diam rebum. Ipsum amet sed vero dolor sea</h5>
                        <p className='text-gray-700 md:mb-5 mb-4'>Takimata sed vero vero no sit sed, justo clita duo no duo amet et, nonumy kasd sed dolor eos diam lorem eirmod. Amet sit amet amet no. Est nonumy sed labore eirmod sit magna. Erat at est justo sit ut. Labor diam sed ipsum et eirmod</p>
                        <button className='text-white bg-primary min-w-[120px] px-2 py-2'>Learn More</button>
                    </div>
                    <div className='max-w-[700px] mx-auto'>
                        <img src="/images/about.png" alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className="max-w-[700px] mx-auto">
                        <h1 className='lg:text-4xl md:text-3xl text-2xl font-bold md:mb-3 mb-2'>Our Vision</h1>
                        <p className='text-gray-700 mb-3'>Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo. Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est dolor</p>
                        <ul className='mb-5 md:space-y-3 space-y-2'>
                            <li><h5 className='lg:text-[20px] md:text-[18px] text-[16px] leading-tight mb-3'>Lorem ipsum dolor sit amet</h5></li>
                            <li><h5 className='lg:text-[20px] md:text-[18px] text-[16px] leading-tight mb-3'>Lorem ipsum dolor sit amet</h5></li>
                            <li><h5 className='lg:text-[20px] md:text-[18px] text-[16px] leading-tight mb-3'>Lorem ipsum dolor sit amet</h5></li>
                        </ul>
                        <button className='text-white bg-secondary min-w-[120px] px-2 py-2'>Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
