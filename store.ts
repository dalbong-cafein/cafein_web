import { atom } from 'jotai'

interface UserIpAtom {
  ip: string
  lati: number
  longi: number
}

export const userIpAtom = atom<UserIpAtom | null>(null)
