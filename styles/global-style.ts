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
    background-color: ${(props) => props.theme.colors.grey50};
  }
  h1,h2,h3,h4,h5,p,div {
    margin: 0
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
  input, div, nav, ul, ol, li {
    box-sizing: border-box;
  }
`
