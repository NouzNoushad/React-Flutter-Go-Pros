import type { Level } from "hls.js"
import Hls from "hls.js"
import { useEffect, useRef, useState } from "react"
import { BackwardIcon, ForwardIcon, FullscreenIcon, MuteIcon, PauseIcon, PlayIcon, UnMuteIcon } from "./icons"

export default function VPlayer({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const hlsRef = useRef<Hls | null>(null)
    const [playing, setPlaying] = useState(false)
    const [muted, setMuted] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1)
    const [qualityLevels, setQualityLevels] = useState<Level[]>([])
    const [currentQuality, setCurrentQuality] = useState(-1)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(src)
            hls.attachMedia(video)

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setQualityLevels(hls.levels)
            })
            hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
                setCurrentQuality(data.level)
            })
            hlsRef.current = hls
            return () => hls.destroy()
        }
        else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = src
        }
    }, [src])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = muted
        }
    }, [muted])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate
        }
    }, [playbackRate])

    // time update
    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        const handleTimeUpdate = () => setCurrentTime(video.currentTime)
        const handleLoadedMetadata = () => setDuration(video.duration)

        video.addEventListener("timeupdate", handleTimeUpdate)
        video.addEventListener("loadedmetadata", handleLoadedMetadata)

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate)
            video.removeEventListener("loadedmetadata", handleLoadedMetadata)
        }
    }, [])

    // play
    const togglePlay = () => {
        const video = videoRef.current
        if (!video) return
        if (playing) {
            video.pause()
        } else {
            video.play()
        }
        setPlaying(!playing)
    }

    // seek
    const seek = (offset: number) => {
        const video = videoRef.current
        if (!video) return
        let newTime = video.currentTime + offset
        newTime = Math.max(0, Math.min(newTime, video.duration))
        video.currentTime = newTime
        setCurrentTime(newTime)
    }

    // fullscreen
    const toggleFullscreen = () => {
        const video = videoRef.current
        if (!video) return
        if (video.requestFullscreen) video.requestFullscreen()
    }

    // format time
    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "00:00"
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = Math.floor(seconds % 60)
        return `${h > 0 ? h + ":" : ""}${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    }

    // quantity
    const changeQuality = (level: number) => {
        if (hlsRef.current) {
            if (level === -1) {
                hlsRef.current.currentLevel = -1
            } else {
                hlsRef.current.currentLevel = level
                hlsRef.current.nextLevel = level
            }
            setCurrentQuality(level)
        }
    }

    return (
        <div className="relative">
            <video ref={videoRef} controls={false}></video>
            <div className="absolute bottom-0 left-0 px-2 py-2 text-white bg-black/20 w-full text-sm flex flex-row justify-between gap-2">
                {/* Play button */}
                <button onClick={togglePlay} className="cursor-pointer">
                    {playing ? <PauseIcon className="size-6" /> : <PlayIcon className="size-6" />}
                </button>

                {/* Seek button */}
                <div className="flex gap-2">
                    <button onClick={() => seek(-10)} className="cursor-pointer">
                        <BackwardIcon className="size-6" />
                    </button>
                    <button onClick={() => seek(10)} className="cursor-pointer">
                        <ForwardIcon className="size-6" />
                    </button>
                </div>

                {/* Mute button */}
                <button className="cursor-pointer" onClick={() => setMuted(!muted)}>
                    {muted ? <UnMuteIcon className="size-6" /> : <MuteIcon className="size-6" />}
                </button>

                {/* Progress */}
                <div className="flex items-center gap-2">
                    <span>{formatTime(currentTime)}</span>
                    <input type="range" min={0} max={duration || 0} step={0.1} value={currentTime} onChange={(e) => {
                        const time = parseFloat(e.target.value)
                        if (videoRef.current) videoRef.current.currentTime = time
                        setCurrentTime(time)
                    }} className="w-full h-1 appearance-none bg-gray-300" style={{
                        "--value": `${(currentTime / (duration || 1)) * 100}%`
                    } as React.CSSProperties} />
                    <span>{formatTime(duration)}</span>
                </div>

                {/* Playback rate */}
                <div className="flex gap-1">
                    <select name="" id="playbackRate" value={playbackRate} onChange={(e) => setPlaybackRate(parseFloat(e.target.value))} className="border border-white bg-black/35 rounded-md text-xs cursor-pointer focus:outline-none focus:ring-0">
                        {
                            [0.5, 1, 1.5, 2].map((rate) => (
                                <option key={rate} value={rate} className="cursor-pointer">
                                    {rate}x
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Quality button */}
                {
                    qualityLevels.length > 0 && (
                        <select name="" id="" value={currentQuality} onChange={(e) => changeQuality(parseInt(e.target.value))} className="border border-white bg-black/35 rounded-md text-xs cursor-pointer focus:outline-none focus:ring-0">
                            <option value={-1}>Auto</option>
                            {
                                qualityLevels.map((q, i) => (
                                    <option key={i} value={i}>
                                        {
                                            `${q.height}p`
                                        }
                                    </option>
                                ))
                            }
                        </select>
                    )
                }

                {/* Fullscreen button */}
                <button className="cursor-pointer" onClick={toggleFullscreen}>
                    <FullscreenIcon className="size-6" />
                </button>
            </div>
        </div>
    )
}
