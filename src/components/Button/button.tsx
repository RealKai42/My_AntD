import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children: React.ReactNode
  href?: string
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const { btnType, disabled, size, children, href } = props

  // 默认有btn，根据属性生成类名。可以查classnames的文档
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    // 判断是否是link元素，link元素没有disable的属性，所以要在classes上体现
    disable: btnType === ButtonType.Link && disabled,
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button
