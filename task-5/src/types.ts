export interface Beer {
  image: string,
  name: string,
  tagline: string,
  first_brewed: string,
  abv: number
}

export enum FilterValue {
  ABVG = "ABVG5",
  ABVL="ABVL5",
  BrewedA="brewedA",
  BrewedB="brewedB"
}