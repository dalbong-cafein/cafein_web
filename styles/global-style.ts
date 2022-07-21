import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  html {
    font-family: 'Pretendard';
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.grey900};
    min-width: 320px;
  }
  a { cursor: pointer; text-decoration: none; }
  ol, ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  button {
    border: none;
    cursor: pointer;
  }
`
