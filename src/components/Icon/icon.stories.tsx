import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Icon, IconProps } from './icon'

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    icon: {
      description: '设置显示的图标',
    },
    onClick: {
      description: '响应对 Icon 的鼠标点击事件',
      action: 'Click',
    },
  },
} as Meta

const Template: Story<IconProps> = (args) => <Icon size="3x" {...args} />

export const Icons = Template.bind({})
Icons.args = {
  icon: 'star-of-david',
}

export const Primary = Template.bind({})
Primary.args = {
  icon: 'space-shuttle',
  theme: 'primary',
}

export const Danger = Template.bind({})
Danger.args = {
  icon: 'broom',
  theme: 'danger',
}

export const Info = Template.bind({})
Info.args = {
  icon: 'cannabis',
  theme: 'info',
}
