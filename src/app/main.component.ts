import {Component, AfterViewInit} from '@angular/core';
import {StarWarsService} from "./services/starwars.service";
import {People} from "./models/people";
import {Card} from "./models/card";
import {Planet} from "./models/planet";

@Component({
    selector: 'main',
    template: `  
        <div>
        <search-bar [search]="text" (onSubmit)="onSearchText($event)"></search-bar>
        <div class="content">
            <button type="button" (click)="prevClick()">Prev</button>
            <button type="button" (click)="nextClick()">Next</button>
            <button type="button" routerLink="/favs" (click)="showFavs()">Favorites ({{favCount}})</button>
        </div>
        <span *ngFor="let card of cardsShown">
            <card [cardData]="card" (favAdded)="onFavAdd()"></card>
        </span>
        </div>
  `,
    styles: [`
    .content{
      max-width: 500px;
      margin: auto;
      padding: 10px;
    }

    .logo{
      text-align: center;
    }

    .interview-text{
      display: block;
      color: #fff;
      font-family: "ITC Serif Gothic", Lato;
      font-size: 2.25em;
      left: -2em;
      letter-spacing: 0.4em;
      right: -2em;;
      text-transform: uppercase;
      top: 29%;
    }
  `],
})
export class MainComponent implements AfterViewInit{

    private allPeople: People[] = [];
    private allPlanets: Planet[] = [];
    private cardsShown: Card[] = [];
    private currentPage: number = 1;
    private favIds: any[] = [];
    private favCount: number = 0;
    private text: string = "";

    constructor(private starWarsService: StarWarsService) {

    }

    ngAfterViewInit(): void {
        this.init();
    }

    init() {
        this.starWarsService.getFavorites().subscribe (
            (data) => {
                this.favIds = data;
                this.favCount = this.favIds.length;
                this.getPlanets();
            },
            err => {
                console.log(err);
            }
        );
    }

    getPlanets() {
        this.starWarsService.getPlanetsData().subscribe(
            (data) => {
                data.forEach(planet => {
                    this.allPlanets.push(new Planet(planet.id, planet.name));
                });
                this.getPeople(this.currentPage);
            },
            err => {
                console.log(err);
            }
        );
    }

    getPeople(currentPage: number): void {
        this.starWarsService.getPeopleData(currentPage).subscribe (
            (data: People[]) => {
                //console.log(data);
                this.allPeople = data;
                this.updateCards();
            },
            err => {
                console.log(err);
            }
        );
    }

    updateCards(): void {
        this.cardsShown = [];
        this.allPeople.forEach((people: People) => {
            let isFav = this.favIds.find(x => x.id == people.id);
            let planetFound: Planet = this.allPlanets.find((x: Planet) => x.id == people.homeworld);
            this.cardsShown.push(new Card(people, planetFound, isFav));
        });
    }

    updatePage(): void {
        this.getPeople(this.currentPage);
    }

    onSearchText(people: People[]) {
        if(people) {
            this.allPeople = people;
            this.updateCards();
        } else {
            this.currentPage = 1;
            this.init();
        }
    }

    prevClick() {
        if(this.currentPage == 1) return;
        this.currentPage--;
        this.getPeople(this.currentPage);
    }

    nextClick() {
        this.currentPage++;
        this.getPeople(this.currentPage);
    }

    onFavAdd() {
        this.init();
    }

    showFavs() {

    }
}
