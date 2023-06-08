import { Component, Input, OnInit } from '@angular/core';
import { Produits } from '../models/produits.model';
import { ProduitService } from '../services/produits.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit{

  @Input() produits!: Produits
  


  constructor(private produitService : ProduitService,
              private route: ActivatedRoute){}

  ngOnInit(): void {

}
}
