import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCarAlt, faEnvelope, faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    return (
        <>
            {/* Topbar */}
            <div className="bg-primary py-2">
                <div className="container-md flex items-center justify-between">
                    <ul className="flex flex-row items-center gap-5">
                        <li>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-secondary" />
                            <span className="text-white ml-2 text-[15px]">Find A Location</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhoneAlt} className="text-secondary" />
                            <span className="text-white ml-2 text-[15px]">+01234567890</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} className="text-secondary" />
                            <span className="text-white ml-2 text-[15px]">Example@gmail.com</span>
                        </li>
                    </ul>
                    <ul className="flex items-center gap-4">
                        <li className="topbar-icon"><FontAwesomeIcon icon={faFacebookF} /></li>
                        <li className="topbar-icon"><FontAwesomeIcon icon={faTwitter} /></li>
                        <li className="topbar-icon"><FontAwesomeIcon icon={faInstagram} /></li>
                        <li className="topbar-icon"><FontAwesomeIcon icon={faLinkedinIn} /></li>
                    </ul>
                </div>
            </div>
            {/* Navbar */}
            <header className="bg-white py-2">
                <nav className="container-md flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faCarAlt} className="text-[40px] text-secondary" />
                        <h1 className="text-[40px] font-bold text-secondary">Cental</h1>
                    </div>
                    <ul className="flex items-center gap-5">
                        <li><a href="#" className="nav-link">Home</a></li>
                        <li><a href="#" className="nav-link">About</a></li>
                        <li><a href="#" className="nav-link">Service</a></li>
                        <li><a href="#" className="nav-link">Blog</a></li>
                        <li><a href="#" className="nav-link">Pages</a></li>
                        <li><a href="#" className="nav-link">Contact</a></li>
                    </ul>
                    <button className="min-w-[130px] bg-secondary text-white font-medium rounded-full px-2 py-2">
                        Get Started
                    </button>
                </nav>
            </header>
        </>
    )
}
