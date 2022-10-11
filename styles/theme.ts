import { DefaultTheme } from 'styled-components'

const colors = {
  orange500: '#fc6406',
  orange400: '#fc7521',
  orange300: '#fd9759',
  orange050: '#FFF0E6',
  grey900: '#131313',
  grey800: '#333',
  grey700: '#515151',
  grey600: '#646464',
  grey500: '#8b8b8b',
  grey400: '#acacac',
  grey300: '#d1d1d1',
  grey200: '#e3e3e3',
  grey100: '#efefef',
  grey50: '#f7f7f7',
  white: '#fff',
  black: '#000',
  blue: '#2563Eb',
  green500: '#26ba6a',
  green050: '#dff5e8'
}

const fontsizes = {
  font40: 2.5,
  font28: 1.75,
  font24: 1.5,
  font23: 1.4375,
  font22: 1.375,
  font21: 1.3125,
  font19: 1.1875,
  font17: 1.0625,
  font16: 1,
  font15: 0.9375,
  font14: 0.875,
  font13: 0.8125,
  font12: 0.75,
  font11: 0.6875
}

const widthes = {
  maxWidth: 1386,
  maxBarList: 680,
  minBarList: 300
}

const marginTop = {
  margin40: 40,
  margin30: 30,
  navHeight: 68
}

const borderRadius = {
  border4: 4,
  border8: 8,
  border12: 12,
  border16: 16
}

const buttons = {
  whiteButton: `
    color: ${colors.orange400};
    background-color: transparent;
    border: 1px solid ${colors.grey300};
  `,
  orangeButton: `
    color: ${colors.white};
    background-color: ${colors.orange400};
  `
}

const mixins = {
  scroll_x: `
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; // IE 스크롤바 감추기
    scrollbar-width: none; // Firefox 스크롤바 감추기
    &::-webkit-scrollbar {
    display: none; // Chrome 스크롤바 감추기
  `,
  ellipse: `
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `
}

export const theme: DefaultTheme = {
  colors,
  fontsizes,
  widthes,
  marginTop,
  borderRadius,
  buttons,
  mixins
}
