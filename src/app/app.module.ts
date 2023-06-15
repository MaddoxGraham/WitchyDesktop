import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ProduitsComponent } from './produits/produits.component';
import { ProduitsListComponent } from './produits-list/produits-list.component';
import { SingleProduitComponent } from './single-produit/single-produit.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProduitComponent } from './new-produit/new-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    HeaderComponent,
    CategoriesListComponent,
    LandingPageComponent,
    ProduitsComponent,
    ProduitsListComponent,
    SingleProduitComponent,
    NewProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
