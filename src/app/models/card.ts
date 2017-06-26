import {People} from "./people";
import {Planet} from "./planet";

export class Card {
    name: string;
    birthdate: string;
    image: string;
    homeworld: string;

    constructor(people: People, planet: Planet) {
        this.name = people.name;
        this.birthdate = people.birth_year;
        this.image = "http://localhost:3008/" + people.image;
    }
}