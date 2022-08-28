import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map, Observable } from 'rxjs';
import { CommuneBack, DepartementBack } from 'src/app/models/apiTypes';

type InfosDepartement = {
  nomDep: string,
  nombreCommunes: number,
  populationTotale: number
}

@Component({
  selector: 'app-page-departements',
  templateUrl: './page-departements.component.html',
  styleUrls: ['./page-departements.component.css']
})
export class PageDepartementsComponent {
  public tableauDepartements : InfosDepartement[] = [];
  public unDepartementSelectionne = false;

  constructor(
    private activeRoute : ActivatedRoute,
    private http: HttpClient,
    private spinner: NgxSpinnerService) {

    //Affichage initial de ma page : je peux avoir un codeDep demandé ou non
    let codeDep = this.activeRoute.snapshot.queryParamMap.get("codeDep");
    
    if (codeDep) {
      this.chargerUnDepartement(codeDep);
      this.unDepartementSelectionne = true;
    }

    this.gererMiseAJourParams();

  }

  gererMiseAJourParams() {
    this.activeRoute.queryParamMap.subscribe(
      params => {
        let codeDep = params.get("codeDep");
        if (!codeDep) this.chargerTousDepartements();
      }
    );
  }

  chargerTousDepartements() {
    this.tableauDepartements.splice(0);
    this.spinner.show();

    //1. On récupère la liste de tous les départements
    this.http.get<DepartementBack[]>("https://geo.api.gouv.fr/departements").subscribe(
      res => {
        let tableauReponsesServeur : Observable<InfosDepartement>[] = [];

        //2. Pour chaque département, on déclenche les requêtes permettant de récupérer ses informations
        for (const unDep of res) {
          tableauReponsesServeur.push(this.chercherInfosUnDepartement(unDep.code));
        }

        //3. Une fois toutes les requêtes terminées, on récupère les résultats (voir doc de forkjoin)
        forkJoin(tableauReponsesServeur).subscribe(
          infosDeps => {
            for (const infos of infosDeps) {
              this.tableauDepartements.push(infos);
            }

            this.spinner.hide();
          }
        );

      }
    );
  }

  chargerUnDepartement(codeDepartement: string) {
    this.spinner.show();

    this.chercherInfosUnDepartement(codeDepartement).subscribe(
      //res est la variable de type InfosDepartement
      res => {
        this.tableauDepartements.push(res);
        this.spinner.hide();
      }
    );
  }

  //Cette méthode permet de vous montrer un chainage d'observables
  //1. Je fais mes 2 requêtes HTTP pour récupérer les infos du département et ses communes
  //2. Je renvoie un observable qui permet de récupérer le résultat des 2 requêtes à travers un objet "InfosDepartement"
  chercherInfosUnDepartement(codeDepartement: string) : Observable<InfosDepartement> {
    let obs = forkJoin([
      this.http.get<DepartementBack[]>("https://geo.api.gouv.fr/departements?code=" + codeDepartement),
      this.http.get<CommuneBack[]>("https://geo.api.gouv.fr/communes?codeDepartement=" + codeDepartement)
    ]).pipe(map( //Pipe & Map permettent de passer d'un observable<[DepartementBack[], CommuneBack[]]> à un observable<InfosDepartement>
      resultats => {
        //resultats[0] => Résultat de /departements
        //resultats[1] => Résultat de /communes

        let infosDep : InfosDepartement = {
          nomDep: resultats[0][0].nom,
          nombreCommunes: resultats[1].length,
          populationTotale: resultats[1].reduce((sum, c) => sum + c.population, 0)
        };

        return infosDep;
      }
    ));
    
    return obs;

  }
}
