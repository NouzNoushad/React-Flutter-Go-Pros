import { faBuilding, faCarAlt, faClock, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountUp from "react-countup";

export default function FactCounter() {
    const counters = [
        {
            icon: faThumbsUp,
            value: 829,
            label: "Happy Clients",
        },
        { icon: faCarAlt, value: 56, label: "Number of Cars" },
        { icon: faBuilding, value: 127, label: "Car Center" },
        { icon: faClock, value: 589, label: "Total Kilometers" },
    ]
    return (
        <div className="relative">
            <img src="/img/fact-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover bg-center" />
            <div className="relative bg-primary/80">
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 h-full py-20">
                    {
                        counters.map((counter, i) => (
                            <div key={i} className="flex flex-col items-center justify-center gap-4">
                                <div className="bg-secondary h-20 w-20 rounded-full px-2 py-2 flex items-center justify-center">
                                    <FontAwesomeIcon icon={counter.icon} className="text-icon-dark text-4xl" />
                                </div>
                                <div className="text-white text-4xl font-bold">
                                    <CountUp end={counter.value} duration={2}/>
                                    <span className="font-extrabold">+</span>
                                </div>
                                <h4 className="text-white text-2xl">{counter.label}</h4>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
