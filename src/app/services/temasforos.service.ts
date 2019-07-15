import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TemaForo } from '../modelos/TemaForo.model';
import { tap, catchError } from 'rxjs/operators';
import config from '../../config.js';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.api+"/TemasForo";

@Injectable({
  providedIn: 'root'
})
export class TemasforosService {

  constructor( private HttpClient:HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
  getTemasForos():Observable<TemaForo[]> {
    return this.HttpClient.get<TemaForo[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getTemasForos', []))
      ));
  }

  getTemaForo(key: string): Observable<TemaForo> {
    const url = `${apiUrl}/key/${key}`;
    return this.HttpClient.get<TemaForo>(url).pipe(
      tap(_ => catchError(this.handleError<TemaForo>(`getTemaForo id=${key}`))
    ));
  }

  deleteTemaForo (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.HttpClient.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteTema'))
    );
    }

  updateTemaForo (TemaForo:TemaForo): Observable<TemaForo> {
    return this.HttpClient.put<TemaForo>(apiUrl +"/"+ TemaForo.temaID, httpOptions)
    .pipe(tap((updateTemaForo: TemaForo) => catchError(this.handleError<TemaForo>('updateTemaForo'))
    ));
  }

}
