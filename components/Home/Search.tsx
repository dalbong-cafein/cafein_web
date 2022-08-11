import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
  return (
    <SearchFormWrapper>
      <InputWrapper>
        <SearchInput
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
          onKeyDown={(e) => onEnterPress(e, inputs, router)}
        />
        <ClearButton
          isInput={inputs === '' ? false : true}
          onClick={(e) => useHandleClearEvent({ e, setInputs, setSearchLists })}
        />
      </InputWrapper>
      <HomeSearchLists
        isDisplay={searchLists.length !== 0 && isClicked ? true : false}
      >
        {searchLists.map((searchList) => {
          return (
            <SearchList key={searchList.id}>
              <Image
                src={'/images/location.svg'}
                width={24}
                height={24}
                alt="location IMG"
              />
              <SearchListDescs>
                <SearchListTitle>
                  {searchList.place_name
                    .split('')
                    .map((text) =>
                      split_inputs.includes(text) ? (
                        <SearchListStrong>
                          {text}
                        </SearchListStrong>
                      ) : (
                        text
                      )
                    )}
                </SearchListTitle>
                <SearchListPosition>
                  {searchList.address_name}
                </SearchListPosition>
              </SearchListDescs>
            </SearchList>
          )
        })}
      </HomeSearchLists>
      <SearchButton>지도에서 카페 찾기</SearchButton>
    </SearchFormWrapper>
  )
}

export default Search
