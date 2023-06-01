import { Injectable } from "@angular/core";
import { Categories } from "../models/categories.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CategorieService {

    constructor( private http: HttpClient){

    }

    categoriesList: Categories[] = [
        {
            id: 1,
            parentId: null,
            nomination: 'Women',
            slug: 'women'
        }, {
            id: 2,
            parentId: null,
            nomination: 'Men',
            slug: 'men'
        }, {
            id: 3,
            parentId: null,
            nomination: 'Shoes',
            slug: 'shoes'
        }

    ];

    getAllCategories():Observable<Categories[]> {
        return this.http.get<Categories[]>('https://diane.amorce.org/api/categories')
    }

    getCategorieById(id: number): void {
        const categorie = this.categoriesList.find(categorie => categorie.id === id);
        if (!categorie) {
            throw new Error('categorie not found');
        }

    }
}