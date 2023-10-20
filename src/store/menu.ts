import { atom } from 'nanostores'

export const isMenuOpen = atom<boolean>(false)
export const activeSection = atom<number>(-1)
export const activeSubsection = atom<number>(-1)
export const navTheme = atom<string>('light')
export const smallNavTheme = atom<string>('light')