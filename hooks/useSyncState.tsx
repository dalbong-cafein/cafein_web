import { useState } from 'react'

function useSyncState<T>(initialState: T): [() => T, (newState: T) => void] {
  const [state, setState] = useState(initialState)
  let current = state
  const get = (): T => current
  const set = (newState: T) => {
    current = newState
    setState(newState)
    return current
  }
  return [get, set]
}

export default useSyncState
