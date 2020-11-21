import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'

const defaultFileList: UploadFile[] = [
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

const checkFileSize = (file: File) => {
  // 一个返回boolean值的文件预处理
  if (Math.round(file.size / 1024) > 50) {
    // 文件大于50k，直接拒绝
    alert('file too big')
    return false
  }
  return true
}

const filePromise = (file: File) => {
  // 模拟一个返回Promise的文件预处理
  const newFile = new File([file], 'new_name.docx', { type: file.type })
  return Promise.resolve(newFile)
}
const SimpleUpload = () => {
  return (
    <Upload
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      action="https://testa.free.beeceptor.com"
      onChange={action('changed')}
      onRemove={action('removed')}
      // defaultFileList={defaultFileList}
      name="fileName"
      data={{ key: 'value' }}
      headers={{ 'X-Powered-By': 'antd' }}
      accept=".jpg"
      multiple
    />
  )
}

storiesOf('Upload component', module).add('Upload', SimpleUpload)
