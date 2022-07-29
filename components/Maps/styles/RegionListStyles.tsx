import Image from 'next/image'
import styled from 'styled-components'

const RegionWrapper = styled.div`
  margin-top: 30px;
`

const RegionTitle = styled.h1`
  font-size: ${(props) => props.theme.fontsizes.font19}rem;
`

const RegionList = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  ${(props) => props.theme.mixins.scroll_x}
`
const RegionItem = styled.a`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 212px;
  margin-bottom: 12px;
  flex: 1;
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px;
`
const RegionItemImage = styled(Image)`
  border-top-left-radius: ${(props) => props.theme.borderRadius.border12}px;
  border-top-right-radius: ${(props) => props.theme.borderRadius.border12}px;
`

const RegionItemTitle = styled.p`
  padding: 16px 20px 20px;
  border-bottom-left-radius: ${(props) => props.theme.borderRadius.border12}px;
  border-bottom-right-radius: ${(props) => props.theme.borderRadius.border12}px;
  background-color: ${(props) => props.theme.colors.white};
`

export {
  RegionWrapper,
  RegionTitle,
  RegionList,
  RegionItem,
  RegionItemImage,
  RegionItemTitle
}
