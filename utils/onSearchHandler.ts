import axios from 'axios'
import { SetStateAction } from 'jotai'
import { NextRouter } from 'next/router'
import { ChangeEvent, Dispatch, KeyboardEvent, MouseEvent } from 'react'
import { IStore } from '../store'
import { getMapCenterByInputs } from './MapUtils'

interface onHandlerInputsProps {
  e: ChangeEvent<HTMLInputElement>
  setInputs: (update: SetStateAction<string>) => void
  timer: NodeJS.Timeout | undefined
  setTimer: Dispatch<SetStateAction<NodeJS.Timeout | undefined>>
  setSearchLists: (update: SetStateAction<IStore[]>) => void
}

interface onHandleClearEventProps {
  e: MouseEvent<HTMLButtonElement>
  setInputs: (update: SetStateAction<string>) => void
  setSearchLists: (update: SetStateAction<IStore[]>) => void
}

export const onHandleInputs = async ({
  e,
  setInputs,
  timer,
  setTimer,
  setSearchLists
}: onHandlerInputsProps) => {
  setInputs(e.target.value)
  if (!e.target.value.length) {
    setSearchLists([])
    return
  }
  if (timer) {
    clearTimeout(timer)
  }
  const newTimer = setTimeout(async () => {
    try {
      if (!e.target.value.length) {
        setSearchLists([])
        return
      }
      const response = await axios.get(
        `/api/web/stores?keyword=${encodeURI(e.target.value)}`
      )
      const data = response.data.data
      setSearchLists(data)
    } catch (error) {
      console.error(`Debouncing Error while fetching Seach Lists : ${error}`)
    }
  }, 100)
  setTimer(newTimer)
  return
}

export const onHandleClearEvent = ({
  e,
  setInputs,
  setSearchLists
}: onHandleClearEventProps) => {
  e.preventDefault()
  setInputs('')
  setSearchLists([])
  return
}

export const onEnterPress = (
  inputs: string,
  router: NextRouter,
  setIsClicked: Dispatch<SetStateAction<boolean>>,
  storeId?: number
) => {
  if (storeId) {
    router.push(`/maps/storeId/${storeId}`)
  } else {
    router.push(`/maps/search/${inputs}`)
  }

  setIsClicked(false)

  return
}
