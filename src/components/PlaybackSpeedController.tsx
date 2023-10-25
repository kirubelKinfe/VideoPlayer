import { cn } from "../utils"
import PlaybackSpeed from "./ui/PlaybackSpeed"

type PlaybackSpeedControllerProps = {
    videoRef: React.RefObject<HTMLVideoElement>
    playSpeed: boolean
    speed: number
    setSpeed: React.Dispatch<React.SetStateAction<number>>
    togglePlayBackSpeed: () => void
}

const PlaybackSpeedController = ({ videoRef, speed, setSpeed, playSpeed, togglePlayBackSpeed}: PlaybackSpeedControllerProps) => {  

  const handlePlaybackSpeed = (speed: number) => {
    const video = videoRef.current
    if(video) {
        video.playbackRate = speed
        setSpeed(video.playbackRate)
        togglePlayBackSpeed()
    }
  }  
  return (
    <div className={cn('z-50 max-h-[300px] overflow-y-scroll absolute bottom-[13%] right-[2%] transition-all origin-bottom opacity-0 w-60 bg-opacity-90 bg-gray-900 rounded-xl', {
        "opacity-100": playSpeed
      })}>
        <div className='flex items-center py-4 border border-gray-700 cursor-pointer' onClick={togglePlayBackSpeed}>
            <button className={cn('btnStyle', "w-5 h-5 ml-2")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20" x="0px" y="0px">
                <path fill='currentColor' d="M6,8,11.1,2.85a.5.5,0,0,0-.71-.71L4.9,7.65a.5.5,0,0,0,0,.71l5.5,5.5a.5.5,0,0,0,.71-.71Z"/></svg>
            </button>
            <p className='ml-3 text-white'>PlaySpeed</p>
        </div>
        <div className='flex flex-col'>
            <PlaybackSpeed 
                speed={speed}
                playbackSpeed={0.25}
                handlePlaybackSpeed={handlePlaybackSpeed}
            />
            <PlaybackSpeed 
                speed={speed}
                playbackSpeed={0.5}
                handlePlaybackSpeed={handlePlaybackSpeed}
            />  
            <PlaybackSpeed 
                speed={speed}
                playbackSpeed={0.75}
                handlePlaybackSpeed={handlePlaybackSpeed}
            />
            <PlaybackSpeed 
                speed={speed}
                playbackSpeed={1}
                handlePlaybackSpeed={handlePlaybackSpeed}
            />
            <PlaybackSpeed 
                speed={speed}
                playbackSpeed={1.25}
                handlePlaybackSpeed={handlePlaybackSpeed}
            />
            <PlaybackSpeed 
                speed={speed}
                playbackSpeed={1.5}
                handlePlaybackSpeed={handlePlaybackSpeed}
            />
            <PlaybackSpeed 
                speed={speed}
                playbackSpeed={1.75}
                handlePlaybackSpeed={handlePlaybackSpeed}
            />
            <PlaybackSpeed 
                speed={speed}
                playbackSpeed={2}
                handlePlaybackSpeed={handlePlaybackSpeed}
            />
        </div>     
    </div>
  )
}

export default PlaybackSpeedController