import { useEffect, useRef, useState } from "react"
import DurationController from "./DurationController"
import PlayPauseController from "./PlayPauseController"
import TimelineController from "./TimelineController"
import VideoScreenController from "./VideoScreenController"
import VolumeController from "./VolumeController"
import { cn } from "../utils"


type VideoOverlayProps = {
    videoRef: React.RefObject<HTMLVideoElement>
    setVolumeChanged: React.Dispatch<React.SetStateAction<boolean>>
    volume: number
    setVolume: React.Dispatch<React.SetStateAction<number>>
    settings: boolean
    theaterMode: boolean
    fullScreenMode: boolean
    toggleSettings: () => void 
    toggleMiniPlayerMode: () => void 
    toggleTheater: () => void 
    toggleFullScreen: () => void 
}

const VideoOverlay = ({ videoRef, setVolumeChanged, volume, setVolume , settings, theaterMode, fullScreenMode, toggleSettings, toggleMiniPlayerMode, toggleTheater, toggleFullScreen }: VideoOverlayProps) => {
    const [play, setPlay] = useState(true)
    const [timer, setTimer] = useState(true)

    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current
        if (video) {
          if(play) {
            video.play();
            setPlay(true)
          } else {
            video.pause();
            setPlay(false)
          }
        }
    
        setTimeout(() => {
          if(play){
            setTimer(false)
          } 
        }, 3000)
        
        const handleKeyDown = (event: KeyboardEvent) => {
          event.preventDefault()
          const tagName = document.activeElement?.tagName.toLocaleLowerCase()
    
          if(tagName === "input") return
    
          switch(event.key.toLowerCase()) {
            case " ":
            case "k":  
              togglePlay()
              break   
            case "arrowleft":
            case "l":
              skip(-5)
              break
            case "arrowright":
            case "r":
              skip(5)
              break      
          }
        };
        
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
        
    }, [videoRef, play]);
    
    const togglePlay = () => {
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                video.play();
                setPlay(true)
                setTimer(true)
            } else {
                video.pause();
                setPlay(false)
            }
        }
    };
      
      
    const skip = (duration: number) => {
        const video = videoRef.current
        if(video) {
          video.currentTime += duration
        }
    }    
    return (
        <div className={cn('videoOverlay group-hover/overlay:opacity-100 group-focus-within/overlay:opacity-100', {
        "opacity-100": settings || !play || timer
        })}>
            <TimelineController 
            videoRef={videoRef}
            timelineRef={timelineRef}
            />
            <div className='flex items-center justify-between px-4 py-3'>
                <div className='flex items-center gap-4'>
                    <PlayPauseController 
                    play={play}
                    togglePlay={togglePlay}
                    />
                    <VolumeController 
                      videoRef={videoRef}
                      volume={volume}
                      setVolume={setVolume}
                      setVolumeChanged={setVolumeChanged}
                    />
                    <DurationController 
                    videoRef={videoRef}
                    timelineRef={timelineRef}
                    setPlay={setPlay}
                    />
                </div>
                
                <VideoScreenController 
                    theaterMode={theaterMode}
                    fullScreenMode={fullScreenMode}
                    toggleSettings={toggleSettings}
                    toggleFullScreen={toggleFullScreen}
                    toggleMiniPlayerMode={toggleMiniPlayerMode}
                    toggleTheater={toggleTheater}
                />
            </div>
    </div>  
  )
}

export default VideoOverlay