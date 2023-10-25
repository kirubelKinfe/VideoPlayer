import { useEffect, useRef, useState } from 'react'
import Video from './assets/Video.mp4'
import { cn } from './utils'
import SettingsController from './components/SettingsController'
import PlaybackSpeedController from './components/PlaybackSpeedController'
import VideoOverlay from './components/VideoOverlay'

const App = () => {
  const [speed, setSpeed] = useState(1)
  const [theaterMode, setTheaterMode] = useState(false)
  const [settings, setSettings] = useState(false)
  const [fullScreenMode, setFullScreenMode] = useState(false)
  const miniPlayerMode = useRef(false)
  const [volumeChanged, setVolumeChanged] = useState(false)
  const [playSpeed, setPlaySpeed] = useState(false)
  const [volume, setVolume] = useState(1)
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    
    setTimeout(() => {
      if(volumeChanged) {
        setVolumeChanged(false)
      }
    }, 500)
    
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault()
      const tagName = document.activeElement?.tagName.toLocaleLowerCase()

      if(tagName === "input") return

      switch(event.key.toLowerCase()) {
        case "f":
          toggleFullScreen()
          break  
        case "t":
          toggleTheater()
          break  
        case "i":
          toggleMiniPlayerMode()
          break       
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
    
}, [videoRef, volumeChanged, fullScreenMode, theaterMode, miniPlayerMode]);

  const togglePlayBackSpeed = () => {
    setPlaySpeed(!playSpeed)
  };
  
  const toggleSettings = () => {
    setSettings(!settings)
    setPlaySpeed(false)
  };
  
  const toggleTheater = () => {
    setTheaterMode(!theaterMode)
  };

  const toggleFullScreen = () => {
    setFullScreenMode(!fullScreenMode)
  };

  const toggleMiniPlayerMode = () => {
    miniPlayerMode.current = !miniPlayerMode.current
    const video = videoRef.current
    if(miniPlayerMode.current) {
      if(video) {
        video.requestPictureInPicture()
        video.play()
      }
    } else {
      if(document.pictureInPictureElement) {
        document.exitPictureInPicture()
      }
    }
  };

  return (
    
    <div className={cn("videoContainer group/overlay", {
      "max-w-[initial]": theaterMode || fullScreenMode,
      "w-full": theaterMode || fullScreenMode,
      "max-h-[80vh]": theaterMode,
      "max-h-[100vh]": fullScreenMode,
    })}>
      
      {/* Volume Overlay Container */}
      <div className={cn('absolute flex items-center justify-center top-[10%] left-[45%] bg-black opacity-0 bg-opacity-30 w-24 z-50 h-12',{
        "opacity-100": volumeChanged
      })}>
        <p className='text-white '>{Math.round(volume * 100)}%</p>
      </div>

      {/* Playback Speed Overlay Container */}
      <PlaybackSpeedController
        speed={speed}
        setSpeed={setSpeed}
        videoRef={videoRef}
        playSpeed={playSpeed}
        togglePlayBackSpeed={togglePlayBackSpeed}
      />
      
      {/* Settings Overlay Container */}
      <SettingsController 
        speed={speed}
        playSpeed={playSpeed}
        settings={settings}
        togglePlayBackSpeed={togglePlayBackSpeed}
      />
      
      {/* Controls Overlay Container */}
      <VideoOverlay 
        videoRef={videoRef}
        setVolumeChanged={setVolumeChanged}
        volume={volume}
        setVolume={setVolume}
        settings={settings}
        theaterMode={theaterMode}
        fullScreenMode={fullScreenMode}
        toggleSettings={toggleSettings}
        toggleFullScreen={toggleFullScreen}
        toggleMiniPlayerMode={toggleMiniPlayerMode}
        toggleTheater={toggleTheater}
      />
      
      <video ref={videoRef} className="w-[100%]" src={Video} autoPlay />
    </div>

  )
}

export default App
