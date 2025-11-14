import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCar, faCogs, faGasPump, faRoad, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Categories() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [swiperInstance, setSwiperInstance] = useState<any>(null)
    const categories = [
        {
            img: 'car-1.png',
            title: 'Mercedes Benz R3',
            review: 4.5,
            price: "$99:00/Day"
        },
        {
            img: "car-2.png",
            title: "Toyota Corolla Cross",
            review: 3.5,
            price: "$128:00/Day",
        },
        {
            img: "car-3.png",
            title: "Tesla Model S Plaid",
            review: 3.8,
            price: "$170:00/Day",
        },
        {
            img: "car-4.png",
            title: "Hyundai Kona Electric",
            review: 4.8,
            price: "$187:00/Day",
        },
    ]
    return (
        <div className="container-md pb-20">
            <div className="main-container">
                <h1 className="main-header-1"><span>Vehicle </span> <span className="main-header-2">Categories</span></h1>
                <p className="main-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut amet nemo expedita asperiores commodi accusantium at cum harum, excepturi, quia tempora cupiditate! Adipisci facilis modi quisquam quia distinctio,</p>
            </div>
            <div className="mt-10 flex flex-row items-center justify-between gap-4">
                <button onClick={() => swiperInstance?.slidePrev()} className="bg-secondary rounded-full px-7.5 py-2.5 cursor-pointer transition-all duration-500 hover:bg-primary">
                    <FontAwesomeIcon icon={faAngleLeft} className="text-lg text-white" />
                </button>
                <button onClick={() => swiperInstance?.slideNext()} className="bg-secondary rounded-full px-7.5 py-2.5 cursor-pointer transition-all duration-500 hover:bg-primary">
                    <FontAwesomeIcon icon={faAngleRight} className="text-lg text-white" />
                </button>
            </div>
            <div className="mt-5">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    onSwiper={setSwiperInstance}
                    loop
                    breakpoints={{
                        576: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        992: { slidesPerView: 3 },
                    }}
                >
                    {
                        categories.map((category, i) => (
                            <SwiperSlide key={i}>
                                <div className="border border-black rounded-lg px-5 py-5 transition-all duration-500 group hover:border-secondary">
                                    <div className="rounded-lg bg-white transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(234,0,30,0.3)]">
                                        <div className="bg-[rgb(241,241,241)]">
                                            <img src={`/img/${category.img}`} alt="" className="rounded-t-lg" />
                                        </div>
                                        <div className="px-4 py-4 flex flex-col items-center justify-center gap-4 mt-1 bg-[rgb(241,241,241)]">
                                            <h4 className="text-2xl text-primary text-center">{category.title}</h4>
                                            <div className="flex flex-row items-center gap-3">
                                                <div className="text-gray">{category.review} Review</div>
                                                <ul className='flex flex-row items-center gap-1'>
                                                    {
                                                        [...Array(5)].map((_, j) => (
                                                            <li key={j}>
                                                                <FontAwesomeIcon icon={faStar} className={`${(j + 1) > category.review ? 'text-gray' : 'text-primary'}`} />
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div className="my-3">
                                                <h4 className="text-secondary text-2xl">{category.price}</h4>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-x-1">
                                                    <FontAwesomeIcon icon={faUsers} className="text-primary" />
                                                    <span className="text-gray">4 Seat</span>
                                                </div>
                                                <div className="space-x-1">
                                                    <FontAwesomeIcon icon={faCar} className="text-primary" />
                                                    <span className="text-gray">AT/MT</span>
                                                </div>
                                                <div className="space-x-1">
                                                    <FontAwesomeIcon icon={faGasPump} className="text-primary" />
                                                    <span className="text-gray">Petrol</span>
                                                </div>
                                                <div className="space-x-1">
                                                    <FontAwesomeIcon icon={faCar} className="text-primary" />
                                                    <span className="text-gray">2015</span>
                                                </div>
                                                <div className="space-x-1">
                                                    <FontAwesomeIcon icon={faCogs} className="text-primary" />
                                                    <span className="text-gray">AUTO</span>
                                                </div>
                                                <div className="space-x-1">
                                                    <FontAwesomeIcon icon={faRoad} className="text-primary" />
                                                    <span className="text-gray">27K</span>
                                                </div>
                                            </div>
                                            <button className="mt-5 bg-secondary w-full px-8 py-4 rounded-full text-white font-normal transition-all duration-500 hover:bg-primary cursor-pointer">Book Now</button>
                                        </div>
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
