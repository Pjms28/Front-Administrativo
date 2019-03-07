import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { UbicacionModel } from './Ubicacion.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/ubicaciones";

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getLocantions (): Observable<UbicacionModel[]> {
    return this.http.get<UbicacionModel[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('Ubicaciones recuperadas')),
        catchError(this.handleError('getLocations', []))
      );
  }
}
