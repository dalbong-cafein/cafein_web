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
  a { cursor: pointer; text-decoration: none; color: inherit; }
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
  .marker {
    white-space: nowrap;
    position: relative;
    display: flex;
    padding: 12px 16px;
    background-color: white;
    border-radius: 99px;
    border: 1.2px solid ${(props) => props.theme.colors.orange400};
    font-weight: 600;
    font-size: 15px;
    height: 40px;
  }
  .marker::before {
    position: absolute;
    bottom: -6px;
    content: '';
    width: 8px;
    height: 8px;
    border-top-right-radius: 2px;
    border-top: 1.2px solid ${(props) => props.theme.colors.orange400};
    border-right: 1.2px solid ${(props) => props.theme.colors.orange400};
    background-color: white;
    left: 50%;
    transform: translateX(-50%) rotate(135deg);
  }
  .marker:hover {
    color: ${(props) => props.theme.colors.orange400};
  }
  .marker.active {
    background-color: ${(props) => props.theme.colors.orange400};
    color: white;
  }
  .marker.active::before {
    background-color: ${(props) => props.theme.colors.orange400};
  }
`
