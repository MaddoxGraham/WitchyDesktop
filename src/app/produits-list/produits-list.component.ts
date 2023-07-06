import { Component, OnInit } from '@angular/core';
import { Produits } from '../models/produits.model';
import { ProduitService } from '../services/produits.services';
import { Observable, map, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Photos } from '../models/photos.model';

@Component({
  selector: 'app-produits-list',
  templateUrl: './produits-list.component.html',
  styleUrls: ['./produits-list.component.scss']
})
export class ProduitsListComponent implements OnInit {

  produits$!: Observable<Produits[]>
  photosData! : string[]
  photos$!: Observable<Photos[]>;


  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private router:Router){}

  ngOnInit(): void{

    const categoryId = +this.route.snapshot.params['id'];
    
this.produits$ = this.produitService.getAllProduits().pipe(
  map(produits => produits.filter(produit => produit.categorie === `/api/categories/${categoryId}`)),
  tap(produits => {
   
 })
)
  }


 
  navigateToNew(): void {
    this.router.navigateByUrl('categorie/produit/new');
  }


}
