import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  html {
    font-family: 'Pretendard';
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.grey900};
    min-width: 320px;
    background-color: ${(props) => props.theme.colors.grey50};
    @media screen and (max-width: 900px) {
      font-size: 15px;
    }
  }
  h1,h2,h3,h4,h5,p,div {
    margin: 0
  }
  a { 
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: 0.3s;
   }
  a:hover {
    color: ${(props) => props.theme.colors.grey800};
  }
  ol, ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  button {
    border: none;
    cursor: pointer;
    transition: 0.3s;
  }
  input, div, nav, ul, ol, li {
    box-sizing: border-box;
  }
  .marker {
    white-space: nowrap;
    position: relative;
    display: flex;
    padding: 11px 16px 12px;
    background-color: white;
    border-radius: 99px;
    border: 1.2px solid ${(props) => props.theme.colors.orange400};
    font-weight: 600;
    font-size: 15px;
    height: 40px;
    transform: translateX(-50%) translateY(-50%);
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
    z-index: 1;
  }
  .marker.over {
    color: ${(props) => props.theme.colors.orange400};
    z-index: 1;
  }
  .marker.active {
    background-color: ${(props) => props.theme.colors.orange400};
    color: white;
    z-index: 1;
  }
  .marker.active::before {
    background-color: ${(props) => props.theme.colors.orange400};
  }

  .hidden {
    position:absolute !important;  
    width:1px; 
    height:1px; 
    overflow:hidden;
    clip:rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip:rect(1px, 1px, 1px, 1px);
  }

  .btn_mylct {
    display: flex;
    background-image: url("data:image/svg+xml,%3Csvg width='74' height='74' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23a)'%3E%3Ccircle cx='37' cy='37' r='25' fill='%23fff'/%3E%3C/g%3E%3Cg clip-path='url(%23b)'%3E%3Cpath d='M39.46 43.94 44.8 31a1.35 1.35 0 0 0-1.8-1.8l-13 5.35a1.35 1.35 0 0 0 0 2.5l4.22 1.69a1.79 1.79 0 0 1 1 1L37 43.93a1.36 1.36 0 0 0 2.46.01Z' fill='%23333'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='b'%3E%3Cpath fill='%23fff' transform='translate(25 25)' d='M0 0h24v24H0z'/%3E%3C/clipPath%3E%3Cfilter id='a' x='0' y='0' width='74' height='74' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='6'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0'/%3E%3CfeBlend in2='BackgroundImageFix' result='effect1_dropShadow_629_9410'/%3E%3CfeBlend in='SourceGraphic' in2='effect1_dropShadow_629_9410' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E");
    width: 74px;
    height: 74px;
  }
`
