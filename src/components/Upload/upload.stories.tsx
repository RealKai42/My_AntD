import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'

const SimpleUpload = () => {
  return (
    <Upload
      action="https://run.mocky.io/v3/b5fbe65c-ed29-4cec-a056-8115f0e103d4"
      // action="https://jsonplaceholder.typicode.com/posts"
      // action="https://testa.free.beeceptor.com"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
    />
  )
}

storiesOf('Upload component', module).add('Upload', SimpleUpload)
