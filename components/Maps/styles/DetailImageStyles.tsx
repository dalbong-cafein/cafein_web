import styled from 'styled-components'

export const Escape = styled.div`
  display: flex;
  position: absolute;
  right: 36.6px;
  top: 36.6px;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }
`

export const MainImage = styled.div<{ isActive: boolean }>`
  /* display: flex;
  position: absolute;
  top: 100px;
  width: 480px; */
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  position: relative;
  max-height: 486px;
  & svg {
    position: absolute;
    right: 16px;
    bottom: 16px;
  }
`

export const ImageLists = styled.ul`
  display: flex;
  /* position: absolute; */
  align-items: center;
  justify-content: center;
  /* left: 50%;
  transform: translateX(-50%); */
  width: 700px;
  bottom: 80px;
  @media screen and (max-width: 900px) {
    width: 100vw;
  }
`

export const ArrowBtn = styled.div`
  width: 80px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`

export const ImagesWrapper = styled.div`
  display: flex;
  gap: 10px;
  max-width: 540px;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding: 0 220px 0;
  @media screen and (max-width: 900px) {
    width: 100vw;
    padding: 0 calc(50% - 40px) 0;
  }
  /* overflow-x: scroll; */
  ${(props) => props.theme.mixins.scroll_x}
`

export const ImageWrapper = styled.div<{ isActive: boolean; isImage: boolean }>`
  /* box-sizing: content-box; */
  /* max-width: 100px; */
  height: 100px;
  flex: 0 0 100px;
  border: ${(props) => (props.isActive ? '1.6px solid white' : '')};
  scroll-snap-align: center;
  ${(props) => (props.isImage ? '&:hover {cursor: pointer;}' : '')}
  @media screen and (max-width: 900px) {
    /* ${(props) => (!props.isImage ? 'display: none' : '')}; */
  }
`

export const NumOfCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: white;
  font-weight: 500;
`

export const ImageOutterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 100px;
  bottom: 36px;
  gap: 60px;
  @media screen and (max-width: 900px) {
    width: 100vw;
  }
`

export const ImageInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 900px) {
    width: 100vw;
  }
`
