import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faEnvelope, faMapMarkerAlt, faPhone, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const links = [
    {
        text: 'About'
    },
    {
        text: 'Cars'
    },
    {
        text: 'Car Types'
    },
    {
        text: 'Team'
    },
    {
        text: 'Contact us'
    },
    {
        text: 'Terms & Conditions'
    },
]
const contacts = [
    {
        icon: faMapMarkerAlt,
        text: '123 Street, New York, USA',
    },
    {
        icon: faEnvelope,
        text: 'info@example.com',
    },
    {
        icon: faPhone,
        text: '+012 345 67890',
    },
    {
        icon: faPrint,
        text: '+012 345 67890',
    },
]
const socialIcons = [
    {
        icon: faFacebookF,
    },
    {
        icon: faTwitter,
    },
    {
        icon: faInstagram,
    },
    {
        icon: faLinkedinIn,
    },
]

export default function Footer() {
    return (
        <footer className="bg-[#000C21] text-white">
            <div className="container-md py-20">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="space-y-4">
                        <h4 className="text-[28px]">About Us</h4>
                        <p className="text-gray leading-8">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.</p>
                        <div className="bg-white rounded-full px-2 py-4 relative w-full">
                            <input type="text" placeholder="Enter your email" className="placeholder:text-gray px-2 outline-0 text-black" />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary px-2 py-2 text-white rounded-full transition-all duration-500 hover:bg-secondary cursor-pointer">Subscribe</button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-[28px]">Quick Links</h4>
                        <ul className="text-gray space-y-3">
                            {
                                links.map((link, i) => (
                                    <li key={i} className="group">
                                        <a href="#" className="space-x-1">
                                            <FontAwesomeIcon icon={faAngleRight} className="transition-all duration-500 group-hover:text-secondary" />
                                            <span className="transition-all duration-500 group-hover:tracking-widest group-hover:text-secondary">{link.text}</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-[28px]">Business Hours</h4>
                        <div className="space-y-1">
                            <h6 className="text-gray text-[17px]">Mon - Friday:</h6>
                            <p className="text-[17px]">09.00 am to 07.00 pm</p>
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-gray text-[17px]">Saturday:</h6>
                            <p className="text-[17px]">10.00 am to 05.00 pm</p>
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-gray text-[17px]">Vacation:</h6>
                            <p className="text-[17px]">All Sunday is our vacation</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-[28px]">Contact Info</h4>
                        <ul className="space-y-3">
                            {
                                contacts.map((contact, i) => (
                                    <li key={i} className="group"><a href="#" className="text-gray space-x-1">
                                        <FontAwesomeIcon icon={contact.icon} className="transition-all duration-500 group-hover:text-secondary" />
                                        <span className="transition-all duration-500 group-hover:tracking-widest group-hover:text-secondary">{contact.text}</span>
                                    </a></li>
                                ))
                            }
                        </ul>
                        <ul className="flex flex-row items-center gap-4">
                            {
                                socialIcons.map((social, i) => (
                                    <li key={i}>
                                        <a href="#" className="h-10 w-10 bg-primary rounded-full flex items-center justify-center transition-all duration-500 hover:bg-secondary">
                                            <FontAwesomeIcon icon={social.icon} className="transition-all duration-500 group-hover:text-secondary" />
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="relative z-10 text-white py-5 border-t border-t-white/10 space-y-2">
                <div className="container-md flex flex-row items-center justify-between ">
                    <p >Copyright &copy; <a href="#domain" className='text-gray font-semibold'>Domain</a>. All Rights Reserved.</p>
                    <p >Designed by <a href="https://htmlcodex.com" className='text-gray font-semibold'>HTML</a> Distributed by <a href="https://themewagon.com" target="_blank" rel="noreferrer" className='text-gray'>Noboman</a></p>
                </div>
            </div>
        </footer>
    )
}
