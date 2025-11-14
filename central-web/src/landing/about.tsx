import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function About() {
    return (
        <div className="container-md py-20">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div className="space-y-5">
                    <div className="main-container items-start">
                        <h1 className="main-header-1"><span>Cental </span> <span className="main-header-2">About</span></h1>
                        <p className="main-p text-start">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut amet nemo expedita asperiores commodi accusantium at cum harum, excepturi, quia tempora cupiditate! Adipisci facilis modi quisquam quia distinctio,</p>
                    </div>
                    <div className="pt-5 flex flex-row items-center gap-4">
                        <div className="flex flex-col items-center justify-center gap-4 bg-[#f2f3f3] px-2 py-4 rounded-lg border border-gray-300">
                            <div className="bg-secondary h-20 w-20 rounded-full px-2 py-2 flex items-center justify-center">
                                <img src="/img/about-icon-1.png" className="size-10" />
                            </div>
                            <h4 className="text-2xl">Our Vision</h4>
                            <p className="text-center text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 bg-[#f2f3f3] px-2 py-4 rounded-lg border border-gray-300">
                            <div className="bg-secondary h-20 w-20 rounded-full px-2 py-2 flex items-center justify-center">
                                <img src="/img/about-icon-2.png" className="size-10" />
                            </div>
                            <h4 className="text-2xl">Our Mision</h4>
                            <p className="text-center text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <p className="text-gray relative pl-5 before:absolute before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-primary before:rounded-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, aliquam ipsum. Sed suscipit dolorem libero sequi aut natus debitis reprehenderit facilis quaerat similique, est at in eum. Quo, obcaecati in!</p>
                    <div className="flex flex-row items-center gap-4">
                        <div className="bg-primary rounded-lg text-white px-5 py-5 flex flex-col items-center justify-center gap-4 flex-1">
                            <h1 className="text-4xl font-medium">17</h1>
                            <h5 className="text-2xl">Years Of Experience</h5>
                        </div>
                        <ul className="flex-1 space-y-2">
                            <li>
                                <p className="text-gray">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-secondary mr-1" />
                                    Morbi tristique senectus
                                </p>
                            </li>
                            <li>
                                <p className="text-gray">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-secondary mr-1" />
                                    A scelerisque purus
                                </p>
                            </li>
                            <li>
                                <p className="text-gray">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-secondary mr-1" />
                                    Dictumst vestibulum
                                </p>
                            </li>
                            <li>
                                <p className="text-gray">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-secondary mr-1" />
                                    dio aenean sed adipiscing
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <button className="bg-secondary rounded-lg px-10 py-4 text-white">More About us</button>
                        <div className="flex flex-row items-center gap-4">
                            <img src="/img/attachment-img.jpg" alt="" className="rounded-full border-4 border-primary"/>
                            <div className="">
                                <h4 className="text-2xl text-primary">William Burgess</h4>
                                <p className="text-gray">Carveo Founder</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=""></div>
            </div>
        </div>
    )
}
