import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produits.services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, distinctUntilChanged, map } from 'rxjs';
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
  photosTab: string[] = [];
 

  constructor(private produitService: ProduitService,
    private route : ActivatedRoute,
    private categoryService: CategorieService,
    private formBuilder: FormBuilder) {}

    ngOnInit(): void {
      this.createForm = this.formBuilder.group({
        ShortLibel: [null],
         LongLibel: [null],
         prxHt: [null],
         photos0:[null],
         photos1:[null],
         photos2:[null],
         photos3:[null],
         photos4:[null],
         photos5:[null],
      });

    // Récupérez l'ID de la catégorie depuis le service
    this.currentCategoryId = this.categoryService.getCurrentCategoryId();

    this.produitPreview$ = this.createForm.valueChanges.pipe(
        map(formvalue => ({ 
          ...formvalue,
          categorie: this.currentCategoryId,
          photos:this.photosTab
        }))
      )
  }
  onSubmitForm(): void {
    this.produitService.createProduit(this.createForm.value, this.currentCategoryId)
    .subscribe(
      response => {
        console.log(response);
        // Faites ce que vous voulez avec les données renvoyées
      },
      error => {
        console.error(error);
        // Gérez les erreurs ici
      }
    );
}

addField(event: Event): void {
  const currentButton = event.target as HTMLButtonElement;
  const currentId = currentButton.id;
  const index = parseInt(currentId.slice(8));
  const srcActuel = this.createForm.value[`photos${index}`];
if (srcActuel && !this.photosTab.includes(srcActuel)) {

    this.photosTab.push(srcActuel);
  console.log(this.photosTab);
}
  if (index > 5) {
    return; // Limite maximale atteinte, ne pas ajouter de nouvel champ
  }
  const newId = `photos${index + 1}`;
  const nextElement = document.getElementById(newId);
  if (nextElement) {
    nextElement.classList.toggle('toggle');
  }
}
}


/************** WARNING ! modifier pour éviter l'instanciation si un autre champs est remplis en premier.  */
function slugify(text: string): string {

  const normalizedText = text.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
  const slug = normalizedText.replace(/\s+/g, "-");

  return slug;
}

