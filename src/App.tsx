import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App: React.FC = () => {
  // 上传文件的基本形式
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadedFile = files[0]
      // 模拟表单
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)
      axios
        .post(
          'https://run.mocky.io/v3/b5fbe65c-ed29-4cec-a056-8115f0e103d4',
          formData,
          {
            headers: {
              // 需要在header里指定内容的类型
              'Content-type': 'multipart/form-data',
            },
          }
        )
        .then((resp) => {
          console.log(resp)
        })
    }
  }
  return (
    <div className="App" style={{ marginTop: '100px', marginLeft: '100px' }}>
      <input type="file" name="myFile" onChange={handleFileChange} />
    </div>
  )
}

export default App
