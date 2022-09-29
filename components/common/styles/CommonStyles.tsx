import styled from 'styled-components'
import Ic_like from '@public/ddabong.svg'

export const FlexA = styled.a`
  display: flex;
`

export const Ic_Like = styled(Ic_like)<{ color: string }>`
  & g {
    fill: ${(props) => props.color};
  }
`

export const ToggleBtn = styled.button`
  position: absolute;
  right: 50px;
  bottom: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
`
