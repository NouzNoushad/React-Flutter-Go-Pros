export default function MainHeader() {

    return (
        <header className='sticky top-0 z-40 h-[4.5rem] shadow-sm px-4 py-4'>
            <div className="flex items-center justify-between space-x-2 h-full">
                <a href="#" className='hidden lg:block font-medium p-3 bg-transparent rounded-md transition-colors duration-200'>Noobies</a>
                <ul className="flex flex-row items-center gap-5 text-sm font-medium">
                    <li className="hidden lg:inline-block">
                        <a href="#" className="cursor-pointer transition-all duration-500 hover:underline">Courses</a></li>
                    <li className="">
                        <a href="#" className="cursor-pointer transition-all duration-500 hover:underline">Modules</a></li>
                </ul>
            </div>
        </header>
    )
}