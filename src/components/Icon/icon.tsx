import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

// 借助font awesome来定义自己的 IconProps
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

// 对font awesome进行二层封装
const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...resetProps } = props
  const classes = classNames('icon', classNames, {
    [`icon-${theme}`]: theme,
  })
  return <FontAwesomeIcon className={classes} {...resetProps} />
}

export default Icon
