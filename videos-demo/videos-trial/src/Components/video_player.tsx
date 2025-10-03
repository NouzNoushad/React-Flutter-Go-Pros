import { useRef, useState, useEffect } from "react";
import Hls, { Level } from "hls.js";

interface CustomPlayerProps {
    src: string; // HLS .m3u8 file
}

export default function CustomPlayer({ src }: CustomPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    const [qualityLevels, setQualityLevels] = useState<Level[]>([]);
    const [currentQuality, setCurrentQuality] = useState(-1); // -1 = Auto

    // Init HLS
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setQualityLevels(hls.levels);
                console.log("HLS Levels:", hls.levels);
            });

            hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
                setCurrentQuality(data.level);
            });

            hlsRef.current = hls;
            return () => hls.destroy();
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = src;
        }
    }, [src]);

    // Keep video element in sync with state
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = muted;
        }
    }, [muted]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    // Time & metadata events
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (playing) {
            video.pause();
        } else {
            video.play();
        }
        setPlaying(!playing);
    };

    const seek = (offset: number) => {
        const video = videoRef.current;
        if (!video) return;
        let newTime = video.currentTime + offset;
        newTime = Math.max(0, Math.min(newTime, video.duration));
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.requestFullscreen) video.requestFullscreen();
    };

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "00:00";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h > 0 ? h + ":" : ""}${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    };

    const changeQuality = (level: number) => {
        if (hlsRef.current) {
            hlsRef.current.currentLevel = level;
            setCurrentQuality(level);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto border-2 border-amber-600 rounded-lg overflow-hidden">
            <video
                ref={videoRef}
                className="w-full"
                style={{ aspectRatio: "16/9" }}
                controls={false}
            />

            <div className="flex flex-col gap-2 bg-amber-100 p-3 text-sm">
                <div className="flex items-center justify-between">
                    <button onClick={togglePlay} className="px-2 py-1 bg-amber-300 rounded">
                        {playing ? "Pause" : "Play"}
                    </button>

                    <div className="flex gap-2">
                        <button onClick={() => seek(-10)} className="px-2 py-1 bg-amber-200 rounded">⏪ 10s</button>
                        <button onClick={() => seek(10)} className="px-2 py-1 bg-amber-200 rounded">10s ⏩</button>
                    </div>

                    <button onClick={() => setMuted(!muted)} className="px-2 py-1 bg-amber-200 rounded">
                        {muted ? "Unmute" : "Mute"}
                    </button>

                    <button onClick={toggleFullscreen} className="px-2 py-1 bg-amber-200 rounded">
                        ⛶
                    </button>

                    {qualityLevels.length > 0 && (
                        <select
                            value={currentQuality}
                            onChange={(e) => changeQuality(parseInt(e.target.value))}
                            className="px-2 py-1 bg-amber-200 rounded"
                        >
                            <option value={-1}>Auto</option>
                            {qualityLevels.map((q, i) => (
                                <option key={i} value={i}>
                                    {q.height > 0
                                        ? `${q.height}p`
                                        : `${Math.round(q.bitrate / 1000)} kbps`}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <span>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        step={0.1}
                        value={currentTime}
                        onChange={(e) => {
                            const time = parseFloat(e.target.value);
                            if (videoRef.current) videoRef.current.currentTime = time;
                            setCurrentTime(time);
                        }}
                        className="flex-1"
                    />
                    <span>{formatTime(duration)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <label>Volume:</label>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-24"
                    />

                    <div className="flex gap-1">
                        {[0.5, 1, 1.5, 2].map((rate) => (
                            <button
                                key={rate}
                                onClick={() => setPlaybackRate(rate)}
                                className={`px-2 py-1 rounded ${playbackRate === rate ? "bg-amber-400" : "bg-amber-200"}`}
                            >
                                {rate}x
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
