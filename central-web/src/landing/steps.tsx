export default function Steps() {
    return (
        <div className="relative">
            <img src="/img/bg-1.jpg" alt="" className="absolute inset-0 h-full w-full object-cover bg-center" />
            <div className="relative bg-black/90 py-20">
                <div className="main-container">
                    <h1 className="main-header-1 text-white"><span>Cental </span> <span className="main-header-2">Process</span></h1>
                    <p className="main-p text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut amet nemo expedita asperiores commodi accusantium at cum harum, excepturi, quia tempora cupiditate! Adipisci facilis modi quisquam quia distinctio,</p>
                </div>
                <div className="container-md mt-10">
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div className="bg-primary text-white rounded-lg px-6 py-4 space-y-2 relative">
                            <h4 className="text-[28px]">Come In Contact</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, dolorem!</p>
                            <div className="absolute bottom-0 right-10 h-16 w-16 rounded-full bg-primary border border-white flex items-center justify-center transform translate-y-[50%] font-bold">01.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
