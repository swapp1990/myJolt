import { Component,Input,Output,EventEmitter } from '@angular/core';
import {StarWarsService} from "./services/starwars.service";
import {Card} from "./models/card";

@Component({
    selector: 'my-favs',
    template: `
    <div class="content">
       <button routerLink="/">Back</button> 
       <h2 style="text-align: center"> My Favorites </h2>
    </div>
    <span *ngFor="let card of favPeople">
       <card [cardData]="card" (favAdded)="onFavAdd()"></card>
    </span>
    `,
    styles: [`
        .content{
          max-width: 500px;
          margin: auto;
          display: grid;
        }
    `]
})

export class FavoritesComponent {
    private favIds: any[] = [];
    private favPeople: Card[] = [];

    constructor(private starWarsService: StarWarsService) {
        this.init();
    }

    init() {
        this.starWarsService.getFavorites().subscribe (
            (data) => {
                this.favIds = data;
                this.favIds.forEach(id => {
                    this.starWarsService.getPeopleWithGivenId(id).subscribe (
                        (people) => {
                            people.forEach(pp => {
                                this.favPeople.push(new Card(pp, null, true));
                            });
                        }
                    )
                });
            },
            err => {
                console.log(err);
            }
        );
    }
}