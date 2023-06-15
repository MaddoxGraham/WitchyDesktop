import { Component, Input, OnInit } from '@angular/core';
import { Categories } from '../models/categories.model';
import { Router } from '@angular/router';
import { CategorieService } from '../services/categories.services';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit{

  @Input() categories!: Categories

  constructor(private router: Router,
    private categoryService: CategorieService){}


  ngOnInit(): void {
    
  }
  navigateToProduits(id: number): void {
    this.router.navigateByUrl('/categorie/' + id);
    this.categoryService.setCurrentCategoryId(id);
  }
}
