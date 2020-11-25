import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}
export interface UploadProps {
  /**上传文件的地址 */
  action: string
  /**默认上传文件的列表 */
  defaultFileList?: UploadFile[]
  /**文件上传前的回调函数，支持boolean型测试或Promise类型的预处理 */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**文件上传时的回调函数 */
  onProgress?: (precentage: number, file: File) => void
  /**文件上传成功时的回调函数 */
  onSuccess?: (data: any, file: File) => void
  /**文件上传失败时的回调函数 */
  onError?: (err: any, file: File) => void
  /**文件状态改变时的回调函数，上传成功或失败时都会被调用 */
  onChange?: (file: File) => void
  /**文件被从文件列表移除时的回调函数 */
  onRemove?: (file: UploadFile) => void
  /**用户自定义的上传请求头部 */
  headers?: { [key: string]: any }
  /**用户自定义的文件字段名 */
  name?: string
  /**用户自定义的上传时附带的额外参数 */
  data?: { [key: string]: any }
  /**用户自定义的 cookie 凭证信息 */
  withCredentials?: boolean
  /**自定义接收的文件类型 */
  accept?: string
  /**是否支持文件多选上传 */
  multiple?: boolean
  /**是否支持拖拽上传 */
  drag?: boolean
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children,
  } = props
  // 拿到input的真实节点
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
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

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => post(processedFile))
        } else if (result !== false) {
          // 如果是boolean型的检测，且通过检测时
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList((prevList) => {
      return [_file, ...prevList]
    })

    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
        withCredentials,
        onUploadProgress: (e) => {
          // onProgress生命周期的方法
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file)
            }
            // useState是异步更新的，是不能拿到实时的值的
            // 所以这里使用functional update来更新，这个函数是可以拿到上一次更新的值
            // 并在这个值的基础上，做更新
            updateFileList(_file, { percent: percentage, status: 'uploading' })
          }
        },
      })
      .then((resp) => {
        // console.log(resp)
        updateFileList(_file, { status: 'success', response: resp.data })
        if (onSuccess) {
          onSuccess(resp.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        console.error(err)
        updateFileList(_file, { status: 'error', error: err })
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }

  return (
    <div className="upload-component">
      <div
        className="upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files)
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}

        <input
          className="file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
}

export default Upload
