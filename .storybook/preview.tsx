import '../src/styles/index.scss'
import React from 'react'
import { addDecorator, storiesOf, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

// const styles: React.CSSProperties = {
//   textAlign: 'center',
// }
// // 常见一个装饰器，给story的函数包一层
// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
// // 在这里添加的话，会给每个storybook添加装饰器
// addDecorator(CenterDecorator)

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}
const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({
  info: {
    text: `
        this is a very nice component
        ## this is a header
        ~~~js
        const a = 'hello world'
        ~~~
      `,
    inline: true,
    header: false,
  },
})
