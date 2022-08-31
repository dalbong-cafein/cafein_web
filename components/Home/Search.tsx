import Image from 'next/image'
import { useRouter } from 'next/router'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  mapAtom,
  mapMarkerList,
  searchedAtom,
  searchInputAtom,
  searchListsAtom,
  split_searchInputAtom
} from '../../store'

import Ic_Location from '@public/location.svg'

import {
  onEnterPress,
  onHandleClearEvent,
  onHandleInputs
} from '../../utils/onSearchHandler'

import {
  HomeSearchLists,
  SearchList,
  SearchListDescs,
  SearchListPosition,
  SearchListStrong,
  SearchListTitle
} from '../Maps/styles/FormStyles'
import {
  ClearButton,
  InputWrapper,
  SearchFormWrapper,
  SearchInput
} from './styles/FormStyles'

const Search = () => {
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const [searchLists, setSearchLists] = useAtom(searchListsAtom)
  const split_inputs = useAtomValue(split_searchInputAtom)
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()
  const { search } = router.query
  const autoRef = useRef<HTMLUListElement>(null)
  const [nodeLists, setNodeLists] = useState<HTMLCollection>()
  let searchIdx = -1
  const inputRef = useRef<HTMLInputElement>(null)
  const map = useAtomValue(mapAtom)
  const markers = useAtomValue(mapMarkerList)

  const setSearchedCafes = useSetAtom(searchedAtom)

  useEffect(() => {
    setNodeLists(autoRef.current?.children as HTMLCollection)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: MouseEvent | any): void => {
      if (
        inputRef.current &&
        autoRef.current &&
        !autoRef.current.contains(event.target as Node) &&
        event.target !== inputRef.current
      ) {
        setIsClicked(false)
        if (nodeLists && nodeLists.length > 0) {
          for (let i = 0; i < nodeLists.length; i++)
            nodeLists[i].classList.remove('active')
        }
      }
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRef])

  const handleKeyArrow = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      return
    }
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      inputRef.current?.blur()
      if (inputs === search) return
      if (searchIdx !== -1) {
        return onEnterPress(
          e,
          searchLists[searchIdx].storeName,
          router,
          map,
          markers,
          setIsClicked,
          searchLists[searchIdx].storeId
        )
      } else {
        return onEnterPress(e, inputs, router, map, markers, setIsClicked)
      }
    }
    if (searchLists && nodeLists && nodeLists.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (searchIdx === -1) {
            searchIdx += 1
            nodeLists[searchIdx].classList.toggle('active')
          } else {
            nodeLists[searchIdx].classList.toggle('active')
            searchIdx += 1
            if (searchIdx === autoRef.current?.childElementCount) {
              searchIdx = 0
            }
            nodeLists[searchIdx].classList.toggle('active')
          }
          autoRef.current?.scrollTo({ top: searchIdx * 70.19 })
          break
        case 'ArrowUp':
          e.preventDefault()
          if (searchIdx === -1) return
          nodeLists[searchIdx].classList.toggle('active')
          searchIdx -= 1
          if (searchIdx === -1) {
            searchIdx = (autoRef.current?.childElementCount as number) - 1
          }
          autoRef.current?.scrollTo({ top: searchIdx * 70.19 })
          nodeLists[searchIdx].classList.toggle('active')
          break
        default:
          autoRef.current?.scrollTo({ top: 0 })
          if (searchIdx !== -1) {
            console.log(searchIdx, ' hehe')
            nodeLists[searchIdx].classList.remove('active')
          }
          searchIdx = -1
          break
      }
      return
    }
  }

  const isMap = router.pathname.includes('maps')

  return (
    <SearchFormWrapper isMap={isMap}>
      <InputWrapper>
        <SearchInput
          ref={inputRef}
          isMap={isMap}
          placeholder="카페 이름이나 지하철역을 검색해보세요"
          value={inputs}
          onChange={(e) =>
            onHandleInputs({
              e,
              setInputs,
              timer,
              setTimer,
              setSearchLists
            })
          }
          onFocus={(e) => {
            if (inputs && !searchLists.length) {
              setInputs(inputRef.current?.value as string)
              onHandleInputs({
                e,
                setInputs,
                timer,
                setTimer,
                setSearchLists
              })
            }
            setIsClicked(true)
          }}
          onKeyDown={handleKeyArrow}
        />
        <ClearButton
          isInput={inputs === '' ? false : true}
          onClick={(e) => {
            // inputRef.current?.value = ''
            inputRef.current?.focus()
            onHandleClearEvent({ e, setInputs, setSearchLists })
          }}
        />
      </InputWrapper>
      <HomeSearchLists
        isMap={isMap}
        isDisplay={searchLists.length !== 0 && isClicked ? true : false}
        ref={autoRef}
      >
        {searchLists.slice(0, 10).map((searchList) => {
          return (
            <SearchList
              key={searchList.storeId}
              onClick={(e) => {
                {
                  onEnterPress(
                    e,
                    searchList.storeName,
                    router,
                    map,
                    markers,
                    setIsClicked,
                    searchList.storeId
                  )
                }
              }}
            >
              <Ic_Location />
              <SearchListDescs>
                <SearchListTitle>
                  {searchList.storeName
                    .split('')
                    .map((text, idx) =>
                      split_inputs?.includes(text) ? (
                        <SearchListStrong key={idx + searchList.storeId}>
                          {text}
                        </SearchListStrong>
                      ) : (
                        text
                      )
                    )}
                </SearchListTitle>
                <SearchListPosition>
                  {searchList.fullAddress}
                </SearchListPosition>
              </SearchListDescs>
            </SearchList>
          )
        })}
      </HomeSearchLists>
    </SearchFormWrapper>
  )
}

export default Search
