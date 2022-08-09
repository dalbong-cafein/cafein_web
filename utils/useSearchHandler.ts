import axios from 'axios'
import { SetStateAction } from 'jotai'
import { ChangeEvent, Dispatch, MouseEvent } from 'react'

interface IStore {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}

interface useHandlerInputsProps {
  e: ChangeEvent<HTMLInputElement>
  setInputs: (update: SetStateAction<string>) => void
  timer: NodeJS.Timeout | undefined
  setTimer: Dispatch<SetStateAction<NodeJS.Timeout | undefined>>
  setSearchLists: (update: SetStateAction<string[]>) => void
}

interface useHandleClearEventProps {
  e: MouseEvent<HTMLButtonElement>
  setInputs: (update: SetStateAction<string>) => void
  setSearchLists: (update: SetStateAction<string[]>) => void
}

export const useHandleInputs = async ({
  e,
  setInputs,
  timer,
  setTimer,
  setSearchLists
}: useHandlerInputsProps) => {
  setInputs(e.target.value)
  if (!e.target.value) {
    setSearchLists([])
    return
  }
  if (timer) {
    clearTimeout(timer)
  }
  const newTimer = setTimeout(async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://dapi.kakao.com/v2/local/search/keyword.json',
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`
        },
        params: {
          query: `${e.target.value}`,
          category_group_code: 'CE7'
        }
      })
      console.log(response)
      const {
        data: { documents }
      } = response
      const n_searchLists = documents.map((store: IStore) => store.place_name)
      console.log(n_searchLists)
      setSearchLists(n_searchLists)
    } catch (error) {
      console.error(`Debouncing Error while fetching Seach Lists : ${error}`)
    }
  }, 500)
  setTimer(newTimer)
  return
}

export const useHandleClearEvent = ({
  e,
  setInputs,
  setSearchLists
}: useHandleClearEventProps) => {
  e.preventDefault()
  setInputs('')
  setSearchLists([])
  return
}
