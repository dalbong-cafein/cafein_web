import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { KeyboardEvent, useRef, useState } from 'react'
import {
  searchInputAtom,
  searchListsAtom,
  split_searchInputAtom
} from '../../store'
import {
  onEnterPress,
  useHandleClearEvent,
  useHandleInputs
} from '../../utils/useSearchHandler'
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
  SearchButton,
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
  const { pathname } = router
  const [index, setIndex] = useState(-1)
  const autoRef = useRef<HTMLUListElement>(null)

  console.log(isClicked)

  const handleKeyArrow = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      return
    } 
    if (searchLists) {
      if (index !== -1) e.preventDefault()
      console.log(e.key)
      switch (e.key) {
        case 'ArrowDown':
          setIsClicked(true)
          autoRef.current?.scrollTo({ top: index * 70.19 })
          setIndex(index + 1)
          if (autoRef.current?.childElementCount === index + 1) setIndex(0)
          break
        case 'ArrowUp':
          autoRef.current?.scrollTo({ top: (index-1) * 70.19 })
          setIndex(index - 1)
          if (index <= 0) {
            setIndex(-1)
          }
          break
        case 'Escape':
          autoRef.current?.scrollTo({ top: 0 })
          setIsClicked(false)
          setIndex(-1)
          break
        case 'Enter':
          onEnterPress(e, inputs, router)
          break
      }
    }
  }

  return (
    <SearchFormWrapper isMap={pathname === '/maps' ? true : false}>
      <InputWrapper>
        <SearchInput
          isMap={pathname === '/maps' ? true : false}
          placeholder="카페 이름이나 지하철역을 검색해보세요"
          value={inputs}
          onChange={(e) =>
            useHandleInputs({
              e,
              setInputs,
              timer,
              setTimer,
              setSearchLists
            })
          }
          onFocus={() => setIsClicked(true)}
          onBlur={() => setIsClicked(false)}
          onKeyDown={handleKeyArrow}
        />
        <ClearButton
          isInput={inputs === '' ? false : true}
          onClick={(e) => useHandleClearEvent({ e, setInputs, setSearchLists })}
        />
      </InputWrapper>
      <HomeSearchLists
        isMap={pathname === '/maps' ? true : false}
        isDisplay={searchLists.length !== 0 && isClicked ? true : false}
        ref={autoRef}
      >
        {searchLists.map((searchList, idx) => {
          return (
            <SearchList
              key={searchList.storeId}
              isFocus={index === idx ? true : false}
            >
              <Image
                src={'/images/location.svg'}
                width={24}
                height={24}
                alt="location IMG"
              />
              <SearchListDescs>
                <SearchListTitle>
                  {searchList.storeName
                    .split('')
                    .map((text) =>
                      split_inputs.includes(text) ? (
                        <SearchListStrong>{text}</SearchListStrong>
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
      {pathname === '/maps' ? (
        ''
      ) : (
        <SearchButton>지도에서 카페 찾기</SearchButton>
      )}
    </SearchFormWrapper>
  )
}

export default Search
