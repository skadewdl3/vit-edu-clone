import { atom } from 'nanostores'

export const isMenuOpen = atom<boolean>(false)
export const activeSection = atom<number>(-1)
export const activeSubsection = atom<number>(-1)
export const navColor = atom<string>('light')
export const smallNavColor = atom<string>('light')