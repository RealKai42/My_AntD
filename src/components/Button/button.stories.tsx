import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Button, ButtonProps } from './button'
import SFC from '../../tools/stroyNamedFC'
import { linkSync } from 'fs'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const defaultButton = Template.bind({})
defaultButton.args = {
  label: 'Default',
}
defaultButton.storyName = 'Default'

export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  label: 'Primary',
}

export const Danger = Template.bind({})
Danger.args = {
  btnType: 'danger',
  label: 'Danger',
}

export const Link = Template.bind({})
Link.args = {
  btnType: 'link',
  label: 'Link',
  href: 'https://google.com',
}

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  label: 'Large',
}

export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  label: 'Small',
}
