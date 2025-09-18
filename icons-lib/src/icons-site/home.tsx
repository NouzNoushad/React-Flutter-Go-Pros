import { useState } from "react"

export default function Home() {
    const icons = ["fire.svg", "focus.svg", "globe.svg", "infinity.svg", "nav.svg", "replay.svg", "settings.svg", "square.svg", "sun.svg", "thunder.svg"]

    const [svgCode, setSvgCode] = useState<string | null>(null)
    const [openCode, setOpenCode] = useState(false)

    // download svg
    const downloadSVG = async (icon: string) => {
        const res = await fetch(`/icons/${icon}`)
        const svgText = await res.text()
        // convert svg string to blob
        const blob = new Blob([svgText], { type: "image/svg+xml" })
        // create temporary object
        const url = URL.createObjectURL(blob)

        // create link
        const link = document.createElement("a")
        // point link to blob
        link.href = url
        // download name
        link.download = icon
        document.body.appendChild(link)
        // trigger click
        link.click()
        document.body.removeChild(link)

        // clean memory
        URL.revokeObjectURL(url)
    }

    // download png
    const downloadPNG = async (icon: string) => {
        const res = await fetch(`/icons/${icon}`)
        const svgText = await res.text()
        // convert svg string to blob
        const svgBlob = new Blob([svgText], { type: "image/svg+xml" })
        // create temporary object
        const url = URL.createObjectURL(svgBlob)


        const img = new Image()
        img.src = url
        img.onload = () => {
            // draw img onto a canvas
            const canvas = document.createElement("canvas")
            canvas.width = img.width
            canvas.height = img.height

            const ctx = canvas.getContext("2d")
            if (!ctx) return
            ctx.drawImage(img, 0, 0)

            // convert canvas to png
            const pngURL = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = pngURL
            link.download = icon.replace(".svg", ".png")
            link.click()

            // clean memory
            URL.revokeObjectURL(url)
        }
    }

    // copy svg code
    const copyToClipboard = async (icon: string) => {
        const res = await fetch(`icons/${icon}`)
        const svgText = await res.text()
        await navigator.clipboard.writeText(svgText)
        alert(`${icon} copied to clipboard`)
    }

    // show svg code
    const showSvgCode = async (icon: string) => {

        if (openCode) {
            setSvgCode(null)
            setOpenCode(false)
        } else {
            const res = await fetch(`/icons/${icon}`)
            const svgText = await res.text()
            setSvgCode(svgText)
            setOpenCode(true)
        }
    }

    return (
        <div className="container-lg mt-[5rem]">
            <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-6">
                {
                    icons.map((icon) => (
                        <div key={icon} className="flex flex-row items-start gap-2">
                            <div className="h-[4rem] w-[4rem] flex items-center justify-center border border-black rounded-lg px-2 py-2">
                                <img src={`/icons/${icon}`} alt="" className="size-6" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => downloadSVG(icon)} className="border border-black rounded-lg py-1 px-2 text-xs cursor-pointer">Download SVG</button>
                                <button onClick={() => downloadPNG(icon)} className="border border-black rounded-lg py-1 px-2 text-xs cursor-pointer">Download PNG</button>
                                <button onClick={() => copyToClipboard(icon)} className="border border-black rounded-lg py-1 px-2 text-xs cursor-pointer">Copy to clipboard</button>
                                <button onClick={() => showSvgCode(icon)} className="border border-black rounded-lg py-1 px-2 text-xs cursor-pointer">{
                                    openCode ? 'Hide code' : 'Show code'}</button>
                                {svgCode && <div className="border border-black px-1 py-1 rounded-lg text-xs text-gray-500 max-w-[120px]">
                                    <pre className="w-[100px] px-1 py-1 overflow-auto">
                                        {svgCode}
                                    </pre>
                                </div>}
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}
