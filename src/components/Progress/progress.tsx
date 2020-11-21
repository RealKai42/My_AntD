import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'

export interface ProgressProps {
  precent: number
  strokeHight?: number
  showText?: boolean
  styles?: React.CSSProperties
  theme?: ThemeProps
}

const Progress: FC<ProgressProps> = (props) => {
  const { precent, strokeHight, showText, styles, theme } = props
  return (
    <div className="progress-bar" style={styles}>
      <div
        className="progress-bar-outer"
        style={{ height: `${strokeHight}px` }}
      >
        <div
          className={`progress-bar-inner color-${theme}`}
          style={{ width: `${precent}%` }}
        >
          {showText && <span className="inner-text">{`${precent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHight: 15,
  showText: true,
  theme: 'primary',
}
export default Progress
