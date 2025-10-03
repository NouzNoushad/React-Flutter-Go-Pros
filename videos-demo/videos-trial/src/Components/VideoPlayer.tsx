import ReactPlayer from "react-player";
import {
    MediaController,
    MediaControlBar,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaPlaybackRateButton,
    MediaPlayButton,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
    MediaFullscreenButton,
} from "media-chrome/react";

export default function Player({ src }: { src: string }) {
    return (
        <MediaController
            style={{
                width: "100%",
                aspectRatio: "16/9",
                border: "2px solid #fcd34d",
            }}
        >
            <ReactPlayer
                slot="media"
                src={src}
                controls={false}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            ></ReactPlayer>
            <MediaControlBar>
                <MediaPlayButton />
                <MediaSeekBackwardButton seekOffset={10} />
                <MediaSeekForwardButton seekOffset={10} />
                <MediaTimeRange />
                <MediaTimeDisplay showDuration={false} />
                <MediaMuteButton />
                <MediaPlaybackRateButton />
                <MediaFullscreenButton />
            </MediaControlBar>
        </MediaController>
    );
}