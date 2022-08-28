import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DepartementBack, RegionBack } from 'src/app/models/apiTypes';
import { Departement } from 'src/app/models/departement';
import { Region } from 'src/app/models/region';

@Component({
  selector: 'app-page-regions',
  templateUrl: './page-regions.component.html',
  styleUrls: ['./page-regions.component.css']
})
export class PageRegionsComponent implements OnInit {
  public tabRegions : Region[] = [];
  public nomRegionSelectionnee : string | undefined;
  public departementsTrouves: Departement[] = [];


  constructor(private http : HttpClient, private spinner : NgxSpinnerService) {
    this.spinner.show();

    this.http.get<RegionBack[]>("https://geo.api.gouv.fr/regions").subscribe(
      res => {
        for (const region of res) {
          this.tabRegions.push({
            label: region.nom,
            code: region.code
          });
        }

        this.spinner.hide();
      }
    );
  }
  
  ngOnInit(): void {
  }

  afficherInfosRegion(uneRegion: Region) {
    this.spinner.show();

    this.http.get<DepartementBack[]>(`https://geo.api.gouv.fr/departements?codeRegion=${uneRegion.code}`).subscribe(
      resultatRecherche => {
        this.nomRegionSelectionnee = uneRegion.label;
        this.departementsTrouves.splice(0);

        for (const departement of resultatRecherche) {
          this.departementsTrouves.push({
            code: departement.code,
            codeRegion: departement.codeRegion,
            label: departement.nom
          });
        }

        this.spinner.hide();
      }
    )
    
  }
  
}
