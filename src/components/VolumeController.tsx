import { useEffect, useRef, useState } from "react"
import ToolTip from "./ui/Tooltip"



type VolumeControllerProps = {
    videoRef: React.RefObject<HTMLVideoElement>
    volume: number
    setVolume: React.Dispatch<React.SetStateAction<number>>
    setVolumeChanged: React.Dispatch<React.SetStateAction<boolean>>
}

const VolumeController = ({ videoRef, volume, setVolume, setVolumeChanged }: VolumeControllerProps) => {
 const [volumeHigh, setVolumeHigh] = useState(true)
 const [muted, setMuted] = useState(false)
 const inputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
    const video = videoRef.current
    
    if(video) {
        video.muted = muted
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault()
      const tagName = document.activeElement?.tagName.toLocaleLowerCase()

      if(tagName === "input") return

      switch(event.key.toLowerCase()) {
        case "m":
          setMuted(!muted)
          break 
        case "arrowup":
        case "u":
          changeVolume('inc')
          break 
        case "arrowdown":
        case "d":
          changeVolume('dec')
          break     
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoRef, muted, volume]);


  const toggleMute = () => {
    setMuted(!muted)
    if(volume === 0) {
      setMuted(true)
    }
  }
  
  const changeVolume = (volumeChange: string) => {
    setVolumeChanged(true)
    const video = videoRef.current
    if(video) {
      console.log(video.volume)
      if(volumeChange === 'inc') {
        if((video.volume + 0.05) < 1) {
          video.volume += .05
          setVolume(video.volume)
          setMuted(false)
          if(video.volume < .5) {
            setVolumeHigh(false)
          } else {
            setVolumeHigh(true)
          }
        } else {
          video.volume = 1
          setVolume(video.volume)
          setMuted(false)
          setVolumeHigh(true)
        }
      } else if(volumeChange === 'dec') {
        if((video.volume - 0.05) > 0) {
          video.volume -= .05
          setVolume(video.volume)
          setMuted(false)
          if(video.volume < .5) {
            setVolumeHigh(false)
          } else {
            setVolumeHigh(true)
          }
        } else {
          video.volume = 0
          setVolume(video.volume)
          setMuted(true)
          setVolumeHigh(false)
        }
      } 
      
    }
  }
  
  const handleVolume = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    const video = videoRef.current
    const volume = Number(e.currentTarget.value)
    setVolume(volume)

    if(volume === 0) {
      setMuted(true)
    }  else if(volume < 0.5) {
      setMuted(false)
      setVolumeHigh(false)
    } else {
      setMuted(false)
      setVolumeHigh(true)
    }
    
    if(video) {
      video.volume = volume
    }
  }   
  
  return (
    <div className='flex items-center gap-2 cursor-pointer group/volume'>
        <ToolTip title={`${muted ? "Unmute(m)" : "Mute(m)"}`} placement="top">
          <button className={`btnStyle`} onClick={toggleMute}>
              <svg className={`${(!volumeHigh || muted) && "hidden"}`} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
              </svg>
              <svg className={`${(volumeHigh || muted) && "hidden"}`} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
              </svg>
              <svg className={`${(!muted) && "hidden"}`} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
              </svg>
          </button>
        </ToolTip>
        
        <ToolTip title='Volume' placement="top" offset={23}>
          <input 
            ref={inputRef} 
            className={`h-[3px] max-w-[60px] range-sm w-0 scale-0 transition-all transform origin-left group-hover/volume:w-[100%] group-hover/volume:scale-100 cursor-pointer `} 
            onChange={handleVolume} 
            value={volume}
            type='range' 
            min="0" 
            max="1" 
            step="any"  
          />
        </ToolTip>
    </div>
  )
}

export default VolumeController