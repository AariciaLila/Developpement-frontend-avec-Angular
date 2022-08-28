import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produit } from '../model/produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  @Input() unProduit! : Produit;
  @Output() demandeSuppression : EventEmitter<void> = new EventEmitter();

  constructor() {
    
  }
  
  ngOnInit(): void {
  }

  gererClic() {
    this.demandeSuppression.emit();
  }

  inverserProduitPanier() {
    this.unProduit.estDansLePanier = !this.unProduit.estDansLePanier;
  }
}
