import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from 'react'
import classNames from 'classnames'
import { Input, InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**获取 AutoComplete内容的方法，支持同步和异步函数 */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  /**AutoComplete 选项被选中时的回调函数 */
  onSelect?: (item: DataSourceType) => void
  /**用户自定义选项渲染的模板 */
  renderOption?: (item: DataSourceType) => JSX.Element
}
/**
 * 用于输入的自动完成功能，支持同步和异步两种方式获取输入建议，支持键盘响应以及 Input 组件的所有属性
 *
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    onChange,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const debouncedValue = useDebounce(inputValue, 500)
  // 使用useRef创建一个在多次渲染中保持不变的值，来保存是否触发搜索
  const triggerSearch = useRef(false)
  // 使用useRef获取dom上的真实节点,处理clickOutside
  const componentRef = useRef<HTMLDivElement>(null)

  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  useEffect(() => {
    // 当debouncedValue发生改变的时候，发送请求
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then((data) => {
          setSuggestions(data)
          setLoading(false)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  const hightlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 'ArrowUp':
        hightlight(highlightIndex - 1)
        break
      case 'ArrowDown':
        hightlight(highlightIndex + 1)
        break
      case 'Escape':
        setShowDropdown(false)
        break
      default:
        break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([])
        }}
      >
        <ul className="suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex,
            })
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
