export type MenuSectionIndependent = {
  name: string
  description?: string
  route: string
}

export type MenuSectionDependent = {
  name: string
  sections: (MenuSectionIndependent | MenuSectionDependent)[]
}

export type MenuSection = MenuSectionIndependent | MenuSectionDependent
