import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Input, InputProps } from './input'

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    onChange: { action: 'Changed Input' },
  },
} as Meta
const defaultStyle = { width: '500px' }
const Template: Story<InputProps> = (args) => (
  <Input style={defaultStyle} {...args} />
)

export const Default = Template.bind({})
Default.args = {
  placeholder: 'placeholder',
}
Default.storyName = 'Input'

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  defaultValue: 'default value',
}

export const Disabled = Template.bind({})
Disabled.args = {
  placeholder: 'placeholder',
  disabled: true,
}

export const InputWithIcon = Template.bind({})
InputWithIcon.args = {
  placeholder: 'input with icon',
  icon: 'search',
}

export const LargeInput = Template.bind({})
LargeInput.args = {
  placeholder: 'large input',
  size: 'lg',
}

export const SmallInput = Template.bind({})
SmallInput.args = {
  placeholder: 'small input',
  size: 'sm',
}

export const InputWithPrepand = Template.bind({})
InputWithPrepand.args = {
  placeholder: 'input with prepand',
  prepend: 'https://',
}

export const InputWithAppend = Template.bind({})
InputWithAppend.args = {
  placeholder: 'input with append',
  append: '.com',
}

// const pandInput = () => (
//   <>
//     <Input
//       style={{ width: '500px' }}
//       defaultValue="prepend text"
//       prepend="https://"
//     />
//     <Input style={{ width: '500px' }} defaultValue="google" append=".com" />
//   </>
// )

// storiesOf('Input component', module)
//   .add('Input', defaultInput)
//   .add('被禁用的 Input', disabledInput)
//   .add('带图标的 Input', iconInput)
//   .add('大小不同的 Input', sizeInput)
//   .add('带前后缀的 Input', pandInput)
