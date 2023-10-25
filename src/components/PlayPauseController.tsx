import ToolTip from "./ui/Tooltip"


type PlayPauseControllerProps = {
    play: boolean,
    togglePlay: () => void
}

const PlayPauseController = ({ play, togglePlay }: PlayPauseControllerProps) => {
    return (
        <ToolTip title={`${play ? "Pause(k)" : "Play(k)"}`} placement='top-start'>
            <button className={`btnStyle`} onClick={togglePlay}>
                <svg className={`${play && "hidden"}`} viewBox="0 0 24 24" >
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
                <svg className={`${!play && "hidden"}`} viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                </svg>
            </button>
        </ToolTip>
    )
}

export default PlayPauseController