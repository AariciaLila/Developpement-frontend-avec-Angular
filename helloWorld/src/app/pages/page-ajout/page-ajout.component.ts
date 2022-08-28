import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Nutriscore } from 'src/app/model/nutriscore';
import { Produit } from 'src/app/model/produit';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-page-ajout',
  templateUrl: './page-ajout.component.html',
  styleUrls: ['./page-ajout.component.css']
})
export class PageAjoutComponent implements OnInit {
  libelle!: string;
  quantite! : number;
  poids! : number;
  prix! : number;
  nutriscore! : Nutriscore;

  @ViewChild('mySwal')
  public readonly mySwal!: SwalComponent;
  
  constructor(public produitsService : ProduitsService, private router : Router) {
  }

  ngOnInit(): void {
  }

  ajouterProduit() {
    let nouveauProduit : Produit = {
      estDansLePanier: false,
      libelle: this.libelle,
      nutriscore: this.nutriscore,
      poids: this.poids,
      prix: this.prix,
      quantite: this.quantite
    };

    this.produitsService.tabProduits.push(nouveauProduit);
    this.mySwal.fire().then(() => {
      this.router.navigateByUrl("liste");
    });
  }

}
