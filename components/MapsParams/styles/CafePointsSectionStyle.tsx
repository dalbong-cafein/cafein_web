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
  position: relative;
`

export const CafeInfoItemWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const Dimmed = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  gap: 16px;
  text-align: center;

  & p {
    font-size: ${(props) => props.theme.fontsizes.font14}rem;
    color: ${(props) => props.theme.colors.grey700};
    font-weight: 400;
    line-height: 20px;
  }
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
