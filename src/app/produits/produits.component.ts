import { Component, Input, OnInit } from '@angular/core';
import { Produits } from '../models/produits.model';
import { ProduitService } from '../services/produits.services';
import { ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.photos$ = this.produitService.getAllPhotoByRef(this.produits.id);

}
}
