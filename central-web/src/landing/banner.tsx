export default function Banner() {
    return (
        <div className="container-md pb-12 relative">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                <img src="/img/banner-1.jpg" alt="" className="absolute inset-0 h-full w-full rounded-lg object-cover bg-center" />
                <div className="relative h-full bg-black/60 rounded-lg px-5 py-5">
                    <div className="flex flex-col items-end justify-center gap-5 text-white h-full">
                        <h2 className="text-5xl text-secondary">Rent Your Car</h2>
                        <h1 className="text-[80px]">Interested in Renting?</h1>
                        <p className="text-4xl">Don't hesitate and send us a message.</p>
                        <div className="flex flex-row items-center gap-4 mt-5">
                            <button className="rounded-full px-10 py-4 bg-primary font-medium cursor-pointer transition-colors duration-500 hover:bg-secondary">WhatsApp</button>
                            <button className="rounded-full px-10 py-4 bg-secondary font-medium cursor-pointer transition-colors duration-500 hover:bg-primary">Contact Us</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
