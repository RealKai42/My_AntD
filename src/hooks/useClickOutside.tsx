import { useEffect, RefObject } from 'react'

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      // 如果没有ref或者e.target没有被ref所包含，即点击到了ref外面，直接返回
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return
      }
      handler(e)
    }
    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside
