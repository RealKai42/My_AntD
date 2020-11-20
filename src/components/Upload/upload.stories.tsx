import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'

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
      action="https://run.mocky.io/v3/b5fbe65c-ed29-4cec-a056-8115f0e103d4"
      // action="https://jsonplaceholder.typicode.com/posts"
      // action="https://testa.free.beeceptor.com"
      onChange={action('changed')}
      beforeUpload={filePromise}
    />
  )
}

storiesOf('Upload component', module).add('Upload', SimpleUpload)
