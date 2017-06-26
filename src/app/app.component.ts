import {Component, AfterViewInit} from '@angular/core';
import {StarWarsService} from "./services/starwars.service";
import {People} from "./models/people";
import {Card} from "./models/card";

@Component({
  selector: 'app-root',
  template: `
    <div class="content">
      <div class="logo">
        <img src="/assets/star.svg" />
        <span class="interview-text">The Interview</span>
        <img src="/assets/wars.svg" />
        <search-bar (onSubmit)="onSearchText($event)"></search-bar>
        <button type="button" (click)="prevClick()">Prev</button>
        <button type="button" (click)="nextClick()">Next</button>
        <button type="button" (click)="showFavs()">Favorites ({{favCount}})</button>
        <span *ngFor="let card of cardsShown">
            <card [cardData]="card" (favAdded)="onFavAdd()"></card>
        </span>
      </div>
    </div>
  `,
  styles: [`
    .content{
      max-width: 1000px;
      margin: auto;
      padding: 20px;
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
export class AppComponent implements AfterViewInit{

  private allPeople: People[] = [];
  private cardsShown: Card[] = [];
  private currentPage: number = 1;
  private favIds: any[] = [];
  private favCount: number = 0;
  
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
      let result = this.favIds.find(x => x.id == people.id);
      this.cardsShown.push(new Card(people, result));
    });
  }

  updatePage(): void {
    this.getPeople(this.currentPage);
  }

  onSearchText(people: People[]) {
    this.allPeople = people;
    this.updateCards();
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
}
