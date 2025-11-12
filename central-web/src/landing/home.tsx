import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
    return (
        <div className="relative h-screen bg-red-200">
            <img src="/img/carousel-1.jpg" alt="" className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 inset-0 bg-black/60">
                <div className="container-md py-16">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                        <div className="bg-primary rounded-lg px-8 py-10">
                            {/* left content */}
                            <h4 className="uppercase text-center text-white text-2xl">CONTINUE CAR RESERVATION</h4>
                            <form action="" className="mt-5 px-4 space-y-4">
                                <select className="w-full bg-white text-gray rounded-lg px-2 py-2">
                                    <option value="">Select Your Car type</option>
                                    <option value="1">VW Golf VII</option>
                                    <option value="2">Audi A1 S-Line</option>
                                    <option value="3">Toyota Camry</option>
                                    <option value="4">BMW 320 ModernLine</option>
                                </select>
                                <div className="w-full bg-white rounded-lg flex items-center">
                                    <div className="py-2 px-2 border-r text-gray border-gray-300">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                                        <span>Pick Up</span>
                                    </div>
                                    <input type="text" placeholder="Enter a city or airport" className="flex-1 focus:outline-0 focus:ring-1 focus:ring-secondary focus:shadow-[0_0_10px_#EA001E] py-2 px-2 rounded-r-lg" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-white">Need a different drop-off location?</h4>
                                    <div className="w-full bg-white rounded-lg flex items-center">
                                        <div className="py-2 px-2 border-r text-gray border-gray-300">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                                            <span>Drop off</span>
                                        </div>
                                        <input type="text" placeholder="Enter a city or airport" className="flex-1 focus:outline-0 focus:ring-1 focus:ring-secondary focus:shadow-[0_0_10px_#EA001E] py-2 px-2 rounded-r-lg" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white rounded-l-lg flex items-center">
                                        <div className="py-2 px-2 border-r text-gray border-gray-300">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                            <span>Pick Up</span>
                                        </div>
                                        <input type="date" className="flex-1 focus:outline-0 focus:ring-1 focus:ring-secondary focus:shadow-[0_0_10px_#EA001E] py-2 px-2" />
                                    </div>
                                    <select name="" id="" className="flex-1 bg-white rounded-r-lg px-2 py-2 h-full text-gray focus:outline-0 focus:ring-1 focus:ring-secondary focus:shadow-[0_0_10px_#EA001E] focus:rounded-r-lg">
                                        <option value="" selected>12:00AM</option>
                                        <option value="1">1:00AM</option>
                                        <option value="2">2:00AM</option>
                                        <option value="3">3:00AM</option>
                                        <option value="4">4:00AM</option>
                                        <option value="5">5:00AM</option>
                                        <option value="6">6:00AM</option>
                                        <option value="7">7:00AM</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white rounded-l-lg flex items-center">
                                        <div className="py-2 px-2 border-r text-gray border-gray-300">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                            <span>Drop off</span>
                                        </div>
                                        <input type="date" className="flex-1 focus:outline-0 focus:ring-1 focus:ring-secondary focus:shadow-[0_0_10px_#EA001E] py-2 px-2" />
                                    </div>
                                    <select name="" id="" className="flex-1 bg-white rounded-r-lg px-2 py-2 h-full text-gray focus:outline-0 focus:ring-1 focus:ring-secondary focus:shadow-[0_0_10px_#EA001E] focus:rounded-r-lg">
                                        <option value="" selected>12:00AM</option>
                                        <option value="1">1:00AM</option>
                                        <option value="2">2:00AM</option>
                                        <option value="3">3:00AM</option>
                                        <option value="4">4:00AM</option>
                                        <option value="5">5:00AM</option>
                                        <option value="6">6:00AM</option>
                                        <option value="7">7:00AM</option>
                                    </select>
                                </div>
                                <button className="w-full bg-white text-secondary font-medium text-md px-2 py-2 rounded-lg transition-colors duration-500 hover:bg-secondary hover:text-white cursor-pointer">Book Now</button>
                            </form>
                        </div>
                        {/* right content */}
                        <div className="text-white space-y-5">
                            <h1 className="text-6xl font-medium">Get 15% off your rental Plan your trip now</h1>
                            <p className="text-bold">Treat yourself in USA</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
