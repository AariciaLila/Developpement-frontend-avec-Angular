import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAjoutComponent } from './pages/page-ajout/page-ajout.component';
import { PageListeComponent } from './pages/page-liste/page-liste.component';

const routes: Routes = [
  { path: "liste", component : PageListeComponent},
  { path: "ajout", component : PageAjoutComponent},
  { path: "**", redirectTo: "liste"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
