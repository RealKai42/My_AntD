import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'

export interface ProgressProps {
  /**设置 Progress 组件显示的百分比 */
  percent: number
  /**设置 Progress 组件的高度 */
  strokeHight?: number
  /**设置 Progress 组件是否显示文本 */
  showText?: boolean
  /**设置 Progress 组件用户自定义的宽度 */
  styles?: React.CSSProperties
  /**设置 Progress 组件的主题 */
  theme?: ThemeProps
}
/**
 * 网页中常用的进度条组件，支持自定义 style、主题等
 *
 */
export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHight, showText, styles, theme } = props
  return (
    <div className="progress-bar" style={styles} data-testid="test-progress">
      <div
        className="progress-bar-outer"
        style={{ height: `${strokeHight}px` }}
      >
        <div
          className={`progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  percent: 40,
  strokeHight: 15,
  showText: true,
  theme: 'primary',
}
export default Progress
