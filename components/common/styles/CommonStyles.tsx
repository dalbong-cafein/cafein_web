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
