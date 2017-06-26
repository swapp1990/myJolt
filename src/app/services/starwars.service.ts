import {Injectable} from "@angular/core";
import {Http, Response, RequestOptionsArgs, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';
import {People} from "../models/people";
import {Planet} from "../models/planet";

@Injectable()
export class StarWarsService {
    private page = 1;
    private limit = 10;
    private peopleUrl = 'http://localhost:3008' +'/people';
    private planetsUrl = 'http://localhost:3008' +'/planets';

    constructor(private http: Http) { }

    //Get all star wars peoples data
    getPeopleData(currentPage: number): Observable<People[]> {
        this.page = currentPage;
        let argsUrl = '?_page=' + this.page + '&_limit=' + this.limit;
        let finalUrl = this.peopleUrl + argsUrl;
        return this.http
            .get(finalUrl)
            .map((res) => this.extractData(res))
            .catch((err) => this.handleError(err));
    }

    getPeopleWithGivenPlanetId(planetId: number):  Observable<People[]> {
        let finalUrl = this.peopleUrl + '?homeworld=' + planetId;
        return this.http
            .get(finalUrl)
            .map((res) => this.extractData(res))
            .catch((err) => this.handleError(err));
    }

    getPeopleWithGivenId(peopleId: any): Observable<People[]> {
        let finalUrl = this.peopleUrl + '?id=' + peopleId.id;
        return this.http
            .get(finalUrl)
            .map((res) => this.extractData(res))
            .catch((err) => this.handleError(err));
    }

    getPlanetsData(): Observable<Planet[]> {
        let finalUrl = this.planetsUrl;
        return this.http
            .get(finalUrl)
            .map((res) => this.extractData(res))
            .catch((err) => this.handleError(err));
    }

    //
    getPeopleDateOnSearch(searchText: string): Observable<any> {
        let foundPeople: People[] = [];

        let argsUrl = '?q=' + searchText;
        let finalUrl = this.planetsUrl + argsUrl;
        let firstSearch = this.http.get(finalUrl).map((res) => res.json());
        finalUrl = this.peopleUrl + argsUrl;
        let secondSearch = this.http.get(finalUrl).map((res) => res.json());

        return Observable.forkJoin([firstSearch, secondSearch]);
        // //First search for planets if matched and add people belonging to the planet
        // this.getPlanetsOnSearch(searchText).subscribe(
        //     (data) => {
        //         if(data) {
        //             data.forEach(planet => {
        //                 this.getPeopleWithGivenPlanetId(planet.id).subscribe(
        //                     (peopleData) => {
        //                         peopleData.forEach(people => foundPeople.push(people));
        //                     }
        //                 );
        //             });
        //         }
        //
        //         //Then search for people names to match the search text
        //         this.getPeoplesOnSearch(searchText).subscribe(
        //             (data) => {
        //                 data.forEach(people => {
        //                     foundPeople.push(people);
        //                 });
        //             }
        //         );
        //     }
        // );

        //return Observable.
    }

    getPeoplesOnSearch(searchText: string): Observable<any> {
        let argsUrl = '?q=' + searchText;
        let finalUrl = this.peopleUrl + argsUrl;

        return this.http
            .get(finalUrl)
            .map((res) => this.extractData(res))
            .catch((err) => this.handleError(err));
    }

    getPlanetsOnSearch(searchText: string): Observable<any> {
        let argsUrl = '?q=' + searchText;
        let finalUrl = this.planetsUrl + argsUrl;

        return this.http
            .get(finalUrl)
            .map((res) => this.extractData(res))
            .catch((err) => this.handleError(err));
    }


    getFavorites(): Observable<any> {
        let finalUrl = `http://localhost:3008/peoplefavorites`;
        return this.http
            .get(finalUrl)
            .map((res) => this.extractData(res))
            .catch((err) => this.handleError(err));
    }

    updateCurrentPerson(people: People) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let finalUrl = this.peopleUrl + '/' + people.id;
        return this.http
            .patch(finalUrl, JSON.stringify(people), { headers: headers })
            .map((response: Response) => response.json());
    }

    postFavorite(peopleId: any) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let finalUrl = `http://localhost:3008/peoplefavorites`;
        return this.http
            .post(finalUrl, JSON.stringify(peopleId), { headers: headers })
            .map((response: Response) => response.json());
    }

    private getCount(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body: any = res.json();
        return body.length;
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || { };
    }

    private handleError (error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}