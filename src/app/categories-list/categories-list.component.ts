import { Component, OnInit } from '@angular/core';
import { Categories } from '../models/categories.model';
import { CategorieService } from '../services/categories.services';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categoriesList! : Categories[];

  constructor(private categorieService: CategorieService){}

  ngOnInit(): void {
    this.categoriesList = this.categorieService.getAllCategories();
  }
  }

