import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-bottom'
  | 'zoom-in-left'
  | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName
  wrapper?: boolean
}

// 对CSSTransition进行封装
const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, ...restProps } = props

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {/* CSSTransition自带了对children的验证，就不需要我们写了 */}
      {children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition
