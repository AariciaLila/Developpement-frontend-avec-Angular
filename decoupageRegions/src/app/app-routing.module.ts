import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDepartementsComponent } from './pages/page-departements/page-departements.component';
import { PageRegionsComponent } from './pages/page-regions/page-regions.component';

const routes: Routes = [
  { path: "regions", component: PageRegionsComponent},
  { path: "departements", component: PageDepartementsComponent},
  { path: "**" , redirectTo : "regions"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
