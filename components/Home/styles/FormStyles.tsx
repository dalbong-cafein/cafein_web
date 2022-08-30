import styled from 'styled-components'

export const HomeWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
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

export const SearchFormWrapper = styled.div<{ isMap: boolean }>`
  position: relative;
  margin-top: ${(props) => (props.isMap ? '30px' : '30px')};
  gap: ${(props) => (props.isMap ? '' : '32px')};
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const InputWrapper = styled.div`
  position: relative;
`

export const SearchInput = styled.input<{ isMap: boolean }>`
  position: relative;
  margin-bottom: 16px;
  width: ${(props) => (props.isMap ? '352px' : '400px')};
  height: ${(props) => (props.isMap ? '44px' : '64px')};
  padding: 0 22px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => (props.isMap ? '12px' : '16px')};
  border: ${(props) => (props.isMap ? '1.2px' : '1px')} solid
    ${(props) => props.theme.colors.orange400};
  transition: border-color 0.3s, box-shadow 0.3s;
  background-image: url('/images/search.svg');
  background-repeat: no-repeat;
  background-position: 22px center;
  text-indent: 40px;
  font-size: ${(props) =>
    props.isMap
      ? `${props.theme.fontsizes.font15}rem`
      : `${props.theme.fontsizes.font17}rem`};
  font-weight: 400;
  caret-color: ${(props) => props.theme.colors.orange500};

  &::placeholder {
    color: ${(props) => props.theme.colors.grey700};
  }
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.grey700};
  }
  &:-ms-input-placeholder {
    color: ${(props) => props.theme.colors.grey700};
  }

  &:focus-visible {
    outline: 1.6px solid ${(props) => props.theme.colors.orange400};
  }

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: ${(props) => props.theme.colors.orange500};
    }
  }
`

export const ClearButton = styled.button<{ isInput: boolean }>`
  display: ${(props) => (props.isInput ? 'block' : 'none')};
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-82%);
  width: 24px;
  height: 24px;
  background-image: url('/images/clear_circle.svg');
  background-color: transparent;
`

export const SearchButton = styled.button`
  height: 48px;
  padding: 16px 24px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.orange400};
  border-radius: 14px;
  color: ${(props) => props.theme.colors.white};

  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
      ${(props) => props.theme.colors.orange400};
  }
`
