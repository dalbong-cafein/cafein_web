import styled from 'styled-components'

export const Escape = styled.div`
  display: flex;
  position: absolute;
  right: 36.6px;
  top: 36.6px;

  &:hover {
    cursor: pointer;
  }
`

export const MainImage = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
  width: 480px;
  max-height: 486px;
`

export const ImageLists = styled.ul`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  top: 646px;
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
  ${(props) => props.theme.mixins.scroll_x}
`

export const ImageWrapper = styled.div<{ isActive: boolean }>`
  box-sizing: content-box;
  max-width: 100px;
  height: 100px;
  flex: 0 0 100px;
  border: ${(props) => (props.isActive ? '1.6px solid white' : '')};
  scroll-snap-align: center;
`

export const NumOfCount = styled.div`
  position: absolute;
  top: 770px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: white;
  font-weight: 500;
`
