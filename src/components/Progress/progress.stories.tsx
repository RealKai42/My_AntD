import React, { useEffect, useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Progress, ProgressProps } from './progress'

// todo: 设置strokeHight会失效
export default {
  title: 'Progress',
  component: Progress,
} as Meta

const Template: Story<ProgressProps> = (args) => (
  <Progress {...args} strokeHight={20} />
)

export const defaultProgress = Template.bind({})
defaultProgress.args = {
  percent: 20,
}
defaultProgress.storyName = 'Progress'

export const WithoutText = Template.bind({})
WithoutText.args = {
  percent: 40,
  showText: false,
}

export const ThemeWarning = Template.bind({})
ThemeWarning.args = {
  percent: 60,
  theme: 'warning',
}

const DynamicTemplate: Story<ProgressProps> = (args) => {
  const [progress, setProgress] = useState(10)
  useEffect(() => {
    const timer = setInterval(() => {
      const number = (progress + 10) % 110
      setProgress(number)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })
  return <Progress {...args} percent={progress} strokeHight={20} />
}
export const Dynamic = DynamicTemplate.bind({})
Dynamic.args = {
  theme: 'danger',
}
