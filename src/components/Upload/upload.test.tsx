import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  createEvent,
} from '@testing-library/react'
import { Upload, UploadProps } from './upload'

// mock了Icon的显示，代替成了文字
jest.mock('../Icon/icon', () => {
  return ({ icon }) => {
    return <span>{icon}</span>
  }
})
// mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
// 创建一个用于测试的file对象
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector(
      '.file-input'
    ) as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })

  it('upload process should works fine', async () => {
    const { queryByText } = wrapper

    // 设定mockedAxios返回的值
    mockedAxios.post.mockResolvedValue({ data: 'cool' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)
  })
})
