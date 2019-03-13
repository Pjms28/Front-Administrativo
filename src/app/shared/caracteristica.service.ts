import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { CaracteristicaModel } from './caracteristicas.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/caracteristicas";


@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCaracteristicas (): Observable<CaracteristicaModel[]> {
    return this.http.get<CaracteristicaModel[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('Caracteristicas recuperadas')),
        catchError(this.handleError('getCaracteristicas', []))
      );
  }
}
