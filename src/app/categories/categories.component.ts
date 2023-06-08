import { Component, Input, OnInit } from '@angular/core';
import { Categories } from '../models/categories.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit{

  @Input() categories!: Categories

  constructor(private router: Router){}
  ngOnInit(): void {
    
  }
  navigateToProduits(id: number): void {
    this.router.navigateByUrl('/categorie/' + id);
  }
  
}
