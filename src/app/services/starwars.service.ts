import {Injectable} from "@angular/core";
import {Http, Response, RequestOptionsArgs, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import 'rxjs/add/operator/toPromise';
import {People} from "../models/people";

@Injectable()
export class StarWarsService {
    private page = 1;
    private limit = 10;
    private peopleUrl = 'http://localhost:3008' +'/people';

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

    //
    getPeopleDateOnSearch(searchText: string): Observable<People[]> {
        let argsUrl = '?q=' + searchText;
        let finalUrl = this.peopleUrl + argsUrl;
        return this.http
            .get(finalUrl)
            .map((res) => this.extractData(res))
            .catch((err) => this.handleError(err));
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