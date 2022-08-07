import Image from 'next/image'
import styled from 'styled-components'

export const Title = styled.h1`
  font-weight: 600;
`

export const Ddabong = (
  <Image src={'/images/ddabong.svg'} width={16} height={16} alt="엄지척뱃지" />
)

export const Logo = styled.a`
  display: flex;
  flex: 0;
  margin-top: 23px;
  margin-left: 24px;
  margin: 23px 24px 30px;
  width: 103px;
  height: 22px;
`