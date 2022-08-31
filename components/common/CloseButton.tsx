import Link from 'next/link'
import { forwardRef } from 'react'

import styled from 'styled-components'

import Ic_clear from '@public/ic_clear.svg'

interface ICloseButton {
  isSingle: boolean
  href?: string
}

export const CloseButton = forwardRef<HTMLAnchorElement, ICloseButton>(
  ({ isSingle, href }, ref) => {
    return (
      <Link href={href as string}>
        <CloseImage isSingle={isSingle} href={href} ref={ref}>
          <Ic_clear />
        </CloseImage>
      </Link>
    )
  }
)

CloseButton.displayName = 'CloseButton'

export const CloseImage = styled.a<{ isSingle: boolean }>`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background-color: white;
  border-radius: 0 8px 8px 0;
  border: 0.8px solid ${(props) => props.theme.colors.grey200};
  border-left: none;
  left: 400px;
  top: ${(props) => (props.isSingle ? '145px' : '16px')};
  z-index: 5;

  &:hover {
    border-color: ${(props) => props.theme.colors.orange300};

    & svg g path {
      fill: ${(props) => props.theme.colors.orange300};
    }
  }
`
