import MainModulesCard from "./modules_card";

export default function MainModules() {
    return (
        <main className='lg:px-8 lg:py-5 px-4 py-4 flex flex-col'>
            <div className="flex-shrink-0">
                <h1 className='text-lg font-semibold'>Main Modules</h1>
                <p className='text-gray-400 text-xs font-medium'>Home - Main Modules</p>
            </div>
            <div className="lg:mt-6 mt-4">
                {/* Main Modules */}
                <MainModulesCard />
            </div>
        </main>
    )
}
