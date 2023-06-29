import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, of, switchMap } from "rxjs";
import { Produits } from "../models/produits.model";
import { Photos } from "../models/photos.model";


@Injectable({
  providedIn: "root",
})
export class ProduitService {
  constructor(private http: HttpClient) {}

  produitsList: Produits[] = [];

  getAllProduits(): Observable<Produits[]> {
    return this.http.get<Produits[]>("https://diane.amorce.org/api/produits");
  }

  getAllPhotoByRef(ref: number): Observable<Photos[]> {
    const url = `https://diane.amorce.org/api/photos?RefProduit=${ref}`;
    return this.http.get<Photos[]>(url);
  }

  getProduitById(id: number): Observable<Produits[]> {
    const url = `https://diane.amorce.org/api/produits?id=${id}`;
    return this.http.get<Produits[]>(url);
  }
  

  public createProduit( formvalue: {ShortLibel: string, LongLibel: string, prxHt: number,  }, currentCategoryId: number | null): Observable<Produits> {
   
    return this.getAllProduits().pipe(
        map(produits => [...produits].sort((a, b)=>a.id - b.id)),
        map(sortedproduits => sortedproduits[sortedproduits.length - 1]),
        map(previousproduit => ({
            ...formvalue,
            slug: this.slugify(formvalue.ShortLibel),
            categorie: `/api/categories/${currentCategoryId?.toString()}`,
        })),
        switchMap(newproduit => this.http.post<Produits>('https://diane.amorce.org/api/produits', newproduit)),
    )
  }

  public addPhoto(){

  }

  slugify(text: string): string {
    const normalizedText = text.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
    const slug = normalizedText.replace(/\s+/g, "-");

    return slug;
  }


}
