import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, of } from "rxjs";
import { Produits } from "../models/produits.model";
import { Photos } from "../models/photos.model";


interface FormData {
    ShortLibel: string;
    LongLibel: string;
    prxHt: number;
    photos0: any[];
    // Ajoutez les autres propriétés du formulaire ici
  }


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

    createProduit(formData: FormData, currentCategoryId: number | null): Observable<Produits> {
        const url = 'https://diane.amorce.org/api/produits';
        const nbrId = this.getAllProduits.length -1
   
         // Effectuez les modifications nécessaires sur formData ici
  const modifiedData = {
    // Exemple : ne conservez que les propriétés nécessaires
    ShortLibel: formData.ShortLibel,
    slug : this.slugify(formData.ShortLibel),
    LongLibel: formData.LongLibel,
    prxHt: formData.prxHt,
    categorie: currentCategoryId !== null ? currentCategoryId.toString() : '',
    id:nbrId+1,
    photos:formData.photos0
  };

  // Créez un nouvel observable à partir du tableau modifié
  const productInfos = of(modifiedData);

  return productInfos;
} 

slugify(text: string): string {
        const normalizedText = text.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
        const slug = normalizedText.replace(/\s+/g, "-");
      
        return slug;
      }
      
    }
   