import {People} from "./people";
import {Planet} from "./planet";

export class Card {
    name: string;
    birthdate: string;
    image: string;
    planetName: string;
    isFav: boolean;
    people: People;

    constructor(people: People, planet: Planet, isFav: any) {
        this.name = people.name;
        this.birthdate = people.birth_year;
        this.image = "http://localhost:3008/" + people.image;
        this.people = people;
        if(planet) {
            this.planetName = planet.name;
        }
        if(isFav) {
            this.isFav = true;
        }
    }
}