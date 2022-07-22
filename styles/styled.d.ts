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
      font28: number
      font15: number
      font14: number
      font13: number
      font12: number
    }
    borderRadius: {
      border8: number
      border12: number
      border16: number
    }
    widthes: {
      maxWidth: number
    }
    marginTop: {
      margin40: number
      margin30: number
    }
    buttons: {
      whiteButton: string
      orangeButton: string
    }
  }
}
