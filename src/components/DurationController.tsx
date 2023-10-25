import { useEffect, useState } from "react"
import { formatDuration } from "../utils"

type DurationControllerProps = {
    videoRef: React.RefObject<HTMLVideoElement>
    timelineRef: React.RefObject<HTMLDivElement>
    setPlay: React.Dispatch<React.SetStateAction<boolean>>
}

const DurationController = ({ videoRef, timelineRef, setPlay }: DurationControllerProps) => {
    const [currentTime, setCurrentTime] = useState("0:00")
    const [totalTime, setTotalTime] = useState("0:00")

    useEffect(() => {
        const video = videoRef.current
        const timeline = timelineRef.current
        
        const handleTimeUpdate = () => {
          if(video) {
            const total = formatDuration(video.duration)
            const current = formatDuration(video.currentTime)
            setTotalTime(total)
            setCurrentTime(current)
            const percent = video.currentTime / video.duration
            if(timeline) {
              timeline.style.setProperty("--progress-position", percent.toString())
            }

            if(video.currentTime === video.duration) {
              setPlay(false)
            }
            
          }
        }
    
        const handleVideoEnd = () => {
          console.log("video ended")
        }
    
        if(video) {
          video.addEventListener('timeupdate', handleTimeUpdate);
          video.addEventListener('ended', handleVideoEnd);

          return () => {
              video.removeEventListener('timeupdate', handleTimeUpdate);
              video.removeEventListener('ended', handleVideoEnd);
          };
      }  
      }, [videoRef, timelineRef, setPlay])

    return (
        <div className={`btnStyle flex items-center gap-1`}>
            <div>{currentTime}</div>
            /
            <div>{totalTime}</div>
        </div>
    )
}

export default DurationController