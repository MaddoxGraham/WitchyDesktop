import { Component, OnInit } from '@angular/core';
import { Produits } from '../models/produits.model';
import { ProduitService } from '../services/produits.services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-produit',
  templateUrl: './single-produit.component.html',
  styleUrls: ['./single-produit.component.scss']
})
export class SingleProduitComponent implements OnInit  {

    produit!: Produits;
    produit$!: Observable<Produits[]>;
    
    constructor(private produitService: ProduitService,
                private route: ActivatedRoute) {}

        ngOnInit(): void{
        const produit = +this.route.snapshot.params['id'];
        this.produit$ = this.produitService.getProduitById(produit);
          console.log(this.produit$);
      }

}
