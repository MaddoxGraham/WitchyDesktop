import { Component, Input, OnInit } from '@angular/core';
import { Produits } from '../models/produits.model';
import { ProduitService } from '../services/produits.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Photos } from '../models/photos.model';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit{

  @Input() produits!: Produits
  photos$!: Observable<Photos[]>;


  constructor(private produitService : ProduitService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.photos$ = this.produitService.getAllPhotoByRef(this.produits.id);

}

onDeleteProduit(id: number): void {
  this.produitService.deleteProduit(id).subscribe(
    () => {
      console.log(`Produit ${id} supprimé avec succès.`);
      // Recharger la même page
      window.location.reload();
    },
    (error) => {
      console.error(`Erreur lors de la suppression du produit ${id}.`, error);
    }
  );
}

navigateToSingle(id: number): void {
  this.router.navigateByUrl('/categorie/produit/' + id);
}
}
