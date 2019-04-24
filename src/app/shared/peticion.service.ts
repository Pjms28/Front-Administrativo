import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { PeticionModel } from '../modelos/peticion.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/Peticiones";

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPeticionesP(): Observable<PeticionModel[]> {
    return this.http.get<PeticionModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getPeticiones', []))
      ));
  }

  getPeticionesA(): Observable<PeticionModel[]> {
    const url = `${apiUrl}/${'PeticionesA'}`;
    return this.http.get<PeticionModel[]>(url)
      .pipe(
        tap(heroes => catchError(this.handleError('getPeticiones', []))
      ));
  }
  
  getPeticion(id: number): Observable<PeticionModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<PeticionModel>(url).pipe(
      tap(_ => catchError(this.handleError<PeticionModel>(`getPeticion id=${id}`))
    ));
  }

  updatePeticion(Peticion: PeticionModel){
    return this.http.put<PeticionModel>(apiUrl +"/"+ Peticion.peticionID,Peticion, httpOptions)
        .pipe(
          catchError(this.handleError('updatePeticion', Peticion))
        );
  }
}
