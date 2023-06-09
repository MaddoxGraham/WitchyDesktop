import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map } from "rxjs";
import { Produits } from "../models/produits.model";

@Injectable({
    providedIn: 'root'
})

export class ProduitService {

    constructor( private http: HttpClient){

    }

    produitsList: Produits[] = [
    ];

    getAllProduits():Observable<Produits[]> {
        return this.http.get<Produits[]>('https://diane.amorce.org/api/produits')
    }

} 