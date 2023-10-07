export type MenuSectionIndependent = {
  name: string
  description?: string
  route: string
  id?: string
}

export type MenuSectionDependent = {
  name: string
  sections: (MenuSectionIndependent | MenuSectionDependent)[]
  id?: string
}

export type MenuSection = MenuSectionIndependent | MenuSectionDependent
