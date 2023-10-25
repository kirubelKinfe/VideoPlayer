import { cn } from "../utils"

type SettingsControllerProps = {
    speed: number
    playSpeed: boolean
    settings: boolean
    togglePlayBackSpeed: () => void
}

const SettingsController = ({ speed, settings, playSpeed, togglePlayBackSpeed }: SettingsControllerProps) => {
  return (
    <div className={cn('z-50 absolute bottom-[13%] right-[2%] transition-all origin-bottom opacity-0 w-60 bg-opacity-90 bg-gray-900 rounded-xl', {
        "opacity-100": settings,
        "hidden": playSpeed
      })}>
        <div className='flex items-center justify-between p-2 cursor-pointer' onClick={togglePlayBackSpeed}>
          <div className='flex items-center'>
            <button className='btnStyle'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px">
                <path fill="currentColor" d="M47.47,36.64l18,13.5-18,13.5ZM29.84,53.14h-6a29.66,29.66,0,0,0,6.13,15.3l4.27-4.28A23.68,23.68,0,0,1,29.84,53.14Zm53.56-3A29.93,29.93,0,0,0,56.52,20.41v6.05a23.87,23.87,0,0,1,0,47.36v6A29.92,29.92,0,0,0,83.4,50.14ZM38.31,68.54l-4.24,4.24a29.65,29.65,0,0,0,16.45,7.08v-6A23.73,23.73,0,0,1,38.31,68.54ZM34.2,36.11l-4.27-4.27a29.66,29.66,0,0,0-6.13,15.3h6A23.72,23.72,0,0,1,34.2,36.11Zm16.32-9.65V20.41a29.72,29.72,0,0,0-16.45,7.08l4.24,4.24A23.72,23.72,0,0,1,50.52,26.46Z"/></svg>
            </button>
            <p className='ml-1 text-white'>PlaySpeed</p>
          </div>
          <div className="flex items-center">
            <p className='mr-1 text-white'>{speed === 1 ? "Normal" : speed}</p>
            <button className={cn('btnStyle', "w-5 h-5")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20" x="0px" y="0px">
              <path fill="currentColor" d="M4.9,13.15a.5.5,0,1,0,.71.71l5.5-5.5a.5.5,0,0,0,0-.71L5.6,2.15a.5.5,0,1,0-.71.71L10,8Z"/></svg>
            </button>
          </div>
          
        </div>
    </div>
  )
}

export default SettingsController