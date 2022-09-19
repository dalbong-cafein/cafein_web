import {
  AddButton,
  AddLink,
  AddLinkText,
  AddWrapper
} from '@components/Home/styles/AddOnStyles'
import styled from 'styled-components'

export const AddWrapper2 = styled(AddWrapper)`
  border-radius: 16px;
  height: 120px;
  width: 360px;
  margin: 16px auto 0;
  background-size: 142px 80px;
  background-position: right 14px top 22px;
  padding: 19px 20px;
`

export const AddLink2 = styled(AddLink)`
  gap: 8px;
`

export const AddLinkText2 = styled(AddLinkText)`
  font-size: ${(props) => props.theme.fontsizes.font16}rem;
  width: 133px;
  line-height: 145%;
`

export const AddButton2 = styled(AddButton)`
  border-radius: 8px;
  padding: 7px 12px;
  background-color: ${(props) => props.theme.colors.grey500};
  width: 101px;
  height: 28px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 500;
  align-self: flex-start;
  line-height: 1;
`
