import { cn } from "../../utils"

type PlaybackSpeedProps = {
    speed: number
    playbackSpeed: number
    handlePlaybackSpeed: (playbackSpeed: number) => void
}

const PlaybackSpeed = ({ speed, playbackSpeed, handlePlaybackSpeed }: PlaybackSpeedProps) => {
  return (
    <div className={cn('hoverStyle',{
        "bg-opacity-20": speed === playbackSpeed,
        "bg-gray-300": speed === playbackSpeed
    })} onClick={() => handlePlaybackSpeed(playbackSpeed)}>
        <button className={cn('btnStyle', "w-5 h-5 opacity-0",{
            "opacity-100": speed === playbackSpeed
        })}>
            <svg viewBox="0 0 100 125">
                <path fill="currentColor" d="M26.32 55.32c-1.92,-2.11 1.31,-5.03 3.23,-2.9l12.04 13.38 28.78 -36.3c1.77,-2.24 5.18,0.47 3.4,2.71l-30.62 38.57c-0.89,0.81 -2.27,0.73 -3.07,-0.16l-13.76 -15.3z"/>
            </svg>
        </button>
        <p className="ml-2">{playbackSpeed === 1 ? "Normal" : playbackSpeed}</p>
    </div>   
  )
}

export default PlaybackSpeed