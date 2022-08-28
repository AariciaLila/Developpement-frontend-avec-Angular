import { Injectable } from '@angular/core';
import { Produit } from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  public tabProduits : Produit[] = [
    {
      libelle: "Choux du jardin",
      nutriscore: "A",
      poids: 500,
      prix: 4,
      quantite: 1,
      estDansLePanier: true
    },
    {
      libelle: "Carottes du jardin préparées en sachet",
      nutriscore: "B",
      poids: 1000,
      prix: 1,
      quantite: 5,
      estDansLePanier: false
    },
    {
      libelle: "Chocolat",
      nutriscore: "D",
      poids: 3000,
      prix: 2.5,
      quantite: 1,
      estDansLePanier: true
    },
    {
      libelle: "Gâteau au chocolat",
      nutriscore: "C",
      poids: 2500,
      prix: 5,
      quantite: 1,
      estDansLePanier: false
    }
  ];
  
  constructor() { }
}
