declare module 'suggestions' {
  export type ITypes =
    | 'allDay'
    | 'teamPlay'
    | 'noNoonChi'
    | 'alone'
    | 'cafein'
    | 'morning'

  export interface ItypeEng {
    allDay: string
    teamPlay: string
    noNoonChi: string
    alone: string
    cafein: string
    morning: string
  }

  export interface Imbti {
    [key: string]: string
  }
}
