import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/model/produit';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-page-liste',
  templateUrl: './page-liste.component.html',
  styleUrls: ['./page-liste.component.css']
})
export class PageListeComponent implements OnInit {

  constructor(public produitsService : ProduitsService) {
  }

  supprimerProduit(unProduit : Produit) {
    let positionProduit = this.produitsService.tabProduits.indexOf(unProduit);
    if (positionProduit != -1) {
      this.produitsService.tabProduits.splice(positionProduit, 1);
    }
  }

  obtenirTaillePanier() : number {
    return this.produitsService.tabProduits.filter(p => p.estDansLePanier).length;
  }

  obtenirNombreProduits() : number {
    return this.produitsService.tabProduits.filter(p => !p.estDansLePanier).length;
  }

  calculerTotal(produitsDansLePanier: boolean) : number {
    let somme = 0;
    for (const p of this.produitsService.tabProduits) {
      if ((p.estDansLePanier && produitsDansLePanier) || (!p.estDansLePanier && !produitsDansLePanier))
       somme+= p.prix;
    }

    return somme;
  }
  
  ngOnInit(): void {
  }

}
