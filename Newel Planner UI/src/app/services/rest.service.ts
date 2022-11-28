import {Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        //'Content-Type' : 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor (private http: HttpClient) {}
    getAll(endpoint: string ): Observable<any> {
        return this.http.get(endpoint).pipe(catchError (this.handleError()));
    }

    getById(endpoint: string, Id:string) : Observable<any>{
        return this.http.get( endpoint + Id).pipe(catchError(this.handleError()));
    }

    create(endpoint: string, model: any): Observable<any>{
        return this.http.post(endpoint, model, httpOptions).pipe(catchError(this.handleError()));
    }

    postParams(endpoint: string, params: any): Observable<any>{
        return this.http.post(endpoint, params, httpOptions).pipe(catchError(this.handleError()));
    }

    checkDuplicate(endpoint: string, Value:string, Id: string): Observable<any>{
        return this.http.get(endpoint + Value + '/' + Id).pipe(catchError(this.handleError()));
    }

    checkDuplicateParam(endpoint: string, Value:string): Observable<any>{
        return this.http.get(endpoint + Value).pipe(catchError(this.handleError()));
    }

    private handleError<T>(operation = 'operation', result?: T){
        return (error: any) : Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}