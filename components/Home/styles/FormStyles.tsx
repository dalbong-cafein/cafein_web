import styled from 'styled-components'

export const HomeWrapper = styled.div`
  max-width: 1200px;
  padding: 100px 34px;
`

export const HomeTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontsizes.font40}rem;
  font-weight: 700;
  height: 116px;
  text-align: center;
`

export const SearchFormWrapper = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 400px;
  height: 64px;
  padding: 0 22px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 16px;
  border: none;
  transition: border-color 0.3s, box-shadow 0.3s;

  &::before {
    position: absolute;
    content: '';
  }

  &:focus-visible {
    z-index: 1;
    outline: none;
    border-color: ${(props) => props.theme.colors.orange500};
    box-shadow: ${(props) => props.theme.colors.orange500} 0 0 0 1px;
  }
`

export const SearchButton = styled.button`
  width: 108px;
  height: 56px;
  margin-left: 20px;
  background-color: ${(props) => props.theme.colors.orange400};
  border-radius: ${(props) => props.theme.borderRadius.border16}px;
  color: ${(props) => props.theme.colors.white};
`

export const SearchByMap = styled.button`
  width: 127px;
  height: 56px;
  margin-left: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: ${(props) => props.theme.borderRadius.border16}px;
  color: ${(props) => props.theme.colors.orange400};
  background-color: transparent;
`
