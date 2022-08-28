export type RegionBack = {
  nom: string,
  code: string
}

export type DepartementBack = {
  nom: string,
  code: string,
  codeRegion: string
}

export type CommuneBack = {
  nom: string,
  code: string,
  codeDepartement: string,
  codeRegion: string,
  codesPostaux: string[],
  population: number
}