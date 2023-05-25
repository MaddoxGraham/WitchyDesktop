import { Injectable } from "@angular/core";
import { Categories } from "../models/categories.model";

@Injectable({
    providedIn: 'root'
})

export class CategorieService {

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

    getAllCategories(): Categories[] {
        return this.categoriesList
    }

    getCategorieById(id: number): void {
        const categorie = this.categoriesList.find(categorie => categorie.id === id);
        if (!categorie) {
            throw new Error('categorie not found');
        }

    }
}