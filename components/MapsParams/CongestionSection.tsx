import styled from 'styled-components'
import { CafeInfoWrapper } from './styles/CafeInfoSectionStyle'
import { WrapperTitle } from './styles/CafePointsSectionStyle'

import Ic_down_arrow from '@public/down_arrow.svg'
import { IDimmed, isDimmedAtom } from 'store'
import { useSetAtom } from 'jotai'

const CongestionSection = () => {
  const setIsDimmed = useSetAtom(isDimmedAtom)
  const notYet = () => {
    const dimmed_obj: IDimmed = {
      title: '준비중인 기능입니다',
      body: '빠른 시일 내에 이용하실 수 있도록\n열심히 노력할게요',
      type: 'alert'
    }
    setIsDimmed(dimmed_obj)
  }
  return (
    <CafeInfoWrapper>
      <WrapperTitle>혼잡도</WrapperTitle>
      <AlarmButtonWrapper>
        <Select isOpened={false} onClick={notYet}>
          월요일
          <Ic_down_arrow />
        </Select>
        <CongestionBtn onClick={notYet}>혼잡도 알려주기</CongestionBtn>
      </AlarmButtonWrapper>
      <CongestionWrapper>
        <CongestionItem>
          <GreenCircle>여유</GreenCircle>
          <CongestionSubWrapper>
            <CongestionTitle>
              <CongestionUser>달봉</CongestionUser>님의 제보
            </CongestionTitle>
            <CongestionDescWrapper>
              <CongestionDesc>30분전</CongestionDesc>
              <CongestionLates>·</CongestionLates>
              <CongestionLates>가장 최근에 공유했어요</CongestionLates>
            </CongestionDescWrapper>
          </CongestionSubWrapper>
        </CongestionItem>
        <CongestionItem>
          <GreyCircle>여유</GreyCircle>
          <CongestionSubWrapper>
            <CongestionTitle>
              <CongestionUser>달봉</CongestionUser>님의 제보
            </CongestionTitle>
            <CongestionDesc>30분전</CongestionDesc>
          </CongestionSubWrapper>
        </CongestionItem>
      </CongestionWrapper>
    </CafeInfoWrapper>
  )
}

export default CongestionSection

const AlarmButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`

const Select = styled.a<{ isOpened: boolean }>`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 34px;
  padding: 10px 12px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 10px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 500;

  & span {
    left: 4px;
    transition: all ease 0.4s;
    transform: ${(props) => (props.isOpened ? 'rotate(180deg)' : '')};
  }
`

const CongestionBtn = styled.button`
  height: 34px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.orange400};
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 500;
  padding: 10px 12px;
`

const CongestionWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
`

const CongestionItem = styled.li`
  display: flex;
  gap: 10px;
`

const GreenCircle = styled.p`
  /* padding: 16px 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background-color: ${(props) => props.theme.colors.orange050};
  color: ${(props) => props.theme.colors.orange400};
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 500;
  border-radius: 50%;
`

const GreyCircle = styled(GreenCircle)`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.grey50};
  color: ${(props) => props.theme.colors.grey400};
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  margin-left: 4px;
`

const CongestionSubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const CongestionTitle = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 400;
`

const CongestionUser = styled.span`
  font-weight: 500;
`

const CongestionDescWrapper = styled.div`
  display: flex;
  gap: 2px;
`

const CongestionDesc = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey600};
`

const CongestionLates = styled(CongestionDesc)`
  color: ${(props) => props.theme.colors.orange500};
`
