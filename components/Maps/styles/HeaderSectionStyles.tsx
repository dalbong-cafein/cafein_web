import styled from 'styled-components'

export const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  padding: 23px 24px 0;
`

export const FilterWrapper = styled.ul`
  display: flex;
  gap: 6px;
  padding: 0 24px 16px;
`

export const FilterItem = styled.li`
  border: 1px solid ${(props) => props.theme.colors.grey200};
  border-radius: 20px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey800};
  padding: 8px 12px;
  cursor: pointer;
`
