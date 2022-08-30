import { MouseEvent, useCallback, useState } from 'react'

type useToggleType = [boolean, (e: MouseEvent<HTMLButtonElement>) => void]

const useToggle = (init: boolean): useToggleType => {
  const [isToggle, setIsToggle] = useState(init)
  const toggle = useCallback(() => setIsToggle((cur) => !cur), [])
  return [isToggle, toggle]
}

export default useToggle
