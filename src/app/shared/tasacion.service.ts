import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { TasacionModel } from '../modelos/tasacion.model';
import config from '../../config.js';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.api+"/Tasaciones";

@Injectable({
  providedIn: 'root'
})
export class TasacionService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTasacions (): Observable<TasacionModel[]> {
    return this.http.get<TasacionModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getTasacions', []))
      ));
  }
  
  getTasacion(id: number): Observable<TasacionModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<TasacionModel>(url).pipe(
      tap(_ => catchError(this.handleError<TasacionModel>(`getTasacion id=${id}`))
    ));
  }

  addTasacion(tasacion: TasacionModel){
    return this.http.post<TasacionModel>(apiUrl,tasacion,httpOptions)
    .pipe(tap((nuevoServicio: TasacionModel) => catchError(this.handleError<TasacionModel>('addTasacion'))
    ));
  }

  deleteTasacion (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteTasacion'))
    );
    }

    updateTasacion (tasacion: TasacionModel): Observable<TasacionModel> {
      return this.http.put<TasacionModel>(apiUrl +"/"+ tasacion.tasacionID,tasacion, httpOptions)
        .pipe(
          catchError(this.handleError('updateService', tasacion))
        );
    }





}
