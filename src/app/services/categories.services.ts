import { Injectable } from "@angular/core";
import { Categories } from "../models/categories.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CategorieService {

    constructor( private http: HttpClient){
    }

    currentCategoryId!: number | null;
    categoriesList: Categories[] = [


    ];

    getAllCategories():Observable<Categories[]> {
        return this.http.get<Categories[]>('https://diane.amorce.org/api/categories')
    }

    getCategoriesParents(): Observable<Categories[]>{
        return this.http.get<Categories[]>('https://diane.amorce.org/api/categories')
    .pipe(
      map(categories => categories.filter(categories => categories.parentId === null))
    );
    }

    getCategorieById(id: number): void {
        const categorie = this.categoriesList.find(categorie => categorie.id === id);
        if (!categorie) {
            throw new Error('categorie not found');
        }
    }


    /********* Gestion de la sauvegarde de la sous categorie courante  */

    setCurrentCategoryId(categoryId: number): void {

        this.currentCategoryId = categoryId;
      }
    
      getCurrentCategoryId(): number | null {
        return this.currentCategoryId;
      }

}