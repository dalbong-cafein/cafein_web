import { useEffect, useState } from 'react'

interface IWindowSize {
  width: number | undefined
  height: number | undefined
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined
  })

  const handleResize = () =>
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

export default useWindowSize
