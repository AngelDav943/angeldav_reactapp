import React, { useEffect, useRef, useState } from 'react'
import './videoPlayer.css'

interface videoProps {
    src: string;
    controls?: boolean;
    simpleControls?: boolean;
    className?: string;
    muted?: boolean;
    loop?: boolean;
    autoPlay?: boolean;
    style?: React.CSSProperties;
}

export default function ({
    src = "",
    controls = true,
    simpleControls = false,
    className = "",
    muted = false,
    loop = false,
    autoPlay = false,
    style = {}
}: videoProps) {
    const playerRef = useRef<any>();
    const videoRef = useRef<any>();

    const [hasEnded, setEnded] = useState<boolean>(false);
    const [isPlaying, setPlaying] = useState<boolean>(autoPlay);
    const [currentVolume, setVolume] = useState<number>(muted ? 0 : 1);

    function play(event: any) {
        if (videoRef.current == null) return;
        const video = videoRef.current;
        setPlaying(current => {
            setEnded(false)
            if (!current) {
                video.play()
            } else {
                video.pause()
            }
            return !current
        })
    }

    function mute(event) {
        setVolume(current => {
            if (current == 0) return 1;
            return 0
        })
    }

    function fullScreen(event) {
        if (playerRef.current == null) return;
        const player = playerRef.current;
        event.preventDefault();
        if (!document.fullscreenElement) {
            player.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    const [timePercentage, setTimePercentage] = useState<number>(0);
    function onTimeUpdate(event) {
        if (videoRef.current == null) return;
        const video = videoRef.current;

        setTimePercentage((video.currentTime / video.duration) * 100)
        if (video.ended) {
            setEnded(true)
            return setPlaying(false)
        }
    }

    function testMiddle() {
        if (videoRef.current == null) return;
        const video = videoRef.current;
        if (isNaN(video.duration) == true) return;

        console.log(video.currentTime, video.duration)
        var cTime = video.currentTime;
        console.log(cTime)
        video.currentTime = 3

    }

    useEffect(() => {
        if (videoRef.current == null) return;
        const video = videoRef.current;
        video.volume = currentVolume
    }, [currentVolume])

    return <div className={`customVideoPlayer ${className}`} ref={playerRef} style={style}>
        <video
            ref={videoRef}
            muted={muted}
            loop={loop}
            playsInline={true}
            autoPlay={autoPlay}
            onTimeUpdate={event => onTimeUpdate(event)}
        >
            <source src={src} type='video/mp4' />
        </video>
        {controls && <div className="controls">
            <img className='button' src={`/images/${hasEnded == false ? (isPlaying ? 'pause' : 'play') : 'repeat'}.png`} onClick={event => play(event)} draggable={false} />

            {/* <button type='submit' onClick={() => testMiddle()}>test</button> */}
            {
                !simpleControls ? <>
                    <div className="timeline">
                        <div className="bar">
                            <div className="inner" style={{ width: `${timePercentage}%` }} />
                        </div>
                    </div>

                </> : <div className='timeline' />
            }
            <div className="volumeContainer">
                <img className='button' src={`/images/sound_${currentVolume <= 0.01 ? 'off' : 'on'}.png`} onClick={event => mute(event)} draggable={false} />
                <div className="slider">
                    <input
                        type="range"
                        onChange={e => setVolume(parseInt(e.target.value) / 100)}
                        style={{ "--targetHeight": `${currentVolume * 100}%` } as React.CSSProperties}
                        value={currentVolume * 100}
                    />
                </div>
            </div>
            <img className='button' src={`/images/fullscreen.png`} onClick={event => fullScreen(event)} draggable={false} />
        </div>}
    </div>
}
