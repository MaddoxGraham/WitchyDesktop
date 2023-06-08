import { Component, OnInit } from '@angular/core';
import { Produits } from '../models/produits.model';
import { ProduitService } from '../services/produits.services';
import { Observable, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produits-list',
  templateUrl: './produits-list.component.html',
  styleUrls: ['./produits-list.component.scss']
})
export class ProduitsListComponent implements OnInit {

  produits$!: Observable<Produits[]>


  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService){}

  ngOnInit(): void{

    const categoryId = +this.route.snapshot.params['id'];



    
this.produits$ = this.produitService.getAllProduits().pipe(
  map(produits => produits.filter(produit => produit.categorie === `/api/categories/${categoryId}`)),
  tap(produits => {
   console.log(produits); // Affiche les produits filtrés dans la console
 })
)
  }
}
