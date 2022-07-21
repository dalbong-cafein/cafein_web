import { css, DefaultTheme } from 'styled-components'

const colors = {
  orange500: '#fc6406',
  orange400: '#fc7521',
  grey900: '#131313',
  grey800: '333',
  grey600: '#646464',
  grey500: '#8b8b8b',
  grey400: '#acacac',
  grey300: '#d1d1d1',
  grey50: '#f7f7f7',
  white: '#fff',
  black: '000',
  blue: '#2563Eb'
}

const fontsizes = {
  font28: 1.75,
  font15: 0.9375,
  font14: 0.875,
  font13: 0.8125,
  font12: 0.75
}

const buttons = {
  whiteButton: `
    color: ${colors.orange400};
    background-color: transparent;
    border: 1px solid ${colors.grey300};
    border-radius: 12px;
  `,
  orangeButton: `
    color: ${colors.white};
    background-color: ${colors.orange400};
    border-radius: 12px;
  `
}

export const theme: DefaultTheme = {
  colors,
  fontsizes,
  buttons
}
