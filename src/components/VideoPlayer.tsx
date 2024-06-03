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
        if (videoRef.current == null) return;
        const video = videoRef.current;
        event.preventDefault();
        video.requestFullscreen();
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
        video.currentTime = 5

    }

    const [changingVolume, setChangingVolume] = useState<boolean>(false);
    function changeVolume(event, override: boolean | undefined = false) {
        if (changingVolume == false && override == false) return;
        const rect = event.target.getBoundingClientRect();
        const relativeY = Math.abs((event.clientY - rect.top.toFixed()) - rect.height);
        const percentage = relativeY / rect.height
        setVolume(current => {
            if (Math.abs(percentage - current) > 0.5 && override == false) return current
            return Math.min(1, Math.max(0, percentage))
        });
    }

    useEffect(() => {
        if (videoRef.current == null) return;
        const video = videoRef.current;
        video.volume = currentVolume
    }, [currentVolume])

    return <div className={`customVideoPlayer ${className}`} style={style}>
        <video
            ref={videoRef}
            src={src}
            // onClick={(event) => play(event)}
            muted={muted}
            loop={loop}
            autoPlay={autoPlay}
            onTimeUpdate={event => onTimeUpdate(event)}
        />
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
                    <div
                        className="bar"
                        onClick={event => changeVolume(event, true)}
                        onMouseDown={e => setChangingVolume(true)}
                        onMouseUp={e => setChangingVolume(false)}
                        onMouseMove={event => changeVolume(event)}
                        onMouseLeave={e => setChangingVolume(false)}
                    >
                        <div className="inner" style={{ height: `${currentVolume * 100}%` }} />
                    </div>
                </div>
            </div>
            <img className='button' src={`/images/fullscreen.png`} onClick={event => fullScreen(event)} draggable={false} />
        </div>}
    </div>
}
