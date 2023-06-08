import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProduitsListComponent } from './produits-list/produits-list.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesListComponent  },
  { path: '', component: LandingPageComponent},
  { path: 'categorie/:id', component: ProduitsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 