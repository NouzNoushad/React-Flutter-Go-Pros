import type { Level } from "hls.js"
import Hls from "hls.js"
import { useEffect, useRef, useState } from "react"
import { BackwardIcon, ForwardIcon, FullscreenIcon, MuteIcon, PauseIcon, PlayIcon, UnMuteIcon } from "./icons"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

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

    const [showControls, setShowControls] = useState(false)
    const [showStartPlay, setShowStartPlay] = useState(true)
    const hideTimeout = useRef<ReturnType<typeof setTimeout>>(null)

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

    // reset
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleVideoEnded = () => {
            setPlaying(false)
            setShowControls(true)
            video.currentTime = 0
        }

        video.addEventListener("ended", handleVideoEnded)
        return () => {
            video.removeEventListener("ended", handleVideoEnded)
        }
    })

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

    // initial play
    const handleStartPlay = () => {
        setShowStartPlay(false)
        togglePlay()
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

    // controls
    const resetHideControls = () => {
        if (showStartPlay) return

        setShowControls(true)
        if (hideTimeout.current) clearTimeout(hideTimeout.current)

        if (playing) {
            hideTimeout.current = setTimeout(() => {
                setShowControls(false)
            }, 3000)
        }
    }

    return (
        <div className="relative md:max-w-[700px] w-full aspect-video" onMouseMove={resetHideControls} onClick={resetHideControls}>
            <video ref={videoRef} controls={false} onPlay={() => setPlaying(true)} onPause={() => {
                setPlaying(false)
                setShowControls(true)
            }} className="w-full h-full object-contain" />

            {/* Start play */}
            {
                showStartPlay && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <button onClick={handleStartPlay} className="cursor-pointer">
                            <PlayIcon className="size-20" />
                        </button>
                    </div>
                )
            }

            <div className={`absolute bottom-0 left-0 px-2 py-2 text-white bg-black/20 w-full text-sm flex flex-row justify-between gap-2 transition-opacity duration-500 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                {/* Play button */}
                <button onClick={togglePlay} className="cursor-pointer">
                    {playing ? <PauseIcon className="size-6" /> : <PlayIcon className="size-6" />}
                </button>

                {/* Seek button */}
                <div className="hidden sm:flex gap-2">
                    <button onClick={() => seek(-10)} className="cursor-pointer">
                        <BackwardIcon className="size-6" />
                    </button>
                    <button onClick={() => seek(10)} className="cursor-pointer">
                        <ForwardIcon className="size-6" />
                    </button>
                </div>

                {/* Mute button */}
                <button className="cursor-pointer" onClick={() => setMuted(!muted)}>
                    {muted ? <MuteIcon className="size-6" /> : <UnMuteIcon className="size-6" />}
                </button>

                {/* Progress */}
                <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block">{formatTime(currentTime)}</span>
                    <input type="range" min={0} max={duration || 0} step={0.1} value={currentTime} onChange={(e) => {
                        const time = parseFloat(e.target.value)
                        if (videoRef.current) videoRef.current.currentTime = time
                        setCurrentTime(time)
                    }} className="w-full h-1 appearance-none bg-gray-300" style={{
                        "--value": `${(currentTime / (duration || 1)) * 100}%`
                    } as React.CSSProperties} />
                    <span className="hidden sm:inline-block">{formatTime(duration)}</span>
                </div>

                {/* Playback rate */}
                <div className="hidden sm:flex gap-1">
                    <Listbox value={playbackRate} onChange={setPlaybackRate}>
                        <ListboxButton className="cursor-pointer text-xs">{playbackRate}x</ListboxButton>
                        <ListboxOptions anchor="top" className="bg-black/80 text-white text-xs rounded-md">
                            {[0.5, 1, 1.5, 2].map((rate) => (
                                <ListboxOption key={rate} value={rate} className="data-focus:bg-white/10 px-2 py-1 cursor-pointer">
                                    {rate}x
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>

                {/* Quality button */}
                {
                    qualityLevels.length > 0 && (
                        <Listbox value={currentQuality} onChange={(value) => changeQuality(value)}>
                            <ListboxButton className="cursor-pointer text-xs">{currentQuality === -1 ? 'Auto' : `${qualityLevels[currentQuality]?.height}p`}</ListboxButton>
                            <ListboxOptions anchor="top" className="bg-black/80 text-white text-xs rounded-md">
                                <ListboxOption key={-1} value={-1} className="data-focus:bg-white/10 px-2 py-1 cursor-pointer">Auto</ListboxOption>
                                {qualityLevels.map((q, i) => (
                                    <ListboxOption key={i} value={i} className="data-focus:bg-white/10 px-2 py-1 cursor-pointer">
                                        {q.height}p
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Listbox>
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
