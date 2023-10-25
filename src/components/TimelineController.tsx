import { useEffect } from "react"
import './style.css'

type VideoTimelineControllerProps = {
    videoRef: React.RefObject<HTMLVideoElement>
    timelineRef: React.RefObject<HTMLDivElement>
}

const TimelineController = ({ videoRef, timelineRef }: VideoTimelineControllerProps) => {
  
  useEffect(() => {
    const timeline = timelineRef.current
    const video = videoRef.current
    
    const isScrubbing = false
    
    function toggleScrubbing(e: MouseEvent) {
      e.preventDefault()
      if(timeline) {
        const rect = timeline.getBoundingClientRect()
        const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
        if(video) {
            video.currentTime = percent * video.duration
     
        }
      }
    }
    
    function handleTimelineUpdate(e: MouseEvent) {
      if(timeline) {
        const rect = timeline.getBoundingClientRect()
        const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
        timeline.style.setProperty("--preview-position", percent.toString())
      
        if (isScrubbing) {
          e.preventDefault()
          timeline.style.setProperty("--progress-position", percent.toString())
        }
      }
    }
      
    if(timeline) {
      timeline.addEventListener("mousemove", handleTimelineUpdate)
      timeline.addEventListener("mousedown", toggleScrubbing)
    }
  
    document.addEventListener("mouseup", e => {
      if (isScrubbing) toggleScrubbing(e)
    })
    
    document.addEventListener("mousemove", e => {
      if (isScrubbing) handleTimelineUpdate(e)
    })

    return () => {
        document.removeEventListener('mousemove', handleTimelineUpdate);
        document.removeEventListener('mousedown', toggleScrubbing);
    };

    
  },[videoRef, timelineRef])  
  
  return (
    <div ref={timelineRef} className="timeline-container">
      <div className="timeline">
        <div className="thumb-indicator"></div>
      </div>
    </div>   
  )
}

export default TimelineController