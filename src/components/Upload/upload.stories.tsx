import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Upload, UploadFile, UploadProps } from './upload'
import Icon from '../Icon/icon'
import Button, { ButtonProps } from '../Button'

export default {
  title: 'Upload',
  component: Upload,
  argTypes: {
    onChange: { action: 'onChange' },
    onRemove: { action: 'onRemove' },
    onProgress: { action: 'onProgress' },
    beforeUpload: { action: 'before Upload' },
    onSuccess: { action: 'onSuccess' },
    onError: { action: 'onError' },
  },
} as Meta

const defaultProps = {
  btnType: 'primary',
  action: 'https://testa.free.beeceptor.com',
}

type buttonAndUploadProps = ButtonProps & UploadProps
const ButtonTemplate: Story<buttonAndUploadProps> = (args) => {
  return (
    <Upload {...defaultProps} {...args}>
      <Button
        label={args.label}
        btnType={
          args.btnType
            ? args.btnType
            : (defaultProps.btnType as ButtonProps['btnType'])
        }
      />
    </Upload>
  )
}

export const defaultUpload = ButtonTemplate.bind({})
defaultUpload.args = {
  label: 'Click to upload file',
}
defaultUpload.storyName = 'Upload'

export const Multiple = ButtonTemplate.bind({})
Multiple.args = {
  label: 'Click to upload files',
  multiple: true,
}

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}
export const checkBeforeUpload = ButtonTemplate.bind({})
checkBeforeUpload.args = {
  label: 'Support under 50kb',
  beforeUpload: checkFileSize,
}

const defaultFileListArray: UploadFile[] = [
  {
    uid: '123',
    size: 1234,
    name: 'hello.md',
    status: 'uploading',
    percent: 30,
  },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
]
export const defaultFileList = ButtonTemplate.bind({})
defaultFileList.args = {
  label: 'Click to upload file',
  defaultFileList: defaultFileListArray,
}

const dragableTemplate: Story<UploadProps> = (args) => (
  <Upload {...args} action={'https://testa.free.beeceptor.com'} drag multiple>
    <Icon icon="upload" size="5x" theme="secondary" /> <br />
    <p>Drag file over to upload</p>
  </Upload>
)
export const dragable = dragableTemplate.bind({})
