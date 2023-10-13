import { atom } from 'nanostores'

export const isMenuOpen = atom<boolean>(false)
export const activeSection = atom<number>(-1)
export const activeSubsection = atom<number>(-1)
export const navColor = atom<string>('light')
export const expectedNavColor = atom<string | null>(null)