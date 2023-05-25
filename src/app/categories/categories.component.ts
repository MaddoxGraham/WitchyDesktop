import { Component, Input, OnInit } from '@angular/core';
import { Categories } from '../models/categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit{

  @Input() categories!: Categories

  ngOnInit(): void {
    
  }
}
