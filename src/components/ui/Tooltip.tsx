import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { ReactElement } from 'react';

const BlackTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#111"
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#111"
  },
}));

type ToolTipProps = {
    title: string
    placement: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined
    offset?: number
    children: ReactElement
}

const ToolTip = ({ title, placement, offset, children }: ToolTipProps) => {
  return (
    <BlackTooltip 
        title={title} 
        placement={placement}
        PopperProps={{
            modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, offset || 10],
                    },
                },
            ],
        }}
    >
        {children}
    </BlackTooltip>
  )
}

export default ToolTip