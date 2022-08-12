import Image from 'next/image'
import styled from 'styled-components'

const CurrentPopularWrapper = styled.div`
  margin-top: 30px;
`

const CurrentPopularTitle = styled.h2`
  font-size: ${(props) => props.theme.fontsizes.font19}rem;
`

const CurrentPopularList = styled.ul`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`

const CurrentPopularItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`

const CurrentPopularItemImage = styled(Image)`
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
`

const CurrentPopularItemRegion = styled.p`
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
  background-color: ${(props) => props.theme.colors.grey50};
  position: absolute;
  left: 16px;
  top: 16px;
  padding: 8px 10px;
`

const CurrentPopularItemTitle = styled.p`
  ${(props) => props.theme.mixins.ellipse}
  font-size: ${(props) => props.theme.fontsizes.font17}rem;
  color: ${(props) => props.theme.colors.grey800};
  font-weight: 600;
`

const CurrentPopularItemLocation = styled.p`
  ${(props) => props.theme.mixins.ellipse}
  margin-top: 6px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey600};
`

const OnAirWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`

const OnAirBadge = styled.span`
  font-size: ${(props) => props.theme.fontsizes.font11}rem;
  color: ${(props) => props.theme.colors.orange500};
  font-weight: 400;
  border-radius: ${(props) => props.theme.borderRadius.border4}px;
  border: 0.8px solid ${(props) => props.theme.colors.orange500};
  padding: 3px 4px;
`

const OpeningTime = styled.span`
  margin-left: 8px;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey800};
`

const DdabongWrap = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  margin-top: 7px;
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  color: ${(props) => props.theme.colors.grey600};
  font-weight: 400;

`

export {
  CurrentPopularWrapper,
  CurrentPopularTitle,
  CurrentPopularList,
  CurrentPopularItem,
  CurrentPopularItemImage,
  CurrentPopularItemRegion,
  CurrentPopularItemTitle,
  CurrentPopularItemLocation,
  OnAirWrapper,
  OnAirBadge,
  OpeningTime,
  DdabongWrap
}
