import { Component, OnInit } from '@angular/core';
import { Produits } from '../models/produits.model';
import { ProduitService } from '../services/produits.services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photos } from '../models/photos.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-single-produit',
  templateUrl: './single-produit.component.html',
  styleUrls: ['./single-produit.component.scss']
})
export class SingleProduitComponent implements OnInit  {

    produit!: Produits;
    produit$!: Observable<Produits[]>;
    photos$!: Observable<Photos[]>;
    draggedPhoto: Photos | null = null;
    RefProduit!: number;
    ShortLibel!: string;
    LongLibel!: string;
    prxHt!: number;

    constructor(private produitService: ProduitService,
                private route: ActivatedRoute) {}

        ngOnInit(): void{
        const produit = +this.route.snapshot.params['id'];
        this.produit$ = this.produitService.getProduitById(produit);
        this.RefProduit = produit;
        this.photos$ = this.produitService.getAllPhotoByRef(produit);
      }

      onSubmitForm(form: NgForm){
        console.log(form.value);
      }

      deletePhoto(id: number): void {
        this.produitService.deletePhoto(id).subscribe(
          () => {
            console.log(`Photo ${id} supprimée avec succès.`);
          },
          (error) => {
            console.error(error);
          }
        );
      }


      onDragStart(event: DragEvent, photo: Photos): void {
        this.draggedPhoto = photo;
      }
    
      onDragOver(event: DragEvent): void {
        event.preventDefault();
      }
    
      onDrop(event: DragEvent): void {
        event.preventDefault();
        if (this.draggedPhoto) {
          // Définir la photo comme photo principale
          console.log(this.draggedPhoto)
          this.produitService.setPrimaryPhoto(this.draggedPhoto.id,this.RefProduit).subscribe(
            () => {
              
              console.log(`Photo définie comme photo principale avec succès.`);
              
            },
            (error) => {
              console.error(error);
            }
          );
          this.draggedPhoto = null;
        }
      }

    }
