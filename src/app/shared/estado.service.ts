import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EstadoModel } from '../modelos/estado.model';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



const apiUrl = "http://localhost:61756/api/Estados";

@Injectable({
  providedIn: 'root'
})

export class EstadoService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getState (): Observable<EstadoModel[]> {
    return this.http.get<EstadoModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getState', []))
      ));
  }
}
