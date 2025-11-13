import { faArrowRight, faCommentAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Blog() {
    const blogs = [
        {
            image: 'blog-1.jpg',
            date: '30 Dec 2025',
            title: 'Rental Cars how to check driving fines?',
        },
        {
            image: 'blog-2.jpg',
            date: '25 Dec 2025',
            title: 'Rental cost of sport and other cars',
        },
        {
            image: 'blog-3.jpg',
            date: '27 Dec 2025',
            title: 'Document required for car rental',
        },
    ]
    return (
        <div className="container-md py-20">
            <div className="main-container">
                <h1 className="main-header-1"><span>Cental </span> <span className="main-header-2">Blog & News</span></h1>
                <p className="main-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut amet nemo expedita asperiores commodi accusantium at cum harum, excepturi, quia tempora cupiditate! Adipisci facilis modi quisquam quia distinctio,</p>
            </div>
            <div className="mt-8">
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {
                        blogs.map((blog, i) => (
                            <div key={i} className="flex flex-col items-center transition-all duration-200 hover:shadow-[0_0_45px_rgba(0,0,0,.2)] group rounded-lg">
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img src={`/img/${blog.image}`} alt="" className="w-full h-auto rounded-t-lg transition-transform duration-500 group-hover:scale-125" />
                                    <div className="absolute inset-0 overflow-hidden rounded-t-lg">
                                        <div className="absolute inset-0 rounded-t-lg bg-[rgba(255,255,255,0.3)] transition-transform translate-y-full duration-500 group-hover:translate-y-0"></div>
                                    </div>
                                </div>
                                <div className="bg-[#F2F2F2] rounded-b-lg relative px-5 pb-6 pt-10 space-y-4">
                                    <div className="absolute top-0 left-5 transform translate-y-[-50%] bg-secondary rounded-lg px-4 py-3 text-white">{blog.date}</div>
                                    <div className="flex flex-row items-center justify-between gap-5">
                                        <div className="space-x-2">
                                            <FontAwesomeIcon icon={faUser} className="text-secondary text-[15px]" />
                                            <span className="text-gray text-[15px]">Martin.C</span>
                                        </div>
                                        <div className="space-x-2">
                                            <FontAwesomeIcon icon={faCommentAlt} className="text-secondary text-sm" />
                                            <span className="text-gray text-sm">6 Comments</span>
                                        </div>
                                    </div>
                                    <a href="#" className="text-2xl inline-block transition-colors duration-200 hover:text-secondary">{blog.title}</a>
                                    <p className="text-gray">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius libero soluta impedit eligendi? Quibusdam, laudantium.</p>
                                    <a href="#" className="text-secondary">Read More
                                        <FontAwesomeIcon icon={faArrowRight} className="text-secondary" />
                                    </a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
