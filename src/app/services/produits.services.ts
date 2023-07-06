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

  getAllPhotos(): Observable<Photos[]> {
    return this.http.get<Photos[]>("https://diane.amorce.org/api/photos");
  }

  getAllPhotoByRef(ref: number): Observable<Photos[]> {
    const url = `https://diane.amorce.org/api/photos?RefProduit=${ref}`;
    return this.http.get<Photos[]>(url);
  }

  getProduitById(id: number): Observable<Produits[]> {
    const url = `https://diane.amorce.org/api/produits?id=${id}`;
    return this.http.get<Produits[]>(url);
  }
  
  private getMaxProduitId(): Observable<number> {
    return this.getAllProduits().pipe(
      map(produits => [...produits].sort((a, b) => a.id - b.id)),
      map(sortedProduits => sortedProduits[sortedProduits.length - 1].id),
    );
  }
  
  private getMaxPhotoId(): Observable<number> {
    return this.getAllPhotos().pipe(
      map(photos => [...photos].sort((a, b) => a.id - b.id)),
      map(sortedPhotos => sortedPhotos[sortedPhotos.length - 1].id),
    );
  }


  public createProduit( formvalue: {ShortLibel: string, LongLibel: string, prxHt: number,  }, currentCategoryId: number | null): Observable<Produits> {
   
    return this.getAllProduits().pipe(
        map(produits => [...produits].sort((a, b)=>a.id - b.id)),
        map(sortedproduits => sortedproduits[sortedproduits.length - 1]),
        map(previousproduit => ({
            ...formvalue,
            prxHt: String(formvalue.prxHt),
            slug: this.slugify(formvalue.ShortLibel),
            categorie: `/api/categories/${currentCategoryId?.toString()}`,
        })),
        switchMap(newproduit => this.http.post<Produits>('https://diane.amorce.org/api/produits', newproduit)),
    )
  }

  public addPhoto(formvalue: { [key: string]: string | null }): Observable<Photos[]> {
    return forkJoin({
      maxProduitId: this.getMaxProduitId(),
      maxPhotoId: this.getMaxPhotoId(),
    }).pipe(
      switchMap(({ maxProduitId, maxPhotoId }) => {
        const photos: Partial<Photos>[] = [];
  
        for (const key in formvalue) {
          if (formvalue[key]) {
            console.log(`Key: ${key}`);
            console.log(`Value: ${formvalue[key]}`);
  
            const photo: Partial<Photos> = {
              id: 0,
              src: formvalue[key]?.toString(),
              isPrimary: key === 'photos0' ? true : false,
              RefProduit: maxProduitId?.toString()
            };
            console.log(photo);
            photos.push(photo);
          }
        }
  
        return this.http.post<Photos[]>('https://diane.amorce.org/api/post_photos', photos);
      })
    );
  }

  

  slugify(text: string): string {
    const normalizedText = text.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
    const slug = normalizedText.replace(/\s+/g, "-");

    return slug;
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`https://diane.amorce.org/api/produits/${id}`);
  }

  setPrimaryPhoto(photoId: number): Observable<any> {
    return this.http.get<any>(`https://diane.amorce.org/api/photos/${photoId}`).pipe(
      switchMap((photo) => {
        const updatedPhoto = {
          ...photo,
          isPrimary: true,
        };
        return this.http.put<any>(`https://diane.amorce.org/api/photos/${photoId}`, updatedPhoto);
      })
    );
  }
  

}
