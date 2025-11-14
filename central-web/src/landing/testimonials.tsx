import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight, faStar } from '@fortawesome/free-solid-svg-icons';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Testimonials() {
    // const [swiperInstance, setSwiperInstance] = useState<unknown>(null)
    const testimonials = [
        {
            name: 'Person Name',
            profession: 'Profession',
            image: 'testimonial-1.jpg',
            stars: 4,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam soluta neque ab repudiandae reprehenderit ipsum eos cumque esse repellendus impedit.',
        },
        {
            name: 'Person Name',
            profession: 'Profession',
            image: 'testimonial-2.jpg',
            stars: 3,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam soluta neque ab repudiandae reprehenderit ipsum eos cumque esse repellendus impedit.',
        },
        {
            name: 'Person Name',
            profession: 'Profession',
            image: 'testimonial-3.jpg',
            stars: 2,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam soluta neque ab repudiandae reprehenderit ipsum eos cumque esse repellendus impedit.',
        },
    ]
    return (
        <div className="container-md pb-20">
            <div className="main-container">
                <h1 className="main-header-1"><span>Out Clients </span> <span className="main-header-2">Reviews </span></h1>
                <p className="main-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut amet nemo expedita asperiores commodi accusantium at cum harum, excepturi, quia tempora cupiditate! Adipisci facilis modi quisquam quia distinctio,</p>
            </div>
            <div className="mt-8">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 4000 }}
                    slidesPerView={2}
                    spaceBetween={30}
                    loop
                    // onSwiper={setSwiperInstance}
                    className="">
                    {
                        testimonials.map((slide, i) => (
                            <SwiperSlide key={i}>
                                <div className="relative mt-[50px] border border-primary rounded-lg">
                                    <div className="absolute bg-primary h-[70px] w-[70px] rounded-full right-5 px-2 py-2 transition-transform translate-y-[-50%] flex items-center justify-center">
                                        <FontAwesomeIcon icon={faQuoteRight} className="text-white text-4xl" />
                                    </div>
                                    <div className="px-6 py-6 flex flex-row items-center gap-4 bg-[#F2F2F2] rounded-t-lg border-b border-b-gray-300">
                                        <img src={`/img/${slide.image}`} alt="" className='rounded-full border-3 border-white' />
                                        <div className="space-y-3">
                                            <h4 className='text-2xl text-primary font-normal'>{slide.name}</h4>
                                            <p className='text-gray'>{slide.profession}</p>
                                            <ul className='flex flex-row items-center gap-1'>
                                                {
                                                    [...Array(5)].map((_, j) => (
                                                        <li key={j}>
                                                            <FontAwesomeIcon icon={faStar} className={`${(j + 1) > slide.stars ? 'text-gray' : 'text-secondary'}`} />
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="px-6 py-6">
                                        <p className='text-gray'>{slide.text}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}
