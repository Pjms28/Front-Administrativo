import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { InmuebleModel } from '../shared/inmueble.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/inmuebles";

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getInmuebles (): Observable<InmuebleModel[]> {
    return this.http.get<InmuebleModel[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('Inmuebles recuperadas')),
        catchError(this.handleError('getInmueble', []))
      );
  }
}
