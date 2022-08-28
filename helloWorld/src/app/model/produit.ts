import { Nutriscore } from "./nutriscore"

export type Produit = {
  libelle : string,
  prix : number,
  quantite: number,
  poids: number,
  nutriscore : Nutriscore,
  estDansLePanier : boolean
}