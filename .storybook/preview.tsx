import '!style-loader!css-loader!sass-loader!../src/styles/index.scss'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Welcome page', 'Button'],
    },
  },
}

export const decorators = [
  (Stroy) => (
    <div style={wrapperStyle}>
      <Stroy />
    </div>
  ),
]
