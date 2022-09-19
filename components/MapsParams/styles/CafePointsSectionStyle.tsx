import styled from 'styled-components'
import { Description } from './CafeInfoSectionStyle'

export const WrapperTitle = styled(Description)`
  font-size: ${(props) => props.theme.fontsizes.font17}rem;
  font-weight: 600;
  margin-left: 0;
  & span {
    margin-right: 6px;
  }
`

export const PointTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

export const PercentBadge = styled.p<{
  backgroundColor: string
  color: string
}>`
  padding: 3px 4px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  border-radius: 4px;
`

export const CafeInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
`

export const CafeInfoItemWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const CafeInfoItemDescsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const CafeInfoItemDescWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const CafeInfoItemTitle = styled.p`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  color: ${(props) => props.theme.colors.grey600};
`

export const StartWrapper = styled.div`
  display: flex;
`

export const CafeInfoItemDesc = styled(CafeInfoItemTitle)`
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  color: ${(props) => props.theme.colors.grey800};
`
