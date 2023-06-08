import { Component, OnInit } from '@angular/core';
import { Produits } from '../models/produits.model';
import { ProduitService } from '../services/produits.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produits-list',
  templateUrl: './produits-list.component.html',
  styleUrls: ['./produits-list.component.scss']
})
export class ProduitsListComponent implements OnInit {

  produits$!: Observable<Produits[]>


  constructor(private produitService: ProduitService){}

  ngOnInit(): void{
    this.produits$ = this.produitService.getAllProduits();
  }

}
