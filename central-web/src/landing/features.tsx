import { faMapPin, faRoad, faTag, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Features() {
    return (
        <div className="bg-[#F2F2F2]">
            <div className="container-md py-20">
                <div className="main-container">
                    <h1 className="main-header-1"><span>Cental </span> <span className="main-header-2">Features</span></h1>
                    <p className="main-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut amet nemo expedita asperiores commodi accusantium at cum harum, excepturi, quia tempora cupiditate! Adipisci facilis modi quisquam quia distinctio,</p>
                </div>
                <div className="mt-10">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="bg-secondary h-20 w-20 rounded-full px-2 py-2 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faTrophy} className="text-icon-dark text-4xl" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h5 className="text-xl">First Class services</h5>
                                    <p className="text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, in illum aperiam ullam magni eligendi?</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-secondary h-20 w-20 rounded-full px-2 py-2 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faRoad} className="text-icon-dark text-4xl" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h5 className="text-xl">24/7 road assistance</h5>
                                    <p className="text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, in illum aperiam ullam magni eligendi?</p>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <img src="/img/features-img.png" alt="" className="object-cover" />
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="flex-1 space-y-2 text-end">
                                    <h5 className="text-xl">Quality at Minimum</h5>
                                    <p className="text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, in illum aperiam ullam magni eligendi?</p>
                                </div>
                                <div className="bg-secondary h-20 w-20 rounded-full px-2 py-2 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faTag} className="text-icon-dark text-4xl" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 space-y-2 text-end">
                                    <h5 className="text-xl">Free Pick-Up & Drop-Off</h5>
                                    <p className="text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, in illum aperiam ullam magni eligendi?</p>
                                </div>
                                <div className="bg-secondary h-20 w-20 rounded-full px-2 py-2 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faMapPin} className="text-icon-dark text-4xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
