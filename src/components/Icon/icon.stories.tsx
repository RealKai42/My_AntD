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

const Template: Story<IconProps> = (args) => <Icon {...args} />

export const Icons = Template.bind({})
Icons.args = {
  icon: 'star-of-david',
}

export const Theme = Template.bind({})
Theme.args = {
  icon: 'space-shuttle',
  theme: 'primary',
}
