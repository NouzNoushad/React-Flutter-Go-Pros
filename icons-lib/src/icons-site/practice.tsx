import { useState } from "react";
import { AddCircleFillIcon, AddCircleOutlineIcon, CancelFillIcon, CancelOutlineIcon, CheckFillIcon, CheckOutlineIcon, LogoutFillIcon, LogoutOutlineIcon, MoreVertFillIcon, MoreVertOutlineIcon } from "../components/icons";
import { renderToStaticMarkup } from "react-dom/server";

type IconConfig = {
    name: string;
    Component: React.FC<{ size?: number; color?: string }>;
    defaultSize: number;
};

const icons: IconConfig[] = [
    { name: "cancel-outline", Component: CancelOutlineIcon, defaultSize: 30 },
    { name: "cancel-fill", Component: CancelFillIcon, defaultSize: 30 },
    { name: "logout-outline", Component: LogoutOutlineIcon, defaultSize: 30 },
    { name: "logout-fill", Component: LogoutFillIcon, defaultSize: 30 },
    { name: "checkout-outline", Component: CheckOutlineIcon, defaultSize: 30 },
    { name: "checkout-fill", Component: CheckFillIcon, defaultSize: 30 },
    { name: "add-circle-outline", Component: AddCircleOutlineIcon, defaultSize: 30 },
    { name: "add-circle-fill", Component: AddCircleFillIcon, defaultSize: 30 },
    { name: "more-vert-outline", Component: MoreVertOutlineIcon, defaultSize: 30 },
    { name: "more-vert-fill", Component: MoreVertFillIcon, defaultSize: 30 },
];

export default function PracticeHome() {
    const [openCode, setOpenCode] = useState<string | null>(null)
    const toggleCode = (name: string) => {
        if (openCode === name) setOpenCode(null)
        else setOpenCode(name)
    }
    const [controls, setControls] = useState(
        icons.reduce(
            (acc, icon) => ({
                ...acc,
                [icon.name]: {
                    size: icon.defaultSize,
                    color: "#000"
                }
            }),
            {} as Record<string, { size: number; color: string }>
        )
    )

    const handleChange = (
        name: string,
        field: keyof { size: number; color: string },
        value: string | number
    ) => {
        setControls((prev) => ({
            ...prev,
            [name]: { ...prev[name], [field]: value },
        }))
    }

    // download svg
    const downloadSVG = (name: string) => {
        const icon = icons.find((i) => i.name === name)
        if (!icon) return
        const { size, color } = controls[name]
        import("react-dom/server").then(({ renderToStaticMarkup }) => {
            const svgString = renderToStaticMarkup(
                <icon.Component size={size} color={color} />
            )
            const blob = new Blob([svgString], { type: "image/svg+xml" })
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `${name}.svg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        })
    }

    // download png
    const downloadPNG = (name: string) => {
        const icon = icons.find((i) => i.name === name)
        if (!icon) return
        const { size, color } = controls[name]
        import("react-dom/server").then(({ renderToStaticMarkup }) => {
            const svgString = renderToStaticMarkup(
                <icon.Component size={size} color={color} />
            )
            const blob = new Blob([svgString], { type: "image/svg+xml" })
            const url = URL.createObjectURL(blob)
            const img = new Image()
            img.src = url
            img.onload = () => {
                const canvas = document.createElement("canvas")
                canvas.width = size
                canvas.height = size
                const ctx = canvas.getContext("2d")
                if (!ctx) return
                ctx.drawImage(img, 0, 0, size, size)
                const pngURL = canvas.toDataURL("image/png")
                const link = document.createElement("a")
                link.href = pngURL
                link.download = `${name}.png`
                link.click()
                URL.revokeObjectURL(url)
            }
        })
    }

    // copy to clipboard
    const copyToClipboard = (name: string) => {
        const icon = icons.find((i) => i.name === name)
        if (!icon) return
        const { size, color } = controls[name]
        import("react-dom/server").then(({ renderToStaticMarkup }) => {
            const svgString = renderToStaticMarkup(
                <icon.Component size={size} color={color} />
            )
            navigator.clipboard.writeText(svgString).then(() => {
                alert(`${name} copied to clipboard`)
            })
        })
    }

    return (
        <div className="container-lg mt-[5rem]">
            <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-6">
                {icons.map(({ name, Component }) => {
                    const { size, color } = controls[name]
                    return (
                        <div key={name} className="flex flex-col items-start gap-2">
                            <div className="flex items-center justify-center border border-black rounded-lg p-2">
                                <Component size={size} color={color} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="flex flex-col">
                                    Size: {size}px
                                    <input
                                        type="range"
                                        min={16}
                                        max={200}
                                        value={size}
                                        onChange={(e) => handleChange(name, "size", Number(e.target.value))}
                                    />
                                </label>
                                <label className="flex flex-col">
                                    Color:
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => handleChange(name, "color", e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                                <button
                                    className="border border-black rounded-lg py-1 px-2 text-xs"
                                    onClick={() => downloadSVG(name)}
                                >
                                    Download SVG
                                </button>
                                <button
                                    className="border border-black rounded-lg py-1 px-2 text-xs"
                                    onClick={() => downloadPNG(name)}
                                >
                                    Download PNG
                                </button>
                                <button
                                    className="border border-black rounded-lg py-1 px-2 text-xs"
                                    onClick={() => copyToClipboard(name)}
                                >
                                    Copy SVG
                                </button>
                                <button
                                    className="border border-black rounded-lg py-1 px-2 text-xs"
                                    onClick={() => toggleCode(name)}
                                >
                                    {openCode === name ? "Hide Code " : "Show Code"}
                                </button>
                                {openCode === name && (
                                    <pre className="border border-black p-1 rounded text-xs overflow-auto max-w-[150px]">
                                        {
                                            renderToStaticMarkup(
                                                <Component size={size} color={color} />
                                            )
                                        }
                                    </pre>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
