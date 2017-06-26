import { Component,Input,Output,EventEmitter } from '@angular/core';
import {People} from "./models/people";
import {StarWarsService} from "./services/starwars.service";

@Component({
  selector: 'search-bar',
  styles: [`
    .search-bar{
      text-align: center;
      margin: 20px 20px 5px 20px;
    }

    .search-bar input:focus{
        outline: none;
    }

    .search-bar input{
      padding: 2px 10px;
      font-size: 20px;
      border-radius: 2px;
      background: #999;
      margin: auto;
      color: #222;
    } 
  `],
  template: `
    <div class="search-bar">
      <input #input placeholder="Search Your Destiny" [(ngModel)]="search"/>
      <button type="submit" (click)="submit()">Submit</button>
    </div>
  `
})
export class SearchBarComponent {
  private allPeople: People[] = [];
  @Input() search: string = "";
  @Output() onSubmit = new EventEmitter();

  constructor(private starWarsService: StarWarsService) {

  }

  submit() {
    if(this.search != "") {
        this.getPeople(this.search);
    } else {
        this.onSubmit.emit();
    }
  }

  getPeople(searchText: string): void {
    this.starWarsService.getPeopleDateOnSearch(searchText).subscribe (
        (data: any) => {
          if(data[0].length > 0) {
              this.starWarsService.getPeopleWithGivenPlanetId(data[0][0].id).subscribe(
                  (peopleData) => {
                      this.allPeople = peopleData;
                      this.onSubmit.emit(this.allPeople);
                  }
              );
          } else {
              this.allPeople = data[1];
              this.onSubmit.emit(this.allPeople);
          }
        },
        err => {
          console.log(err);
        }
    );
  }
}
