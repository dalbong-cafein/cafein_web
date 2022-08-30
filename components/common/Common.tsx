import styled from 'styled-components'

export const Title = styled.h1`
  font-weight: 600;
`

export const Logo = styled.a`
  display: flex;
  flex: 0;
  margin: 23px 24px 30px;
  width: 103px;
  height: 22px;
`

export const DimmedWrapper = styled.div<{ isSearch: boolean; isAll: boolean }>`
  position: absolute;
  left: ${(props) => (props.isAll ? '0' : props.isSearch ? '400px' : '800px')};
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: ${(props) => (props.isSearch ? 4 : 9999)};
  display: flex;
  justify-content: center;
  align-items: center;
`
