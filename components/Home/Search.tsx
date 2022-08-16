import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import {
  searchInputAtom,
  searchListsAtom,
  split_searchInputAtom
} from '../../store'
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
  const [nodeLists, setNodeLists] = useState<HTMLCollection | undefined>()
  let searchIdx = -1

  useEffect(() => {
    setNodeLists(autoRef.current?.children)
  }, [autoRef])

  const handleKeyArrow = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key, index, '누른다!!')
    if (e.key === 'Backspace') {
      return
    }
    console.log(searchIdx)
    if (searchLists && nodeLists && nodeLists?.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (searchIdx === -1) {
            console.log(searchIdx)
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
        case 'Enter':
          onEnterPress(e, inputs, router)
          break
        default:
          autoRef.current?.scrollTo({ top: 0 })
          searchIdx = -1
          break
      }
      return
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
            onHandleInputs({
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
          onClick={(e) => onHandleClearEvent({ e, setInputs, setSearchLists })}
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
