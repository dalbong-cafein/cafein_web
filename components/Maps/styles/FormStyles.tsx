import styled from 'styled-components'

export const SearchWrapper = styled.form`
  display: flex;
  flex-direction: row;
  padding: 16px 24px 0;
`

export const SearchInput = styled.input`
  width: 530px;
  height: 48px;
  padding: 0 20px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey100};
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
`

export const SearchButton = styled.button`
  width: 86px;
  height: 48px;
  margin-left: 16px;
  background-color: ${(props) => props.theme.colors.orange400};
  color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
`

export const SearchDetailInput = styled.input`
  width: 440px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 12px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  padding-left: 18px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus-visible {
    z-index: 1;
    outline: none;
    border-color: ${(props) => props.theme.colors.orange500};
    box-shadow: ${(props) => props.theme.colors.orange500} 0 0 0 1px;
  }

  &::placeholder {
    text-indent: 28px;
    background-image: url('/images/search.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  &::-webkit-input-placeholder {
    text-indent: 28px;
    background-image: url('/images/search.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  &:-ms-input-placeholder {
    text-indent: 28px;
    background-image: url('/images/search.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
`

export const SearchListInput = styled(SearchDetailInput)`
  width: 632px;
  height: 48px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.white};
  border-color: ${(props) => props.theme.colors.grey100};
`

export const SearchLists = styled.ul`
  position: absolute;
  margin-top: 10px;
  width: 632px;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.06));
  padding: 10px;
  background-color: ${(props) => props.theme.colors.white};
`

export const SearchList = styled.li`
  width: 100%;
  padding: 16px 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`

export const HomeSearchLists = styled(SearchLists)<{ isDisplay: boolean}>`
  display: ${(props) => props.isDisplay ? 'block' : 'none'};
  width: 400px;
  top: 64px;
`

export const SearchListDescs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const SearchListTitle = styled.p`
  color: ${(props) => props.theme.colors.grey800};
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
`

export const SearchListStrong = styled.span`
  color: ${(props) => props.theme.colors.orange500};
`

export const SearchListPosition = styled.p`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey600};
`
