import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Alert, AlertProps } from './alert'

export default {
  title: 'Alert',
  component: Alert,
  argTypes: {
    onClose: { action: 'onClose' },
  },
} as Meta

const Template: Story<AlertProps> = (args) => <Alert {...args} />

export const defaultAlert = Template.bind({})
defaultAlert.args = {
  title: 'Default',
}
defaultAlert.storyName = 'Alert'

export const Success = Template.bind({})
Success.args = {
  type: 'success',
  title: 'Success',
}

export const Warning = Template.bind({})
Warning.args = {
  type: 'warning',
  title: 'Warning',
}

export const Danger = Template.bind({})
Danger.args = {
  type: 'danger',
  title: 'Danger',
}

export const Description = Template.bind({})
Description.args = {
  title: 'Description',
  description: 'This is an Alert!',
}

export const UnClosable = Template.bind({})
UnClosable.args = {
  title: 'UnClosable',
  closable: false,
}
