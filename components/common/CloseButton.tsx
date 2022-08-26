import Image from 'next/image'
import Link from 'next/link'
import { forwardRef } from 'react'
import styled from 'styled-components'

interface ICloseButton {
  inHoverClose: boolean
  setInHoverClose: React.Dispatch<React.SetStateAction<boolean>>
  isSingle: boolean
  href?: string
}

const CloseButton = forwardRef<HTMLAnchorElement, ICloseButton>(
  ({ inHoverClose, setInHoverClose, isSingle, href }, ref) => {
    return (
      <Link href={href as string}>
        <CloseImage
          isSingle={isSingle}
          onClick={() => setInHoverClose(false)}
          onMouseEnter={() => setInHoverClose(true)}
          onMouseLeave={() => setInHoverClose(false)}
          href={href}
          ref={ref}
        >
          {inHoverClose ? (
            <Image
              src="/images/orange_close.svg"
              alt="닫기 아이콘"
              width={44}
              height={44}
            />
          ) : (
            <Image
              src="/images/white_close.svg"
              alt="닫기 아이콘"
              width={44}
              height={44}
            />
          )}
        </CloseImage>
      </Link>
    )
  }
)

CloseButton.displayName = 'CloseButton'

export default CloseButton

const CloseImage = styled.a<{ isSingle: boolean }>`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  left: ${(props) => (props.isSingle ? '400px' : '800px')};
  top: ${(props) => (props.isSingle ? '145px' : '16px')};
  z-index: 5;
`
