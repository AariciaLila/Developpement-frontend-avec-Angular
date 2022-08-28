import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProduitComponent } from './produit/produit.component';
import { registerLocaleData  } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { PoidsPipe } from './poids.pipe';
import { PageListeComponent } from './pages/page-liste/page-liste.component';
import { PageAjoutComponent } from './pages/page-ajout/page-ajout.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProduitComponent,
    PoidsPipe,
    PageListeComponent,
    PageAjoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'fr' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
