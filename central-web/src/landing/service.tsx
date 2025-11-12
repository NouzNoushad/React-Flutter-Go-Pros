import { faBuilding, faCarAlt, faMoneyBill, faPhoneAlt, faRoad, faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Service() {
    const services = [
        {
            icon: faPhoneAlt,
            label: 'Phone Reservation',
        },
        {
            icon: faMoneyBill,
            label: 'Special Rates',
        },
        {
            icon: faRoad,
            label: 'One Way Rental',
        },
        {
            icon: faUmbrella,
            label: 'Life Insurance',
        },
        {
            icon: faBuilding,
            label: 'City to City',
        },
        {
            icon: faCarAlt,
            label: 'Free Rides',
        },
    ]
    return (
        <div className="container-md py-20">
            <div className="main-container">
                <h1 className="main-header-1"><span>Cental </span> <span className="main-header-2">Services</span></h1>
                <p className="main-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut amet nemo expedita asperiores commodi accusantium at cum harum, excepturi, quia tempora cupiditate! Adipisci facilis modi quisquam quia distinctio,</p>
            </div>
            <div className="mt-10">
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {
                        services.map((service, i) => (
                            <div key={i} className="flex flex-col items-center justify-center gap-4 px-4 py-5 shadow-[0_0_45px_rgba(0,0,0,0.1)] rounded-[10px] transition-all duration-500 hover:rounded-[50px] hover:shadow-[0_0_10px_#EA001E] cursor-pointer">
                                <div className="bg-secondary h-20 w-20 rounded-full px-2 py-2 flex items-center justify-center">
                                    <FontAwesomeIcon icon={service.icon} className="text-icon-dark text-4xl" />
                                </div>
                                <h4 className="text-2xl">{service.label}</h4>
                                <p className="text-center text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsam quasi quibusdam ipsa perferendis iusto?</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
