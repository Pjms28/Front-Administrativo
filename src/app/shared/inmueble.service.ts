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
  list: InmuebleModel [];

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
        tap(heroes => catchError(this.handleError('getInmueble', [])))
      );
  }

  getInmueble(id: number): Observable<InmuebleModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<InmuebleModel>(url).pipe(
      tap(_ => catchError(this.handleError<InmuebleModel>(`getInmueble id=${id}`))
    ));
  }

  refreshList(){
    this.http.get(apiUrl)
    .toPromise().then(res => this.list = res as InmuebleModel[]);
  }

  addInmueble(inmueble: InmuebleModel){
    return this.http.post<InmuebleModel>(apiUrl,inmueble,httpOptions)
    .pipe(tap((nuevoInmueble: InmuebleModel) => catchError(this.handleError<InmuebleModel>('addInmueble'))
    ));
  }

  deleteInmueble (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteInmueble'))
    );
    }

    updateInmueble (inmueble: InmuebleModel): Observable<InmuebleModel> {
      return this.http.put<InmuebleModel>(apiUrl +"/"+ inmueble.inmuebleID,inmueble, httpOptions)
        .pipe(
          catchError(this.handleError('updateProject', inmueble))
        );
    }

}
