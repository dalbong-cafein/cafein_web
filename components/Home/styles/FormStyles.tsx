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
  position: relative;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`

export const InputWrapper = styled.div`
  position: relative;
`

export const SearchInput = styled.input`
  width: 400px;
  height: 64px;
  padding: 0 22px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.orange400};
  transition: border-color 0.3s, box-shadow 0.3s;
  background-image: url('/images/search.svg');
  background-repeat: no-repeat;
  background-position: 22px center;
  text-indent: 40px;

  &:focus-visible {
    outline: none;
  }
`

export const ClearButton = styled.button<{ isInput: boolean }>`
  display: ${(props) => (props.isInput ? 'block' : 'none')};
  position: absolute;
  right: 0;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background-image: url('/images/clear_circle.svg');
  background-color: transparent;
`

export const SearchButton = styled.button`
  height: 56px;
  padding: 0 16px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.orange400};
  border-radius: 14px;
  color: ${(props) => props.theme.colors.white};
`
