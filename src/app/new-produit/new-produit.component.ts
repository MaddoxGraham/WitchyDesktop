import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produits.services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Produits } from '../models/produits.model';
import { ActivatedRoute } from '@angular/router';
import { CategorieService } from '../services/categories.services';

@Component({
  selector: 'app-new-produit',
  templateUrl: './new-produit.component.html',
  styleUrls: ['./new-produit.component.scss']
})
export class NewProduitComponent implements OnInit{

  createForm!:FormGroup;
  produitPreview$!: Observable<Produits>;
  currentCategoryId!: number | null;

  constructor(private produitService: ProduitService,
    private route : ActivatedRoute,
    private categoryService: CategorieService,
    private formBuilder: FormBuilder) {}

    ngOnInit(): void {
      this.createForm = this.formBuilder.group({
        ShortLibel: [null],
         LongLibel: [null],
         prxHt: [null],
         photos:[null]
      });

    // Récupérez l'ID de la catégorie depuis le service
    this.currentCategoryId = this.categoryService.getCurrentCategoryId();
    

    this.produitPreview$ = this.createForm.valueChanges.pipe(
        map(formvalue => ({ 
          ...formvalue,
          slug: slugify(formvalue.ShortLibel),
          categorie: this.currentCategoryId,
        }))
      )
    
  }
  onSubmitForm(): void {
    console.log(this.createForm.value);
}
}


/************** WARNING ! modifier pour éviter l'instanciation si un autre champs est remplis en premier.  */
function slugify(text: string): string {
  const normalizedText = text.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
  const slug = normalizedText.replace(/\s+/g, "-");

  return slug;
}

