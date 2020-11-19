import { useState, useEffect } from 'react'

function useDebounce(value: any, delay = 300) {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    // 在delay之前被再次调用，则会清除之前的timer
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}

export default useDebounce
