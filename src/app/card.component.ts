import {Component, AfterViewInit, Input} from "@angular/core";
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
        <div class="card-name">{{cardData.name}}</div>
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
      </div>
    </div>
  `
})
export class CardComponent implements AfterViewInit{
  @Input() cardData: Card;

  constructor(private starWarsService: StarWarsService) {

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
