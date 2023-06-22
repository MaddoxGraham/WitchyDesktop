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
        const url = `https://diane.amorce.org/api/photos?RefProduit=${ref}`;
        return this.http.get<Photos[]>(url);
    }

    getProduitById(id:number): Observable<Produits[]>{
        const url= `https://diane.amorce.org/api/produits?id=${id}`;
        return this.http.get<Produits[]>(url);
    }

    createProduit(formData:any): void{
        const url = 'https://diane.amorce.org/api/produits';

    }

    
    slugify(text: string): string {

        const normalizedText = text.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
        const slug = normalizedText.replace(/\s+/g, "-");
      
        return slug;
      }
      
      
} 