import '../src/styles/index.scss'
import React from 'react'
import {
  addDecorator,
  storiesOf,
  addParameters,
  configure,
} from '@storybook/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}

addParameters({
  info: {
    inline: true,
    header: false,
  },
})

export const decorators = [
  (Stroy) => (
    <div style={wrapperStyle}>
      <Stroy />
    </div>
  ),
]
