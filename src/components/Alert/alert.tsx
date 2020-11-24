import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

export type AlertType = 'default' | 'success' | 'warning' | 'danger'
export interface AlertProps {
  /**设置 Alert 的标题 */
  title: string
  /**设置 Alert 的类型 */
  type?: AlertType
  /**设置 Alert 是否可以被关闭 */
  closable?: boolean
  /**设置 Alert 关闭时的回调函数，closable为false时，永远不会被调用 */
  onClose?: () => void
  /**设置 Alert 的内容 */
  description?: string
}

/**
 * 用于页面中显示通知或提醒
 *
 */
export const Alert: React.FC<AlertProps> = (props) => {
  const {
    title,
    closable = true,
    onClose,
    description,
    type = 'default',
  } = props

  const classes = classNames('alert', {
    [`alert-${type}`]: type,
  })

  return (
    <div className={classes}>
      {title ? <h4 className="alert-title">{title}</h4> : null}
      <p className="alert-message">{description}</p>
      <div className="icon-wrapper">
        {closable ? <Icon icon="times" onClick={onClose} /> : null}
      </div>
    </div>
  )
}

Alert.defaultProps = {
  title: 'Alert!',
  type: 'default',
}

export default Alert
