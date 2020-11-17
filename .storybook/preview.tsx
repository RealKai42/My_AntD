import '../src/styles/index.scss'
import React from 'react'
import { addDecorator } from '@storybook/react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const styles: React.CSSProperties = {
  textAlign: 'center',
}
// 常见一个装饰器，给story的函数包一层
const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
// 在这里添加的话，会给每个storybook添加装饰器
// addDecorator(CenterDecorator)
