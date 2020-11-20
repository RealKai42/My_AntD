import React, { ChangeEvent, FC, useRef } from 'react'
import axios from 'axios'
import Button from '../Button/button'

export interface UploadProps {
  action: string
  onProgress?: (precentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
}

export const Upload: FC<UploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError } = props
  // 拿到input的真实节点
  const fileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (fileInput.current) {
      // 如果存在fileInput节点，则调用其自身的click节点
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      const formData = new FormData()
      formData.append(file.name, file)
      axios
        .post(action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (e) => {
            // onProgress生命周期的方法
            let percentage = Math.round((e.loaded * 100) / e.total) || 0
            if (percentage < 100) {
              if (onProgress) {
                onProgress(percentage, file)
              }
            }
          },
        })
        .then((resp) => {
          console.log(resp)
          if (onSuccess) {
            onSuccess(resp.data, file)
          }
        })
        .catch((err) => {
          console.error(err)
          if (onError) {
            onError(err, file)
          }
        })
    })
  }
  return (
    <div className="upload-component">
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input
        className="file-inpout"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileChange}
        type="file"
      />
    </div>
  )
}
