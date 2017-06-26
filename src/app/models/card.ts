import {People} from "./people";
import {Planet} from "./planet";

export class Card {
    name: string;
    birthdate: string;
    image: string;
    homeworld: string;
    isFav: boolean;
    people: People;

    constructor(people: People, isFav: any) {
        this.name = people.name;
        this.birthdate = people.birth_year;
        this.image = "http://localhost:3008/" + people.image;
        this.people = people;
        if(isFav) {
            this.isFav = true;
        }
    }
}