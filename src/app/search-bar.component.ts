import { Component,Output,EventEmitter } from '@angular/core';
import {People} from "./models/people";
import {StarWarsService} from "./services/starwars.service";

@Component({
  selector: 'search-bar',
  styles: [`
    .search-bar{
      text-align: center;
      margin: 20px;
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
      <input #input placeholder="Search Your Destiny" />
      <button type="submit" (click)="submit(input.value)">Submit</button>
    </div>
  `
})
export class SearchBarComponent {
  private allPeople: People[] = [];
  @Output() onSubmit = new EventEmitter();

  constructor(private starWarsService: StarWarsService) {

  }

  submit(value: string) {
    this.getPeople(value);
  }

  getPeople(searchText: string): void {
    this.starWarsService.getPeopleDateOnSearch(searchText).subscribe (
        (data: People[]) => {
          //console.log(data);
          this.allPeople = data;
          this.onSubmit.emit(this.allPeople);
          //this.updateCards();
        },
        err => {
          console.log(err);
        }
    );
  }
}
