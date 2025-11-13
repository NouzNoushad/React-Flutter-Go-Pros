import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Team() {
    const teams = [
        {
            image: 'team-1.jpg',
            name: 'MARTIN DOE',
        },
        {
            image: 'team-2.jpg',
            name: 'MARTIN DOE',
        },
        {
            image: 'team-3.jpg',
            name: 'MARTIN DOE',
        },
        {
            image: 'team-4.jpg',
            name: 'MARTIN DOE',
        },
    ]
    return (
        <div className="container-md py-20">
            <div className="main-container">
                <h1 className="main-header-1"><span>Customer </span> <span className="main-header-2">Support </span><span>Center</span></h1>
                <p className="main-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut amet nemo expedita asperiores commodi accusantium at cum harum, excepturi, quia tempora cupiditate! Adipisci facilis modi quisquam quia distinctio,</p>
            </div>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-[150px]">
                {
                    teams.map((team, i) => (
                        <div key={i} className="group">
                            <div className="relative top-[-100px] mb-[-100px] mx-6 overflow-hidden rounded-lg z-10">
                                <img src={`/img/${team.image}`} alt="" className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 bg-[rgba(255,255,255,0.3)] rounded-lg -translate-y-full transition-transform duration-500 group-hover:translate-y-0"></div>
                                </div>
                            </div>
                            <div className="relative overflow-hidden bg-gray-100 rounded-lg mt-[-280px] pt-[200px] pb-5 px-5 group">
                                <div className="absolute inset-0 overflow-hidden rounded-lg">
                                    <div className="absolute inset-0 rounded-lg bg-primary translate-y-full transition-transform duration-500 group-hover:translate-y-0"></div>
                                </div>

                                <div className="relative flex flex-col items-center justify-center gap-4">
                                    <h4 className="uppercase text-2xl transition-colors duration-500 group-hover:text-white">{team.name}</h4>
                                    <p className="text-gray transition-colors duration-500 group-hover:text-white">Profession</p>
                                    <div className="flex flex-row items-center gap-4">
                                        <a href="#" className="team-social-icon">
                                            <FontAwesomeIcon icon={faFacebookF} className="text-secondary" />
                                        </a>
                                        <a href="#" className="team-social-icon">
                                            <FontAwesomeIcon icon={faTwitter} className="text-secondary" />
                                        </a>
                                        <a href="#" className="team-social-icon">
                                            <FontAwesomeIcon icon={faInstagram} className="text-secondary" />
                                        </a>
                                        <a href="#" className="team-social-icon">
                                            <FontAwesomeIcon icon={faLinkedinIn} className="text-secondary" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
