import { MenuIcon, XIcon } from "lucide-react";

export default function Header() {

    return (
        <header className="bg-white py-2 font-poppins text-black">
            <nav className="container-md hidden md:flex items-center justify-between gap-3 px-4">
                <div className="flex items-center gap-3">
                    <h1 className="lg:text-[18px] md:text-[16px] text-[14px] font-bold text-secondary">MyCartoonList</h1>
                </div>
                <ul className="hidden md:flex items-center gap-3">
                    <li className=""><button className="cursor-pointer">
                        <span className="text-[13px] font-semibold px-1 py-2">Home</span>
                    </button></li>
                    <li><button className="cursor-pointer">
                        <span className="text-[13px] font-semibold px-1 py-2">Search</span>
                    </button></li>
                </ul>
            </nav>

            {/* Mobile view */}
            <nav className="container-md md:hidden flex items-center justify-between gap-3 px-4">
                <div className="flex items-center gap-3">
                    <h1 className="lg:text-[20px] md:text-[18px] text-[15px] font-bold text-secondary">MCL</h1>
                </div>

                <div className={`min-w-75 fixed top-0 bottom-0 z-50 overflow-y-auto lg:-right-full transition-all duration-300 border-l bg-white border-l-black px-4 py-4 flex flex-col ght-0`}>
                    <div className="flex items-center justify-end">
                        <button className="border-2 border-black p-1.5 rounded-md cursor-pointer">
                            <XIcon className="size-4" />
                        </button>
                    </div>
                    <ul className="mt-2 flex-1 flex flex-col items-center justify-center gap-5">

                        <li><button className="block text-[13px] font-semibold px-1 py-2">
                            Home
                        </button></li>
                        <li><button className="">
                            <span className="text-[13px] font-semibold px-1 py-2">Search</span>
                        </button></li>
                    </ul>
                </div>
                <button className="border-2 border-black p-1.5 rounded-md cursor-pointer">
                    <MenuIcon className="size-4" />
                </button>
            </nav>
        </header>)
}
