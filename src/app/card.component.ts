import {Component, AfterViewInit, Input, Output, EventEmitter} from "@angular/core";
import {StarWarsService} from "./services/starwars.service";
import {People} from "./models/people";
import {Card} from "./models/card";

@Component({
  selector: 'card',
  styles: [`
    .card{
      border: 1px outset #ffffc9;
      border-radius: 10px;
      width: 300px;
      margin: auto;
        -webkit-box-shadow: 7px 7px 5px 0px rgba(0,0,0,0.49);
        -moz-box-shadow: 7px 7px 5px 0px rgba(0,0,0,0.49);
        box-shadow: 7px 7px 5px 0px rgba(0,0,0,0.49);
        background: #121212;
    }

    .card-content{
      padding: 10px;
      background: #222;
      margin: 15px 16px;
    }

    .card, .card-content{
      border-radius: 10px;
    }

    .card img{
      display: block;
      margin: 20px auto;
      border-radius: 2px;
      border: solid 1px #444;
    }

    .card-name{
      background: #494949;
      color: white;
      padding: 10px;
      border-radius: 8px;
    }

    .card p span{
      margin: 0 10px;
    }
  `],
  template: `
    <div class="card">
      <div class="card-content">
        <input class="card-name" type="text" [(ngModel)]="cardData.name">
        <a (click)="addFav()"><i *ngIf="!cardData.isFav" class="material-icons" style="cursor: hand">favorite</i></a>
        <i *ngIf="cardData.isFav" class="material-icons" style="color: red; cursor: hand">favorite</i>
        
        <img src="{{cardData.image}}" alt="profile"/>
        <p>
          <span>Birthday:</span>
          <span>{{cardData.birthdate}}</span>
        </p>
        <p>
          <!-- Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people -->
          <span>Homeworld:</span>
          <span>Tatooine</span>
        </p>
        <button (click)="update()">Update</button>
      </div>
    </div>
  `
})
export class CardComponent implements AfterViewInit{
  @Input() cardData: Card;
  @Output() favAdded = new EventEmitter();

  constructor(private starWarsService: StarWarsService) {

  }

  update() {
    let people: People = this.cardData.people;
    people.name = this.cardData.name;
    this.updatePeople(people);
  }

  addFav() {
    this.addToFavorite(this.cardData.people);
  }

  updatePeople(people: People) {
    this.starWarsService.updateCurrentPerson(people).subscribe(
        (result: any) => {
          console.log("Update Succesful");
        },
        err => {
          console.log(err);
        }
      );
  }

  addToFavorite(people: People) {
    let peopleFavorited: any = {id : people.id};
    this.starWarsService.postFavorite(peopleFavorited).subscribe(
        (result: any) => {
          console.log("favorite added");
          this.cardData.isFav = true;
          this.favAdded.emit();
        },
        err => {
          console.log(err);
        }
    );
  }

  ngAfterViewInit(): void {
    // this.starWarsService.getPeopleData().subscribe (
    //     (data: People[]) => {
    //       console.log(data);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    // );
  }
}
