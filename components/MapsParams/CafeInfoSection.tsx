import { CafeInfoInterface, toastAtom } from 'store'

import Ic_copy from '@public/copy.svg'
import Ic_clock from '@public/clock.svg'
import Ic_call from '@public/call.svg'
import Ic_url from '@public/url.svg'
import Ic_like from '@public/ddabong.svg'

import {
  ArrowButton,
  CafeInfoWrapper,
  CallDescription,
  DDabongPoints,
  DDabongWrapper,
  Description,
  DescWrapper,
  HeaderTitle,
  OpenInfoWrapper,
  StrongSpan,
  SubTitle,
  SubTitleWrapper,
  TitleWrapper,
  URLDescription
} from './styles/styles'
import {
  getIsRunning,
  getRunningTimes
} from '@utils/CafeInfo/getCafeRunningInfo'
import { GetRunningTimes } from '@utils/CafeInfo/GetRunningTimes'
import useToggle from 'hooks/useToggle'
import copyUrl from '@utils/copyUrl'
import styled from 'styled-components'
import { useSetAtom } from 'jotai'

interface CafeInfoSectionProps {
  store: CafeInfoInterface
}

const CafeInfoSection = ({ store }: CafeInfoSectionProps) => {
  const [isOpened, setIsOpened] = useToggle(false)
  const [isRunning, runningTime] = getIsRunning(store)
  const weekRunningTimes = getRunningTimes(store)
  const setIsToast = useSetAtom(toastAtom)

  return (
    <CafeInfoWrapper isFirst={true}>
      <TitleWrapper>
        <HeaderTitle>{store.storeName}</HeaderTitle>
      </TitleWrapper>
      <SubTitleWrapper>
        <SubTitle>{store.address.fullAddress}</SubTitle>
        <StyleCopy>
          <Ic_copy onClick={() => copyUrl(window.location.href, setIsToast)} />
        </StyleCopy>
      </SubTitleWrapper>
      {runningTime && (
        <OpenInfoWrapper>
          <Ic_clock />
          <DescWrapper>
            <StrongSpan isRunning={isRunning}>
              {isRunning ? '영업 중' : '영업 종료'}
            </StrongSpan>
            <Description>
              {runningTime === '24' ? (
                '24시간 영업'
              ) : (
                <span>
                  {runningTime}에 영업 {isRunning ? '종료' : '시작'}
                </span>
              )}
            </Description>
            <ArrowButton isOpened={isOpened} onClick={setIsOpened} />
          </DescWrapper>
        </OpenInfoWrapper>
      )}

      {isOpened ? GetRunningTimes(weekRunningTimes, isRunning) : ''}
      {store.phone ? (
        <OpenInfoWrapper>
          <Ic_call />
          <CallDescription href={`tel:${store.phone}`}>
            {store.phone}
          </CallDescription>
        </OpenInfoWrapper>
      ) : (
        ''
      )}

      {store.website ? (
        <OpenInfoWrapper>
          <Ic_url />
          <URLDescription href={store.website} target="_blank">
            {store.website}
          </URLDescription>
        </OpenInfoWrapper>
      ) : (
        ''
      )}
    </CafeInfoWrapper>
  )
}

const StyleCopy = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
    & svg path {
      fill: ${(props) => props.theme.colors.grey600};
    }
  }
`

export default CafeInfoSection
