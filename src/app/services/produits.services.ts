import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map } from "rxjs";
import { Produits } from "../models/produits.model";
import { Photos } from "../models/photos.model";

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

    getAllPhotoByRef(ref: number): Observable<Photos[]>{
        const url = `https://127.0.0.1:8000/api/photos?RefProduit=${ref}`;
        return this.http.get<Photos[]>(url);
    }

    getProduitById(id:number): Observable<Produits[]>{
        const url= `https://127.0.0.1:8000/api/produits?id=${id}`;
        return this.http.get<Produits[]>(url);
    }

} 