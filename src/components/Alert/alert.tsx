import React from 'react'
import classNames from 'classnames'

export enum AlertType {
  success = 'success',
  primary = 'primary',
  warning = 'warning',
  danger = 'danger',
}

interface AlertProps {
  title: string
  closable?: boolean
  onClose?: () => void
  description?: string
  type: AlertType
}

const Alert: React.FC<AlertProps> = (props) => {
  const {
    title,
    closable = true,
    onClose,
    description,
    type = 'primary',
  } = props

  const classes = classNames('alert', {
    [`alert-${type}`]: type,
  })

  return (
    <div className={classes}>
      {title ? <h4 className="alert-title">{title}</h4> : null}
      <p className="alert-message">{description}</p>
      {closable ? <i onClick={onClose}>关闭</i> : null}
    </div>
  )
}

export default Alert
