import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      grey900: string
      grey800: string
      grey600: string
      grey500: string
      grey400: string
      grey300: string
      grey50: string
      orange500: string
      orange400: string
      white: string
      black: string
      blue: string
    }
    fontsizes: {
      font28: int
      font15: int
      font14: int
      font13: int
      font12: int
    }
    buttons: {
      whiteButton: string
      orangeButton: string
    }
  }
}
